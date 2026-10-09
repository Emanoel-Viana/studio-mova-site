"use client";

import { useEffect } from "react";

// Registra o service worker (apenas em produção, para não atrapalhar o HMR
// do ambiente de desenvolvimento).
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    const registrar = () =>
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    // Se a página já terminou de carregar (comum quando tudo vem do cache e a
    // hidratação acontece depois do evento `load`), o listener nunca dispararia
    // e o SW não seria registrado nessa visita. Registra na hora nesse caso.
    if (document.readyState === "complete") {
      registrar();
      return;
    }
    window.addEventListener("load", registrar, { once: true });
    return () => window.removeEventListener("load", registrar);
  }, []);

  return null;
}
