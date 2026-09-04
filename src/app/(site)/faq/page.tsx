import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Dúvidas sobre o Studio MOVA: como funciona o treino, turmas, sessão avaliativa, planos, Wellhub e TotalPass.",
};

export default async function FAQ() {
  const { faq: perguntas } = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Perguntas frequentes"
        titulo="Tudo que você precisa saber"
        descricao="As dúvidas mais comuns de quem está chegando ao MOVA. Não achou a sua? É só chamar no WhatsApp."
      />

      <section className="py-8 sm:py-10 lg:py-14">
        <div className="container-mova max-w-3xl">
          <div className="grid gap-3">
            {perguntas.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#E2EEE7] bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-display font-bold text-lg">
                  {item.q}
                  <Plus
                    size={22}
                    className="text-verde-medio shrink-0 transition-transform group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="px-5 pb-5 text-cinza">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center rounded-2xl bg-verde-claro p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl mb-3">Ficou com outra dúvida?</h2>
            <p className="text-cinza mb-6">
              A gente responde rapidinho no WhatsApp.
            </p>
            <a
              href={waLink("Olá! Tenho uma dúvida sobre o Studio MOVA.")}
              target="_blank"
              rel="noopener"
              className="btn btn-coral"
            >
              Tirar minha dúvida
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
