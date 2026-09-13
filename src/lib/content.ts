// Carregador de conteúdo do site.
// Lê o conteúdo editável do Supabase (tabela site_studiomova_configuracoes)
// e mescla por cima dos valores padrão de `site` (src/lib/site.ts). Se o
// Supabase não estiver configurado ou a linha não existir, cai de volta
// para os padrões do código.
import { site } from "./site";
import { createClient, supabaseConfigurado } from "./supabase/server";
import { mergeProfundo } from "./merge";

export type SiteContent = typeof site;

// Re-exporta pra manter o caminho de import `@/lib/content` (a lógica pura vive
// em `merge.ts`, testável sem o cliente Supabase).
export { mergeProfundo };

export async function getContent(): Promise<SiteContent> {
  if (!supabaseConfigurado) return site;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_studiomova_configuracoes")
      .select("content")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data?.content) return site;

    return mergeProfundo(site, data.content as Partial<SiteContent>);
  } catch {
    return site;
  }
}
