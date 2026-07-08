import type { NextConfig } from "next";

// Headers de segurança aplicados a todas as rotas.
// (CSP completo foi deixado de fora de propósito — exige mapear cada
//  origem usada e pode quebrar o site; dá pra fazer depois com calma.)
const securityHeaders = [
  // Anti-clickjacking: ninguém pode embutir o site num iframe de outro domínio.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Impede o navegador de "adivinhar" tipos de arquivo (evita alguns ataques).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Não vaza a URL completa de origem para outros sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Bloqueia recursos sensíveis que o site não usa.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
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
