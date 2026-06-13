import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { ContatoForm } from "./ContatoForm";

export default async function EditarContato() {
  const c = await getContent();

  return (
    <>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-cinza hover:text-preto mb-4"
      >
        <ArrowLeft size={18} aria-hidden />
        Voltar ao painel
      </Link>
      <h1 className="text-3xl mb-2">Contato e avaliação</h1>
      <p className="text-cinza mb-8">
        Dados que aparecem no topo, no rodapé e na página de contato.
      </p>

      <ContatoForm
        inicial={{
          nota: c.avaliacao.nota,
          total: String(c.avaliacao.total),
          fonte: c.avaliacao.fonte,
          email: c.contato.email,
          instagram: c.contato.instagram,
          instagramUrl: c.contato.instagramUrl,
          whatsappVisivel: c.contato.whatsappVisivel,
          whatsapp: c.contato.whatsapp,
          endLinha1: c.endereco.linha1,
          endLinha2: c.endereco.linha2,
          endCidade: c.endereco.cidade,
          endCep: c.endereco.cep,
        }}
      />
    </>
  );
}
