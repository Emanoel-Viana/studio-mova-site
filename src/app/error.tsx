"use client";

// Fronteira de erro do app: se um Server/Client Component desta árvore lançar,
// mostramos uma tela amigável (dentro do layout raiz) em vez de um 500 cru.
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Loga no servidor/telemetria; não expõe detalhe ao usuário.
    console.error("Erro renderizando página:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] grid place-items-center px-6 py-16 text-center">
      <div className="max-w-md">
        <span className="eyebrow">Ops…</span>
        <h1 className="section-title">Algo deu errado por aqui</h1>
        <p className="lead mx-auto mb-8">
          Tivemos um probleminha ao carregar esta página. Você pode tentar de
          novo ou voltar ao início — e, se precisar, é só chamar a gente no
          WhatsApp.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn btn-coral">
            Tentar de novo
          </button>
          <Link href="/" className="btn btn-borda text-preto">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
