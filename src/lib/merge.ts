// Merge PROFUNDO — lógica pura (sem IO), usada tanto na LEITURA do conteúdo
// (getContent) quanto na ESCRITA do admin (salvarConteudo). Fica isolada aqui
// pra ser testável sem puxar o cliente Supabase.
//
// Regra: objetos são mesclados recursivamente (o override atualiza/preenche
// campos, mantendo os que só existem na base); arrays e valores simples do
// override SUBSTITUEM os da base. `undefined` no override mantém a base.

export function ehObjetoPuro(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function mergeProfundo<T>(base: T, over: unknown): T {
  if (!ehObjetoPuro(base) || !ehObjetoPuro(over)) {
    return over === undefined ? base : (over as T);
  }
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) {
    out[k] = mergeProfundo((base as Record<string, unknown>)[k], v);
  }
  return out as T;
}
