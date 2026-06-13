"use client";

import { useState } from "react";
import { waLink } from "@/lib/site";
import { createClient, supabaseConfigurado } from "@/lib/supabase/client";

const assuntos = [
  "Agendar sessão avaliativa",
  "Dúvida sobre planos",
  "Wellhub / TotalPass",
  "Outro assunto",
];

export function FormContato() {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState(assuntos[0]);
  const [mensagem, setMensagem] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();

    // Registra o contato no banco (sem bloquear a abertura do WhatsApp).
    if (supabaseConfigurado) {
      const supabase = createClient();
      void supabase
        .from("leads")
        .insert({ nome, assunto, mensagem: mensagem || null })
        .then(({ error }) => {
          if (error) console.error("Falha ao registrar lead:", error.message);
        });
    }

    const texto =
      `Olá! Meu nome é ${nome}. Assunto: ${assunto}.` +
      (mensagem ? ` ${mensagem}` : "");
    window.open(waLink(texto), "_blank", "noopener");
  }

  const campo =
    "w-full px-4 py-3.5 rounded-xl border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-3 focus:ring-verde/30";

  return (
    <form onSubmit={enviar} className="grid gap-5 max-w-xl">
      <div>
        <label htmlFor="nome" className="block font-semibold mb-1.5">
          Seu nome
        </label>
        <input
          id="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={campo}
          placeholder="Como podemos te chamar?"
        />
      </div>

      <div>
        <label htmlFor="assunto" className="block font-semibold mb-1.5">
          Assunto
        </label>
        <select
          id="assunto"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          className={campo}
        >
          {assuntos.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className="block font-semibold mb-1.5">
          Mensagem{" "}
          <span className="font-normal text-cinza">(opcional)</span>
        </label>
        <textarea
          id="mensagem"
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className={campo}
          placeholder="Conte o que você precisa…"
        />
      </div>

      <button type="submit" className="btn btn-coral justify-self-start text-lg">
        Enviar pelo WhatsApp
      </button>
      <p className="text-sm text-cinza">
        Ao enviar, abrimos o WhatsApp com sua mensagem já pronta. Você confere e
        manda. 💚
      </p>
    </form>
  );
}
