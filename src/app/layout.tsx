import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { site } from "@/lib/site";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

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
  image: `${site.url}/fotos/galeria/studio-mova-43.jpg`,
  logo: `${site.url}/marca/icon-512.png`,
  telephone: `+${site.contato.whatsapp}`,
  email: site.contato.email,
  priceRange: "R$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.endereco.linha1}, ${site.endereco.linha2}`,
    addressLocality: "Brasília",
    addressRegion: "DF",
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  // Horários de funcionamento (schema.org, formato HH:MM por dia).
  // ⚠️ Se mudar `site.horarios`, atualizar aqui também.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Friday"],
      opens: "06:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Thursday"],
      opens: "06:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Thursday"],
      opens: "15:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "12:00",
    },
  ],
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
        {/* Aplica o tema salvo ANTES da tela pintar (evita "piscar" claro→escuro). */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('tema')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()",
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
        {children}
      </body>
    </html>
  );
}
