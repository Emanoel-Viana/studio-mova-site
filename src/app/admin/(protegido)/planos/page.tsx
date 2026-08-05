import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { PlanosForm, type CatalogoEditavel } from "./PlanosForm";

export default async function EditarPlanos() {
  const c = await getContent();
  // O `catalogo` do conteúdo é readonly (site é `as const`); o form clona
  // e edita uma cópia mutável dos valores.
  const catalogoInicial = c.catalogo as unknown as CatalogoEditavel;

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
        Ajuste os valores que aparecem na página de planos. As alterações
        aparecem no site na hora.
      </p>

      <PlanosForm catalogoInicial={catalogoInicial} />
    </>
  );
}
