"use client";

import { useState } from "react";
import {
  Dumbbell,
  Flower2,
  Bike,
  Users,
  Baby,
  Sparkles,
  Check,
  Crown,
} from "lucide-react";
import { site, waLink } from "@/lib/site";

const iconMap: Record<string, typeof Dumbbell> = {
  dumbbell: Dumbbell,
  flower: Flower2,
  bike: Bike,
  users: Users,
  baby: Baby,
  sparkles: Sparkles,
};

type Catalogo = typeof site.catalogo;
type Preco = { mensal: string; semestral: string; anual: string };

function LinhasPreco({ p }: { p: Preco }) {
  return (
    <div className="grid gap-1.5">
      <div className="flex justify-between items-baseline border-b border-[#EEF5F0] pb-1.5">
        <span className="text-cinza text-sm">Mensal</span>
        <strong className="font-display">
          R$ {p.mensal}
          <span className="text-xs text-cinza font-body font-normal">/mês</span>
        </strong>
      </div>
      <div
        className={`flex justify-between items-baseline ${
          p.anual ? "border-b border-[#EEF5F0] pb-1.5" : ""
        }`}
      >
        <span className="text-cinza text-sm">Semestral</span>
        <strong className="font-display">
          R$ {p.semestral}
          <span className="text-xs text-cinza font-body font-normal">/mês</span>
        </strong>
      </div>
      {p.anual && (
        <div className="flex justify-between items-baseline">
          <span className="font-semibold text-verde-escuro text-sm">
            Anual{" "}
            <span className="text-[0.55rem] align-middle bg-verde-claro text-verde-escuro px-1.5 py-0.5 rounded-full uppercase tracking-wide font-display">
              melhor preço
            </span>
          </span>
          <strong className="font-display text-verde-medio">
            R$ {p.anual}
            <span className="text-xs text-cinza font-body font-normal">/mês</span>
          </strong>
        </div>
      )}
    </div>
  );
}

