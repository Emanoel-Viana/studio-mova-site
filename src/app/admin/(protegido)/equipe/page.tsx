import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { EquipeForm } from "./EquipeForm";

export default async function EditarEquipe() {
  const c = await getContent();
  const itens = c.equipe.map((p) => ({
    nome: p.nome,
    papel: p.papel,
    bio: p.bio,
    foto: p.foto,
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
      <h1 className="text-3xl mb-2">Equipe</h1>
      <p className="text-cinza mb-8">
        Profissionais exibidos na página de equipe.
      </p>

      <EquipeForm itensIniciais={itens} />
    </>
  );
}
