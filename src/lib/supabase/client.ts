// Cliente Supabase para o NAVEGADOR (componentes "use client").
// Usado, por exemplo, na tela de login do admin.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// true quando as variáveis do Supabase estão configuradas.
export const supabaseConfigurado =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