export function SeletorPlanos({ catalogo }: { catalogo: Catalogo }) {
  const [modId, setModId] = useState<string>(catalogo.modalidades[0].id);
  const [freqIdx, setFreqIdx] = useState(0);
  const mod = catalogo.modalidades.find((m) => m.id === modId)!;
  const freq = mod.frequencias[freqIdx] ?? mod.frequencias[0];

  return (
    <div>
      {/* 1. Pergunta + seletor de modalidade */}
      <p className="text-center font-display font-bold text-lg lg:text-xl mb-5">
        O que você quer treinar?
      </p>
      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        {catalogo.modalidades.map((m) => {
          const Icone = iconMap[m.icone] ?? Dumbbell;
          const ativa = m.id === modId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setModId(m.id);
                setFreqIdx(0);
              }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-display font-bold text-sm transition-colors ${
                ativa
                  ? "bg-verde text-white"
                  : "bg-white border border-[#DDEDE3] text-preto hover:border-verde"
              }`}
            >
              <Icone size={18} aria-hidden />
              {m.nome}
            </button>
          );
        })}
      </div>

      {/* 2. Modalidade selecionada */}
      <div className="text-center mb-6">
        <h3 className="font-display font-black text-2xl">{mod.titulo}</h3>
        <p className="text-cinza mt-1">{mod.tagline}</p>
      </div>

      {/* 3. Toggle de frequência */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-cinza-claro rounded-full p-1">
          {mod.frequencias.map((f, i) => (
            <button
              key={f.freq}
              type="button"
              onClick={() => setFreqIdx(i)}
              className={`px-5 py-2 rounded-full font-display font-bold text-sm transition-colors ${
                i === freqIdx ? "bg-verde text-white" : "text-cinza"
              }`}
            >
              {f.freq}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Cartões de preço */}
      {mod.temNiveis ? (
        <div className="grid sm:grid-cols-3 gap-5">
          {mod.niveis.map((nivel, i) => {
            const destaque = i === 1; // Equilíbrio no centro
            return (
              <div
                key={nivel.nome}
                className={`flex flex-col rounded-2xl bg-white p-6 ${
                  destaque
                    ? "border-2 border-verde shadow-[0_14px_34px_rgba(30,155,94,0.14)]"
                    : "border border-[#DDEDE3]"
                }`}
              >
                <div className="font-display font-black text-xl">
                  {nivel.nome}
                </div>
                <p className="text-cinza text-sm mb-4">{nivel.nota}</p>
                <div className="mb-5">
                  <LinhasPreco p={freq.precos[i]} />
                </div>
                <a
                  href={waLink(
                    `Olá! Tenho interesse no ${mod.titulo} — nível ${nivel.nome}, ${freq.freq}. Pode me passar os detalhes?`,
                  )}
                  target="_blank"
                  rel="noopener"
                  className={`btn mt-auto ${destaque ? "btn-coral" : "btn-escuro"}`}
                >
                  Quero este
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="flex flex-col rounded-2xl bg-white p-7 border-2 border-verde shadow-[0_14px_34px_rgba(30,155,94,0.14)]">
            <div className="mb-5">
              <LinhasPreco p={freq.precos[0]} />
            </div>
            <a
              href={waLink(
                `Olá! Tenho interesse no ${mod.titulo}, ${freq.freq}. Pode me passar os detalhes?`,
              )}
              target="_blank"
              rel="noopener"
              className="btn btn-coral"
            >
              Quero este plano
            </a>
          </div>
        </div>
      )}

      {/* Modalidades complementares (musculação) */}
      {mod.complementares.length > 0 && (
        <div className="mt-8 rounded-2xl bg-verde-claro p-6 text-center">
          <p className="font-display font-bold mb-3">
            Modalidades complementares (escolha livre nos níveis Equilíbrio e
            Performance):
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {mod.complementares.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-sm font-medium"
              >
                <Check size={14} className="text-verde-medio" aria-hidden />
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 5. Planos Clube (tudo incluso) */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <span className="eyebrow">Planos completos</span>
          <h3 className="section-title">Quer o MOVA por inteiro?</h3>
          <p className="lead mx-auto">
            Os planos Clube reúnem várias modalidades numa rotina só — com
            benefícios exclusivos. (Somente semestral e anual.)
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {catalogo.clubes.map((clube) => (
            <div
              key={clube.id}
              className={`relative flex flex-col rounded-2xl p-8 ${
                clube.destaque
                  ? "bg-verde-escuro text-white"
                  : "bg-white border border-[#DDEDE3]"
              }`}
            >
              {clube.selo && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-coral text-white font-display font-bold text-xs uppercase tracking-wide px-4 py-1.5 rounded-full whitespace-nowrap">
                  {clube.selo}
                </span>
              )}
              <div className="flex items-center gap-2 mb-1">
                {clube.destaque && (
                  <Crown size={22} className="text-coral" aria-hidden />
                )}
                <h4 className="font-display font-black text-2xl">
                  {clube.nome}
                </h4>
              </div>
              <p
                className={`mb-5 ${
                  clube.destaque ? "text-[#D6EEDF]" : "text-cinza"
                }`}
              >
                {clube.tagline}
              </p>

              <ul className="grid gap-2 mb-5">
                {clube.inclui.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      size={18}
                      className={
                        clube.destaque
                          ? "text-coral shrink-0 mt-0.5"
                          : "text-verde-medio shrink-0 mt-0.5"
                      }
                      aria-hidden
                    />
                    <span className={clube.destaque ? "" : "text-preto"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className={`grid gap-1.5 mb-5 pt-4 border-t ${
                  clube.destaque ? "border-white/15" : "border-[#EEF5F0]"
                }`}
              >
                <div className="flex justify-between items-baseline">
                  <span
                    className={
                      clube.destaque ? "text-[#D6EEDF]" : "text-cinza"
                    }
                  >
                    Semestral
                  </span>
                  <strong className="font-display text-lg">
                    R$ {clube.semestral}
                    <span className="text-xs font-body font-normal opacity-80">
                      /mês
                    </span>
                  </strong>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold">Anual</span>
                  <strong
                    className={`font-display text-xl ${
                      clube.destaque ? "text-coral" : "text-verde-medio"
                    }`}
                  >
                    R$ {clube.anual}
                    <span className="text-xs font-body font-normal opacity-80">
                      /mês
                    </span>
                  </strong>
                </div>
              </div>

              <details className="mb-5 text-sm">
                <summary
                  className={`cursor-pointer font-semibold ${
                    clube.destaque ? "text-[#9BE8BF]" : "text-verde-escuro"
                  }`}
                >
                  Ver todos os benefícios
                </summary>
                <ul className="grid gap-1.5 mt-3">
                  {clube.beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check
                        size={15}
                        className="shrink-0 mt-0.5 opacity-70"
                        aria-hidden
                      />
                      <span className={clube.destaque ? "" : "text-cinza"}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>

              <a
                href={waLink(
                  `Olá! Tenho interesse no ${clube.nome} do Studio MOVA. Pode me passar os detalhes?`,
                )}
                target="_blank"
                rel="noopener"
                className={`btn mt-auto ${
                  clube.destaque ? "btn-coral" : "btn-escuro"
                }`}
              >
                Quero o {clube.nome}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
