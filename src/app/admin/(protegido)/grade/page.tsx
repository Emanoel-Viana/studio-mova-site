import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { GradeForm } from "./GradeForm";

export default async function EditarGrade() {
  const c = await getContent();
  const linhas = c.grade.linhas.map((l) => ({
    hora: l.hora,
    cels: [...l.cels],
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
      <h1 className="text-3xl mb-2">Grade de horários</h1>
      <p className="text-cinza mb-8">
        Horários das aulas coletivas exibidos na página de horários. As
        alterações aparecem no site na hora.
      </p>

      <GradeForm linhasIniciais={linhas} />
    </>
  );
}
