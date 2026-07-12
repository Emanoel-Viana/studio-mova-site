"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

// Barra de CTA fixa no rodapé (só no celular). Aparece depois que o
// usuário rola um pouco, pra não cobrir o hero logo de cara.
export function BarraMobile() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="lg:hidden fixed inset-x-0 bottom-0 z-[60] flex gap-2.5 p-3 bg-white/95 backdrop-blur border-t border-[#DDEDE3] shadow-[0_-6px_20px_rgba(0,0,0,0.08)] transition-transform duration-300"
      style={{ transform: visivel ? "translateY(0)" : "translateY(120%)" }}
    >
      <a
        href={waLink(
          "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
        )}
        target="_blank"
        rel="noopener"
        className="btn btn-coral flex-1 !min-h-0 !py-3 !text-[0.85rem]"
      >
        Agendar avaliação
      </a>
      <a
        href={waLink("Olá! Vim pelo site do Studio MOVA.")}
        target="_blank"
        rel="noopener"
        aria-label="Falar no WhatsApp"
        className="grid place-items-center w-12 shrink-0 rounded-full bg-[#25D366] text-white transition-transform active:scale-95"
      >
        <MessageCircle size={22} aria-hidden />
      </a>
    </div>
  );
}
