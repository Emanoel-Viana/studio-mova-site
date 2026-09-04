import type { Metadata } from "next";
import { Clock, MessageCircle, Sparkles } from "lucide-react";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { GradeHorarios } from "./GradeHorarios";

export const metadata: Metadata = {
  title: "Grade de horários",
  description:
    "Horários das aulas coletivas do Studio MOVA (Spin, Pilates, Funcional, Abdominal, Ritmos e mais). Confirme a disponibilidade pelo WhatsApp.",
};

export default async function Horarios() {
  const site = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Aulas coletivas"
        titulo="Grade de horários"
        descricao="Confira os horários das nossas aulas coletivas e da musculação. As vagas são limitadas (turmas reduzidas) — confirme a sua no WhatsApp ou na recepção."
      />

      <section className="py-8 sm:py-10 lg:py-14">
        <div className="container-mova">
          <GradeHorarios grade={site.grade} />

          <p className="text-sm text-cinza mt-4 flex items-start gap-2">
            <Clock size={16} className="text-verde-medio shrink-0 mt-0.5" aria-hidden />
            Grade de referência — os horários podem mudar. A musculação tem
            horários flexíveis o dia todo. Confirme a disponibilidade da turma no
            WhatsApp antes de vir.
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
