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

// Cor por modalidade (texto escuro e legível em todas).
const CORES: Record<string, { bg: string; cor: string; contorno?: boolean }> = {
  Musculação: { bg: "#E8EDEA", cor: "#33413a" },
  "Spin MOVA": { bg: "#FBEAE5", cor: "#8f3527" },
  Pilates: { bg: "#E4F4EB", cor: "#14532d" },
  Funcional: { bg: "#FBEDD2", cor: "#6d4409" },
  Alongamento: { bg: "#E6F1FB", cor: "#0c447c" },
  Abdominal: { bg: "#ECE9FD", cor: "#37307d" },
  Flexibilidade: { bg: "#DBF3EB", cor: "#0d6350" },
  Mobilidade: { bg: "#FBE6EF", cor: "#872950" },
  Ritmos: { bg: "#FDE7DB", cor: "#973f18" },
  "HIIT MOVA": { bg: "#FDE3E3", cor: "#992a2a" },
  "Sessão avaliativa": { bg: "#EEF9F2", cor: "#14532d", contorno: true },
};
const PADRAO = { bg: "#E8EDEA", cor: "#33413a" };

// Ordem das modalidades no filtro/legenda.
const MODALIDADES = [
  "Musculação",
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

function Chip({ item, mudo }: { item: string; mudo: boolean }) {
  const [aula, dur] = item.split(":");
  const c = CORES[aula] ?? PADRAO;
  const ehMusc = aula === "Musculação";
  return (
    <span
      className="flex items-center gap-1 rounded-lg px-2 py-1 leading-tight text-[0.72rem] font-semibold"
      style={{
        backgroundColor: c.bg,
        color: c.cor,
        border: c.contorno ? `1px dashed ${c.cor}66` : undefined,
        opacity: mudo ? 0.5 : 1,
      }}
    >
      {ehMusc && <Dumbbell size={11} className="shrink-0 opacity-70" aria-hidden />}
      <span className="truncate">{aula}</span>
      {dur && (
        <span
          className="ml-auto shrink-0 rounded px-1 text-[0.58rem] font-bold"
          style={{ backgroundColor: `${c.cor}22` }}
        >
          {dur}′
        </span>
      )}
    </span>
  );
}

export function GradeHorarios({ grade }: { grade: Grade }) {
  const [periodo, setPeriodo] = useState<Periodo>("Todos");
  // "Todas" | "Coletivas" | nome de uma modalidade
  const [foco, setFoco] = useState<string>("Todas");

  const combina = (item: string) => {
    if (foco === "Todas") return true;
    if (foco === "Coletivas") return !item.startsWith("Musculação");
    return item.startsWith(foco);
  };

  const linhas = useMemo(() => {
    return grade.linhas
      .filter((l) => noPeriodo(l.hora, periodo))
      .map((l) => ({
        hora: l.hora,
        cels: l.cels.map((cel) => normalizar(cel)),
      }))
      // com filtro ativo, esconde as linhas que ficaram sem nada relevante
      .filter(
        (l) =>
          foco === "Todas" ||
          l.cels.some((c) => c.some((it) => combina(it))),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grade.linhas, periodo, foco]);

  const botaoFiltro = (ativo: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
      ativo
        ? "bg-verde-escuro text-white border-verde-escuro"
        : "bg-white text-cinza border-[#DDEDE3] hover:border-verde"
    }`;

  return (
    <div>
      {/* Filtro por período */}
      <div className="inline-flex bg-cinza-claro rounded-full p-1 mb-4">
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

      {/* Filtro por modalidade (também é a legenda) */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          type="button"
          onClick={() => setFoco("Todas")}
          className={botaoFiltro(foco === "Todas")}
        >
          Todas
        </button>
        <button
          type="button"
          onClick={() => setFoco("Coletivas")}
          className={botaoFiltro(foco === "Coletivas")}
        >
          Só coletivas
        </button>
        {MODALIDADES.map((nome) => {
          const c = CORES[nome] ?? PADRAO;
          const ativo = foco === nome;
          return (
            <button
              key={nome}
              type="button"
              onClick={() => setFoco(nome)}
              className={botaoFiltro(ativo)}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{
                  backgroundColor: c.contorno ? "transparent" : c.cor,
                  border: c.contorno ? `1.5px dashed ${c.cor}` : undefined,
                }}
              />
              {nome}
            </button>
          );
        })}
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
                  {linha.cels.map((cel, j) => {
                    const visiveis = cel.filter((it) => combina(it));
                    return (
                      <td
                        key={j}
                        className="align-top px-1.5 py-2 border-l border-[#F0F5F2]"
                      >
                        {visiveis.length > 0 ? (
                          <div className="grid gap-1">
                            {visiveis.map((item, k) => (
                              <Chip key={k} item={String(item)} mudo={false} />
                            ))}
                          </div>
                        ) : (
                          <span className="block text-center text-[#C7D6CD]">
                            —
                          </span>
                        )}
                      </td>
                    );
                  })}
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
