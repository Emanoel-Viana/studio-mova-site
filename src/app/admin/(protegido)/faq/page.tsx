import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { FaqForm } from "./FaqForm";

export default async function EditarFaq() {
  const c = await getContent();
  const itens = c.faq.map((d) => ({ q: d.q, a: d.a }));

  return (
    <>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-cinza hover:text-preto mb-4"
      >
        <ArrowLeft size={18} aria-hidden />
        Voltar ao painel
      </Link>
      <h1 className="text-3xl mb-2">Perguntas frequentes</h1>
      <p className="text-cinza mb-8">
        Edite, adicione, remova ou reordene as perguntas do FAQ. As alterações
        aparecem no site na hora.
      </p>

      <FaqForm itensIniciais={itens} />
    </>
  );
}
