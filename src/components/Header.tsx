"use client";

import { useEffect, useRef, useState } from "react";
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
  const navRef = useRef<HTMLUListElement>(null);

  // No celular o menu é uma linha deslizável; ao mudar de página,
  // centraliza a aba ativa para ela ficar sempre visível.
  useEffect(() => {
    const ul = navRef.current;
    if (!ul) return;
    const ativo = ul.querySelector<HTMLElement>('[aria-current="page"]');
    if (!ativo) return;
    const ulRect = ul.getBoundingClientRect();
    const aRect = ativo.getBoundingClientRect();
    const left =
      ul.scrollLeft + (aRect.left - ulRect.left) - ul.clientWidth / 2 + aRect.width / 2;
    ul.scrollTo({ left, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    let raf = 0;
    const atualizar = () => {
      raf = 0;
      const y = window.scrollY;
      // Histerese: compacta só passando de 120px e só desfaz abaixo de 40px.
      // A zona morta (80px) evita o flicker quando a barra superior some/volta
      // e muda a altura do header perto do limite.
      setCompacto((anterior) => (anterior ? y > 40 : y > 120));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(atualizar);
    };
    atualizar(); // estado inicial correto (ex.: refresh já rolado)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
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

      {/* Navegação — no desktop fica toda aberta; no celular vira uma linha
          única deslizável (arrasta de lado) pra ocupar menos espaço. */}
      <nav className="bg-verde-escuro">
        <div
          className={`container-mova flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 lg:gap-2.5 ${
            compacto ? "py-2" : "py-2.5 lg:py-3"
          }`}
        >
          {/* Linha do topo no celular: logo + Agendar. No desktop o wrapper
              "some" (contents) e o logo volta a ser item direto, como antes. */}
          <div className="flex items-center justify-between gap-3 lg:contents">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-white shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/marca/simbolo-branco.png"
                alt=""
                className={`w-auto transition-all ${compacto ? "h-7" : "h-8 lg:h-9"}`}
              />
              <span className="font-display text-xl">
                studio<strong className="font-black text-[#7FE3AC]">MOVA</strong>
              </span>
            </Link>

            {/* Agendar compacto — só no celular (fica fixo, fora da rolagem) */}
            <a
              href={waLink(
                "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
              )}
              target="_blank"
              rel="noopener"
              className="btn btn-coral !min-h-0 !py-2 !px-3.5 !text-[0.72rem] shrink-0 lg:hidden"
            >
              Agendar
            </a>
          </div>

          <ul
            ref={navRef}
            className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap lg:flex-wrap lg:justify-center lg:overflow-visible lg:gap-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {navegacao.map((item) => {
              const ativo = pathname === item.href;
              return (
                <li key={item.href} className="shrink-0">
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
            {/* Agendar no fim — só no desktop (no celular ele está na linha do topo) */}
            <li className="hidden lg:block shrink-0">
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
