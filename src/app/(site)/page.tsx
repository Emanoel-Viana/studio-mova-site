import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Check,
  Dumbbell,
  Bike,
  ArrowRight,
  Home as HomeIcon,
  Target,
  HandHeart,
  Flower2,
  Users,
  Baby,
  Sparkles,
} from "lucide-react";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { Contador } from "@/components/Contador";
import { QuizModalidade } from "./QuizModalidade";

const catalogoIcones: Record<string, typeof Dumbbell> = {
  dumbbell: Dumbbell,
  flower: Flower2,
  bike: Bike,
  users: Users,
  baby: Baby,
  sparkles: Sparkles,
};

export default async function Home() {
  const site = await getContent();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#34C97E] via-verde-medio to-[#14744A] text-white">
        {/* brilhos decorativos (profundidade/calor) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, #9CF7C4 0%, transparent 70%)",
            filter: "blur(50px)",
            opacity: 0.45,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-12 w-72 h-72 rounded-full"
          style={{
            background: "radial-gradient(circle, #0E6B41 0%, transparent 70%)",
            filter: "blur(55px)",
            opacity: 0.5,
          }}
        />
        <div className="container-mova relative grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center py-12 sm:py-16 lg:py-24">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/35 px-4 py-2 text-sm font-medium mb-6">
              <Star size={16} className="fill-white" aria-hidden />
              <strong className="font-display">
                <Contador value={Number(site.avaliacao.nota)} decimais={2} />
              </strong>{" "}
              — <Contador value={site.avaliacao.total} /> avaliações no{" "}
              {site.avaliacao.fonte}
            </div>
            <h1 className="text-[clamp(1.8rem,6.5vw,4rem)] leading-[1.08] mb-3">
              {site.slogan}
            </h1>
            <p className="font-display font-bold text-[clamp(1.1rem,2.4vw,1.45rem)] text-[#D9FBE8] mb-5">
              {site.subSlogan}
            </p>
            <p className="max-w-[46ch] text-[#EAFBF1] text-lg mb-8">
              Academia boutique na Asa Norte: musculação, pilates, bike e
              coletivas em turmas de até 4 alunos, com professor ao seu lado do
              início ao fim.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={waLink(
                  "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
                )}
                target="_blank"
                rel="noopener"
                className="btn btn-coral text-lg group"
              >
                Agende sua sessão avaliativa
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
              <a
                href={waLink("Olá! Vim pelo site e quero conhecer o Studio MOVA.")}
                target="_blank"
                rel="noopener"
                className="btn btn-borda text-white text-lg"
              >
                Conhecer sem compromisso
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-7">
              {site.heroDestaques.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-[#EAFBF1] font-medium"
                >
                  <Check size={18} className="text-[#9BE8BF]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square sm:aspect-[4/5] rounded-[1.25rem] overflow-hidden shadow-2xl ring-1 ring-white/20">
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
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container-mova grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative aspect-square sm:aspect-[4/5] rounded-[1.25rem] overflow-hidden shadow-lg">
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

      {/* NÚMEROS */}
      <section className="py-12 lg:py-16 bg-verde-escuro text-white">
        <div className="container-mova">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-9 text-center">
            {[
              { num: "4", label: "alunos por turma, no máximo" },
              { num: "6", label: "modalidades pra você escolher" },
              { num: "4.94", label: "nota de avaliação no Wellhub" },
              { num: "100%", label: "treino com professor do seu lado" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display font-black text-[clamp(2.6rem,9vw,4rem)] leading-none text-coral">
                  {s.num}
                </div>
                <p className="text-[#D6EEDF] mt-2.5 text-sm max-w-[16ch] mx-auto">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="py-12 sm:py-16 lg:py-24 bg-cinza-claro">
        <div className="container-mova">
          <span className="eyebrow">Para quem é o MOVA</span>
          <h2 className="section-title">Talvez você se reconheça aqui</h2>
          <p className="lead mb-10 max-w-[60ch]">
            Recebemos gente de todas as idades e níveis. Veja se algum desses é
            o seu momento — em todos eles, a gente sabe te ajudar.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {site.publico.map((p) => (
              <div
                key={p.titulo}
                className="rounded-2xl bg-white border border-[#E2EEE7] p-5 sm:p-7 transition-all hover:-translate-y-1 hover:border-verde hover:shadow-[0_14px_34px_rgba(30,155,94,0.12)]"
              >
                <div className="grid place-items-center w-11 h-11 rounded-full bg-verde-claro mb-4">
                  <Check size={22} className="text-verde-medio" aria-hidden />
                </div>
                <h3 className="text-lg mb-2">{p.titulo}</h3>
                <p className="text-cinza">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={waLink(
                "Olá! Vim pelo site do Studio MOVA e quero saber se o treino é pra mim.",
              )}
              target="_blank"
              rel="noopener"
              className="btn btn-coral text-lg"
            >
              Me identifiquei — quero começar
            </a>
          </div>
        </div>
      </section>

      {/* METODOLOGIA */}
      <section className="py-12 sm:py-16 lg:py-24 bg-verde-escuro text-white">
        <div className="container-mova">
          <span className="eyebrow !text-[#7FE3AC]">Como funcionamos</span>
          <h2 className="section-title">
            60 minutos, 3 etapas, máximo 4 alunos
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {site.metodologia.map((etapa, i) => (
              <div
                key={etapa.titulo}
                className="rounded-2xl bg-white/[0.07] border border-white/15 p-5 sm:p-7"
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
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container-mova">
          <span className="eyebrow">Modalidades</span>
          <h2 className="section-title">O que você encontra no MOVA</h2>
          <p className="lead mb-10 max-w-[60ch]">
            Um centro completo de movimento — do treino de força ao pilates, da
            bike às aulas coletivas, para todas as idades.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {site.catalogo.modalidades.map((m) => {
              const Icone = catalogoIcones[m.icone] ?? Dumbbell;
              return (
                <div
                  key={m.id}
                  className="rounded-2xl bg-white border border-[#E2EEE7] p-6 transition-all hover:-translate-y-1 hover:border-verde hover:shadow-[0_14px_34px_rgba(30,155,94,0.12)]"
                >
                  <div className="grid place-items-center w-14 h-14 rounded-2xl bg-verde-claro mb-4">
                    <Icone
                      size={28}
                      className="text-verde-medio"
                      aria-hidden
                    />
                  </div>
                  <h3 className="text-xl mb-1">{m.titulo}</h3>
                  <p className="text-cinza">{m.tagline}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <Link href="/planos" className="btn btn-escuro">
              Ver planos e valores
            </Link>
          </div>
        </div>
      </section>

      {/* SESSÃO AVALIATIVA */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-verde-medio to-[#14744A] text-white text-center">
        <div className="container-mova">
          <span className="eyebrow !text-[#9BE8BF]">O primeiro passo</span>
          <h2 className="section-title">Comece pela sessão avaliativa</h2>
          <p className="max-w-[60ch] mx-auto text-[#EAFBF1] text-lg mb-8">
            {site.sessaoAvaliativa.intro}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-9">
            {site.sessaoAvaliativa.etapas.map((item) => (
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
        </div>
      </section>

      {/* QUIZ — descubra sua modalidade */}
      <section className="py-12 sm:py-16 lg:py-24 bg-verde-escuro text-white">
        <div className="container-mova text-center">
          <span className="eyebrow !text-[#7FE3AC]">
            Não sabe por onde começar?
          </span>
          <h2 className="section-title">Descubra a sua modalidade ideal</h2>
          <p className="lead mx-auto mb-8 !text-[#D6EEDF]">
            Responda 3 perguntinhas rápidas e a gente te mostra o treino
            perfeito pro seu momento.
          </p>
          <QuizModalidade />
        </div>
      </section>

      {/* PLANOS & MODALIDADES */}
      <section className="py-12 sm:py-16 lg:py-24 bg-verde-claro">
        <div className="container-mova text-center">
          <span className="eyebrow">Planos &amp; Modalidades</span>
          <h2 className="section-title">Escolha o seu movimento</h2>
          <p className="lead mx-auto mb-8">
            Musculação, Pilates, Bike, Coletivas e turmas para crianças e
            adolescentes — escolha o que quer treinar e monte o plano ideal.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto mb-8">
            {site.catalogo.modalidades.map((m) => {
              const Icone = catalogoIcones[m.icone] ?? Dumbbell;
              return (
                <Link
                  key={m.id}
                  href="/planos"
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white border border-[#DDEDE3] p-4 transition-all hover:border-verde hover:-translate-y-1"
                >
                  <Icone size={26} className="text-verde-medio" aria-hidden />
                  <span className="font-display font-bold text-sm">
                    {m.nome}
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="text-cinza mb-7">
            Quer o pacote completo? Conheça também o{" "}
            <strong>MOVA Clube</strong> e o <strong>Club Premium</strong> —
            várias modalidades numa rotina só.
          </p>
          <Link href="/planos" className="btn btn-coral text-lg">
            Ver todos os planos e valores
          </Link>
          <p className="mt-6 text-cinza text-sm">
            Também aceitamos <strong>Wellhub</strong> (Gold+) e{" "}
            <strong>TotalPass</strong> (TP5+).
          </p>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-12 sm:py-16 lg:py-24 bg-verde text-white">
        <div className="container-mova">
          <span className="eyebrow !text-[#0E3D26]">Depoimentos</span>
          <h2 className="section-title">Quem treina aqui recomenda</h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
            <span className="flex gap-0.5 text-coral">
              {Array.from({ length: 5 }).map((_, n) => (
                <Star key={n} size={18} className="fill-coral" aria-hidden />
              ))}
            </span>
            <span className="font-display font-bold text-xl">
              {site.avaliacao.nota}
            </span>
            <span className="text-[#DFF5E8]">
              · {site.avaliacao.total} avaliações no {site.avaliacao.fonte}
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-10 items-start">
            {site.depoimentos.map((d) => {
              const iniciais = d.autor
                .split(" ")
                .slice(0, 2)
                .map((parte) => parte[0])
                .join("")
                .toUpperCase();
              return (
                <figure
                  key={d.autor}
                  className="flex flex-col rounded-2xl bg-white/95 text-preto p-5 sm:p-7 h-full"
                >
                  <div className="flex gap-0.5 mb-3 text-coral">
                    {Array.from({ length: 5 }).map((_, n) => (
                      <Star
                        key={n}
                        size={16}
                        className="fill-coral"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className="mb-5 flex-1">{d.texto}</blockquote>
                  <figcaption className="flex items-center gap-3">
                    {d.foto ? (
                      <span className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden ring-2 ring-verde-claro">
                        <Image
                          src={d.foto}
                          alt={`Foto de ${d.autor}`}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </span>
                    ) : (
                      <span
                        className="grid place-items-center w-11 h-11 shrink-0 rounded-full bg-verde-claro text-verde-escuro font-display font-bold"
                        aria-hidden
                      >
                        {iniciais}
                      </span>
                    )}
                    <span>
                      <span className="block font-display font-bold leading-tight">
                        {d.autor}
                      </span>
                      {d.fonte && (
                        <span className="block text-sm text-cinza">
                          via {d.fonte}
                        </span>
                      )}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <a
              href={site.parcerias[0].url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/35 px-5 py-2.5 font-medium transition-colors hover:bg-white/25"
            >
              <Star size={18} className="fill-white" aria-hidden />
              Ver as {site.avaliacao.total} avaliações no {site.avaliacao.fonte}
            </a>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 sm:py-16 lg:py-24 text-center">
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
      <section className="py-12 sm:py-16 lg:py-24 bg-preto text-white">
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
                desc: "Todas as modalidades, níveis, Clube, Wellhub e TotalPass.",
              },
            ].map(({ href, Icone, titulo, desc }) => (
              <Link
                key={href}
                href={href}
                className="group block rounded-2xl bg-[#222824] border border-[#333B36] p-5 sm:p-7 transition-all hover:-translate-y-1 hover:border-verde hover:bg-[#26302A]"
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
