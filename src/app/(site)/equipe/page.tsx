import type { Metadata } from "next";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Foto } from "@/components/Foto";

export const metadata: Metadata = {
  title: "Equipe",
  description:
    "Conheça a equipe do Studio MOVA — profissionais dedicados que acompanham cada treino de perto.",
};

export default async function Equipe() {
  const site = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Equipe"
        titulo="Quem cuida de você no MOVA"
        descricao="Profissionais dedicados, que conhecem você pelo nome e acompanham cada movimento do seu treino."
      />

      <section className="py-16 lg:py-20">
        <div className="container-mova">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {site.equipe.map((pessoa) => (
              <div key={pessoa.nome} className="text-center">
                <div className="w-48 mx-auto mb-5">
                  <Foto
                    src={pessoa.foto || undefined}
                    label={`Professor(a) ${pessoa.nome}`}
                    ratio="1 / 1"
                    className="!rounded-full shadow-md"
                    sizes="200px"
                  />
                </div>
                <h2 className="text-xl">{pessoa.nome}</h2>
                <p className="text-verde-medio font-semibold mb-2">
                  {pessoa.papel}
                </p>
                <p className="text-cinza">{pessoa.bio}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-cinza max-w-2xl mx-auto">
            É essa equipe que vai te acompanhar de pertinho em cada treino. 💚
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-verde-claro text-center">
        <div className="container-mova">
          <h2 className="section-title">Treine com quem se importa</h2>
          <p className="lead mx-auto mb-8">
            Venha conhecer a equipe pessoalmente na sua sessão avaliativa.
          </p>
          <a
            href={waLink(
              "Olá! Quero conhecer a equipe do Studio MOVA e agendar uma sessão avaliativa.",
            )}
            target="_blank"
            rel="noopener"
            className="btn btn-coral text-lg"
          >
            Agendar sessão avaliativa
          </a>
        </div>
      </section>
    </>
  );
}
