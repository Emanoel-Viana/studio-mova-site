import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { ModalidadesForm } from "./ModalidadesForm";

export default async function EditarModalidades() {
  const c = await getContent();
  const itens = c.modalidades.map((m) => ({
    titulo: m.titulo,
    desc: m.desc,
    imagem: m.imagem,
    emBreve: m.emBreve,
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
      <h1 className="text-3xl mb-2">Modalidades</h1>
      <p className="text-cinza mb-8">
        O que o studio oferece — aparece na página inicial.
      </p>

      <ModalidadesForm itensIniciais={itens} />
    </>
  );
}
