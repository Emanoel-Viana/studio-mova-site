"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type Foto = { src: string; w: number; h: number };

export function Galeria({ fotos }: { fotos: Foto[] }) {
  const [aberto, setAberto] = useState<number | null>(null);

  const fechar = useCallback(() => setAberto(null), []);
  const anterior = useCallback(
    () =>
      setAberto((i) =>
        i === null ? null : (i + fotos.length - 1) % fotos.length,
      ),
    [fotos.length],
  );
  const proximo = useCallback(
    () => setAberto((i) => (i === null ? null : (i + 1) % fotos.length)),
    [fotos.length],
  );

  useEffect(() => {
    if (aberto === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      else if (e.key === "ArrowLeft") anterior();
      else if (e.key === "ArrowRight") proximo();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [aberto, fechar, anterior, proximo]);

  return (
    <>
      <div className="columns-2 lg:columns-3 gap-4 mt-8">
        {fotos.map((f, i) => (
          <button
            key={f.src}
            type="button"
            onClick={() => setAberto(i)}
            aria-label={`Ampliar foto ${i + 1}`}
            className="group relative block w-full mb-4 break-inside-avoid overflow-hidden rounded-[1.25rem] cursor-zoom-in"
          >
            <Image
              src={f.src}
              alt={`Foto ${i + 1} do Studio MOVA`}
              width={f.w}
              height={f.h}
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 grid place-items-center bg-verde-escuro/0 group-hover:bg-verde-escuro/25 transition-colors">
              <ZoomIn
                size={30}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
                aria-hidden
              />
            </span>
          </button>
        ))}
      </div>

      {aberto !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4 sm:p-8"
          onClick={fechar}
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
        >
          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar"
            className="absolute top-4 right-4 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={24} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              anterior();
            }}
            aria-label="Foto anterior"
            className="absolute left-2 sm:left-5 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={26} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              proximo();
            }}
            aria-label="Próxima foto"
            className="absolute right-2 sm:right-5 grid place-items-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={26} aria-hidden />
          </button>
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fotos[aberto].src}
              alt={`Foto ${aberto + 1} do Studio MOVA`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-display">
            {aberto + 1} / {fotos.length}
          </span>
        </div>
      )}
    </>
  );
}
