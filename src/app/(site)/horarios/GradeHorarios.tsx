"use client";

import { useMemo, useState } from "react";
import { Dumbbell } from "lucide-react";

// Tipo TOLERANTE: célula pode vir como lista de "Aula:duração" (novo) ou
// string única (formato antigo). Normalizamos pra nunca quebrar.
type Cel = readonly string[] | string;
type Grade = {
  dias: readonly string[];
  linhas: readonly { hora: string; cels: readonly Cel[] }[];
};

// Cor por modalidade. Musculação é "muda" (discreta) porque roda o dia todo.
const CORES: Record<
  string,
  { bg: string; cor: string; mudo?: boolean; contorno?: boolean }
> = {
  Musculação: { bg: "#EEF2F0", cor: "#66756c", mudo: true },
  "Spin MOVA": { bg: "#FBEAE5", cor: "#9b3b2e" },
  Pilates: { bg: "#E4F4EB", cor: "#14532d" },
  Funcional: { bg: "#FCEFD8", cor: "#7a4b0a" },
  Alongamento: { bg: "#E6F1FB", cor: "#0c447c" },
  Abdominal: { bg: "#EDEBFD", cor: "#3c3489" },
  Flexibilidade: { bg: "#DFF5EE", cor: "#0f6e56" },
  Mobilidade: { bg: "#FBE8F1", cor: "#8a2a52" },
  Ritmos: { bg: "#FDE9DE", cor: "#a5451a" },
  "HIIT MOVA": { bg: "#FDE6E6", cor: "#a32d2d" },
  "Sessão avaliativa": { bg: "#F3FBF6", cor: "#1e9b5e", contorno: true },
};
const PADRAO = { bg: "#EEF2F0", cor: "#66756c" };

const LEGENDA = [
  "Spin MOVA",
  "Pilates",
  "Funcional",
  "Alongamento",
  "Abdominal",
  "Flexibilidade",
  "Mobilidade",
  "Ritmos",
  "HIIT MOVA",
  "Sessão avaliativa",
];

const PERIODOS = ["Todos", "Manhã", "Tarde", "Noite"] as const;
type Periodo = (typeof PERIODOS)[number];

function normalizar(cel: Cel): string[] {
  if (Array.isArray(cel)) return cel as string[];
  return cel ? [cel as string] : [];
}
function horaNum(hora: string) {
  return parseInt(hora, 10) || 0;
}
function noPeriodo(hora: string, p: Periodo) {
  const h = horaNum(hora);
  if (p === "Manhã") return h < 12;
  if (p === "Tarde") return h >= 12 && h < 18;
  if (p === "Noite") return h >= 18;
  return true;
}

function Chip({ item }: { item: string }) {
  const [aula, dur] = item.split(":");
  const c = CORES[aula] ?? PADRAO;
  return (
    <span
      className={`flex items-center gap-1 rounded-lg px-2 py-1 leading-tight ${
        c.mudo ? "text-[0.66rem]" : "text-[0.74rem] font-semibold"
      }`}
      style={{
        backgroundColor: c.bg,
        color: c.cor,
        border: c.contorno ? `1px dashed ${c.cor}80` : undefined,
      }}
    >
      {c.mudo && <Dumbbell size={11} className="shrink-0 opacity-60" aria-hidden />}
      <span className="truncate">{aula}</span>
      {dur && (
        <span
          className="ml-auto shrink-0 rounded px-1 text-[0.58rem] font-bold"
          style={{ backgroundColor: `${c.cor}1f` }}
        >
          {dur}′
        </span>
      )}
    </span>
  );
}

export function GradeHorarios({ grade }: { grade: Grade }) {
  const [periodo, setPeriodo] = useState<Periodo>("Todos");
  const [soColetivas, setSoColetivas] = useState(false);

  const linhas = useMemo(() => {
    return grade.linhas
      .filter((l) => noPeriodo(l.hora, periodo))
      .map((l) => ({
        hora: l.hora,
        cels: l.cels.map((cel) => {
          const lista = normalizar(cel);
          return soColetivas
            ? lista.filter((it) => !it.startsWith("Musculação"))
            : lista;
        }),
      }))
      // no modo "só coletivas", esconde as linhas que ficaram sem nada
      .filter((l) => !soColetivas || l.cels.some((c) => c.length > 0));
  }, [grade.linhas, periodo, soColetivas]);

  return (
    <div>
      {/* Controles: período + só coletivas */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="inline-flex bg-cinza-claro rounded-full p-1">
          {PERIODOS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriodo(p)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-display font-bold transition-colors ${
                periodo === p ? "bg-verde text-white" : "text-cinza"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSoColetivas((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
            soColetivas
              ? "bg-verde-escuro text-white border-verde-escuro"
              : "bg-white text-cinza border-[#DDEDE3] hover:border-verde"
          }`}
          aria-pressed={soColetivas}
        >
          <span
            className={`grid place-items-center w-4 h-4 rounded-full border ${
              soColetivas ? "bg-white border-white" : "border-cinza"
            }`}
          >
            {soColetivas && (
              <span className="w-2 h-2 rounded-full bg-verde-escuro" />
            )}
          </span>
          Só aulas coletivas
        </button>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-x-3 gap-y-2 mb-5">
        {LEGENDA.map((nome) => {
          const c = CORES[nome] ?? PADRAO;
          return (
            <span
              key={nome}
              className="inline-flex items-center gap-1.5 text-xs text-cinza"
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  backgroundColor: c.contorno ? "transparent" : c.cor,
                  border: c.contorno ? `1.5px dashed ${c.cor}` : undefined,
                }}
              />
              {nome}
            </span>
          );
        })}
        <span className="inline-flex items-center gap-1.5 text-xs text-cinza">
          <Dumbbell size={13} className="text-[#66756c]" aria-hidden />
          Musculação (o dia todo)
        </span>
      </div>

      {/* Grade */}
      <div className="overflow-x-auto rounded-2xl border border-[#DDEDE3] bg-white shadow-[0_10px_30px_rgba(30,155,94,0.06)]">
        <table className="border-collapse min-w-[780px] w-full">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-verde-escuro text-white text-left text-xs font-display font-bold uppercase tracking-wide px-3 py-3">
                Horário
              </th>
              {grade.dias.map((d) => (
                <th
                  key={d}
                  className="bg-verde-escuro text-white text-center text-xs font-display font-bold uppercase tracking-wide px-2 py-3 min-w-[122px]"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.length === 0 ? (
              <tr>
                <td
                  colSpan={grade.dias.length + 1}
                  className="text-center text-cinza py-10"
                >
                  Nenhuma aula neste filtro.
                </td>
              </tr>
            ) : (
              linhas.map((linha, i) => (
                <tr
                  key={linha.hora}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#F7FBF9]"}
                >
                  <th className="sticky left-0 z-10 bg-inherit text-left font-display font-bold text-xs px-3 py-2 whitespace-nowrap border-r border-[#EEF5F0]">
                    {linha.hora}
                  </th>
                  {linha.cels.map((cel, j) => (
                    <td
                      key={j}
                      className="align-top px-1.5 py-2 border-l border-[#F0F5F2]"
                    >
                      {cel.length > 0 ? (
                        <div className="grid gap-1">
                          {cel.map((item, k) => (
                            <Chip key={k} item={String(item)} />
                          ))}
                        </div>
                      ) : (
                        <span className="block text-center text-[#C7D6CD]">
                          —
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-cinza mt-3 sm:hidden">
        👉 Arraste a tabela para o lado para ver todos os dias.
      </p>
    </div>
  );
}
