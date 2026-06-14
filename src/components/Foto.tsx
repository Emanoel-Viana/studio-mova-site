import Image from "next/image";
import { FotoPlaceholder } from "./FotoPlaceholder";

type Props = {
  src?: string;
  label: string;
  ratio?: string;
  className?: string;
  escuro?: boolean;
  sizes?: string;
  priority?: boolean;
};

// Mostra a foto real quando há `src`; senão, cai no placeholder.
export function Foto({
  src,
  label,
  ratio = "4 / 3",
  className = "",
  escuro = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: Props) {
  if (!src) {
    return (
      <FotoPlaceholder
        label={label}
        ratio={ratio}
        className={className}
        escuro={escuro}
      />
    );
  }
  return (
    <div
      className={`relative overflow-hidden rounded-[1.25rem] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
