import type { Metadata } from "next";
import Link from "next/link";
import { Flame, Dumbbell, Trophy, Check } from "lucide-react";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Planos",
  description:
    "Planos MOVAconfort de 2x, 3x e 4x por semana. Também aceitamos Wellhub e TotalPass.",
};

const icones = [Flame, Dumbbell, Trophy];

export default async function Planos() {
  const site = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Planos"
        titulo="MOVAconfort — escolha o seu ritmo"
        descricao="Treino personalizado em turmas de até 4 alunos. Escolha a frequência que cabe na sua rotina — todos com acompanhamento de professor do início ao fim."
      />

      <section className="py-16 lg:py-20">
        <div className="container-mova">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {site.planos.map((plano, i) => {
              const Icone = icones[i] ?? Flame;
              const selo = "selo" in plano ? plano.selo : null;
              return (
                <div
                  key={plano.freq}
                  className={`relative flex flex-col rounded-2xl bg-white p-8 ${
                    plano.destaque
                      ? "border-2 border-verde shadow-[0_18px_40px_rgba(30,155,94,0.16)]"
                      : "border border-[#DDEDE3]"
                  }`}
                >
                  {selo && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-verde text-white font-display font-bold text-xs uppercase tracking-wide px-4 py-1.5 rounded-full whitespace-nowrap">
                      {selo}
                    </span>
                  )}
                  <Icone size={30} className="text-verde-medio mb-2" aria-hidden />
                  <div className="font-display font-black text-2xl">
                    {plano.freq}
                  </div>
                  <p className="text-cinza my-3 flex-1">{plano.desc}</p>
                  <p className="text-lg mb-6">
                    A partir de{" "}
                    <strong className="font-display">R$ {plano.preco}/mês</strong>
                  </p>
                  <a
                    href={waLink(
                      `Olá! Tenho interesse no plano ${plano.freq} do Studio MOVA. Pode me passar os detalhes?`,
                    )}
                    target="_blank"
                    rel="noopener"
                    className={`btn ${
                      plano.destaque ? "btn-coral" : "btn-escuro"
                    }`}
                  >
                    Quero esse plano
                  </a>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center text-cinza">
            Os valores são o ponto de partida de cada frequência. Na sessão
            avaliativa montamos a melhor proposta pra você.
          </p>
        </div>
      </section>

      {/* Parcerias */}
      <section id="parcerias" className="py-16 lg:py-20 bg-verde-claro scroll-mt-24">
        <div className="container-mova">
          <span className="eyebrow">Parcerias</span>
          <h2 className="section-title">Use seu benefício corporativo</h2>
          <p className="lead mb-10">
            Já é assinante de um programa de bem-estar? Você pode treinar no MOVA
            usando o seu plano.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {site.parcerias.map((p) => (
              <div
                key={p.nome}
                className="rounded-2xl bg-white border border-[#DDEDE3] p-7 flex items-start gap-4"
              >
                <Check
                  size={26}
                  className="text-verde shrink-0 mt-1"
                  aria-hidden
                />
                <div>
                  <h3 className="text-xl mb-1">{p.nome}</h3>
                  <p className="text-cinza mb-3">Aceito {p.detalhe}.</p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    className="text-verde-escuro font-semibold underline"
                  >
                    Ver no {p.nome} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 text-center">
        <div className="container-mova">
          <h2 className="section-title">Ainda com dúvida sobre o plano ideal?</h2>
          <p className="lead mx-auto mb-8">
            Fale com a gente no WhatsApp — a gente te ajuda a escolher.
          </p>
          <a
            href={waLink("Olá! Quero ajuda para escolher o melhor plano no Studio MOVA.")}
            target="_blank"
            rel="noopener"
            className="btn btn-coral text-lg"
          >
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
