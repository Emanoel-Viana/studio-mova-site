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
    window.addEventListener("load", registrar);
    return () => window.removeEventListener("load", registrar);
  }, []);

  return null;
}
