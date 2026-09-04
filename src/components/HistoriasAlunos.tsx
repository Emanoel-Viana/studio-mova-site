import { PlayCircle, ArrowUpRight } from "lucide-react";

// Fase 1: histórias reais de alunos que abrem o Reel no Instagram.
// (Fase 2: trocar o link por vídeo hospedado — YouTube não listado ou
// arquivo comprimido — pra tocar dentro do site.)
type Historia = {
  codigo: string; // código do reel no Instagram
  nome: string;
  historia: string;
};

const HISTORIAS: Historia[] = [
  {
    codigo: "DV9v7ZDCVia",
    nome: "Cristina, 65 anos",
    historia:
      "Decidiu cuidar da própria saúde e encontrou um espaço seguro pra evoluir. Nunca é tarde pra começar.",
  },
  {
    codigo: "DMvvbDpPUV2",
    nome: "Carol",
    historia:
      "Quase desistiu antes de começar. Hoje escolheu cuidar de si — aqui a saúde vem antes da estética.",
  },
  {
    codigo: "DaDToE2xnui",
    nome: "Recomeço com dedicação",
    historia:
      "Nossa aluna chegou enfrentando os desafios da obesidade e provou que recomeçar vale cada esforço.",
  },
  {
    codigo: "DZVELnlxw-v",
    nome: "Só 1 mês de treino",
    historia:
      "Com pouco tempo de MOVA, já sente a diferença do acompanhamento próximo em cada evolução.",
  },
  {
    codigo: "DbLZ7WJhOl4",
    nome: "A alegria de voltar",
    historia:
      "Havia perdido a disposição pro dia a dia… até decidir voltar. Uma das melhores escolhas que fez por si.",
  },
  {
    codigo: "DbqQFD1BULl",
    nome: "Um lugar pra chamar de seu",
    historia:
      "Mais do que treinar, é se sentir bem onde você está — com quem conhece você e respeita o seu ritmo.",
  },
];

export function HistoriasAlunos() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {HISTORIAS.map((h) => (
        <a
          key={h.codigo}
          href={`https://www.instagram.com/studio.mova/reel/${h.codigo}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#DDEDE3] shadow-[0_10px_30px_rgba(30,155,94,0.06)] transition-transform hover:-translate-y-1"
        >
          {/* Capa (Fase 1: gradiente + play; Fase 2: vira o vídeo) */}
          <div className="relative aspect-video bg-gradient-to-br from-verde-medio to-[#14744A] grid place-items-center">
            <PlayCircle
              size={56}
              className="text-white/90 transition-transform group-hover:scale-110"
              aria-hidden
            />
            <span className="absolute top-3 left-3 text-[0.7rem] font-display font-bold uppercase tracking-wide text-white/90 bg-black/20 rounded-full px-2.5 py-1">
              Vídeo
            </span>
          </div>
          {/* Texto */}
          <div className="flex flex-col flex-1 p-5">
            <p className="text-cinza text-sm leading-relaxed flex-1">
              {h.historia}
            </p>
            <p className="font-display font-bold text-preto mt-3">{h.nome}</p>
            <span className="inline-flex items-center gap-1 text-verde-escuro font-semibold text-sm mt-1">
              Ver no Instagram
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
