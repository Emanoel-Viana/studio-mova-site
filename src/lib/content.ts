// Carregador de conteúdo do site.
// Lê o conteúdo editável do Supabase (tabela site_settings) e, se o
// Supabase não estiver configurado ou a linha não existir, cai de volta
// para os valores padrão de `site` (src/lib/site.ts). Assim o site
// continua funcionando durante toda a transição.
import { site } from "./site";
import { createClient, supabaseConfigurado } from "./supabase/server";

export type SiteContent = typeof site;

export async function getContent(): Promise<SiteContent> {
  if (!supabaseConfigurado) return site;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("content")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data?.content) return site;

    // Mescla o que veio do banco por cima dos padrões (nível superior).
    return { ...site, ...(data.content as Partial<SiteContent>) };
  } catch {
    return site;
  }
}
