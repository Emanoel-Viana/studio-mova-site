// Service Worker do Studio MOVA (PWA).
// Estratégia: navegações = network-first (conteúdo sempre atual, com
// fallback offline); assets estáticos = cache-first (rápido e offline).
const CACHE = "mova-v50";
const OFFLINE_URL = "/offline";

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
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // NUNCA cachear a área autenticada nem as APIs: o HTML do /admin já vem
  // com os dados dos leads, e cachear vazaria isso num aparelho compartilhado.
  // Deixa o navegador buscar direto da rede (sem put e sem match no cache).
  if (
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/api")
  ) {
    return;
  }

  // Navegações entre páginas: rede primeiro, cache/offline como reserva.
  // Só cacheia respostas OK (não guarda 404/500 pra não servir erro offline).
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL)),
        ),
    );
    return;
  }

  // Assets estáticos: stale-while-revalidate — responde do cache na hora e
  // atualiza em segundo plano (imagem trocada no mesmo caminho refresca sozinha).
  if (
    /\/_next\/static\/|\/marca\/|\/fotos\/|\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff2?)$/.test(
      url.pathname,
    )
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const rede = fetch(request)
          .then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(request, copy));
            }
            return res;
          })
          .catch(() => cached);
        return cached || rede;
      }),
    );
  }
});
