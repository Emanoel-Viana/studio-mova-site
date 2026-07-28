import { NextResponse } from "next/server";
import { createClient, supabaseConfigurado } from "@/lib/supabase/server";

// Health check p/ monitoramento de uptime (UptimeRobot) — 2º projeto Supabase (site + GABI).
// 200 = app + banco OK · 503 = banco fora/pausado → dispara alerta.
// O ping bate no banco via supabase-js (HTTP/PostgREST) — NÃO abre conexão direta, então
// serve de keep-alive (impede a pausa do Free) SEM estourar o limite de conexões do plano.
// Não expõe nenhum dado (só um count com head, sem corpo).
export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabaseConfigurado) {
    return NextResponse.json({ ok: false, erro: "config" }, { status: 503 });
  }
  const inicio = Date.now();
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("site_studiomova_configuracoes")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return NextResponse.json({ ok: true, ts: new Date().toISOString(), db_ms: Date.now() - inicio });
  } catch (e) {
    return NextResponse.json({ ok: false, erro: e instanceof Error ? e.message : "db" }, { status: 503 });
  }
}
