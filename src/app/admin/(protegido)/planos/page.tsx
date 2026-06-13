import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { PlanosForm, type PlanoEditavel } from "./PlanosForm";

export default async function EditarPlanos() {
  const content = await getContent();

  const planos: PlanoEditavel[] = content.planos.map((p) => ({
    freq: p.freq,
    desc: p.desc,
    preco: p.preco,
    icone: p.icone,
    destaque: p.destaque,
    selo: "selo" in p ? p.selo : "",
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
      <h1 className="text-3xl mb-2">Planos e preços</h1>
      <p className="text-cinza mb-8">
        Edite os valores e descrições. Ao salvar, o site é atualizado na hora.
      </p>

      <PlanosForm planosIniciais={planos} />
    </>
  );
}
