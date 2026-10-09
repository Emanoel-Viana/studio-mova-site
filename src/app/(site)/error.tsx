"use client";

// Fronteira de erro das PÁGINAS internas: renderiza dentro do layout do site
// (Header/Footer preservados), diferente do error.tsx raiz que substitui a
// área toda. Assim um erro numa página não derruba o cabeçalho e o rodapé.
import Link from "next/link";
import { useEffect } from "react";

export default function ErroSite({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Erro renderizando página (site):", error);
  }, [error]);

  return (
    <section className="min-h-[60vh] grid place-items-center px-6 py-16 text-center">
      <div className="max-w-md">
        <span className="eyebrow">Ops…</span>
        <h1 className="section-title">Algo deu errado por aqui</h1>
        <p className="lead mx-auto mb-8">
          Tivemos um probleminha ao carregar esta página. Você pode tentar de
          novo ou voltar ao início — e, se precisar, é só chamar a gente no
          WhatsApp.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => retry()} className="btn btn-coral">
            Tentar de novo
          </button>
          <Link href="/" className="btn btn-borda text-preto">
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}
