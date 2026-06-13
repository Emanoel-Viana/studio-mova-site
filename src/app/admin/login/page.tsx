"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { entrar, type EstadoLogin } from "../actions";

const estadoInicial: EstadoLogin = {};

export default function LoginAdmin() {
  const [estado, formAction, pendente] = useActionState(entrar, estadoInicial);

  const campo =
    "w-full px-4 py-3.5 rounded-xl border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-3 focus:ring-verde/30";

  return (
    <main className="min-h-screen grid place-items-center bg-verde-claro p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <span className="grid place-items-center w-11 h-11 rounded-xl bg-verde-escuro text-verde font-display font-black text-xl">
            M
          </span>
          <span className="font-display font-extrabold text-2xl text-verde-escuro">
            studioMOVA
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#DDEDE3] p-8 shadow-[0_18px_40px_rgba(30,155,94,0.10)]">
          <h1 className="flex items-center gap-2 text-2xl mb-1">
            <Lock size={22} className="text-verde-medio" aria-hidden />
            Painel administrativo
          </h1>
          <p className="text-cinza mb-6">
            Entre para editar o conteúdo do site.
          </p>

          <form action={formAction} className="grid gap-5">
            <div>
              <label htmlFor="email" className="block font-semibold mb-1.5">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={campo}
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="senha" className="block font-semibold mb-1.5">
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                autoComplete="current-password"
                required
                className={campo}
                placeholder="••••••••"
              />
            </div>

            {estado.erro && (
              <p
                role="alert"
                className="text-coral-escuro bg-[#F7E4E0] rounded-lg px-4 py-3 text-sm"
              >
                {estado.erro}
              </p>
            )}

            <button
              type="submit"
              disabled={pendente}
              className="btn btn-verde w-full disabled:opacity-60"
            >
              {pendente ? "Entrando…" : "Entrar"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-cinza mt-6">
          Studio MOVA · acesso restrito à administração
        </p>
      </div>
    </main>
  );
}
