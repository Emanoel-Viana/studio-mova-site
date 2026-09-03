"use server";

import { createClient, supabaseConfigurado } from "@/lib/supabase/server";

type Payload = {
  nome: string;
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

export async function enviarContato(
  dados: Payload,
): Promise<ResultadoContato> {
  // Limita o tamanho no servidor (o cliente é só UI — a action pode ser
  // chamada direto). Evita payloads gigantes e abuso de armazenamento.
  const nome = dados.nome?.trim().slice(0, 120);
  const assunto = dados.assunto?.trim().slice(0, 80);
  const mensagem = dados.mensagem?.trim().slice(0, 2000);

  if (!nome) return { ok: false, erro: "Informe seu nome." };

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
    const { error } = await supabase
      .from("site_studiomova_leads_contato")
      .insert({ nome, assunto, mensagem: mensagem || null });
    if (error) console.error("Falha ao registrar lead:", error.message);
  }

  return { ok: true };
}
