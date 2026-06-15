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

      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container-mova">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {site.planos.map((plano, i) => {
              const Icone = icones[i] ?? Flame;
              const selo = "selo" in plano ? plano.selo : null;
              return (
                <div
                  key={plano.freq}
                  className={`relative flex flex-col rounded-2xl bg-white p-6 sm:p-8 ${
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
                  <div className="font-display font-black text-xl sm:text-2xl">
                    {plano.freq}
                  </div>
                  <p className="text-cinza my-3 flex-1">{plano.desc}</p>

                  <div className="grid gap-2 mb-6">
                    <div className="flex justify-between items-baseline border-b border-[#EEF5F0] pb-2">
                      <span className="text-cinza">Mensal</span>
                      <strong className="font-display text-lg">
                        R$ {plano.precos.mensal}
                        <span className="text-sm text-cinza font-body font-normal">
                          /mês
                        </span>
                      </strong>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-[#EEF5F0] pb-2">
                      <span className="text-cinza">Semestral</span>
                      <strong className="font-display text-lg">
                        R$ {plano.precos.semestral}
                        <span className="text-sm text-cinza font-body font-normal">
                          /mês
                        </span>
                      </strong>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-verde-escuro">
                        Anual{" "}
                        <span className="text-[0.6rem] align-middle bg-verde-claro text-verde-escuro px-2 py-0.5 rounded-full uppercase tracking-wide font-display">
                          melhor preço
                        </span>
                      </span>
                      <strong className="font-display text-xl text-verde-medio">
                        R$ {plano.precos.anual}
                        <span className="text-sm text-cinza font-body font-normal">
                          /mês
                        </span>
                      </strong>
                    </div>
                  </div>

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
            Quanto maior o plano, melhor o valor por mês. Na sessão avaliativa a
            gente define a melhor proposta pra você — sem pressa e sem pressão.
          </p>
        </div>
      </section>

      {/* Formas de pagamento */}
      <section className="py-12 lg:py-16 bg-cinza-claro">
        <div className="container-mova">
          <span className="eyebrow">Pagamento</span>
          <h2 className="section-title">Formas de pagamento</h2>
          <p className="lead mb-8">
            Você escolhe a forma mais confortável pra você.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {site.pagamento.map((f) => (
              <div
                key={f.titulo}
                className="rounded-2xl border border-[#DDEDE3] bg-white p-6"
              >
                <h3 className="text-lg mb-1">{f.titulo}</h3>
                <p className="text-cinza text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parcerias */}
      <section id="parcerias" className="py-10 sm:py-14 lg:py-20 bg-verde-claro scroll-mt-24">
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
                className="rounded-2xl bg-white border border-[#DDEDE3] p-5 sm:p-7 flex items-start gap-4"
              >
                <Check
                  size={26}
                  className="text-verde shrink-0 mt-1"
                  aria-hidden
                />
                <div>
                  <h3 className="text-xl mb-1">{p.nome}</h3>
                  <p className="text-cinza mb-2">{p.detalhe}</p>
                  <p className="font-semibold text-verde-escuro mb-1">
                    {p.checkins}
                  </p>
                  <p className="text-cinza text-sm mb-3">{p.agendamento}</p>
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

      <section className="py-10 sm:py-14 lg:py-20 text-center">
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
