import type { NextConfig } from "next";

// A Content-Security-Policy agora é montada no `proxy.ts`, com um NONCE
// único por request (script-src sem 'unsafe-inline'). Por isso ela NÃO está
// mais aqui — se estivesse, viriam 2 CSPs e o navegador aplicaria a
// interseção das duas, quebrando os scripts.

// Headers de segurança aplicados a todas as rotas.
const securityHeaders = [
  // Anti-clickjacking: ninguém pode embutir o site num iframe de outro domínio.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Impede o navegador de "adivinhar" tipos de arquivo (evita alguns ataques).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Força o navegador a sempre usar HTTPS neste domínio e subdomínios.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // Não vaza a URL completa de origem para outros sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Bloqueia recursos sensíveis que o site não usa.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // (A Content-Security-Policy vem do proxy.ts, com nonce por request.)
];

const nextConfig: NextConfig = {
  // Remove o header "X-Powered-By: Next.js" (não revela a tecnologia).
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Redireciona www.studiomova.com.br -> studiomova.com.br (domínio único/canônico).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.studiomova.com.br" }],
        destination: "https://studiomova.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
