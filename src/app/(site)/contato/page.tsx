import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { FormContato } from "@/components/FormContato";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o Studio MOVA na Asa Norte, Brasília. WhatsApp, endereço e horários de funcionamento.",
};

export default async function Contato() {
  const site = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Contato"
        titulo="Vamos conversar?"
        descricao="Tire suas dúvidas, agende sua sessão avaliativa ou venha nos visitar na Asa Norte."
      />

      <section className="py-16 lg:py-20">
        <div className="container-mova grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Dados de contato */}
          <div>
            <h2 className="section-title">Fale com a gente</h2>
            <div className="grid gap-5 mt-6">
              <a
                href={waLink("Olá! Vim pelo site do Studio MOVA.")}
                target="_blank"
                rel="noopener"
                className="flex items-start gap-4 rounded-2xl border border-[#E2EEE7] p-5 hover:border-verde transition-colors"
              >
                <Phone className="text-verde-medio shrink-0" aria-hidden />
                <span>
                  <strong className="block font-display">WhatsApp</strong>
                  {site.contato.whatsappVisivel}
                </span>
              </a>
              <a
                href={`mailto:${site.contato.email}`}
                className="flex items-start gap-4 rounded-2xl border border-[#E2EEE7] p-5 hover:border-verde transition-colors"
              >
                <Mail className="text-verde-medio shrink-0" aria-hidden />
                <span>
                  <strong className="block font-display">E-mail</strong>
                  {site.contato.email}
                </span>
              </a>
              <div className="flex items-start gap-4 rounded-2xl border border-[#E2EEE7] p-5">
                <MapPin className="text-verde-medio shrink-0" aria-hidden />
                <span>
                  <strong className="block font-display">Endereço</strong>
                  {site.endereco.linha1}, {site.endereco.linha2} —{" "}
                  {site.endereco.cidade} — CEP {site.endereco.cep}
                </span>
              </div>
            </div>

            {/* Horários */}
            <div className="mt-8 rounded-2xl bg-verde-claro p-6">
              <h3 className="flex items-center gap-2 text-xl mb-4">
                <Clock size={22} className="text-verde-medio" aria-hidden />
                Horários
              </h3>
              <ul className="divide-y divide-[#D5E5DB]">
                {site.horarios.map((h) => (
                  <li
                    key={h.dias}
                    className="flex justify-between gap-4 py-2.5"
                  >
                    <span className="font-medium">{h.dias}</span>
                    <span className="text-cinza text-right">
                      {h.faixas.join(" • ")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulário */}
          <div>
            <h2 className="section-title">Mande uma mensagem</h2>
            <p className="text-cinza mb-6">
              Preencha e a gente continua a conversa no WhatsApp.
            </p>
            <FormContato />
          </div>
        </div>
      </section>
    </>
  );
}
