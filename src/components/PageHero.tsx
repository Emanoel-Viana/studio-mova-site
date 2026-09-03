type Props = {
  eyebrow: string;
  titulo: string;
  descricao?: string;
};

export function PageHero({ eyebrow, titulo, descricao }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-verde-medio to-[#14744A] text-white py-10 sm:py-14 lg:py-20">
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
      <div className="container-mova relative">
        <span className="eyebrow !text-[#9BE8BF]">{eyebrow}</span>
        <h1 className="text-[clamp(1.5rem,5.5vw,3rem)] leading-[1.1] mb-3">{titulo}</h1>
        {descricao && (
          <p className="max-w-[60ch] text-[#EAFBF1] text-base sm:text-lg">
            {descricao}
          </p>
        )}
      </div>
    </section>
  );
}
