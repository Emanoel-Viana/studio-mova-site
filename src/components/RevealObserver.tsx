"use client";

import { useEffect } from "react";

// Revela suavemente os elementos `.reveal-scroll` quando entram na tela.
// À prova de falha: o estado "escondido" só existe sob `html.reveal-on`
// (ligado pelo script inline do layout apenas quando há suporte e o usuário
// não pediu "menos movimento"). Se este componente não rodar, a rede de
// segurança do layout (timer de 2,5s) revela tudo mesmo assim.
export function RevealObserver() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-scroll"),
    );
    if (alvos.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    alvos.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
