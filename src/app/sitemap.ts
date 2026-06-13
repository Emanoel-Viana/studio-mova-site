import type { MetadataRoute } from "next";
import { site, navegacao } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return navegacao.map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    lastModified: agora,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
