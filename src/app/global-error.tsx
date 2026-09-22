"use client";

// Fronteira de erro de ÚLTIMO recurso: só dispara se o próprio layout raiz
// falhar. Como substitui o documento inteiro, ela traz o próprio <html>/<body>
// e estilos inline (o globals.css pode não estar aplicado aqui).
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          padding: "2rem",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#14532d",
          color: "#ffffff",
        }}
      >
        <div style={{ maxWidth: 460 }}>
          <h1 style={{ fontSize: "1.6rem", margin: "0 0 .5rem" }}>
            Studio MOVA
          </h1>
          <p style={{ opacity: 0.9, lineHeight: 1.6, margin: "0 0 1.5rem" }}>
            Tivemos um problema inesperado. Tente novamente em instantes.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#e0776b",
              color: "#fff",
              border: 0,
              borderRadius: 999,
              padding: ".8rem 1.6rem",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Tentar de novo
          </button>
        </div>
      </body>
    </html>
  );
}
