"use client";

import { useState, useTransition } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { salvarConteudo } from "../../actions";

type Item = { titulo: string; desc: string; imagem: string; emBreve: boolean };

const classeCampo =
  "w-full px-3.5 py-2.5 rounded-lg border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-2 focus:ring-verde/30";

export function ModalidadesForm({ itensIniciais }: { itensIniciais: Item[] }) {
  const [itens, setItens] = useState<Item[]>(itensIniciais);
  const [pendente, iniciar] = useTransition();
  const [msg, setMsg] = useState<{ ok?: boolean; erro?: string } | null>(null);

  function atualizar(i: number, campo: keyof Item, valor: string | boolean) {
    setItens((a) =>
      a.map((m, idx) => (idx === i ? { ...m, [campo]: valor } : m)),
    );
  }
  function remover(i: number) {
    setItens((a) => a.filter((_, idx) => idx !== i));
  }
  function adicionar() {
    setItens((a) => [
      ...a,
      { titulo: "", desc: "", imagem: "", emBreve: false },
    ]);
  }

  function salvar() {
    setMsg(null);
    const modalidades = itens
      .filter((m) => m.titulo.trim())
      .map((m) => ({
        titulo: m.titulo.trim(),
        desc: m.desc.trim(),
        imagem: m.imagem,
        emBreve: m.emBreve,
      }));
    iniciar(async () => {
      const r = await salvarConteudo({ modalidades });
      setMsg(r);
    });
  }

  return (
    <div className="grid gap-4">
      {itens.map((m, i) => (
        <div key={i} className="rounded-2xl bg-white border border-[#DDEDE3] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-bold text-cinza">
              Modalidade {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remover(i)}
              aria-label="Remover modalidade"
              className="grid place-items-center w-9 h-9 rounded-lg text-coral-escuro hover:bg-[#F7E4E0] transition-colors"
            >
              <Trash2 size={17} aria-hidden />
            </button>
          </div>
          <div className="grid gap-4">
            <div>
              <label className="block font-semibold mb-1.5 text-sm">Título</label>
              <input
                value={m.titulo}
                onChange={(e) => atualizar(i, "titulo", e.target.value)}
                className={classeCampo}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1.5 text-sm">
                Descrição
              </label>
              <textarea
                value={m.desc}
                onChange={(e) => atualizar(i, "desc", e.target.value)}
                rows={2}
                className={classeCampo}
              />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={m.emBreve}
                onChange={(e) => atualizar(i, "emBreve", e.target.checked)}
                className="w-5 h-5 accent-verde"
              />
              <span className="font-medium">
                Marcar como <span className="text-coral-escuro">“Em breve”</span>
              </span>
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={adicionar}
        className="inline-flex items-center gap-1.5 justify-self-start text-verde-medio font-semibold hover:underline"
      >
        <Plus size={18} aria-hidden /> Adicionar modalidade
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
