"use server";

import { createClient, supabaseConfigurado } from "@/lib/supabase/server";

type Payload = {
  nome: string;
  telefone: string;
  assunto: string;
  mensagem: string;
  token: string;
};

export type ResultadoContato =
  | { ok: true }
  | { ok: false; erro: string };

// Confere o token do Turnstile junto ao Cloudflare (siteverify).
// Regra do segredo ausente:
//   - se a SITE key existe, o captcha DEVERIA estar ativo → config quebrada
//     → RECUSA (fail-closed), pra não desligar o anti-spam silenciosamente;
//   - se nem a SITE key existe, o captcha está intencionalmente desligado
//     (fallback "antes das chaves") → segue.
async function verificarCaptcha(token: string): Promise<boolean> {
  const SECRET = process.env.TURNSTILE_SECRET_KEY;
  if (!SECRET) {
    if (process.env.TURNSTILE_SITE_KEY) {
      console.error(
        "Turnstile mal configurado (contato): SITE key presente, SECRET ausente — recusando.",
      );
      return false;
    }
    return true; // captcha intencionalmente desligado
  }
  if (!token) return false;

  try {
    const resp = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: SECRET, response: token }),
      },
    );
    const dados = (await resp.json()) as { success?: boolean };
    return dados.success === true;
  } catch {
    return false;
  }
}

// Avisa o studio na hora de um novo lead (WhatsApp via n8n), pra ninguém
// depender de abrir o painel /admin/leads. Best-effort: NUNCA trava a resposta
// ao visitante nem depende do banco (o lead chega mesmo se a gravação falhar).
// Ativa quando `N8N_LEAD_WEBHOOK_URL` estiver configurada no ambiente.
async function notificarLead(lead: {
  nome: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}): Promise<void> {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!url) return;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        origem: "site",
        recebido_em: new Date().toISOString(),
      }),
      signal: ctrl.signal,
    });
  } catch (e) {
    console.error(
      "Falha ao notificar lead (n8n):",
      e instanceof Error ? e.message : e,
    );
  } finally {
    clearTimeout(timer);
  }
}

export async function enviarContato(
  dados: Payload,
): Promise<ResultadoContato> {
  // Limita o tamanho no servidor (o cliente é só UI — a action pode ser
  // chamada direto). Evita payloads gigantes e abuso de armazenamento.
  const nome = dados.nome?.trim().slice(0, 120);
  const telefone = dados.telefone?.trim().slice(0, 25);
  const assunto = dados.assunto?.trim().slice(0, 80);
  const mensagem = dados.mensagem?.trim().slice(0, 2000);

  if (!nome) return { ok: false, erro: "Informe seu nome." };
  // Exige um telefone com pelo menos 10 dígitos (DDD + número).
  if (!telefone || telefone.replace(/\D/g, "").length < 10) {
    return { ok: false, erro: "Informe um telefone/WhatsApp válido com DDD." };
  }

  const captchaOk = await verificarCaptcha(dados.token);
  if (!captchaOk) {
    return {
      ok: false,
      erro: "Não conseguimos confirmar que você é humano. Tente de novo.",
    };
  }

  // Registra o lead (sem travar caso o banco não esteja configurado).
  if (supabaseConfigurado) {
    const supabase = await createClient();
    let { error } = await supabase
      .from("site_studiomova_leads_contato")
      .insert({ nome, telefone, assunto, mensagem: mensagem || null });
    // PGRST204 = coluna não encontrada no schema cache (ex.: `telefone` ainda
    // não existe no banco). Regrava sem ela pra NÃO perder o lead. Uso o
    // CÓDIGO do erro (estável), não a mensagem em inglês do driver.
    if (error && error.code === "PGRST204") {
      ({ error } = await supabase
        .from("site_studiomova_leads_contato")
        .insert({ nome, assunto, mensagem: mensagem || null }));
    }
    if (error) console.error("Falha ao registrar lead:", error.message);
  }

  // Notifica o studio na hora — mesmo que a gravação acima tenha falhado, o
  // lead chega a um humano (fecha o "loop do lead").
  await notificarLead({ nome, telefone, assunto, mensagem });

  return { ok: true };
}
