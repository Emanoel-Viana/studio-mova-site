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
// Se o segredo não estiver configurado, a verificação é pulada — assim o
// formulário continua funcionando antes das chaves serem definidas.
async function verificarCaptcha(token: string): Promise<boolean> {
  const SECRET = process.env.TURNSTILE_SECRET_KEY;
  if (!SECRET) return true; // captcha ainda não configurado
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
  const nome = dados.nome?.trim();
  const assunto = dados.assunto?.trim();
  const mensagem = dados.mensagem?.trim();

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
