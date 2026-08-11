"use client";

import { useState, useTransition } from "react";
import { Check, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { salvarConteudo } from "../../actions";

const DIAS = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
] as const;

// Cada célula é um TEXTO com uma aula por linha, no formato "Aula:duração".
// Ex.: "Pilates:50" (duração em minutos). Vazio = sem aula.
type Linha = { hora: string; cels: string[] };

export function GradeForm({ linhasIniciais }: { linhasIniciais: Linha[] }) {
  const [linhas, setLinhas] = useState<Linha[]>(
    linhasIniciais.map((l) => ({
      hora: l.hora,
      cels: [0, 1, 2, 3, 4, 5].map((i) => l.cels[i] ?? ""),
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
    setLinhas((a) => [...a, { hora: "", cels: ["", "", "", "", "", ""] }]);
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
        // texto → lista de "Aula:duração" (1 por linha)
        cels: l.cels.map((c) =>
          c
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
        ),
      }));
    iniciar(async () => {
      const r = await salvarConteudo({
        grade: { dias: [...DIAS], linhas: linhasLimpas },
      });
      setMsg(r);
    });
  }

  const campo =
    "w-full px-2 py-1.5 rounded-lg border border-[#D5E5DB] bg-white text-sm focus:outline-none focus:border-verde focus:ring-2 focus:ring-verde/30";

  return (
    <div className="grid gap-4">
      <p className="text-cinza text-sm bg-verde-claro rounded-xl p-4">
        Cada linha é um <strong>horário</strong>. Em cada dia, escreva as aulas
        no formato <strong>Aula:duração</strong> (uma por linha). Ex.:{" "}
        <code>Pilates:50</code> ou <code>Spin MOVA:45</code>. Deixe em branco
        onde não houver aula. Nomes que combinam com a legenda ganham a cor
        certa (Musculação, Spin MOVA, Pilates, Funcional, Alongamento,
        Abdominal, Flexibilidade, Mobilidade, Ritmos, HIIT MOVA, Sessão
        avaliativa).
      </p>

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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {DIAS.map((dia, d) => (
              <div key={dia}>
                <label className="block text-xs font-semibold text-cinza mb-1">
                  {dia}
                </label>
                <textarea
                  value={l.cels[d]}
                  onChange={(e) => setCel(i, d, e.target.value)}
                  rows={2}
                  placeholder="—"
                  className={campo + " resize-y"}
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
