"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type EstadoLogin = { erro?: string };

// Confere o token do Turnstile no Cloudflare. Se o segredo não estiver
// configurado, pula (fail-open) — o login ainda exige e-mail/senha corretos.
async function verificarTurnstile(token: string): Promise<boolean> {
  const SECRET = process.env.TURNSTILE_SECRET_KEY;
  if (!SECRET) return true;
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

export async function entrar(
  _prev: EstadoLogin,
  formData: FormData,
): Promise<EstadoLogin> {
  const email = String(formData.get("email") ?? "").trim();
  const senha = String(formData.get("senha") ?? "");

  if (!email || !senha) {
    return { erro: "Preencha e-mail e senha." };
  }

  const captchaOk = await verificarTurnstile(
    String(formData.get("turnstileToken") ?? ""),
  );
  if (!captchaOk) {
    return { erro: "Verificação de segurança falhou. Recarregue a página e tente de novo." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    return { erro: "E-mail ou senha incorretos." };
  }

  redirect("/admin");
}

export async function sair() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export type EstadoSalvar = { ok?: boolean; erro?: string };

// Salva um patch parcial no conteúdo, preservando o que já existe.
export async function salvarConteudo(
  patch: Record<string, unknown>,
): Promise<EstadoSalvar> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { erro: "Sessão expirada. Faça login novamente." };

  const { data: atual } = await supabase
    .from("site_studiomova_configuracoes")
    .select("content")
    .eq("id", 1)
    .maybeSingle();

  const novoConteudo = { ...(atual?.content ?? {}), ...patch };

  // UPDATE (não upsert): a tabela só tem policy de UPDATE, não de INSERT — um
  // upsert tentaria inserir e a RLS bloquearia. O `.select("id")` devolve as
  // linhas afetadas: se vier vazio, a linha base não existe e avisamos em vez
  // de retornar "salvo" sem ter salvo (evita o salvamento fantasma).
  const { data: afetadas, error } = await supabase
    .from("site_studiomova_configuracoes")
    .update({ content: novoConteudo })
    .eq("id", 1)
    .select("id");

  if (error) return { erro: error.message };
  if (!afetadas || afetadas.length === 0) {
    return {
      erro: "Não foi possível salvar: registro base de conteúdo não encontrado. Avise o suporte.",
    };
  }

  // Atualiza o site público imediatamente.
  revalidatePath("/", "layout");
  return { ok: true };
}
