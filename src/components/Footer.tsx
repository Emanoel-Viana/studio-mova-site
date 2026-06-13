import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { navegacao, waLink } from "@/lib/site";
import type { SiteContent } from "@/lib/content";

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

export function Footer({ content: site }: { content: SiteContent }) {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-preto text-white pt-16 pb-8">
      <div className="container-mova">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-white text-verde-escuro font-display font-black">
                M
              </span>
              <span className="font-display font-extrabold text-xl">
                studioMOVA
              </span>
            </div>
            <p className="text-[#B9C6BF] max-w-[32ch]">
              Sua nova segunda casa! Treino personalizado, turmas reduzidas e
              foco total no seu bem-estar.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-[#7FE3AC] mb-4">
              Fale conosco
            </h3>
            <a
              href={waLink("Olá! Vim pelo site do Studio MOVA.")}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-[#D9E6DE] hover:text-white mb-2.5"
            >
              <Phone size={17} aria-hidden />
              {site.contato.whatsappVisivel}
            </a>
            <a
              href={`mailto:${site.contato.email}`}
              className="flex items-center gap-2 text-[#D9E6DE] hover:text-white mb-2.5 break-all"
            >
              <Mail size={17} aria-hidden />
              {site.contato.email}
            </a>
            <a
              href={site.contato.instagramUrl}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-[#D9E6DE] hover:text-white"
            >
              <InstagramIcon size={17} />
              {site.contato.instagram}
            </a>
          </div>

          <div>
            <h3 className="font-display font-bold text-[#7FE3AC] mb-4">
              Navegação
            </h3>
            {navegacao
              .filter((n) => n.href !== "/")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-[#D9E6DE] hover:text-white mb-2.5"
                >
                  {item.label}
                </Link>
              ))}
          </div>

          <div>
            <h3 className="font-display font-bold text-[#7FE3AC] mb-4">
              Parcerias
            </h3>
            {site.parcerias.map((p) => (
              <a
                key={p.nome}
                href={p.url}
                target="_blank"
                rel="noopener"
                className="block text-[#D9E6DE] hover:text-white mb-2.5"
              >
                {p.nome}
              </a>
            ))}
          </div>
        </div>

        <p className="border-t border-[#2A2F2C] pt-6 text-center text-sm text-[#8A938E]">
          © {ano} {site.nome} — {site.endereco.linha1}, {site.endereco.linha2}{" "}
          — {site.endereco.cidade}
        </p>
      </div>
    </footer>
  );
}
