import type { Metadata } from "next";
import { MessageCircle, CalendarCheck } from "lucide-react";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Agendar avaliação",
  description:
    "Agende sua sessão avaliativa no Studio MOVA — online ou pelo WhatsApp.",
};

// Aceita tanto a URL completa quanto "usuario/evento" e devolve um link
// de incorporação do Cal.com.
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
        descricao="Escolha o jeito que for mais confortável pra você: marque um horário online ou fale direto com a gente no WhatsApp."
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
            <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-5">
              <a
                href={linkWpp}
                target="_blank"
                rel="noopener"
                className="group rounded-2xl bg-verde text-white p-7 transition-transform hover:-translate-y-1"
              >
                <MessageCircle size={32} className="mb-3" aria-hidden />
                <h2 className="text-xl mb-1.5 text-white">Pelo WhatsApp</h2>
                <p className="text-[#EAFBF1] text-sm">
                  O jeito mais rápido — você fala com a gente e marca na hora.
                </p>
              </a>

              <div className="rounded-2xl bg-cinza-claro border border-[#DDEDE3] p-7">
                <CalendarCheck
                  size={32}
                  className="mb-3 text-verde-medio"
                  aria-hidden
                />
                <h2 className="text-xl mb-1.5">Agendamento online</h2>
                <p className="text-cinza text-sm">
                  Em breve você poderá escolher o horário direto por aqui.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
