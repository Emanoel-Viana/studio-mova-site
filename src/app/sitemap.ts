import type { MetadataRoute } from "next";
import { site, navegacao } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // O sitemap é PRERENDERIZADO (estático), então esta data é fixada no BUILD
  // (= data do último deploy), não no momento em que o Googlebot busca. Como
  // todo deploy pode mudar conteúdo, "última modificação = último deploy" é um
  // valor legítimo (e o Google trata `lastmod` só como dica).
  const ultimoDeploy = new Date();
  const paginas = navegacao.map((item) => item.href);
  // /agendar é uma página real (sessão avaliativa) que não está no menu
  // `navegacao`, então ficava de fora do sitemap. Incluída explicitamente.
  if (!paginas.includes("/agendar")) paginas.push("/agendar");
  if (!paginas.includes("/privacidade")) paginas.push("/privacidade");
  return paginas.map((href) => ({
    url: `${site.url}${href === "/" ? "" : href}`,
    lastModified: ultimoDeploy,
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));
}
