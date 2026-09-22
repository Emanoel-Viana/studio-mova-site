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
const ORDEM_DIAS = [
  "segunda",
  "terça",
  "quarta",
  "quinta",
  "sexta",
  "sábado",
  "domingo",
];
function normalizarDia(d: string): string {
  return d
    .trim()
    .replace(/\.$/, "")
    .replace(/^terca$/, "terça")
    .replace(/^sabado$/, "sábado")
    .replace(/-feira$/, "");
}
// "Segunda, Quarta e Sexta" → [Mon, Wed, Fri]; "Segunda a Sexta" → [Mon..Fri].
function diasParaSchema(texto: string): string[] {
  const dias: string[] = [];
  for (let parte of texto.toLowerCase().split(/,|\se\s/)) {
    parte = parte.trim();
    const range = parte.match(/^(.+?)\s+(?:a|à|às|até|-|–|—)\s+(.+)$/);
    if (range) {
      const ini = ORDEM_DIAS.indexOf(normalizarDia(range[1]));
      const fim = ORDEM_DIAS.indexOf(normalizarDia(range[2]));
      if (ini >= 0 && fim >= ini) {
        for (let i = ini; i <= fim; i++) dias.push(ORDEM_DIAS[i]);
        continue;
      }
    }
    dias.push(normalizarDia(parte));
  }
  return dias.map((d) => DIAS_SCHEMA[d]).filter(Boolean);
}
// "06h às 20h" → 06:00–20:00; "06h30 às 20h" → 06:30–20:00; valida 0-23/0-59.
function faixaParaHoras(
  faixa: string,
): { opens: string; closes: string } | null {
  const m = faixa.match(
    /(\d{1,2})\s*h?\s*(\d{2})?\s*(?:às|as|-|–|—|até)\s*(\d{1,2})\s*h?\s*(\d{2})?/i,
  );
  if (!m) return null; // "Fechado" e afins são ignorados
  const h1 = +m[1],
    min1 = m[2] ? +m[2] : 0,
    h2 = +m[3],
    min2 = m[4] ? +m[4] : 0;
  if (h1 > 23 || h2 > 23 || min1 > 59 || min2 > 59) return null;
  const fmt = (h: number, mm: number) =>
    `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  return { opens: fmt(h1, min1), closes: fmt(h2, min2) };
}
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
    const dias = diasParaSchema(h.dias);
    if (!dias.length) continue;
    for (const faixa of h.faixas) {
      const horas = faixaParaHoras(faixa);
      if (!horas) continue;
      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dias,
        ...horas,
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
    image: `${c.url}/fotos/galeria/studio-mova-43-og.jpg`,
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
