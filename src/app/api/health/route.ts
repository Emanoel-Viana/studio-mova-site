import { NextResponse } from "next/server";
import { createClient, supabaseConfigurado } from "@/lib/supabase/server";

// Health check p/ monitoramento de uptime (UptimeRobot) — 2º projeto Supabase (site + GABI).
// 200 = app + banco OK · 503 = banco fora/pausado.
// Blindado: (1) ping via supabase-js (HTTP/PostgREST, sem conexão direta → serve de keep-alive
// sem estourar o limite de conexões do Free); (2) CACHE em memória (45s) — absorve floods sem
// quebrar o keep-alive (pings de 15–30 min sempre testam o banco); (3) TIMEOUT curto (4s).
export const dynamic = "force-dynamic";

let cache: { ts: number; body: Record<string, unknown>; status: number } | null = null;
const TTL_MS = 45_000;
const TIMEOUT_MS = 4_000;

export async function GET() {
  if (cache && Date.now() - cache.ts < TTL_MS) {
    return NextResponse.json({ ...cache.body, cache: true }, { status: cache.status });
  }
  if (!supabaseConfigurado) {
    return NextResponse.json({ ok: false, erro: "config" }, { status: 503 });
  }
  const inicio = Date.now();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("site_studiomova_configuracoes")
      .select("*", { count: "exact", head: true })
      .abortSignal(ctrl.signal);
    if (error) throw error;
    const body = { ok: true, ts: new Date().toISOString(), db_ms: Date.now() - inicio };
    cache = { ts: Date.now(), body, status: 200 };
    return NextResponse.json(body);
  } catch (e) {
    // Loga o detalhe no servidor, mas não expõe a mensagem interna na resposta.
    console.error("health: falha no banco:", e instanceof Error ? e.message : e);
    const body = { ok: false, erro: "db" };
    cache = { ts: Date.now(), body, status: 503 };
    return NextResponse.json(body, { status: 503 });
  } finally {
    clearTimeout(timer);
  }
}
