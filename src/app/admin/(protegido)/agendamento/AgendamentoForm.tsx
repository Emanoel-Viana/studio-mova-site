"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { salvarConteudo } from "../../actions";

export function AgendamentoForm({ calUrlInicial }: { calUrlInicial: string }) {
  const [calUrl, setCalUrl] = useState(calUrlInicial);
  const [pendente, iniciar] = useTransition();
  const [msg, setMsg] = useState<{ ok?: boolean; erro?: string } | null>(null);

  function salvar() {
    setMsg(null);
    iniciar(async () => {
      const r = await salvarConteudo({ agendamento: { calUrl: calUrl.trim() } });
      setMsg(r);
    });
  }

  return (
    <div className="grid gap-5 max-w-2xl">
      <div className="rounded-2xl bg-white border border-[#DDEDE3] p-6">
        <label className="block font-semibold mb-1.5 text-sm">
          Link do Cal.com
        </label>
        <input
          value={calUrl}
          onChange={(e) => setCalUrl(e.target.value)}
          placeholder="https://cal.com/studio-mova/avaliacao"
          inputMode="url"
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-2 focus:ring-verde/30"
        />
        <p className="text-sm text-cinza mt-3">
          Pode colar a URL completa (ex.:{" "}
          <span className="font-mono">https://cal.com/seu-usuario/avaliacao</span>
          ) ou só <span className="font-mono">seu-usuario/avaliacao</span>.
        </p>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={salvar}
          disabled={pendente}
          className="btn btn-verde disabled:opacity-60"
        >
          {pendente ? "Salvando…" : "Salvar alterações"}
        </button>
        {msg?.ok && (
          <span className="inline-flex items-center gap-1.5 text-verde-medio font-medium">
            <Check size={18} aria-hidden /> Salvo! O site já foi atualizado.
          </span>
        )}
        {msg?.erro && (
          <span className="text-coral-escuro bg-[#F7E4E0] rounded-lg px-3 py-1.5 text-sm">
            {msg.erro}
          </span>
        )}
      </div>
    </div>
  );
}
