"use client";

import { useState, useTransition } from "react";
import { Check, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { salvarConteudo } from "../../actions";

type Item = { q: string; a: string };

export function FaqForm({ itensIniciais }: { itensIniciais: Item[] }) {
  const [itens, setItens] = useState<Item[]>(itensIniciais);
  const [pendente, iniciar] = useTransition();
  const [msg, setMsg] = useState<{ ok?: boolean; erro?: string } | null>(null);

  function atualizar(i: number, campo: keyof Item, valor: string) {
    setItens((a) => a.map((d, idx) => (idx === i ? { ...d, [campo]: valor } : d)));
  }
  function remover(i: number) {
    setItens((a) => a.filter((_, idx) => idx !== i));
  }
  function adicionar() {
    setItens((a) => [...a, { q: "", a: "" }]);
  }
  function mover(i: number, dir: -1 | 1) {
    setItens((a) => {
      const j = i + dir;
      if (j < 0 || j >= a.length) return a;
      const next = [...a];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function salvar() {
    setMsg(null);
    const faq = itens
      .filter((d) => d.q.trim() && d.a.trim())
      .map((d) => ({ q: d.q.trim(), a: d.a.trim() }));
    iniciar(async () => {
      const r = await salvarConteudo({ faq });
      setMsg(r);
    });
  }

  const campo =
    "w-full px-3.5 py-2.5 rounded-lg border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-2 focus:ring-verde/30";

  return (
    <div className="grid gap-4">
      {itens.map((d, i) => (
        <div key={i} className="rounded-2xl bg-white border border-[#DDEDE3] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-bold text-cinza">
              Pergunta {i + 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => mover(i, -1)}
                disabled={i === 0}
                aria-label="Mover para cima"
                className="grid place-items-center w-9 h-9 rounded-lg text-cinza hover:bg-cinza-claro transition-colors disabled:opacity-30"
              >
                <ArrowUp size={17} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => mover(i, 1)}
                disabled={i === itens.length - 1}
                aria-label="Mover para baixo"
                className="grid place-items-center w-9 h-9 rounded-lg text-cinza hover:bg-cinza-claro transition-colors disabled:opacity-30"
              >
                <ArrowDown size={17} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => remover(i)}
                aria-label="Remover pergunta"
                className="grid place-items-center w-9 h-9 rounded-lg text-coral-escuro hover:bg-[#F7E4E0] transition-colors"
              >
                <Trash2 size={17} aria-hidden />
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="block font-semibold mb-1.5 text-sm">
                Pergunta
              </label>
              <input
                value={d.q}
                onChange={(e) => atualizar(i, "q", e.target.value)}
                className={campo}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1.5 text-sm">
                Resposta
              </label>
              <textarea
                value={d.a}
                onChange={(e) => atualizar(i, "a", e.target.value)}
                rows={4}
                className={campo}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={adicionar}
        className="inline-flex items-center gap-1.5 justify-self-start text-verde-medio font-semibold hover:underline"
      >
        <Plus size={18} aria-hidden /> Adicionar pergunta
      </button>

      <div className="flex items-center gap-4 flex-wrap mt-2 sticky bottom-4 bg-cinza-claro/80 backdrop-blur rounded-xl p-3 -mx-3">
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
