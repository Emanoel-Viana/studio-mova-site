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

      {/* Fale conosco — recriado nativamente (nítido e clicável) */}
      <section className="py-12 bg-verde-claro">
        <div className="container-mova">
          <div className="rounded-[1.25rem] bg-verde-escuro text-white overflow-hidden grid md:grid-cols-2 shadow-xl">
            {/* contatos */}
            <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl mb-6 text-white">Fale conosco</h2>
              <div className="grid gap-3">
                <a
                  href={waLink("Olá! Vim pelo site do Studio MOVA.")}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-3.5 transition-colors"
                >
                  <Phone size={20} className="text-[#7FE3AC] shrink-0" aria-hidden />
                  <span>
                    <span className="block text-[0.7rem] uppercase tracking-wider text-[#9BE8BF]">
                      Telefone
                    </span>
                    {site.contato.whatsappVisivel}
                  </span>
                </a>
                <a
                  href={`mailto:${site.contato.email}`}
                  className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-3.5 transition-colors break-all"
                >
                  <Mail size={20} className="text-[#7FE3AC] shrink-0" aria-hidden />
                  <span>
                    <span className="block text-[0.7rem] uppercase tracking-wider text-[#9BE8BF]">
                      E-mail
                    </span>
                    {site.contato.email}
                  </span>
                </a>
                <a
                  href={site.contato.instagramUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-3.5 transition-colors"
                >
                  <span className="text-[#7FE3AC] shrink-0">
                    <IconeInstagram size={20} />
                  </span>
                  <span>
                    <span className="block text-[0.7rem] uppercase tracking-wider text-[#9BE8BF]">
                      Social
                    </span>
                    {site.contato.instagram}
                  </span>
                </a>
              </div>
            </div>

            {/* logo + QR + icones */}
            <div className="bg-black/15 p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center gap-4">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/marca/simbolo-branco.png" alt="" className="h-7 w-auto" />
                <span className="font-display font-bold text-lg">studioMOVA</span>
              </div>
              <div className="bg-white rounded-xl p-2.5">
                <Image
                  src="/fotos/qr-whatsapp.png"
                  alt="QR code para falar no WhatsApp do Studio MOVA"
                  width={140}
                  height={140}
                />
              </div>
              <p className="text-sm text-[#D6EEDF]">
                Aponte a câmera ou toque abaixo:
              </p>
              <div className="flex gap-3">
                <a
                  href={waLink("Olá! Vim pelo site do Studio MOVA.")}
                  target="_blank"
                  rel="noopener"
                  aria-label="WhatsApp"
                  className="grid place-items-center w-12 h-12 rounded-full bg-[#25D366] hover:scale-105 transition-transform"
                >
                  <Phone size={22} className="text-white" aria-hidden />
                </a>
                <a
                  href={site.contato.instagramUrl}
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="grid place-items-center w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
                >
                  <IconeInstagram size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container-mova grid lg:grid-cols-2 gap-8 lg:gap-16">
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
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `Studio MOVA, ${site.endereco.linha1}, ${site.endereco.cidade}, ${site.endereco.cep}`,
                )}`}
                target="_blank"
                rel="noopener"
                className="flex items-start gap-4 rounded-2xl border border-[#E2EEE7] p-5 hover:border-verde transition-colors"
              >
                <MapPin className="text-verde-medio shrink-0" aria-hidden />
                <span>
                  <strong className="block font-display">Endereço</strong>
                  {site.endereco.linha1}, {site.endereco.linha2} —{" "}
                  {site.endereco.cidade} — CEP {site.endereco.cep}
                  <span className="block text-sm text-verde-medio mt-1">
                    Abrir no Google Maps →
                  </span>
                </span>
              </a>
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
