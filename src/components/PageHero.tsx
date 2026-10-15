type Props = {
  /** Mantido por compatibilidade das chamadas; não é mais exibido (o título lidera). */
  eyebrow?: string;
  titulo: string;
  descricao?: string;
};

export function PageHero({ titulo, descricao }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-verde-medio to-[#14744A] text-white py-11 sm:py-14 lg:py-20">
      {/* Brilhos decorativos que boiam (atrás do conteúdo, nunca escondem nada) */}
      <div
        aria-hidden
        className="orb-boia pointer-events-none absolute -top-20 -right-16 w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, #9CF7C4 0%, transparent 70%)",
          filter: "blur(55px)",
          opacity: 0.35,
        }}
      />
      <div
        aria-hidden
        className="orb-boia-2 pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, #0E6B41 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.4,
        }}
      />
      {/* textura de pontos sutil (coesão com o hero da home) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="container-mova relative">
        <h1 className="text-[clamp(1.9rem,6vw,3.6rem)] leading-[1.03] tracking-[-0.035em] mb-3.5">
          {titulo}
        </h1>
        {descricao && (
          <p className="max-w-[58ch] text-[#EAFBF1] text-base sm:text-lg leading-relaxed">
            {descricao}
          </p>
        )}
      </div>
    </section>
  );
}
