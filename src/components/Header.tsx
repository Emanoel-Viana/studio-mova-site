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
  const [oculto, setOculto] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const atualizar = () => {
      raf = 0;
      const y = window.scrollY;
      // Compacto (esconde a barra superior) com histerese p/ evitar flicker.
      setCompacto((prev) => (prev ? y > 40 : y > 120));
      // Oculto: some ao rolar pra baixo, volta ao rolar pra cima.
      // Perto do topo sempre mostra.
      if (y < 120) setOculto(false);
      else if (y - lastY > 6) setOculto(true);
      else if (lastY - y > 6) setOculto(false);
      lastY = y;
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
    <header
      className={`sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-transform duration-300 will-change-transform ${
        // o "deslizar pra fora" só no celular; no desktop fica fixo como antes
        oculto ? "max-lg:-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Barra superior — prova social + contato */}
      <div
        className={`bg-verde text-white text-sm font-semibold ${
          compacto ? "hidden" : "block"
        }`}
      >
        <div className="container-mova flex items-center justify-between gap-4 py-2">
          <span className="flex items-center gap-1.5">
            <Star size={15} className="fill-white" aria-hidden />
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

      {/* Navegação — sempre aberta; no celular o header inteiro desliza
          pra fora ao rolar pra baixo (e volta ao rolar pra cima). */}
      <nav className="bg-verde-escuro">
        <div
          className={`container-mova flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5 ${
            compacto ? "py-2" : "py-3"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white self-center lg:self-auto shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marca/simbolo-branco.png"
              alt=""
              className={`w-auto transition-all ${compacto ? "h-7" : "h-9"}`}
            />
            <span className="font-display text-xl">
              studio<strong className="font-black text-[#7FE3AC]">MOVA</strong>
            </span>
          </Link>

          <ul className="flex flex-wrap items-center justify-center gap-1.5 lg:gap-1">
            {navegacao.map((item) => {
              const ativo = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={`block px-3.5 py-2.5 rounded-full font-display font-bold text-[0.8rem] uppercase tracking-wide transition-colors ${
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
            <li>
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
