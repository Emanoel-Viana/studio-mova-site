"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Flower2,
  Bike,
  RotateCcw,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { waLink } from "@/lib/site";

type Pontos = Record<string, number>;

const perguntas: { q: string; opcoes: { txt: string; pts: Pontos }[] }[] = [
  {
    q: "Qual é o seu principal objetivo?",
    opcoes: [
      { txt: "Força e definição muscular", pts: { musculacao: 2 } },
      { txt: "Postura, mobilidade e equilíbrio", pts: { pilates: 2 } },
      { txt: "Emagrecer e ganhar fôlego", pts: { spin: 2 } },
      { txt: "Me mexer com energia e intensidade", pts: { spin: 2 } },
    ],
  },
  {
    q: "Como você gosta de treinar?",
    opcoes: [
      { txt: "No meu ritmo, com foco", pts: { musculacao: 1, pilates: 1 } },
      { txt: "Suando muito, alta intensidade", pts: { spin: 2 } },
      { txt: "Com controle e consciência corporal", pts: { pilates: 2 } },
    ],
  },
  {
    q: "O que mais te atrai?",
    opcoes: [
      { txt: "Resultados sólidos e progressivos", pts: { musculacao: 2 } },
      { txt: "Um corpo alinhado e sem dores", pts: { pilates: 2 } },
      { txt: "Uma aula dinâmica que passa voando", pts: { spin: 2 } },
    ],
  },
];

const resultados = {
  musculacao: {
    nome: "MOVA Musculação",
    tag: "Sua base de força e saúde — resultado sólido e progressivo.",
    Icone: Dumbbell,
  },
  pilates: {
    nome: "MOVA Pilates",
    tag: "Mobilidade, estabilidade e longevidade — corpo alinhado e sem dores.",
    Icone: Flower2,
  },
  spin: {
    nome: "Spin MOVA",
    tag: "Pedale, supere, evolua — intensidade indoor que transforma.",
    Icone: Bike,
  },
} as const;

const ordem = ["musculacao", "pilates", "spin"] as const;

export function QuizModalidade() {
  const [passo, setPasso] = useState(0);
  const [pontos, setPontos] = useState<Pontos>({});

  const responder = (pts: Pontos) => {
    const novo = { ...pontos };
    for (const [k, v] of Object.entries(pts)) novo[k] = (novo[k] ?? 0) + v;
    setPontos(novo);
    setPasso((p) => p + 1);
  };

  const reiniciar = () => {
    setPontos({});
    setPasso(0);
  };

  const terminou = passo >= perguntas.length;
  const vencedor = ordem.reduce(
    (best, k) => ((pontos[k] ?? 0) > (pontos[best] ?? 0) ? k : best),
    ordem[0],
  );
  const res = resultados[vencedor];

  return (
    <div className="max-w-2xl mx-auto rounded-3xl bg-white/[0.07] border border-white/15 p-6 sm:p-10 text-left">
      {!terminou ? (
        <>
          {/* progresso */}
          <div className="flex items-center gap-2 mb-6">
            {perguntas.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= passo ? "bg-coral" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <p className="text-[#9BE8BF] font-display font-bold text-sm mb-2">
            Pergunta {passo + 1} de {perguntas.length}
          </p>
          <h3 className="text-white font-display font-black text-2xl mb-6">
            {perguntas[passo].q}
          </h3>
          <div className="grid gap-3">
            {perguntas[passo].opcoes.map((op) => (
              <button
                key={op.txt}
                type="button"
                onClick={() => responder(op.pts)}
                className="group flex items-center justify-between gap-3 text-left rounded-xl bg-white/[0.06] border border-white/15 px-5 py-4 text-white font-medium transition-all hover:bg-white hover:text-verde-escuro"
              >
                {op.txt}
                <ArrowRight
                  size={18}
                  className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 text-[#9BE8BF] font-display font-bold text-sm mb-3">
            <Sparkles size={16} aria-hidden /> Seu resultado
          </span>
          <div className="grid place-items-center w-20 h-20 rounded-full bg-coral/20 mx-auto mb-4">
            <res.Icone size={38} className="text-coral" aria-hidden />
          </div>
          <p className="text-[#D6EEDF] mb-1">Sua modalidade ideal é</p>
          <h3 className="text-white font-display font-black text-3xl mb-3">
            {res.nome}
          </h3>
          <p className="text-[#D6EEDF] max-w-md mx-auto mb-8">{res.tag}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/planos" className="btn btn-coral">
              Ver os planos
            </Link>
            <a
              href={waLink(
                `Olá! Fiz o quiz no site e minha modalidade ideal foi ${res.nome}. Quero saber mais!`,
              )}
              target="_blank"
              rel="noopener"
              className="btn btn-borda text-white"
            >
              Falar no WhatsApp
            </a>
          </div>
          <button
            type="button"
            onClick={reiniciar}
            className="inline-flex items-center gap-1.5 text-[#9BE8BF] text-sm mt-6 hover:text-white transition-colors"
          >
            <RotateCcw size={15} aria-hidden /> Refazer o quiz
          </button>
        </div>
      )}
    </div>
  );
}
