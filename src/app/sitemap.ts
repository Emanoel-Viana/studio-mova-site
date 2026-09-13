import type { MetadataRoute } from "next";
import { site, navegacao } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // O sitemap é PRERENDERIZADO (estático), então esta data é fixada no BUILD
  // (= data do último deploy), não no momento em que o Googlebot busca. Como
  // todo deploy pode mudar conteúdo, "última modificação = último deploy" é um
  // valor legítimo (e o Google trata `lastmod` só como dica).
  const ultimoDeploy = new Date();
  return navegacao.map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified: ultimoDeploy,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
