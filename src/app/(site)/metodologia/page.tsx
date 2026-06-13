import type { Metadata } from "next";
import { HeartPulse, Activity } from "lucide-react";
import { site, waLink } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { FotoPlaceholder } from "@/components/FotoPlaceholder";

export const metadata: Metadata = {
  title: "Metodologia",
  description:
    "A metodologia do Studio MOVA: 60 minutos em 3 etapas, turmas de até 4 alunos e treino adaptado, inclusive para reabilitação.",
};

export default function Metodologia() {
  return (
    <>
      <PageHero
        eyebrow="Metodologia"
        titulo="60 minutos, 3 etapas, máximo 4 alunos"
        descricao="Um método que combina atenção individual com um treino completo — do aquecimento ao fechamento, sempre com professor ao seu lado."
      />

      <section className="py-16 lg:py-20">
        <div className="container-mova">
          <div className="grid gap-6">
            {site.metodologia.map((etapa, i) => (
              <div
                key={etapa.titulo}
                className="grid md:grid-cols-[auto_1fr] gap-5 items-start rounded-2xl border border-[#E2EEE7] p-7"
              >
                <div className="grid place-items-center w-14 h-14 rounded-full bg-verde-claro font-display font-black text-2xl text-verde-medio">
                  {i + 1}
                </div>
                <div>
                  <h2 className="text-2xl mb-2">{etapa.titulo}</h2>
                  <p className="text-cinza text-lg">{etapa.desc}</p>
                </div>
              </div>
            ))}
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
