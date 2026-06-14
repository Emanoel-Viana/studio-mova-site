import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Check,
  Flame,
  Dumbbell,
  Trophy,
  Bike,
  HeartPulse,
  ArrowRight,
  Home as HomeIcon,
  Target,
  HandHeart,
} from "lucide-react";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { Foto } from "@/components/Foto";

const planoIcones = [Flame, Dumbbell, Trophy];
const modalidadeIcones = [Dumbbell, Bike, HeartPulse];

export default async function Home() {
  const site = await getContent();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#34C97E] via-verde-medio to-[#14744A] text-white">
        <div className="container-mova relative grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center py-20 lg:py-24">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/35 px-4 py-2 text-sm font-medium mb-6">
              <Star size={16} className="fill-white" aria-hidden />
              <strong className="font-display">{site.avaliacao.nota}</strong> —{" "}
              {site.avaliacao.total} avaliações no {site.avaliacao.fonte}
            </div>
            <h1 className="text-[clamp(2.4rem,6vw,4rem)] mb-3">
              A vida precisa de movimento
            </h1>
            <p className="font-display font-bold text-[clamp(1.1rem,2.4vw,1.45rem)] text-[#D9FBE8] mb-5">
              {site.slogan}
            </p>
            <p className="max-w-[46ch] text-[#EAFBF1] text-lg mb-8">
              Academia boutique na Asa Norte: treino 100% personalizado em
              turmas de até 4 alunos, com um professor ao seu lado do início ao
              fim.
            </p>
            <a
              href={waLink(
                "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
              )}
              target="_blank"
              rel="noopener"
              className="btn btn-coral text-lg"
            >
              Agende sua sessão avaliativa
            </a>
          </div>
          <div className="relative aspect-[4/5] rounded-[1.25rem] overflow-hidden shadow-2xl ring-1 ring-white/20">
            <Image
              src="/fotos/reabilitacao/DSC00641.jpg"
              alt="Professora do Studio MOVA acompanhando um aluno no treino"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div
        className="bg-preto text-white overflow-hidden py-3.5 font-display font-bold uppercase tracking-wider text-sm"
        aria-hidden
      >
        <div className="ticker-track">
          {[0, 1].map((n) => (
            <span key={n} className="flex items-center">
              {[
                "Movimento",
                "Saúde",
                "Turmas de até 4 alunos",
                "Treino personalizado",
                "Reabilitação",
                "Asa Norte — Brasília",
              ].map((t) => (
                <span key={t} className="flex items-center">
                  <span className="px-4">{t}</span>
                  <span className="text-[#9BE8BF]">•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* SOBRE */}
      <section className="py-20 lg:py-24">
        <div className="container-mova grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-[1.25rem] overflow-hidden shadow-lg">
            <Image
              src="/fotos/reabilitacao/DSC01898.jpg"
              alt="Treino adaptado no Studio MOVA com acompanhamento da professora"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">O Studio</span>
            <h2 className="section-title">
              Se você não gosta de academia convencional, aqui é o seu lugar
            </h2>
            <p className="lead mb-8">
              Somos uma academia boutique com metodologia própria: você treina
              com um professor ao seu lado durante todo o treino, em um espaço
              projetado para ser a sua segunda casa.
            </p>
            <Link href="/o-studio" className="btn btn-escuro">
              Conheça o Studio
            </Link>
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section className="py-20 lg:py-24 bg-verde-escuro text-white">
        <div className="container-mova">
          <span className="eyebrow !text-[#7FE3AC]">Como funcionamos</span>
          <h2 className="section-title">
            60 minutos, 3 etapas, máximo 4 alunos
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {site.metodologia.map((etapa, i) => (
              <div
                key={etapa.titulo}
                className="rounded-2xl bg-white/[0.07] border border-white/15 p-7"
              >
                <div className="font-display font-black text-3xl text-[#7FE3AC] mb-2">
                  {i + 1}
                </div>
                <h3 className="text-xl mb-2">{etapa.titulo}</h3>
                <p className="text-[#D6EEDF]">{etapa.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/metodologia" className="btn btn-borda text-white mt-10">
            Entenda a metodologia completa
          </Link>
        </div>
      </section>

      {/* MODALIDADES */}
      <section className="py-20 lg:py-24">
        <div className="container-mova">
          <span className="eyebrow">Modalidades</span>
          <h2 className="section-title">O que você encontra no MOVA</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {site.modalidades.map((m, i) => {
              const Icone = modalidadeIcones[i] ?? Dumbbell;
              return (
                <div
                  key={m.titulo}
                  className="rounded-2xl bg-white border border-[#E2EEE7] p-7"
                >
                  <Foto
                    src={m.imagem || undefined}
                    label={m.titulo}
                    ratio="16 / 10"
                    className="mb-5"
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <Icone size={22} className="text-verde-medio" aria-hidden />
                    <h3 className="text-xl">
                      {m.titulo}
                      {m.emBreve && (
                        <span className="ml-2 align-middle text-[0.65rem] bg-coral text-white px-2.5 py-1 rounded-full font-display tracking-wide uppercase">
                          Em breve
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="text-cinza">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SESSÃO AVALIATIVA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-verde-medio to-[#14744A] text-white text-center">
        <div className="container-mova">
          <span className="eyebrow !text-[#9BE8BF]">O primeiro passo</span>
          <h2 className="section-title">Comece pela sessão avaliativa</h2>
          <p className="max-w-[60ch] mx-auto text-[#EAFBF1] text-lg mb-8">
            Antes de qualquer plano, você passa por um encontro personalizado
            com nossa professora especialista — sem compromisso nenhum.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-9">
            {[
              "Conversa sobre objetivos",
              "Avaliação postural e mobilidade",
              "Análise de movimento",
              "Apresentação do método",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full bg-white/12 border border-white/25 px-5 py-2.5 font-medium"
              >
                <Check size={18} aria-hidden /> {item}
              </span>
            ))}
          </div>
          <a
            href={waLink(
              "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
            )}
            target="_blank"
            rel="noopener"
            className="btn btn-coral text-lg"
          >
            Agendar minha sessão avaliativa
          </a>
          <p className="mt-5 text-[#EAFBF1]">
            Prefere marcar um horário online?{" "}
            <Link href="/agendar" className="underline font-semibold">
              Agende por aqui
            </Link>
          </p>
        </div>
      </section>

      {/* PLANOS */}
      <section className="py-20 lg:py-24 bg-verde-claro">
        <div className="container-mova">
          <span className="eyebrow">Planos</span>
          <h2 className="section-title">MOVAconfort — escolha o seu ritmo</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10 items-stretch">
            {site.planos.map((plano, i) => {
              const Icone = planoIcones[i] ?? Flame;
              const selo = "selo" in plano ? plano.selo : null;
              return (
                <div
                  key={plano.freq}
                  className={`relative flex flex-col rounded-2xl bg-white p-8 ${
                    plano.destaque
                      ? "border-2 border-verde shadow-[0_18px_40px_rgba(30,155,94,0.16)]"
                      : "border border-[#DDEDE3]"
                  }`}
                >
                  {selo && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-verde text-white font-display font-bold text-xs uppercase tracking-wide px-4 py-1.5 rounded-full whitespace-nowrap">
                      {selo}
                    </span>
                  )}
                  <Icone
                    size={28}
                    className="text-verde-medio mb-2"
                    aria-hidden
                  />
                  <div className="font-display font-black text-2xl">
                    {plano.freq}
                  </div>
                  <p className="text-cinza my-3 flex-1">{plano.desc}</p>
                  <p className="text-lg mb-6">
                    A partir de{" "}
                    <strong className="font-display">
                      R$ {plano.preco}/mês
                    </strong>
                  </p>
                  <Link
                    href="/planos"
                    className={`btn ${
                      plano.destaque ? "btn-coral" : "btn-escuro"
                    }`}
                  >
                    Ver detalhes
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="mt-9 text-center text-cinza">
            Também aceitamos <strong>Wellhub</strong> (Gold+) e{" "}
            <strong>TotalPass</strong> (TP5+).{" "}
            <Link
              href="/planos"
              className="text-verde-escuro font-semibold underline"
            >
              Saiba como funciona →
            </Link>
          </p>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20 lg:py-24 bg-verde text-white">
        <div className="container-mova">
          <span className="eyebrow !text-[#0E3D26]">Depoimentos</span>
          <h2 className="section-title">Quem treina aqui recomenda</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {site.depoimentos.map((d) => (
              <figure
                key={d.autor}
                className="rounded-2xl bg-white/95 text-preto p-7"
              >
                <div className="flex gap-0.5 mb-3 text-coral">
                  {Array.from({ length: 5 }).map((_, n) => (
                    <Star key={n} size={16} className="fill-coral" aria-hidden />
                  ))}
                </div>
                <blockquote className="mb-4">{d.texto}</blockquote>
                <figcaption className="font-display font-bold">
                  {d.autor}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 lg:py-24 text-center">
        <div className="container-mova">
          <h2 className="section-title">
            Pronto pra fazer do movimento parte da sua vida?
          </h2>
          <p className="lead mx-auto mb-8">
            Vem conhecer a sua nova segunda casa na Asa Norte.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={waLink("Olá! Vim pelo site e quero conhecer o Studio MOVA.")}
              target="_blank"
              rel="noopener"
              className="btn btn-coral text-lg"
            >
              Falar no WhatsApp
            </a>
            <Link href="/contato" className="btn btn-borda text-preto text-lg">
              Ver localização
            </Link>
          </div>
        </div>
      </section>

      {/* EXPLORE O SITE */}
      <section className="py-20 lg:py-24 bg-preto text-white">
        <div className="container-mova">
          <span className="eyebrow !text-[#7FE3AC]">Continue explorando</span>
          <h2 className="section-title">Conheça mais do MOVA</h2>
          <div className="grid md:grid-cols-3 gap-5 mt-9">
            {[
              {
                href: "/o-studio",
                Icone: HomeIcon,
                titulo: "O Studio",
                desc: "Espaço boutique, estrutura completa e galeria de fotos.",
              },
              {
                href: "/metodologia",
                Icone: Target,
                titulo: "Metodologia",
                desc: "As 3 etapas do treino e a reabilitação adaptada.",
              },
              {
                href: "/planos",
                Icone: HandHeart,
                titulo: "Planos",
                desc: "MOVAconfort, Wellhub e TotalPass em detalhes.",
              },
            ].map(({ href, Icone, titulo, desc }) => (
              <Link
                key={href}
                href={href}
                className="group block rounded-2xl bg-[#222824] border border-[#333B36] p-7 transition-all hover:-translate-y-1 hover:border-verde hover:bg-[#26302A]"
              >
                <Icone size={30} className="text-[#7FE3AC] mb-3" aria-hidden />
                <h3 className="text-lg text-[#7FE3AC] mb-2">{titulo}</h3>
                <p className="text-[#B9C6BF] mb-4">{desc}</p>
                <span className="inline-flex items-center gap-1.5 font-display font-bold text-sm uppercase tracking-wide text-coral">
                  Explorar
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
