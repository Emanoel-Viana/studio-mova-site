"use client";

import { useState, useTransition } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { salvarConteudo } from "../../actions";

type Linha = { dias: string; faixas: string };

export function HorariosForm({ linhasIniciais }: { linhasIniciais: Linha[] }) {
  const [linhas, setLinhas] = useState<Linha[]>(linhasIniciais);
  const [pendente, iniciar] = useTransition();
  const [msg, setMsg] = useState<{ ok?: boolean; erro?: string } | null>(null);

  function atualizar(i: number, campo: keyof Linha, valor: string) {
    setLinhas((a) =>
      a.map((l, idx) => (idx === i ? { ...l, [campo]: valor } : l)),
    );
  }
  function remover(i: number) {
    setLinhas((a) => a.filter((_, idx) => idx !== i));
  }
  function adicionar() {
    setLinhas((a) => [...a, { dias: "", faixas: "" }]);
  }

  function salvar() {
    setMsg(null);
    const horarios = linhas
      .filter((l) => l.dias.trim())
      .map((l) => ({
        dias: l.dias.trim(),
        faixas: l.faixas
          .split(/[•;]/)
          .map((f) => f.trim())
          .filter(Boolean),
      }));
    iniciar(async () => {
      const r = await salvarConteudo({ horarios });
      setMsg(r);
    });
  }

  const campo =
    "w-full px-3.5 py-2.5 rounded-lg border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-2 focus:ring-verde/30";

  return (
    <div className="grid gap-4">
      {linhas.map((l, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white border border-[#DDEDE3] p-5 grid sm:grid-cols-[1fr_1.4fr_auto] gap-4 items-end"
        >
          <div>
            <label className="block font-semibold mb-1.5 text-sm">Dias</label>
            <input
              value={l.dias}
              onChange={(e) => atualizar(i, "dias", e.target.value)}
              placeholder="Segunda, Quarta e Sexta"
              className={campo}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1.5 text-sm">
              Faixas de horário
            </label>
            <input
              value={l.faixas}
              onChange={(e) => atualizar(i, "faixas", e.target.value)}
              placeholder="06h às 20h"
              className={campo}
            />
          </div>
          <button
            type="button"
            onClick={() => remover(i)}
            aria-label="Remover linha"
            className="grid place-items-center w-11 h-11 rounded-lg text-coral-escuro hover:bg-[#F7E4E0] transition-colors"
          >
            <Trash2 size={18} aria-hidden />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={adicionar}
        className="inline-flex items-center gap-1.5 justify-self-start text-verde-medio font-semibold hover:underline"
      >
        <Plus size={18} aria-hidden /> Adicionar dia
      </button>

      <div className="flex items-center gap-4 flex-wrap mt-2">
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
