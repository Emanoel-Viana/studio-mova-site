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
    a: "Temos o MOVAconfort em 2x, 3x ou 4x por semana. Cada plano tem três formas de pagamento — Mensal, Semestral e Anual (quanto maior o período, melhor o valor por mês). O 2x começa em R$ 630/mês (anual). Veja todos os valores na página de Planos.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "Você escolhe a que for mais confortável: Pix (instantâneo via chave ou QR code), cartão de crédito (com parcelamento) ou recorrência automática (débito mensal automático).",
  },
  {
    q: "Tenho dores ou alguma limitação física. Posso treinar?",
    a: "Pode sim — é justamente para isso que servimos. Nossos professores são especializados em treino adaptado e ajustam cada exercício à sua condição. Se você tiver laudo, exame ou orientação médica, pode trazer no dia da sessão avaliativa: ajuda muito na personalização. Importante: o exercício supervisionado é um grande aliado na reabilitação e no fortalecimento, mas não substitui a avaliação do seu médico ou fisioterapeuta.",
  },
  {
    q: "Uso medicação para emagrecer (Ozempic, Mounjaro). Vale a pena treinar?",
    a: "Vale muito! Essas medicações ajudam a baixar o peso, mas sem treino de força o corpo perde músculo junto com a gordura. A musculação personalizada protege a sua massa muscular, o que mantém o metabolismo e garante um emagrecimento mais firme e saudável. Como as turmas são de até 4 alunos, o professor ajusta a intensidade conforme a sua disposição no dia.",
  },
  {
    q: "Vocês aceitam convênio ou plano de saúde?",
    a: "No momento não trabalhamos com convênios ou planos de saúde. As formas de acesso são: pagamento regular (Pix, cartão ou recorrência), Wellhub (a partir do Gold) e TotalPass (a partir do TP5+).",
  },
  {
    q: "Como funciona pelo Wellhub?",
    a: "Aceitamos a partir do plano Gold (Gold, Gold+, Platinum, Diamond e Diamond+). Você tem 2 check-ins por semana, e a sessão avaliativa já conta como 1 check-in. Todos os agendamentos, reagendamentos e cancelamentos são feitos direto pelo app da Wellhub — as vagas são liberadas com cerca de 5 dias de antecedência.",
  },
  {
    q: "Como funciona pelo TotalPass?",
    a: "Aceitamos a partir do plano TP5+ (TP5+, TP6 e TP7), com direito a 3 check-ins por semana. Aqui o agendamento é feito via WhatsApp com a nossa especialista: toda sexta-feira da semana anterior você envia seus dias e horários disponíveis, e ela confirma sua agenda da semana seguinte.",
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
