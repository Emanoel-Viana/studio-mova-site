// Observabilidade de erros de SERVIDOR (Next `onRequestError`). Antes, um erro
// numa página/action só aparecia no log do contêiner (que some a cada deploy)
// e o `error.tsx` loga apenas no navegador. Aqui o erro é registrado no log do
// servidor e, se `N8N_ERROR_WEBHOOK_URL` estiver configurada, avisa por webhook
// (best-effort, com teto de tempo — nunca segura a requisição).
import { type Instrumentation } from "next";

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context,
) => {
  const mensagem = err instanceof Error ? err.message : String(err);
  const digest =
    typeof err === "object" && err !== null && "digest" in err
      ? String((err as { digest?: unknown }).digest)
      : undefined;
  const stack = err instanceof Error ? err.stack : undefined;

  console.error(
    `[onRequestError] ${request.method} ${request.path} (${context.routeType})`,
    mensagem,
    digest ? `digest=${digest}` : "",
  );

  const url = process.env.N8N_ERROR_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mensagem,
        digest,
        stack,
        path: request.path,
        method: request.method,
        routeType: context.routeType,
        quando: new Date().toISOString(),
        origem: "site-studiomova",
      }),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    // Se o webhook falhar, o console.error acima já preservou o erro.
  }
};
