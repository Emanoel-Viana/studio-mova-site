import type { Metadata } from "next";
import { HeartPulse, Activity, Accessibility, Dumbbell } from "lucide-react";
import { site, waLink } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { FotoPlaceholder } from "@/components/FotoPlaceholder";

export const metadata: Metadata = {
  title: "Metodologia",
  description:
    "A metodologia do Studio MOVA: 60 minutos em 3 etapas, turmas de até 4 alunos e treino adaptado, inclusive para reabilitação.",
};

const icones = [Accessibility, Dumbbell, HeartPulse];

export default function Metodologia() {
  return (
    <>
      <PageHero
        eyebrow="Metodologia"
        titulo="60 minutos, 3 etapas, máximo 4 alunos"
        descricao="Um método que combina atenção individual com um treino completo — do aquecimento ao fechamento, sempre com professor ao seu lado."
      />

      {/* Infográfico das 3 etapas (nativo) */}
      <section className="py-16 lg:py-20">
        <div className="container-mova text-center">
          <span className="eyebrow">As 3 etapas</span>
          <h2 className="section-title">Nossa metodologia é composta por</h2>
          <div className="grid sm:grid-cols-3 gap-10 mt-12">
            {site.metodologia.map((etapa, i) => {
              const Icone = icones[i] ?? Activity;
              return (
                <div
                  key={etapa.titulo}
                  className="flex flex-col items-center"
                >
                  <div className="relative grid place-items-center w-24 h-24 rounded-full bg-verde-escuro mb-5">
                    <Icone size={40} className="text-coral" aria-hidden />
                    <span className="absolute -top-1 -right-1 grid place-items-center w-7 h-7 rounded-full bg-verde text-white font-display font-bold text-sm">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl mb-2">{etapa.titulo}</h3>
                  <p className="text-cinza max-w-[34ch]">{etapa.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reabilitação */}
      <section className="py-16 lg:py-20 bg-verde-claro">
        <div className="container-mova grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow">Treino adaptado</span>
            <h2 className="section-title">Reabilitação e movimento seguro</h2>
            <p className="lead mb-4">
              Voltando de uma lesão, com alguma limitação ou cuidando do corpo
              com mais idade? O método MOVA se adapta a você.
            </p>
            <ul className="grid gap-3">
              {[
                "Avaliação postural e de mobilidade antes de começar",
                "Progressão respeitando seu ritmo e segurança",
                "Acompanhamento próximo do professor o tempo todo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <HeartPulse
                    className="text-verde-medio shrink-0 mt-1"
                    size={20}
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <FotoPlaceholder label="Sessão avaliativa" ratio="4 / 3" />
        </div>
      </section>

      <section className="py-16 lg:py-20 text-center">
        <div className="container-mova">
          <Activity
            className="mx-auto text-verde-medio mb-4"
            size={36}
            aria-hidden
          />
          <h2 className="section-title">Experimente o método na prática</h2>
          <p className="lead mx-auto mb-8">
            Comece pela sessão avaliativa e sinta a diferença de treinar com
            atenção de verdade.
          </p>
          <a
            href={waLink(
              "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
            )}
            target="_blank"
            rel="noopener"
            className="btn btn-coral text-lg"
          >
            Agendar sessão avaliativa
          </a>
        </div>
      </section>
    </>
  );
}
