import {
  Clock,
  Users,
  Check,
  Shield,
  Wind,
  PersonStanding,
  Activity,
  Target,
  Move,
  Music,
  Bike,
  Flower2,
  Flame,
} from "lucide-react";
import { site } from "@/lib/site";

type Aula = (typeof site.aulas)[number];

const icones: Record<string, typeof Shield> = {
  shield: Shield,
  wind: Wind,
  person: PersonStanding,
  activity: Activity,
  target: Target,
  move: Move,
  music: Music,
  bike: Bike,
  flower: Flower2,
  flame: Flame,
};

export function GradeAulas({ aulas }: { aulas: readonly Aula[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {aulas.map((aula) => {
        const Icone = icones[aula.icone] ?? Activity;
        return (
          <div
            key={aula.nome}
            className="flex flex-col rounded-2xl bg-white border border-[#DDEDE3] p-6 transition-all hover:-translate-y-0.5 hover:border-verde hover:shadow-[0_14px_30px_rgba(30,155,94,0.10)]"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-verde-claro text-verde-escuro shrink-0">
                <Icone size={24} aria-hidden />
              </span>
              <h3 className="font-display font-black text-xl leading-tight">
                {aula.nome}
              </h3>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-sm text-cinza">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} className="text-verde-medio" aria-hidden />
                {aula.duracao}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={15} className="text-verde-medio" aria-hidden />
                {aula.capacidade}
              </span>
            </div>

            <p className="text-cinza text-sm mb-4">{aula.descricao}</p>

            <ul className="grid gap-1.5 mt-auto">
              {aula.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <Check
                    size={16}
                    className="text-verde-medio shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
