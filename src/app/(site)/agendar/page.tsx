import type { Metadata } from "next";
import { MessageCircle, Check } from "lucide-react";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Agendar avaliação",
  description:
    "Agende sua sessão avaliativa no Studio MOVA pelo WhatsApp — atendimento humano e sem compromisso.",
};

// Aceita a URL completa ou "usuario/evento" e devolve o link de
// incorporação do Cal.com (caso o studio ative o agendamento online).
function montarEmbed(url: string): string {
  let u = url.trim();
  if (!u) return "";
  if (!/^https?:\/\//.test(u)) u = `https://cal.com/${u.replace(/^\/+/, "")}`;
  return u.includes("?") ? `${u}&embed=true` : `${u}?embed=true`;
}

export default async function Agendar() {
  const site = await getContent();
  const embed = montarEmbed(site.agendamento?.calUrl ?? "");
  const linkWpp = waLink(
    "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
  );

  return (
    <>
      <PageHero
        eyebrow="Sessão avaliativa"
        titulo="Agende sua avaliação"
        descricao="Fale com a gente e marque sua sessão avaliativa — atendimento humano, sem compromisso."
      />

      <section className="py-16 lg:py-20">
        <div className="container-mova">
          {embed ? (
            <>
              <div className="rounded-2xl overflow-hidden border border-[#DDEDE3] bg-white">
                <iframe
                  src={embed}
                  title="Agendamento de sessão avaliativa"
                  className="w-full"
                  style={{ height: 720, border: 0 }}
                  loading="lazy"
                />
              </div>
              <div className="mt-8 text-center">
                <p className="text-cinza mb-3">
                  Prefere conversar antes? A gente também te atende no WhatsApp.
                </p>
                <a
                  href={linkWpp}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-borda text-preto"
                >
                  <MessageCircle size={20} aria-hidden />
                  Falar no WhatsApp
                </a>
              </div>
            </>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-[1.25rem] bg-verde-escuro text-white p-8 lg:p-12 text-center">
                <span className="grid place-items-center w-16 h-16 rounded-full bg-white/12 mx-auto mb-5">
                  <MessageCircle size={32} className="text-[#7FE3AC]" aria-hidden />
                </span>
                <h2 className="text-2xl lg:text-3xl mb-3 text-white">
                  Agende pelo WhatsApp
                </h2>
                <p className="text-[#D6EEDF] max-w-[52ch] mx-auto mb-7">
                  É rápido e pessoal: você fala com a nossa equipe no WhatsApp,
                  que te encaminha para a especialista responsável pela agenda do
                  studio — ela marca o melhor horário pra você.
                </p>
                <a
                  href={linkWpp}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-coral text-lg"
                >
                  <MessageCircle size={22} aria-hidden />
                  Falar no WhatsApp
                </a>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-6">
                {[
                  "Sem compromisso",
                  "Atendimento humano",
                  "No melhor horário pra você",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-xl bg-verde-claro px-4 py-3 text-sm font-medium text-verde-escuro"
                  >
                    <Check size={18} className="text-verde-medio shrink-0" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
