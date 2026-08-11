"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Botão de modo claro/escuro. O tema fica em localStorage ("tema") e a classe
// `dark` no <html> é aplicada por um script no layout (antes da tela pintar,
// pra não piscar). Aqui só sincronizamos o ícone e alternamos.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [escuro, setEscuro] = useState(false);

  useEffect(() => {
    setEscuro(document.documentElement.classList.contains("dark"));
  }, []);

  function alternar() {
    const novo = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", novo);
    try {
      localStorage.setItem("tema", novo ? "dark" : "light");
    } catch {}
    setEscuro(novo);
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={escuro ? "Ativar modo claro" : "Ativar modo escuro"}
      title={escuro ? "Modo claro" : "Modo escuro"}
      className={
        "grid place-items-center w-9 h-9 rounded-full text-white/90 hover:bg-white/15 transition-colors " +
        className
      }
    >
      {escuro ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
