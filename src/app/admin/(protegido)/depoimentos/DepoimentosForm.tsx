"use client";

import { useState, useTransition } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { salvarConteudo } from "../../actions";

type Item = { texto: string; autor: string };

export function DepoimentosForm({ itensIniciais }: { itensIniciais: Item[] }) {
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
    setItens((a) => [...a, { texto: "", autor: "" }]);
  }

  function salvar() {
    setMsg(null);
    const depoimentos = itens
      .filter((d) => d.texto.trim() && d.autor.trim())
      .map((d) => ({ texto: d.texto.trim(), autor: d.autor.trim() }));
    iniciar(async () => {
      const r = await salvarConteudo({ depoimentos });
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
              Depoimento {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remover(i)}
              aria-label="Remover depoimento"
              className="grid place-items-center w-9 h-9 rounded-lg text-coral-escuro hover:bg-[#F7E4E0] transition-colors"
            >
              <Trash2 size={17} aria-hidden />
            </button>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="block font-semibold mb-1.5 text-sm">Texto</label>
              <textarea
                value={d.texto}
                onChange={(e) => atualizar(i, "texto", e.target.value)}
                rows={3}
                className={campo}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1.5 text-sm">Autor</label>
              <input
                value={d.autor}
                onChange={(e) => atualizar(i, "autor", e.target.value)}
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
        <Plus size={18} aria-hidden /> Adicionar depoimento
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
