"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, MapPin, Phone, Menu, X } from "lucide-react";
import { navegacao, waLink } from "@/lib/site";

type Props = {
  avaliacao: { nota: string; total: number; fonte: string };
  whatsappVisivel: string;
};

export function Header({ avaliacao, whatsappVisivel }: Props) {
  const [aberto, setAberto] = useState(false);
  const [compacto, setCompacto] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setCompacto(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  // Fecha o menu ao trocar de página
  useEffect(() => {
    setAberto(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
      {/* Barra superior — prova social + contato */}
      <div
        className={`bg-verde text-white text-sm font-semibold transition-all ${
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

      {/* Navegação principal */}
      <nav className="bg-verde-escuro">
        <div
          className={`container-mova flex items-center justify-between gap-4 transition-all ${
            compacto ? "py-2.5" : "py-4"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white shrink-0"
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

          {/* Menu desktop */}
          <ul className="hidden lg:flex items-center gap-1">
            {navegacao.map((item) => {
              const ativo = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={`block px-3.5 py-2.5 rounded-full font-display font-bold text-[0.82rem] uppercase tracking-wide transition-colors ${
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
                className="ml-2 btn btn-coral !min-h-0 !py-2.5 !px-5 !text-[0.82rem]"
              >
                Agendar avaliação
              </a>
            </li>
          </ul>

          {/* Botão do menu mobile */}
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            className="lg:hidden grid place-items-center w-12 h-12 text-white"
          >
            {aberto ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      {/* Overlay do menu mobile */}
      {aberto && (
        <div className="lg:hidden fixed inset-0 top-0 z-40 bg-gradient-to-b from-verde-escuro to-[#0D3A20] flex flex-col items-center justify-center gap-5 pt-20">
          {navegacao.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display font-bold text-2xl text-white"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={waLink(
              "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
            )}
            target="_blank"
            rel="noopener"
            className="btn btn-coral mt-3 text-lg"
          >
            Agendar avaliação
          </a>
        </div>
      )}
    </header>
  );
}
