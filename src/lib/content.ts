// Carregador de conteúdo do site.
// Lê o conteúdo editável do Supabase (tabela site_studiomova_configuracoes)
// e mescla por cima dos valores padrão de `site` (src/lib/site.ts). Se o
// Supabase não estiver configurado ou a linha não existir, cai de volta
// para os padrões do código.
import { site } from "./site";
import { createClient, supabaseConfigurado } from "./supabase/server";

export type SiteContent = typeof site;

function ehObjetoPuro(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

// Merge PROFUNDO: objetos são mesclados recursivamente (o override do banco
// atualiza/preenche campos, mantendo os que só existem no código); arrays e
// valores simples do banco SUBSTITUEM os do código. Assim, editar uma seção
// no admin não "congela" a seção inteira contra campos novos adicionados
// depois no código.
function mergeProfundo<T>(base: T, over: unknown): T {
  if (!ehObjetoPuro(base) || !ehObjetoPuro(over)) {
    return over === undefined ? base : (over as T);
  }
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) {
    out[k] = mergeProfundo((base as Record<string, unknown>)[k], v);
  }
  return out as T;
}

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
