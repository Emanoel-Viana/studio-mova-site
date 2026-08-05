"use client";

import { useState, useTransition } from "react";
import { Check, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { salvarConteudo } from "../../actions";

// beneficios fica como texto (1 por linha) pra facilitar a edição.
type Aula = {
  nome: string;
  duracao: string;
  capacidade: string;
  icone: string;
  descricao: string;
  beneficios: string;
};

const ICONES = [
  { v: "shield", label: "Escudo (core/estabilidade)" },
  { v: "wind", label: "Vento (alongamento/relax)" },
  { v: "person", label: "Pessoa (flexibilidade)" },
  { v: "activity", label: "Atividade (funcional)" },
  { v: "target", label: "Alvo (GAP/direcionado)" },
  { v: "move", label: "Movimento (mobilidade)" },
  { v: "music", label: "Música (ritmos)" },
  { v: "bike", label: "Bike (spin)" },
  { v: "flower", label: "Flor (pilates)" },
  { v: "flame", label: "Chama (HIIT)" },
];

export function AulasForm({ itensIniciais }: { itensIniciais: Aula[] }) {
  const [itens, setItens] = useState<Aula[]>(itensIniciais);
  const [pendente, iniciar] = useTransition();
  const [msg, setMsg] = useState<{ ok?: boolean; erro?: string } | null>(null);

  function atualizar(i: number, campo: keyof Aula, valor: string) {
    setItens((a) => a.map((d, idx) => (idx === i ? { ...d, [campo]: valor } : d)));
  }
  function remover(i: number) {
    setItens((a) => a.filter((_, idx) => idx !== i));
  }
  function adicionar() {
    setItens((a) => [
      ...a,
      {
        nome: "",
        duracao: "40 min",
        capacidade: "até 8 alunos",
        icone: "activity",
        descricao: "",
        beneficios: "",
      },
    ]);
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
    const aulas = itens
      .filter((d) => d.nome.trim())
      .map((d) => ({
        nome: d.nome.trim(),
        duracao: d.duracao.trim(),
        capacidade: d.capacidade.trim(),
        icone: d.icone,
        descricao: d.descricao.trim(),
        beneficios: d.beneficios
          .split("\n")
          .map((b) => b.trim())
          .filter(Boolean),
      }));
    iniciar(async () => {
      const r = await salvarConteudo({ aulas });
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
              Aula {i + 1}
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
                aria-label="Remover aula"
                className="grid place-items-center w-9 h-9 rounded-lg text-coral-escuro hover:bg-[#F7E4E0] transition-colors"
              >
                <Trash2 size={17} aria-hidden />
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1.5 text-sm">Nome</label>
                <input
                  value={d.nome}
                  onChange={(e) => atualizar(i, "nome", e.target.value)}
                  className={campo}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1.5 text-sm">Ícone</label>
                <select
                  value={d.icone}
                  onChange={(e) => atualizar(i, "icone", e.target.value)}
                  className={campo}
                >
                  {ICONES.map((op) => (
                    <option key={op.v} value={op.v}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1.5 text-sm">
                  Duração
                </label>
                <input
                  value={d.duracao}
                  onChange={(e) => atualizar(i, "duracao", e.target.value)}
                  placeholder="40 min"
                  className={campo}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1.5 text-sm">
                  Capacidade
                </label>
                <input
                  value={d.capacidade}
                  onChange={(e) => atualizar(i, "capacidade", e.target.value)}
                  placeholder="até 8 alunos"
                  className={campo}
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1.5 text-sm">
                Descrição
              </label>
              <textarea
                value={d.descricao}
                onChange={(e) => atualizar(i, "descricao", e.target.value)}
                rows={3}
                className={campo}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1.5 text-sm">
                Benefícios{" "}
                <span className="font-normal text-cinza">(um por linha)</span>
              </label>
              <textarea
                value={d.beneficios}
                onChange={(e) => atualizar(i, "beneficios", e.target.value)}
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
        <Plus size={18} aria-hidden /> Adicionar aula
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
