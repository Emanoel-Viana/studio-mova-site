import type { NextConfig } from "next";

// Content-Security-Policy: limita de onde o site pode carregar scripts,
// estilos, imagens, etc. — mitiga injeção de código (XSS).
// Origens externas usadas: Cloudflare Turnstile (captcha) e Cloudflare
// Web Analytics (script + beacon), Supabase (API/realtime do admin).
// Publicado primeiro em modo REPORT-ONLY (não bloqueia, só reporta no
// console) pra confirmar que nada quebra; depois vira enforce.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com",
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

// Headers de segurança aplicados a todas as rotas.
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
  // CSP em modo report-only (fase 1): observa violações sem bloquear.
  { key: "Content-Security-Policy-Report-Only", value: csp },
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
