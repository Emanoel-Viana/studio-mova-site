import type { Metadata } from "next";
import {
  HeartPulse,
  Activity,
  Accessibility,
  Dumbbell,
  Users,
  UserCheck,
  Target,
  Home as HomeIcon,
  Check,
} from "lucide-react";
import { site, waLink } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Foto } from "@/components/Foto";

export const metadata: Metadata = {
  title: "Metodologia",
  description:
    "A metodologia do Studio MOVA: 60 minutos em 3 etapas, turmas de até 4 alunos e treino personalizado e adaptado, inclusive para reabilitação. Comece pela sessão avaliativa.",
};

const icones = [Accessibility, Dumbbell, HeartPulse];
const difIcones = [Users, UserCheck, Target, HomeIcon];

export default function Metodologia() {
  return (
    <>
      <PageHero
        eyebrow="Metodologia"
        titulo="60 minutos, 3 etapas, máximo 4 alunos"
        descricao="Um método que une atenção individual a um treino completo — do aquecimento ao fechamento, sempre com um professor ao seu lado. Resultado de verdade, no seu ritmo e com segurança."
      />

      {/* Infográfico das 3 etapas (nativo) */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container-mova text-center">
          <span className="eyebrow">As 3 etapas</span>
          <h2 className="section-title">Como é cada treino no MOVA</h2>
          <p className="lead mx-auto mb-2">
            Toda sessão é pensada do começo ao fim para você evoluir com
            segurança — nada de chegar perdido sem saber o que fazer.
          </p>
          <div className="grid sm:grid-cols-3 gap-10 mt-12">
            {site.metodologia.map((etapa, i) => {
              const Icone = icones[i] ?? Activity;
              return (
                <div key={etapa.titulo} className="flex flex-col items-center">
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

      {/* Diferenciais — por que funciona */}
      <section className="py-10 sm:py-14 lg:py-20 bg-cinza-claro">
        <div className="container-mova">
          <span className="eyebrow">Por que o método funciona</span>
          <h2 className="section-title">O que você não encontra na academia comum</h2>
          <p className="lead mb-10 max-w-[60ch]">
            A diferença não está só no equipamento — está na atenção que você
            recebe. Aqui ninguém treina no piloto automático.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {site.diferenciais.map((d, i) => {
              const Icone = difIcones[i] ?? Check;
              return (
                <div
                  key={d.titulo}
                  className="flex items-start gap-4 rounded-2xl bg-white border border-[#DDEDE3] p-7"
                >
                  <div className="grid place-items-center w-12 h-12 shrink-0 rounded-full bg-verde-claro">
                    <Icone size={24} className="text-verde-medio" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1">{d.titulo}</h3>
                    <p className="text-cinza">{d.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reabilitação */}
      <section className="py-10 sm:py-14 lg:py-20 bg-verde-claro">
        <div className="container-mova grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow">Treino adaptado</span>
            <h2 className="section-title">Reabilitação e movimento seguro</h2>
            <p className="lead mb-4">
              Voltando de uma lesão, com alguma dor, limitação ou cuidando do
              corpo com mais idade? O método MOVA se adapta a você — e o
              exercício supervisionado é um dos maiores aliados na sua
              recuperação.
            </p>
            <ul className="grid gap-3">
              {[
                "Avaliação postural e de mobilidade antes de começar",
                "Exercícios ajustados à sua condição (traga seu laudo, se tiver)",
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
            <p className="text-sm text-cinza mt-5">
              O treino supervisionado é um grande aliado, mas não substitui a
              avaliação do seu médico ou fisioterapeuta.
            </p>
          </div>
          <Foto
            src="/fotos/reabilitacao/2.jpg"
            label="Sessão de reabilitação no Studio MOVA"
            ratio="3 / 4"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </section>

      {/* Sessão avaliativa */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container-mova">
          <div className="rounded-3xl bg-verde-escuro text-white p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="eyebrow !text-[#7FE3AC]">O primeiro passo</span>
                <h2 className="section-title">Comece pela sessão avaliativa</h2>
                <p className="text-[#D6EEDF] text-lg mb-6">
                  {site.sessaoAvaliativa.intro}
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
                <p className="flex items-start gap-2.5 text-sm text-[#9FD9BC] mt-5">
                  <Check size={18} className="shrink-0 mt-0.5" aria-hidden />
                  {site.sessaoAvaliativa.levar}
                </p>
              </div>
              <ul className="grid gap-3">
                {site.sessaoAvaliativa.etapas.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 rounded-xl bg-white/[0.07] border border-white/15 p-4"
                  >
                    <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-verde text-white font-display font-bold">
                      {i + 1}
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24 text-center">
        <div className="container-mova">
          <Activity
            className="mx-auto text-verde-medio mb-4"
            size={36}
            aria-hidden
          />
          <h2 className="section-title">Experimente o método na prática</h2>
          <p className="lead mx-auto mb-8">
            A melhor forma de entender o MOVA é sentindo a diferença de treinar
            com atenção de verdade. Dá o primeiro passo com a gente.
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
