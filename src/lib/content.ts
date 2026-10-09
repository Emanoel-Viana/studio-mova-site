// Carregador de conteúdo do site.
// Lê o conteúdo editável do Supabase (tabela site_studiomova_configuracoes)
// e mescla por cima dos valores padrão de `site` (src/lib/site.ts). Se o
// Supabase não estiver configurado ou a linha não existir, cai de volta
// para os padrões do código.
import { cache } from "react";
import { site } from "./site";
import { createClient, supabaseConfigurado } from "./supabase/server";
import { mergeProfundo } from "./merge";

export type SiteContent = typeof site;

// Re-exporta pra manter o caminho de import `@/lib/content` (a lógica pura vive
// em `merge.ts`, testável sem o cliente Supabase).
export { mergeProfundo };

// `cache()` do React: dedupe por request — as várias chamadas de `getContent()`
// numa mesma renderização (layout raiz p/ JSON-LD, layout do site p/ Header e a
// própria página) colapsam em UMA leitura do Supabase, e todas veem o MESMO
// conteúdo (sem divergência intra-request).
export const getContent = cache(async (): Promise<SiteContent> => {
  if (!supabaseConfigurado) return site;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_studiomova_configuracoes")
      .select("content")
      .eq("id", 1)
      // Sem repetição automática (o postgrest-js reenvia até 3× em 503/520,
      // esperando 1s+2s+4s) e com teto de 2,5s: se o banco Free engasgar, a
      // página cai no conteúdo padrão RÁPIDO em vez de pendurar a renderização.
      .abortSignal(AbortSignal.timeout(2500))
      .retry(false)
      .maybeSingle();

    // Falha do banco NÃO pode ser silenciosa: sem log, ninguém percebe que o
    // site está servindo os valores do código (preços/horários) no lugar do
    // que foi editado no admin.
    if (error) {
      console.error("getContent: falha ao ler do Supabase:", error.message);
      return site;
    }
    if (!data?.content) return site;

    return mergeProfundo(site, data.content as Partial<SiteContent>);
  } catch (e) {
    console.error(
      "getContent: exceção ao ler conteúdo (usando padrão do código):",
      e instanceof Error ? e.message : e,
    );
    return site;
  }
});
