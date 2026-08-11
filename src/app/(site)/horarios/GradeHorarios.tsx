// Tipo TOLERANTE: a célula pode vir como lista de "Aula:duração" (formato
// novo) OU como uma string única (formato antigo salvo no banco). Normalizamos
// pra nunca quebrar.
type Cel = readonly string[] | string;
type Grade = {
  dias: readonly string[];
  linhas: readonly { hora: string; cels: readonly Cel[] }[];
};

// Cor por modalidade. Musculação é "muda" (discreta) porque roda o dia todo —
// assim as aulas coletivas coloridas se destacam. Sessão avaliativa = contorno.
const CORES: Record<
  string,
  { bg: string; cor: string; mudo?: boolean; contorno?: boolean }
> = {
  Musculação: { bg: "#EEF2F0", cor: "#5b6a62", mudo: true },
  "Spin MOVA": { bg: "#FAECE7", cor: "#9b3b2e" },
  Pilates: { bg: "#E7F4EC", cor: "#14532d" },
  Funcional: { bg: "#FBEEDA", cor: "#7a4b0a" },
  Alongamento: { bg: "#E6F1FB", cor: "#0c447c" },
  Abdominal: { bg: "#EDEBFD", cor: "#3c3489" },
  Flexibilidade: { bg: "#E1F5EE", cor: "#0f6e56" },
  Mobilidade: { bg: "#FBEAF0", cor: "#8a2a52" },
  Ritmos: { bg: "#FDEADF", cor: "#a5451a" },
  "HIIT MOVA": { bg: "#FCE7E7", cor: "#a32d2d" },
  "Sessão avaliativa": { bg: "transparent", cor: "#1e9b5e", contorno: true },
};
const PADRAO = { bg: "#EEF2F0", cor: "#5b6a62" };

// Modalidades que aparecem na legenda (ordem).
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
  "Musculação",
];

function Chip({ item }: { item: string }) {
  const [aula, dur] = item.split(":");
  const c = CORES[aula] ?? PADRAO;
  return (
    <span
      className={`flex items-center justify-between gap-1 rounded-lg px-2 py-1 leading-tight ${
        c.mudo ? "text-[0.66rem]" : "text-[0.72rem] font-semibold"
      }`}
      style={{
        backgroundColor: c.bg,
        color: c.cor,
        border: c.contorno ? `1px dashed ${c.cor}` : undefined,
      }}
    >
      <span className="truncate">{aula}</span>
      {dur && (
        <span className="shrink-0 opacity-70 text-[0.6rem] font-normal">
          {dur}′
        </span>
      )}
    </span>
  );
}

export function GradeHorarios({ grade }: { grade: Grade }) {
  return (
    <div>
      {/* Legenda */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5">
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
              {nome === "Musculação" && " (o dia todo)"}
            </span>
          );
        })}
      </div>

      {/* Grade — rolagem horizontal no celular, cabeçalho e coluna fixos */}
      <div className="overflow-x-auto rounded-2xl border border-[#DDEDE3] bg-white">
        <table className="border-collapse min-w-[820px] w-full">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-verde-escuro text-white text-left text-xs font-display font-bold uppercase tracking-wide px-3 py-3">
                Horário
              </th>
              {grade.dias.map((d) => (
                <th
                  key={d}
                  className="bg-verde-escuro text-white text-center text-xs font-display font-bold uppercase tracking-wide px-2 py-3 min-w-[130px]"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grade.linhas.map((linha, i) => (
              <tr
                key={linha.hora}
                className={i % 2 === 0 ? "bg-white" : "bg-cinza-claro"}
              >
                <th className="sticky left-0 z-10 bg-inherit text-left font-display font-bold text-xs px-3 py-2 whitespace-nowrap border-r border-[#EEF5F0]">
                  {linha.hora}
                </th>
                {linha.cels.map((cel, j) => {
                  // Normaliza: string única (antigo) → [string]; lista → lista.
                  const lista = Array.isArray(cel)
                    ? cel
                    : cel
                      ? [cel as string]
                      : [];
                  return (
                    <td
                      key={j}
                      className="align-top px-1.5 py-2 border-l border-[#F0F5F2]"
                    >
                      {lista.length > 0 ? (
                        <div className="grid gap-1">
                          {lista.map((item, k) => (
                            <Chip key={k} item={String(item)} />
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
