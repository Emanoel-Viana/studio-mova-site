import Link from "next/link";
import {
  Tag,
  Clock,
  Phone,
  Users,
  Dumbbell,
  MessageSquareQuote,
  ArrowRight,
  Inbox,
  CalendarCheck,
} from "lucide-react";

const secoes = [
  {
    href: "/admin/planos",
    Icone: Tag,
    titulo: "Planos e preços",
    desc: "Edite os valores e descrições dos planos MOVAconfort.",
    pronto: true,
  },
  {
    href: "/admin/contato",
    Icone: Phone,
    titulo: "Contato e avaliação",
    desc: "WhatsApp, e-mail, Instagram e a nota de avaliação.",
    pronto: true,
  },
  {
    href: "/admin/horarios",
    Icone: Clock,
    titulo: "Horários",
    desc: "Dias e faixas de funcionamento do studio.",
    pronto: true,
  },
  {
    href: "/admin/modalidades",
    Icone: Dumbbell,
    titulo: "Modalidades",
    desc: "Musculação, spinning, pilates e o que mais oferecer.",
    pronto: true,
  },
  {
    href: "/admin/equipe",
    Icone: Users,
    titulo: "Equipe",
    desc: "Profissionais que aparecem na página de equipe.",
    pronto: true,
  },
  {
    href: "/admin/depoimentos",
    Icone: MessageSquareQuote,
    titulo: "Depoimentos",
    desc: "Avaliações de alunos exibidas na home.",
    pronto: true,
  },
  {
    href: "/admin/agendamento",
    Icone: CalendarCheck,
    titulo: "Agendamento online",
    desc: "Link do Cal.com para a página de agendar.",
    pronto: true,
  },
];

export default function PainelAdmin() {
  return (
    <>
      <h1 className="text-3xl mb-2">Bem-vindo ao painel 👋</h1>
      <p className="text-cinza mb-8">
        Escolha o que deseja editar. As alterações aparecem no site na hora.
      </p>

      <Link
        href="/admin/leads"
        className="group flex items-center gap-4 rounded-2xl bg-verde-escuro text-white p-6 mb-8 transition-transform hover:-translate-y-0.5"
      >
        <span className="grid place-items-center w-12 h-12 rounded-xl bg-white/15 shrink-0">
          <Inbox size={24} aria-hidden />
        </span>
        <span className="flex-1">
          <span className="block font-display font-bold text-lg">
            Contatos recebidos
          </span>
          <span className="block text-[#D6EEDF] text-sm">
            Veja quem entrou em contato pelo formulário do site.
          </span>
        </span>
        <ArrowRight
          size={22}
          className="text-[#7FE3AC] transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </Link>

      <h2 className="font-display font-bold text-cinza uppercase tracking-wide text-sm mb-3">
        Conteúdo do site
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {secoes.map(({ href, Icone, titulo, desc, pronto }) =>
          pronto ? (
            <Link
              key={href}
              href={href}
              className="group block rounded-2xl bg-white border border-[#DDEDE3] p-6 transition-all hover:-translate-y-0.5 hover:border-verde"
            >
              <Icone size={26} className="text-verde-medio mb-3" aria-hidden />
              <h2 className="text-lg mb-1 flex items-center gap-1.5">
                {titulo}
                <ArrowRight
                  size={17}
                  className="text-verde opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden
                />
              </h2>
              <p className="text-cinza text-sm">{desc}</p>
            </Link>
          ) : (
            <div
              key={href}
              className="rounded-2xl bg-white/60 border border-[#E2EEE7] p-6 opacity-70"
            >
              <Icone size={26} className="text-cinza mb-3" aria-hidden />
              <h2 className="text-lg mb-1 flex items-center gap-2">
                {titulo}
                <span className="text-[0.65rem] bg-cinza-claro text-cinza px-2 py-0.5 rounded-full font-display uppercase tracking-wide border border-[#DDEDE3]">
                  Em breve
                </span>
              </h2>
              <p className="text-cinza text-sm">{desc}</p>
            </div>
          ),
        )}
      </div>
    </>
  );
}
