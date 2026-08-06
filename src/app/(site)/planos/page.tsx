import type { Metadata } from "next";
import { Check, Lock, BadgePercent, CalendarClock } from "lucide-react";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { SeletorPlanos } from "./SeletorPlanos";
import { GradeAulas } from "./GradeAulas";

export const metadata: Metadata = {
  title: "Planos",
  description:
    "Musculação, Pilates, Bike, Coletivas, Kids e Teens — escolha o que quer treinar e veja os planos. Também aceitamos Wellhub e TotalPass.",
};

export default async function Planos() {
  const site = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Planos"
        titulo="Escolha o seu movimento"
        descricao="Musculação, Pilates, Bike, Coletivas e turmas para crianças e adolescentes. Escolha o que você quer treinar e monte o plano ideal — sempre com acompanhamento de professor."
      />

      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container-mova">
          <SeletorPlanos catalogo={site.catalogo} />
          <p className="mt-10 text-center text-cinza max-w-2xl mx-auto">
            Quanto maior o período, melhor o valor por mês. Na sessão avaliativa
            a gente define a melhor proposta pra você — sem pressa e sem pressão.
          </p>

          {/* Vantagens dos planos (selos) */}
          <div className="grid sm:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
            {[
              {
                Icone: Lock,
                titulo: "Congelamento de valor",
                desc: "Nos planos anuais, o seu valor por mês não muda.",
              },
              {
                Icone: BadgePercent,
                titulo: "Condições especiais",
                desc: "Planos semestrais e anuais com condições especiais.",
              },
              {
                Icone: CalendarClock,
                titulo: "Flexibilidade pra remarcar",
                desc: "Cancele ou remarque sua aula com até 12h de antecedência.",
              },
            ].map((v) => (
              <div
                key={v.titulo}
                className="flex items-start gap-3 rounded-2xl border border-[#DDEDE3] bg-white p-5"
              >
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-verde-claro text-verde-escuro shrink-0">
                  <v.Icone size={22} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display font-bold leading-tight mb-1">
                    {v.titulo}
                  </h3>
                  <p className="text-cinza text-sm">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade de aulas / modalidades */}
      <section className="py-12 lg:py-16 bg-verde-claro">
        <div className="container-mova">
          <div className="text-center mb-10">
            <span className="eyebrow">Nossas modalidades</span>
            <h2 className="section-title">Conheça todas as nossas aulas</h2>
            <p className="lead mx-auto">
              Mais saúde, movimento e bem-estar para a sua vida — sempre em
              turmas reduzidas, com acompanhamento próximo dos professores.
            </p>
          </div>
          <GradeAulas aulas={site.aulas} />
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
      <section
        id="parcerias"
        className="py-10 sm:py-14 lg:py-20 bg-verde-claro scroll-mt-24"
      >
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
            href={waLink(
              "Olá! Quero ajuda para escolher o melhor plano no Studio MOVA.",
            )}
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
