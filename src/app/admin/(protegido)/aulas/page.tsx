import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { AulasForm } from "./AulasForm";

export default async function EditarAulas() {
  const c = await getContent();
  const itens = c.aulas.map((a) => ({
    nome: a.nome,
    duracao: a.duracao,
    capacidade: a.capacidade,
    icone: a.icone,
    descricao: a.descricao,
    beneficios: a.beneficios.join("\n"),
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
      <h1 className="text-3xl mb-2">Aulas / modalidades</h1>
      <p className="text-cinza mb-8">
        Edite, adicione, remova ou reordene as aulas exibidas na página de
        planos. As alterações aparecem no site na hora.
      </p>

      <AulasForm itensIniciais={itens} />
    </>
  );
}
