import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Web App Manifest — torna o site instalável ("adicionar à tela inicial").
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.nome} — Academia boutique na Asa Norte`,
    short_name: site.nome,
    description: site.descricao,
    lang: "pt-BR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#14532d",
    theme_color: "#14532d",
    categories: ["health", "fitness", "lifestyle"],
    icons: [
      {
        src: "/marca/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/marca/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/marca/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/marca/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
