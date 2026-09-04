import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Não indexar a área administrativa nem as rotas de API.
      disallow: ["/admin", "/api"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
