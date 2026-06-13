import { ImageIcon } from "lucide-react";

type Props = {
  label: string;
  ratio?: string;
  className?: string;
  escuro?: boolean;
};

// Placeholder visual até as fotos reais chegarem (ver img/LEIA-ME.txt).
export function FotoPlaceholder({
  label,
  ratio = "4 / 3",
  className = "",
  escuro = false,
}: Props) {
  return (
    <div
      className={`foto-ph ${className} ${
        escuro
          ? "!bg-white/10 !border-white/40 !text-white/80"
          : ""
      }`}
      style={{ aspectRatio: ratio }}
    >
      <ImageIcon size={26} aria-hidden />
      <span>{label}</span>
    </div>
  );
}
