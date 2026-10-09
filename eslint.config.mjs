import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Padrões legítimos de inicialização a partir de estado externo do
      // navegador APÓS a hidratação (ler localStorage no ThemeToggle, aplicar
      // reduced-motion no Contador, resetar o captcha quando a action retorna
      // erro no LoginForm). Não são bugs; mantemos como AVISO pra o CI não
      // travar, sem esconder ocorrências novas de verdade.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
