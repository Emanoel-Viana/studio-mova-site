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
  // Blindagem: se `value` vier NaN (ex.: nota editada como "4,94" no admin e
  // convertida errado), cai pra 0 em vez de renderizar "NaN".
  const seguro = Number.isFinite(value) ? value : 0;
  // Inicia com o valor FINAL: assim o SSR e navegadores sem JS mostram o número
  // real (um robô nunca vê "0"); a animação, quando roda, reinicia do 0.
  const [n, setN] = useState(seguro);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // já está no valor final
    }
    // Se o número já está visível na carga (acima da dobra), NÃO anima — evita
    // um flash de "final → 0 → final". Só anima o que está abaixo da dobra.
    const rect = el.getBoundingClientRect();
    const jaVisivel = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    if (jaVisivel) return;
    setN(0); // abaixo da dobra: reinicia (invisível) e anima ao chegar
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
            setN(seguro * (1 - Math.pow(1 - p, 3)));
            if (p < 1) raf = requestAnimationFrame(tick);
            else setN(seguro);
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
  }, [seguro]);

  // Formato pt-BR (vírgula decimal), coerente com o resto do site.
  return (
    <span ref={ref}>
      {n.toLocaleString("pt-BR", {
        minimumFractionDigits: decimais,
        maximumFractionDigits: decimais,
      })}
    </span>
  );
}
