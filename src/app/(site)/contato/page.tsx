import type { Metadata } from "next";
import Image from "next/image";
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

function IconeInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

export default async function Contato() {
  const site = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Contato"
        titulo="Vamos conversar?"
        descricao="Tire suas dúvidas, agende sua sessão avaliativa ou venha nos visitar na Asa Norte."
      />

      {/* Fale conosco — QR + redes */}
      <section className="py-12 bg-verde-claro">
        <div className="container-mova">
          <div className="rounded-[1.25rem] bg-verde-escuro text-white p-7 lg:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl mb-2 text-white">
                Fale conosco agora
              </h2>
              <p className="text-[#D6EEDF] mb-6 max-w-[48ch]">
                Aponte a câmera do celular no QR e já comece a conversa no
                WhatsApp — ou toque num dos botões:
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={waLink("Olá! Vim pelo site do Studio MOVA.")}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-coral"
                >
                  <Phone size={20} aria-hidden />
                  WhatsApp
                </a>
                <a
                  href={site.contato.instagramUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-6 py-3.5 font-display font-bold uppercase tracking-wide text-sm transition-colors"
                >
                  <IconeInstagram size={20} />
                  Instagram
                </a>
              </div>
            </div>
            <div className="justify-self-center text-center">
              <div className="bg-white rounded-2xl p-3 inline-block">
                <Image
                  src="/fotos/qr-whatsapp.png"
                  alt="QR code para falar no WhatsApp do Studio MOVA"
                  width={150}
                  height={150}
                />
              </div>
              <p className="text-xs text-[#9BE8BF] mt-2">Aponte a câmera 📷</p>
            </div>
          </div>
        </div>
      </section>

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
