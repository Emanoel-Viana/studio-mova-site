"use client";

// Fronteira de erro de ÚLTIMO recurso: só dispara se o próprio layout raiz
// falhar. Como substitui o documento inteiro, ela traz o próprio <html>/<body>
// e estilos inline (o globals.css pode não estar aplicado aqui).
export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Erro — Studio MOVA</title>
        <meta name="robots" content="noindex" />
      </head>
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
            onClick={() => retry()}
            style={{
              // Branco sobre verde escuro: contraste alto (o coral sobre verde
              // ficava em ~3:1). Aqui é fundo do documento (#14532d).
              background: "#ffffff",
              color: "#0f3d21",
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
