"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type EstadoLogin = { erro?: string };

export async function entrar(
  _prev: EstadoLogin,
  formData: FormData,
): Promise<EstadoLogin> {
  const email = String(formData.get("email") ?? "").trim();
  const senha = String(formData.get("senha") ?? "");

  if (!email || !senha) {
    return { erro: "Preencha e-mail e senha." };
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
    .from("site_settings")
    .select("content")
    .eq("id", 1)
    .maybeSingle();

  const novoConteudo = { ...(atual?.content ?? {}), ...patch };

  const { error } = await supabase
    .from("site_settings")
    .update({ content: novoConteudo })
    .eq("id", 1);

  if (error) return { erro: error.message };

  // Atualiza o site público imediatamente.
  revalidatePath("/", "layout");
  return { ok: true };
}
