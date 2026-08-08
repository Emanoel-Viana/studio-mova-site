import type { Metadata } from "next";
import { Clock, MessageCircle, Sparkles } from "lucide-react";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Grade de horários",
  description:
    "Horários das aulas coletivas do Studio MOVA (Spin, Pilates, Funcional, Abdominal, Ritmos e mais). Confirme a disponibilidade pelo WhatsApp.",
};

export default async function Horarios() {
  const site = await getContent();
  const { dias, linhas } = site.grade;

  return (
    <>
      <PageHero
        eyebrow="Aulas coletivas"
        titulo="Grade de horários"
        descricao="Confira os horários das nossas aulas coletivas. As vagas são limitadas (turmas reduzidas) — confirme a sua no WhatsApp ou na recepção."
      />

      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container-mova">
          {/* Tabela com scroll horizontal no celular */}
          <div className="overflow-x-auto rounded-2xl border border-[#DDEDE3] bg-white">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-verde-escuro text-white">
                  <th className="text-left text-sm font-display font-bold uppercase tracking-wide px-4 py-3 sticky left-0 bg-verde-escuro">
                    Horário
                  </th>
                  {dias.map((d) => (
                    <th
                      key={d}
                      className="text-center text-sm font-display font-bold uppercase tracking-wide px-3 py-3"
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {linhas.map((linha, i) => (
                  <tr
                    key={linha.hora}
                    className={i % 2 === 0 ? "bg-white" : "bg-cinza-claro"}
                  >
                    <th className="text-left font-display font-bold text-sm px-4 py-3 whitespace-nowrap sticky left-0 bg-inherit border-r border-[#EEF5F0]">
                      {linha.hora}
                    </th>
                    {linha.cels.map((cel, j) => (
                      <td key={j} className="text-center px-2 py-2.5">
                        {cel ? (
                          <span className="inline-block rounded-lg bg-verde-claro text-verde-escuro font-semibold text-sm px-3 py-1.5">
                            {cel}
                          </span>
                        ) : (
                          <span className="text-[#C7D6CD]">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-cinza mt-4 flex items-start gap-2">
            <Clock size={16} className="text-verde-medio shrink-0 mt-0.5" aria-hidden />
            Grade de referência — os horários podem mudar. Confirme a
            disponibilidade da turma no WhatsApp antes de vir.
          </p>

          {/* Quiropraxia */}
          <div className="mt-10 rounded-2xl bg-verde-claro p-6 sm:p-8">
            <span className="inline-flex items-center gap-1.5 eyebrow">
              <Sparkles size={15} aria-hidden /> {site.quiropraxia.titulo}
            </span>
            <h2 className="text-2xl sm:text-3xl mt-1 mb-2">
              {site.quiropraxia.subtitulo}
            </h2>
            <p className="text-cinza max-w-[60ch] mb-5">
              {site.quiropraxia.texto}
            </p>
            <div className="grid gap-2">
              {site.quiropraxia.horarios.map((h) => (
                <div
                  key={h.dias}
                  className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-white px-4 py-3 w-fit"
                >
                  <span className="font-semibold">{h.dias}</span>
                  <span className="text-cinza">{h.faixas.join(" • ")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <a
              href={waLink(
                "Olá! Quero saber os horários e agendar uma aula no Studio MOVA.",
              )}
              target="_blank"
              rel="noopener"
              className="btn btn-coral text-lg"
            >
              <MessageCircle size={22} aria-hidden />
              Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
