type Props = {
  eyebrow: string;
  titulo: string;
  descricao?: string;
};

export function PageHero({ eyebrow, titulo, descricao }: Props) {
  return (
    <section className="bg-gradient-to-br from-verde-medio to-[#14744A] text-white py-10 sm:py-14 lg:py-20">
      <div className="container-mova">
        <span className="eyebrow !text-[#9BE8BF]">{eyebrow}</span>
        <h1 className="text-[clamp(1.6rem,5vw,3rem)] mb-3">{titulo}</h1>
        {descricao && (
          <p className="max-w-[60ch] text-[#EAFBF1] text-base sm:text-lg">
            {descricao}
          </p>
        )}
      </div>
    </section>
  );
}
