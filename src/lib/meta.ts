// Helper de metadados por página.
// No Next 16 o `metadata` é mesclado de forma RASA: quando uma página define
// `openGraph`, ele SUBSTITUI o do layout inteiro — e a página perde a imagem
// de compartilhamento, o `url`, o `locale` e o `type`. Este helper devolve um
// `openGraph` COMPLETO (com a imagem `/opengraph-image`) + o `canonical`, pra
// cada página compartilhar direito no WhatsApp/Facebook e apontar pra si mesma.
import type { Metadata } from "next";

export function metaPagina(opts: {
  titulo: string; // título curto do cartão (ex.: "Planos — Studio MOVA")
  descricao: string;
  caminho: string; // rota canônica, ex.: "/planos"
}): Pick<Metadata, "openGraph" | "alternates"> {
  return {
    alternates: { canonical: opts.caminho },
    openGraph: {
      title: opts.titulo,
      description: opts.descricao,
      url: opts.caminho,
      locale: "pt_BR",
      type: "website",
      // metadataBase (definido no layout) torna esta URL relativa absoluta.
      images: ["/opengraph-image"],
    },
  };
}
