"use client";

import { useState, useTransition } from "react";
import { Check, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { salvarConteudo } from "../../actions";

const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"] as const;

// Sugestões de aulas (aparecem no autocompletar de cada célula).
const AULAS = [
  "Spin", "Pilates", "Funcional", "Alongamento", "Abdominal",
  "Flexibilidade", "Mobilidade", "Ritmos", "HIIT", "GAP",
];

type Linha = { hora: string; cels: string[] };

export function GradeForm({ linhasIniciais }: { linhasIniciais: Linha[] }) {
  const [linhas, setLinhas] = useState<Linha[]>(
    // garante 5 células por linha
    linhasIniciais.map((l) => ({
      hora: l.hora,
      cels: [0, 1, 2, 3, 4].map((i) => l.cels[i] ?? ""),
    })),
  );
  const [pendente, iniciar] = useTransition();
  const [msg, setMsg] = useState<{ ok?: boolean; erro?: string } | null>(null);

  function setHora(i: number, valor: string) {
    setLinhas((a) => a.map((l, idx) => (idx === i ? { ...l, hora: valor } : l)));
  }
  function setCel(i: number, d: number, valor: string) {
    setLinhas((a) =>
      a.map((l, idx) =>
        idx === i
          ? { ...l, cels: l.cels.map((c, dd) => (dd === d ? valor : c)) }
          : l,
      ),
    );
  }
  function remover(i: number) {
    setLinhas((a) => a.filter((_, idx) => idx !== i));
  }
  function adicionar() {
    setLinhas((a) => [...a, { hora: "", cels: ["", "", "", "", ""] }]);
  }
  function mover(i: number, dir: -1 | 1) {
    setLinhas((a) => {
      const j = i + dir;
      if (j < 0 || j >= a.length) return a;
      const next = [...a];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function salvar() {
    setMsg(null);
    const linhasLimpas = linhas
      .filter((l) => l.hora.trim())
      .map((l) => ({
        hora: l.hora.trim(),
        cels: l.cels.map((c) => c.trim()),
      }));
    iniciar(async () => {
      const r = await salvarConteudo({
        grade: { dias: [...DIAS], linhas: linhasLimpas },
      });
      setMsg(r);
    });
  }

  const campo =
    "w-full px-2.5 py-2 rounded-lg border border-[#D5E5DB] bg-white text-sm focus:outline-none focus:border-verde focus:ring-2 focus:ring-verde/30";

  return (
    <div className="grid gap-4">
      <p className="text-cinza text-sm bg-verde-claro rounded-xl p-4">
        Cada linha é um <strong>horário</strong>. Preencha a aula em cada dia —
        deixe <strong>em branco</strong> onde não houver aula. Ex.: “Spin”,
        “Pilates”. Você pode adicionar, remover e reordenar as linhas.
      </p>

      <datalist id="aulas-sugestoes">
        {AULAS.map((a) => (
          <option key={a} value={a} />
        ))}
      </datalist>

      {linhas.map((l, i) => (
        <div key={i} className="rounded-2xl bg-white border border-[#DDEDE3] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-28 shrink-0">
              <label className="block text-xs font-semibold text-cinza mb-1">
                Horário
              </label>
              <input
                value={l.hora}
                onChange={(e) => setHora(i, e.target.value)}
                placeholder="06h30"
                className={campo + " font-display font-bold"}
              />
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-1 self-end">
              <button
                type="button"
                onClick={() => mover(i, -1)}
                disabled={i === 0}
                aria-label="Mover para cima"
                className="grid place-items-center w-8 h-8 rounded-lg text-cinza hover:bg-cinza-claro transition-colors disabled:opacity-30"
              >
                <ArrowUp size={16} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => mover(i, 1)}
                disabled={i === linhas.length - 1}
                aria-label="Mover para baixo"
                className="grid place-items-center w-8 h-8 rounded-lg text-cinza hover:bg-cinza-claro transition-colors disabled:opacity-30"
              >
                <ArrowDown size={16} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => remover(i)}
                aria-label="Remover linha"
                className="grid place-items-center w-8 h-8 rounded-lg text-coral-escuro hover:bg-[#F7E4E0] transition-colors"
              >
                <Trash2 size={16} aria-hidden />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {DIAS.map((dia, d) => (
              <div key={dia}>
                <label className="block text-xs font-semibold text-cinza mb-1">
                  {dia}
                </label>
                <input
                  value={l.cels[d]}
                  onChange={(e) => setCel(i, d, e.target.value)}
                  list="aulas-sugestoes"
                  placeholder="—"
                  className={campo}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={adicionar}
        className="inline-flex items-center gap-1.5 justify-self-start text-verde-medio font-semibold hover:underline"
      >
        <Plus size={18} aria-hidden /> Adicionar horário
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
