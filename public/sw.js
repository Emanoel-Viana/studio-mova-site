// Service Worker do Studio MOVA (PWA).
// Navegações = rede primeiro (conteúdo sempre atual, com teto de tempo e
// fallback offline); assets estáticos e imagens = stale-while-revalidate.
const CACHE = "mova-v56";
const CACHE_PAGINAS = "mova-paginas-v56";
const OFFLINE_URL = "/offline";
const MAX_PAGINAS = 40; // teto do cache de HTML (evita crescer sem limite)

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE && k !== CACHE_PAGINAS)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Rede com teto de tempo: se a rede pendurar, cai no cache em vez de travar.
function fetchComTimeout(request, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    fetch(request).then(
      (res) => {
        clearTimeout(t);
        resolve(res);
      },
      (err) => {
        clearTimeout(t);
        reject(err);
      },
    );
  });
}

// Mantém no máximo `max` entradas no cache (remove as mais antigas).
async function limitarCache(nome, max) {
  const cache = await caches.open(nome);
  const chaves = await cache.keys();
  if (chaves.length <= max) return;
  for (let i = 0; i < chaves.length - max; i++) {
    await cache.delete(chaves[i]);
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // NUNCA cachear a área autenticada nem as APIs (vazaria dados de leads).
  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) {
    return;
  }

  // Navegações entre páginas: rede primeiro (teto 8s), cache/offline de reserva.
  if (request.mode === "navigate") {
    // Chave SEM query (?fbclid=/utm_=): senão cada link do Instagram viraria
    // uma entrada nova de HTML e o cache cresceria sem parar.
    const chave = new Request(url.origin + url.pathname);
    event.respondWith(
      (async () => {
        try {
          const res = await fetchComTimeout(request, 8000);
          if (res.ok) {
            const copy = res.clone();
            event.waitUntil(
              caches
                .open(CACHE_PAGINAS)
                .then((c) => c.put(chave, copy))
                .then(() => limitarCache(CACHE_PAGINAS, MAX_PAGINAS)),
            );
          }
          return res;
        } catch {
          const cached = await caches.match(chave);
          return (
            cached || (await caches.match(OFFLINE_URL)) || Response.error()
          );
        }
      })(),
    );
    return;
  }

  // Assets estáticos + imagens otimizadas (/_next/image): stale-while-revalidate
  // — responde do cache na hora e atualiza em segundo plano.
  if (
    /\/_next\/static\/|\/_next\/image|\/marca\/|\/fotos\/|\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2?)$/.test(
      url.pathname,
    )
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const rede = fetch(request)
          .then((res) => {
            if (res.ok) {
              const copy = res.clone();
              event.waitUntil(
                caches.open(CACHE).then((c) => c.put(request, copy)),
              );
            }
            return res;
          })
          // Sem cache E sem rede: devolve um erro de rede de verdade
          // (nunca `undefined`, que geraria TypeError em respondWith).
          .catch(() => cached || Response.error());
        return cached || rede;
      }),
    );
  }
});
