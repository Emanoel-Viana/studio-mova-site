import type { Metadata } from "next";
import {
  Wind,
  Sparkles,
  Users,
  ShieldCheck,
  Accessibility,
  Trees,
} from "lucide-react";
import Image from "next/image";
import { waLink } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Foto } from "@/components/Foto";

// Galeria em mosaico — cada foto no seu formato natural (sem corte).
const galeria = [
  { src: "/fotos/galeria/DSC02142.jpg", w: 2592, h: 4608 },
  { src: "/fotos/reabilitacao/DSC02103.jpg", w: 2592, h: 4608 },
  { src: "/fotos/galeria/MOVA-06.jpg", w: 4685, h: 3037 },
  { src: "/fotos/reabilitacao/DSC00600.jpg", w: 4128, h: 6192 },
  { src: "/fotos/galeria/studio-mova-43.jpg", w: 4774, h: 3184 },
  { src: "/fotos/reabilitacao/DSC01924.jpg", w: 2592, h: 4608 },
  { src: "/fotos/reabilitacao/studio-mova-16.jpg", w: 4817, h: 3212 },
  { src: "/fotos/reabilitacao/2.jpg", w: 690, h: 922 },
];

export const metadata: Metadata = {
  title: "O Studio",
  description:
    "Conheça o espaço do Studio MOVA: academia boutique climatizada na Asa Norte, com estrutura completa e turmas reduzidas.",
};

const comodidades = [
  { Icone: Wind, texto: "Ambiente climatizado" },
  { Icone: Users, texto: "Turmas de até 4 alunos" },
  { Icone: Sparkles, texto: "Limpeza impecável" },
  { Icone: ShieldCheck, texto: "Equipamentos modernos" },
  { Icone: Trees, texto: "Vista para o verde da quadra" },
  { Icone: Accessibility, texto: "Acolhedor para todas as idades" },
];

export default function OStudio() {
  return (
    <>
      <PageHero
        eyebrow="O Studio"
        titulo="Sua nova segunda casa"
        descricao="Um espaço boutique pensado para você se sentir em casa enquanto cuida do corpo — com estrutura completa e atenção de verdade."
      />

      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container-mova grid lg:grid-cols-2 gap-12 items-center">
          <Foto
            src="/fotos/galeria/studio-mova-43.jpg"
            label="Espaço do Studio MOVA"
            ratio="4 / 3"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
          <div>
            <h2 className="section-title">
              Boutique não é tamanho, é cuidado
            </h2>
            <p className="lead mb-4">
              No MOVA, cada detalhe foi pensado para que o treino seja uma parte
              gostosa do seu dia. Aqui você não é mais um número numa esteira:
              tem nome, objetivo e um professor que te conhece.
            </p>
            <p className="text-cinza">
              O espaço é climatizado, organizado e tranquilo — do jeito que quem
              não gosta de academia lotada sempre quis.
            </p>
          </div>
        </div>
      </section>

      {/* Comodidades */}
      <section className="py-10 sm:py-14 lg:py-20 bg-verde-claro">
        <div className="container-mova">
          <span className="eyebrow">Estrutura</span>
          <h2 className="section-title">O que você encontra por aqui</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {comodidades.map(({ Icone, texto }) => (
              <div
                key={texto}
                className="flex items-center gap-4 rounded-2xl bg-white border border-[#E2EEE7] p-5"
              >
                <Icone className="text-verde-medio shrink-0" aria-hidden />
                <span className="font-medium">{texto}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="container-mova">
          <span className="eyebrow">Galeria</span>
          <h2 className="section-title">Dê uma espiada no espaço</h2>
          <div className="columns-2 lg:columns-3 gap-4 mt-8">
            {galeria.map((f, i) => (
              <Image
                key={f.src}
                src={f.src}
                alt={`Foto ${i + 1} do Studio MOVA`}
                width={f.w}
                height={f.h}
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto rounded-[1.25rem] mb-4 break-inside-avoid"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-20 bg-preto text-white text-center">
        <div className="container-mova">
          <h2 className="section-title">Venha conhecer pessoalmente</h2>
          <p className="lead mx-auto mb-8 !text-[#B9C6BF]">
            A melhor forma de sentir o MOVA é vivendo o espaço. Agende sua
            sessão avaliativa.
          </p>
          <a
            href={waLink(
              "Olá! Quero conhecer o espaço do Studio MOVA e agendar uma sessão avaliativa.",
            )}
            target="_blank"
            rel="noopener"
            className="btn btn-coral text-lg"
          >
            Agendar visita
          </a>
        </div>
      </section>
    </>
  );
}
