"use client";

import { useEffect, useRef, useState } from "react";

// Anima um número contando de 0 até o valor quando entra na tela.
// Respeita prefers-reduced-motion (mostra o valor final direto).
export function Contador({
  value,
  decimais = 0,
}: {
  value: number;
  decimais?: number;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    let feito = false;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !feito) {
          feito = true;
          const t0 = performance.now();
          const dur = 1200;
          const tick = (t: number) => {
            const p = Math.min((t - t0) / dur, 1);
            setN(value * (1 - Math.pow(1 - p, 3)));
            if (p < 1) raf = requestAnimationFrame(tick);
            else setN(value);
          };
          raf = requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{n.toFixed(decimais)}</span>;
}
