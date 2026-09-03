import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { site } from "@/lib/site";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { RevealObserver } from "@/components/RevealObserver";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — ${site.slogan} | Academia boutique na Asa Norte, Brasília`,
    template: `%s | ${site.nome}`,
  },
  description: site.descricao,
  applicationName: site.nome,
  appleWebApp: {
    capable: true,
    title: site.nome,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: `${site.nome} — ${site.slogan}`,
    description: site.descricao,
    url: site.url,
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#14532d",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: site.nome,
  slogan: site.slogan,
  url: site.url,
  telephone: `+${site.contato.whatsapp}`,
  email: site.contato.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.endereco.linha1}, ${site.endereco.linha2}`,
    addressLocality: "Brasília",
    addressRegion: "DF",
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.avaliacao.nota,
    reviewCount: site.avaliacao.total,
  },
  sameAs: [site.contato.instagramUrl, ...site.parcerias.map((p) => p.url)],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Nonce gerado pelo proxy.ts — libera SÓ os nossos scripts inline sob a CSP.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {/* Antes da tela pintar: aplica o tema salvo (evita "piscar") e liga o
            modo de revelação ao rolar (html.reveal-on) só se houver suporte e o
            usuário não pediu "menos movimento". A rede de segurança de 2,5s
            garante que o conteúdo apareça mesmo se o React não hidratar. */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement;if(localStorage.getItem('tema')==='dark'){d.classList.add('dark')}if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){d.classList.add('reveal-on');setTimeout(function(){var a=document.querySelectorAll('.reveal-scroll');for(var i=0;i<a.length;i++){a[i].classList.add('is-visible')}},2500)}}catch(e){}})()",
          }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          // Escapa "<" (→ <) pra que nenhum valor consiga fechar o
          // <script> e injetar código (defesa preventiva: hoje o jsonLd é
          // 100% estático, mas fica seguro se um dia usar dado do banco).
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ServiceWorkerRegister />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
