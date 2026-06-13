import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { DepoimentosForm } from "./DepoimentosForm";

export default async function EditarDepoimentos() {
  const c = await getContent();
  const itens = c.depoimentos.map((d) => ({ texto: d.texto, autor: d.autor }));

  return (
    <>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-cinza hover:text-preto mb-4"
      >
        <ArrowLeft size={18} aria-hidden />
        Voltar ao painel
      </Link>
      <h1 className="text-3xl mb-2">Depoimentos</h1>
      <p className="text-cinza mb-8">
        Avaliações de alunos exibidas na página inicial.
      </p>

      <DepoimentosForm itensIniciais={itens} />
    </>
  );
}
