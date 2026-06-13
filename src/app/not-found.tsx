import Link from "next/link";
import { waLink } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32 text-center">
      <div className="container-mova">
        <p className="font-display font-black text-6xl text-verde mb-4">404</p>
        <h1 className="section-title">Página não encontrada</h1>
        <p className="lead mx-auto mb-8">
          O link que você seguiu não existe ou foi movido. Mas a gente te ajuda
          a chegar onde quer.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-escuro">
            Voltar ao início
          </Link>
          <a
            href={waLink("Olá! Vim pelo site do Studio MOVA.")}
            target="_blank"
            rel="noopener"
            className="btn btn-coral"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
