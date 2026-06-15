"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, MapPin, Phone } from "lucide-react";
import { navegacao, waLink } from "@/lib/site";

type Props = {
  avaliacao: { nota: string; total: number; fonte: string };
  whatsappVisivel: string;
};

export function Header({ avaliacao, whatsappVisivel }: Props) {
  const [compacto, setCompacto] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const atualizar = () => {
      raf = 0;
      const y = window.scrollY;
      // Histerese: encolhe passando de 120px, volta abaixo de 40px (evita flicker).
      setCompacto((prev) => (prev ? y > 40 : y > 120));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(atualizar);
    };
    atualizar();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
      {/* Barra superior — prova social + contato (some ao rolar) */}
      <div
        className={`bg-verde text-white text-[0.78rem] sm:text-sm font-semibold ${
          compacto ? "hidden" : "block"
        }`}
      >
        <div className="container-mova flex items-center justify-between gap-4 py-1 sm:py-2">
          <span className="flex items-center gap-1.5">
            <Star size={14} className="fill-white" aria-hidden />
            {avaliacao.nota} — {avaliacao.total} avaliações no {avaliacao.fonte}
          </span>
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={waLink("Olá! Vim pelo site do Studio MOVA.")}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1.5 hover:underline"
            >
              <Phone size={15} aria-hidden />
              {whatsappVisivel}
            </a>
            <Link
              href="/contato"
              className="flex items-center gap-1.5 hover:underline"
            >
              <MapPin size={15} aria-hidden />
              Asa Norte, Brasília
            </Link>
          </div>
        </div>
      </div>

      {/* Navegação — fixa e sempre visível, em versão compacta no celular. */}
      <nav className="bg-verde-escuro">
        <div
          className={`container-mova flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1 lg:gap-2.5 ${
            compacto ? "py-1 lg:py-2" : "py-1.5 lg:py-3"
          }`}
        >
          {/* Linha do topo no celular: logo + Agendar. No desktop o wrapper
              "some" (contents) e o logo volta a ser item direto, como antes. */}
          <div className="flex items-center justify-between gap-3 lg:contents">
            <Link
              href="/"
              className="flex items-center gap-2 text-white shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/marca/simbolo-branco.png"
                alt=""
                className={`w-auto transition-all ${
                  compacto ? "h-6 lg:h-7" : "h-7 lg:h-9"
                }`}
              />
              <span className="font-display text-lg lg:text-xl">
                studio<strong className="font-black text-[#7FE3AC]">MOVA</strong>
              </span>
            </Link>

            {/* Agendar compacto — só no celular */}
            <a
              href={waLink(
                "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
              )}
              target="_blank"
              rel="noopener"
              className="btn btn-coral !min-h-0 !py-1.5 !px-3 !text-[0.7rem] shrink-0 lg:hidden"
            >
              Agendar
            </a>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-1 lg:gap-1">
            {navegacao.map((item) => {
              const ativo = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={`block rounded-full font-display font-bold uppercase tracking-wide transition-colors px-2.5 py-1.5 text-[0.72rem] lg:px-3.5 lg:py-2.5 lg:text-[0.8rem] ${
                      ativo
                        ? "bg-white text-verde-escuro"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {/* Agendar no fim — só no desktop (no celular está na linha do topo) */}
            <li className="hidden lg:block">
              <a
                href={waLink(
                  "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
                )}
                target="_blank"
                rel="noopener"
                className="btn btn-coral !min-h-0 !py-2.5 !px-4 !text-[0.8rem]"
              >
                Agendar avaliação
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
