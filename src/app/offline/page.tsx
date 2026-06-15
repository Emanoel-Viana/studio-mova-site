import type { Metadata } from "next";
import { WifiOff } from "lucide-react";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sem conexão",
  robots: { index: false, follow: false },
};

// Página exibida pelo service worker quando o usuário está offline e a
// página pedida ainda não foi visitada/cacheada.
export default function Offline() {
  return (
    <main className="min-h-screen grid place-items-center bg-verde-escuro text-white text-center px-6">
      <div className="max-w-md">
        <WifiOff size={48} className="mx-auto mb-5 text-[#7FE3AC]" aria-hidden />
        <h1 className="text-3xl mb-3">Você está sem internet</h1>
        <p className="text-[#D6EEDF] mb-8">
          Parece que a conexão caiu. Assim que voltar, é só recarregar. Se
          preferir, fale com a gente agora pelo WhatsApp.
        </p>
        <a
          href={waLink("Olá! Vim pelo app do Studio MOVA.")}
          target="_blank"
          rel="noopener"
          className="btn btn-coral text-lg"
        >
          Falar no WhatsApp
        </a>
        <p className="mt-6 text-sm text-[#9FD9BC]">
          {site.nome} — {site.contato.whatsappVisivel}
        </p>
      </div>
    </main>
  );
}
