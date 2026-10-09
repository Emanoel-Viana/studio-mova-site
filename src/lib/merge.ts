// Merge PROFUNDO + validação de forma — lógica pura (sem IO), usada na LEITURA
// do conteúdo (getContent) e na ESCRITA do admin (salvarConteudo). Isolada aqui
// pra ser testável sem puxar o cliente Supabase.
//
// Regra do merge: objetos são mesclados recursivamente (o override
// atualiza/preenche campos, mantendo os que só existem na base); arrays e
// valores simples do override SUBSTITUEM os da base. `undefined` mantém a base.

// Chaves que poluiriam o protótipo se atribuídas via colchete num objeto puro.
const CHAVES_PERIGOSAS = new Set(["__proto__", "constructor", "prototype"]);

export function ehObjetoPuro(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function mergeProfundo<T>(base: T, over: unknown): T {
  if (!ehObjetoPuro(base) || !ehObjetoPuro(over)) {
    return over === undefined ? base : (over as T);
  }
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) {
    // Anti prototype-pollution na LEITURA: dados do banco (JSON.parse) podem
    // trazer "__proto__" como chave própria; `out["__proto__"] = ...` mexeria
    // no protótipo em vez de criar uma propriedade. Ignora essas chaves.
    if (CHAVES_PERIGOSAS.has(k)) continue;
    out[k] = mergeProfundo((base as Record<string, unknown>)[k], v);
  }
  return out as T;
}

// Barreira anti-corrupção do conteúdo: confere, recursivamente, que cada chave
// do patch tem a MESMA "forma" (array/objeto/tipo do primitivo) da mesma chave
// nos padrões (`site`). Um payload torto (array virar string, número virar
// null…) é RECUSADO antes de gravar, em vez de quebrar o site público.
// Chaves novas (que não existem nos padrões) são permitidas.
export function formaCoerente(over: unknown, base: unknown): boolean {
  if (Array.isArray(base) || Array.isArray(over)) {
    if (Array.isArray(base) !== Array.isArray(over)) return false;
    // Valida CADA item do patch contra a forma-modelo (1º item dos padrões).
    const modelo = (base as unknown[])[0];
    if (modelo === undefined) return true; // sem modelo pra comparar
    return (over as unknown[]).every((item) => formaCoerente(item, modelo));
  }
  const baseObj = base !== null && typeof base === "object";
  const overObj = over !== null && typeof over === "object";
  if (baseObj !== overObj) return false;

  if (!baseObj) {
    // Aqui os dois são primitivos (string/number/boolean/null/undefined).
    if (base === null || base === undefined) return true; // base não fixa o tipo
    if (over === undefined) return true; // mantém a base
    if (over === null) return false; // null explícito quebra .replace/render
    return typeof over === typeof base; // string↔string, number↔number…
  }

  const b = base as Record<string, unknown>;
  const o = over as Record<string, unknown>;
  for (const [k, v] of Object.entries(o)) {
    if (CHAVES_PERIGOSAS.has(k)) return false; // anti prototype-pollution
    if (k in b && !formaCoerente(v, b[k])) return false;
  }
  return true;
}
