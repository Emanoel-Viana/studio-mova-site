import { LoginForm } from "./LoginForm";

// Renderiza a cada request para ler a chave do Turnstile do ambiente
// (env NÃO-NEXT_PUBLIC não é "assada" no build do EasyPanel).
export const dynamic = "force-dynamic";

export default function LoginAdmin() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY ?? "";
  return <LoginForm turnstileSiteKey={turnstileSiteKey} />;
}
