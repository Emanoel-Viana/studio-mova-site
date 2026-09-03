// Proxy (antigo "middleware" — renomeado no Next 16).
// Faz duas coisas:
//  1) Gera um NONCE único por request e monta a Content-Security-Policy com
//     ele — assim o script-src NÃO precisa de 'unsafe-inline' (endurece o
//     anti-XSS). O Next lê o nonce do header e aplica automaticamente nos
//     scripts dele (framework + <Script>).
//  2) Só na área do admin: renova a sessão do Supabase (cookies).
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

function montarCsp(nonce: string, isDev: boolean): string {
  // Scripts: nonce + origens confiáveis (Turnstile e Cloudflare Analytics —
  // o beacon é injetado na borda, sem o nosso nonce, por isso NÃO usamos
  // 'strict-dynamic', que ignoraria a allowlist). Sem 'unsafe-inline'.
  // 'unsafe-eval' só em dev (o React usa eval no modo de desenvolvimento).
  // Estilos mantêm 'unsafe-inline' (Tailwind + estilos inline do React).
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://challenges.cloudflare.com https://static.cloudflareinsights.com${
      isDev ? " 'unsafe-eval'" : ""
    }`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://cloudflareinsights.com https://challenges.cloudflare.com",
    "frame-src https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export async function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const csp = montarCsp(nonce, isDev);

  // O nonce e a CSP vão nos headers do REQUEST para o Next conseguir ler o
  // nonce durante a renderização e aplicá-lo nos scripts dele.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  let response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);

  // Fora do admin, não precisa mexer no Supabase.
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return response;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return response;

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        // Recria a resposta preservando os headers do request (nonce/CSP).
        response = NextResponse.next({ request: { headers: requestHeaders } });
        response.headers.set("Content-Security-Policy", csp);
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Renova o token (não use entre getUser e o retorno).
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    // Todas as rotas, menos API, estáticos e o favicon; e ignora prefetches
    // do next/link (não precisam da CSP).
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
