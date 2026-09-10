"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type Depoimento = {
  texto: string;
  autor: string;
  foto: string;
  fonte: string;
};

// Carrossel de depoimentos: rolagem por "arrastar" (mobile) + setas (desktop).
// Usa scroll-snap nativo — leve, acessível e sem dependência externa.
export function DepoimentosCarrossel({
  depoimentos,
}: {
  depoimentos: readonly Depoimento[];
}) {
  const trilhaRef = useRef<HTMLDivElement>(null);

  const rolar = (dir: number) => {
    const el = trilhaRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const passo = card ? card.offsetWidth + 24 : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * passo, behavior: "smooth" });
  };

  return (
    <div className="relative mt-8">
      {/* Setas de navegação */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          type="button"
          onClick={() => rolar(-1)}
          aria-label="Ver depoimento anterior"
          className="grid place-items-center w-11 h-11 rounded-full bg-white/15 border border-white/35 text-white transition-colors hover:bg-white/30"
        >
          <ChevronLeft size={22} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => rolar(1)}
          aria-label="Ver próximo depoimento"
          className="grid place-items-center w-11 h-11 rounded-full bg-white/15 border border-white/35 text-white transition-colors hover:bg-white/30"
        >
          <ChevronRight size={22} aria-hidden />
        </button>
      </div>

      {/* Trilha rolável */}
      <div
        ref={trilhaRef}
        className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
        role="region"
        aria-label="Depoimentos de alunos"
        tabIndex={0}
      >
        {depoimentos.map((d) => {
          const iniciais = d.autor
            .split(" ")
            .slice(0, 2)
            .map((parte) => parte[0])
            .join("")
            .toUpperCase();
          return (
            <figure
              key={d.autor}
              data-card
              className="snap-start shrink-0 basis-[86%] sm:basis-[47%] lg:basis-[31.5%] flex flex-col rounded-2xl bg-white/95 text-preto p-5 sm:p-7"
            >
              <div className="flex gap-0.5 mb-3 text-coral">
                {Array.from({ length: 5 }).map((_, n) => (
                  <Star key={n} size={16} className="fill-coral" aria-hidden />
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
    </div>
  );
}
