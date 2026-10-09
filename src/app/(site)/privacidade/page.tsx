import type { Metadata } from "next";
import Link from "next/link";
import { waLink } from "@/lib/site";
import { getContent } from "@/lib/content";
import { metaPagina } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";

const descricao =
  "Como o Studio MOVA trata os dados que você envia pelo site (LGPD): o que coletamos, para quê usamos e como falar com a gente.";

export const metadata: Metadata = {
  title: "Privacidade",
  description: descricao,
  ...metaPagina({ titulo: "Privacidade — Studio MOVA", descricao, caminho: "/privacidade" }),
};

export default async function Privacidade() {
  const site = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Privacidade"
        titulo="Aviso de privacidade"
        descricao="Seu contato é tratado com cuidado. Abaixo, de forma simples, o que fazemos com os dados que você nos envia."
      />
      <section className="py-10 sm:py-14">
        <div className="container-mova max-w-2xl">
          <h2 className="section-title">Quais dados coletamos</h2>
          <p className="text-cinza mb-6">
            Quando você preenche o formulário de contato, coletamos o que você
            digita: <strong>nome</strong>, <strong>telefone/WhatsApp</strong>,{" "}
            <strong>assunto</strong> e a <strong>mensagem</strong> (opcional).
            Não pedimos CPF, dados de pagamento nem documentos pelo site.
          </p>

          <h2 className="section-title">Para que usamos</h2>
          <p className="text-cinza mb-6">
            Usamos esses dados <strong>somente para responder você</strong> e dar
            andamento ao seu atendimento (tirar dúvidas, agendar a sessão
            avaliativa, falar sobre planos). Não vendemos nem compartilhamos seus
            dados com terceiros para publicidade.
          </p>

          <h2 className="section-title">Como guardamos</h2>
          <p className="text-cinza mb-6">
            O contato fica registrado em ambiente de acesso restrito à equipe do
            Studio MOVA e pode ser encaminhado internamente (por exemplo, um
            aviso no WhatsApp da recepção) para agilizar a resposta. Mantemos o
            registro apenas pelo tempo necessário ao atendimento.
          </p>

          <h2 className="section-title">Seus direitos</h2>
          <p className="text-cinza mb-6">
            Você pode pedir, a qualquer momento, para{" "}
            <strong>ver, corrigir ou apagar</strong> os dados que enviou. É só
            falar com a gente no{" "}
            <a
              href={waLink("Olá! Gostaria de falar sobre os meus dados (privacidade).")}
              target="_blank"
              rel="noopener"
              className="text-verde-escuro font-semibold hover:underline"
            >
              WhatsApp
            </a>{" "}
            ou pelo e-mail{" "}
            <a
              href={`mailto:${site.contato.email}`}
              className="text-verde-escuro font-semibold hover:underline"
            >
              {site.contato.email}
            </a>
            .
          </p>

          <p className="text-sm text-cinza">
            Dúvidas?{" "}
            <Link href="/contato" className="text-verde-escuro font-semibold hover:underline">
              Fale com a gente
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
