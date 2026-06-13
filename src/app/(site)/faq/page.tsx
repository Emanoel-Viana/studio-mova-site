import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { waLink } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Dúvidas sobre o Studio MOVA: como funciona o treino, turmas, sessão avaliativa, planos, Wellhub e TotalPass.",
};

const perguntas = [
  {
    q: "Como funciona o treino no Studio MOVA?",
    a: "Você treina em turmas de até 4 alunos, com um professor ao seu lado durante todo o treino. São 60 minutos divididos em 3 etapas: mobilidade e core, musculação + funcional, e um fechamento de HIIT bike. Tudo personalizado para o seu corpo e objetivos.",
  },
  {
    q: "Preciso já estar em forma para começar?",
    a: "Não! Recebemos pessoas de todas as idades e níveis — de quem está saindo do sedentarismo a quem já treina há anos. O treino é adaptado para você, no seu ritmo e com segurança.",
  },
  {
    q: "O que é a sessão avaliativa?",
    a: "É o seu primeiro encontro, sem compromisso. Conversamos sobre seus objetivos, fazemos uma avaliação postural e de mobilidade, analisamos seu movimento e apresentamos o método. A partir daí montamos a melhor proposta para você.",
  },
  {
    q: "Quais são os planos e valores?",
    a: "Temos o MOVAconfort em 2x, 3x ou 4x por semana, a partir de R$ 630/mês. Os valores são o ponto de partida de cada frequência — na sessão avaliativa montamos a proposta ideal para o seu caso.",
  },
  {
    q: "Vocês aceitam Wellhub ou TotalPass?",
    a: "Sim! Somos parceiros do Wellhub (a partir do plano Gold+) e do TotalPass (a partir do TP5+). Fale com a gente para entender como usar o seu benefício.",
  },
  {
    q: "Onde fica o Studio?",
    a: "Estamos na Asa Norte, Brasília — SHCN EQN 102/103, Ed. Estação 102, Sala 9A, 1º andar. Pertinho da quadra residencial, em um espaço climatizado e acolhedor.",
  },
];

export default function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="Perguntas frequentes"
        titulo="Tudo que você precisa saber"
        descricao="As dúvidas mais comuns de quem está chegando ao MOVA. Não achou a sua? É só chamar no WhatsApp."
      />

      <section className="py-16 lg:py-20">
        <div className="container-mova max-w-3xl">
          <div className="grid gap-3">
            {perguntas.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#E2EEE7] bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-display font-bold text-lg">
                  {item.q}
                  <Plus
                    size={22}
                    className="text-verde-medio shrink-0 transition-transform group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="px-5 pb-5 text-cinza">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center rounded-2xl bg-verde-claro p-8">
            <h2 className="text-2xl mb-3">Ficou com outra dúvida?</h2>
            <p className="text-cinza mb-6">
              A gente responde rapidinho no WhatsApp.
            </p>
            <a
              href={waLink("Olá! Tenho uma dúvida sobre o Studio MOVA.")}
              target="_blank"
              rel="noopener"
              className="btn btn-coral"
            >
              Tirar minha dúvida
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
