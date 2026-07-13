"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

// Widget do Cloudflare Turnstile (captcha). Modo "gerenciado": na maioria
// das vezes é invisível/automático. Chama onToken com o token quando resolve
// e com "" quando expira/falha.
export function Turnstile({
  siteKey,
  onToken,
}: {
  siteKey: string;
  onToken: (token: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  const render = () => {
    if (!window.turnstile || !ref.current || idRef.current) return;
    idRef.current = window.turnstile.render(ref.current, {
      sitekey: siteKey,
      callback: (t: string) => onTokenRef.current(t),
      "expired-callback": () => onTokenRef.current(""),
      "error-callback": () => onTokenRef.current(""),
    });
  };

  useEffect(() => {
    render();
    return () => {
      if (idRef.current && window.turnstile) {
        window.turnstile.remove(idRef.current);
        idRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={render}
      />
      <div ref={ref} className="min-h-[65px]" />
    </>
  );
}
