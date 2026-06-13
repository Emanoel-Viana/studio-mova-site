import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { HorariosForm } from "./HorariosForm";

export default async function EditarHorarios() {
  const c = await getContent();

  const linhas = c.horarios.map((h) => ({
    dias: h.dias,
    faixas: [...h.faixas].join(" • "),
  }));

  return (
    <>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-cinza hover:text-preto mb-4"
      >
        <ArrowLeft size={18} aria-hidden />
        Voltar ao painel
      </Link>
      <h1 className="text-3xl mb-2">Horários</h1>
      <p className="text-cinza mb-8">
        Separe múltiplas faixas com{" "}
        <span className="font-semibold">•</span> (ex.: 06h às 13h • 15h às 20h).
      </p>

      <HorariosForm linhasIniciais={linhas} />
    </>
  );
}
