import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-preto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
