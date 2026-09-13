import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { site } from "@/lib/site";
import { getContent } from "@/lib/content";
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

// Converte os horários de funcionamento (`site.horarios`, em texto tipo
// "06h às 20h") para o formato schema.org (HH:MM por dia). Assim o dado
// estruturado do Google fica atrelado à FONTE ÚNICA (não duplica no código).
const DIAS_SCHEMA: Record<string, string> = {
  segunda: "Monday",
  terça: "Tuesday",
  terca: "Tuesday",
  quarta: "Wednesday",
  quinta: "Thursday",
  sexta: "Friday",
  sábado: "Saturday",
  sabado: "Saturday",
  domingo: "Sunday",
};
function horariosParaSchema(
  horarios: readonly { dias: string; faixas: readonly string[] }[],
) {
  const specs: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[] = [];
  for (const h of horarios) {
    const dias = h.dias
      .toLowerCase()
      .split(/,|\se\s/)
      .map((d) => DIAS_SCHEMA[d.trim().replace(/\.$/, "")])
      .filter(Boolean);
    if (!dias.length) continue;
    for (const faixa of h.faixas) {
      const m = faixa.match(/(\d{1,2})h?\s*(?:às|as|-)\s*(\d{1,2})h?/i);
      if (!m) continue; // "Fechado" e afins são ignorados
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dias,
        opens: `${m[1].padStart(2, "0")}:00`,
        closes: `${m[2].padStart(2, "0")}:00`,
      });
    }
  }
  return specs;
}

// Monta o dado estruturado (schema.org) a partir do conteúdo ATUAL do site
// (getContent = padrões + edições do admin). Antes era estático e desacoplava
// do que o admin edita.
function montarJsonLd(c: Awaited<ReturnType<typeof getContent>>) {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: c.nome,
    slogan: c.slogan,
    url: c.url,
    image: `${c.url}/fotos/galeria/studio-mova-43.jpg`,
    logo: `${c.url}/marca/icon-512.png`,
    telephone: `+${c.contato.whatsapp}`,
    email: c.contato.email,
    priceRange: "R$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${c.endereco.linha1}, ${c.endereco.linha2}`,
      addressLocality: "Brasília",
      addressRegion: "DF",
      postalCode: c.endereco.cep,
      addressCountry: "BR",
    },
    openingHoursSpecification: horariosParaSchema(c.horarios),
    // Nota agregada = a do Google (5,0), mostrada em destaque na página.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: c.avaliacaoGoogle.nota.replace(",", "."),
      reviewCount: c.avaliacaoGoogle.total,
      bestRating: "5",
      worstRating: "1",
    },
    // Avaliações reais (Google) — pro Google poder exibir estrelas na busca.
    review: c.depoimentos.map((d) => ({
      "@type": "Review",
      author: { "@type": "Person", name: d.autor },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: d.texto,
    })),
    sameAs: [c.contato.instagramUrl, ...c.parcerias.map((p) => p.url)],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Nonce gerado pelo proxy.ts — libera SÓ os nossos scripts inline sob a CSP.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  // Dado estruturado montado com o conteúdo ATUAL (padrões + edições do admin).
  const jsonLd = montarJsonLd(await getContent());

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
          // <script> e injetar código. IMPORTANTE agora que o jsonLd vem do
          // getContent() (conteúdo editável do banco), não mais estático.
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
