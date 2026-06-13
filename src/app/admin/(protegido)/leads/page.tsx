import Link from "next/link";
import { ArrowLeft, Inbox } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type Lead = {
  id: string;
  nome: string;
  assunto: string | null;
  mensagem: string | null;
  criado_em: string;
};

function formatarData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function Leads() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("id, nome, assunto, mensagem, criado_em")
    .order("criado_em", { ascending: false })
    .limit(200);

  const leads = (data ?? []) as Lead[];
  const tabelaFaltando = error?.code === "42P01";

  return (
    <>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-cinza hover:text-preto mb-4"
      >
        <ArrowLeft size={18} aria-hidden />
        Voltar ao painel
      </Link>
      <h1 className="text-3xl mb-2">Contatos recebidos</h1>
      <p className="text-cinza mb-8">
        Quem preencheu o formulário do site aparece aqui — do mais recente ao
        mais antigo.
      </p>

      {tabelaFaltando ? (
        <div className="rounded-2xl bg-[#FFF7E6] border border-[#F0D8A0] p-6">
          <p className="font-semibold mb-1">Tabela de leads ainda não criada</p>
          <p className="text-cinza text-sm">
            Rode no Supabase o trecho de SQL dos leads (que enviei no chat) para
            ativar o registro de contatos.
          </p>
        </div>
      ) : leads.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#DDEDE3] p-10 text-center">
          <Inbox size={36} className="mx-auto text-cinza mb-3" aria-hidden />
          <p className="font-semibold">Nenhum contato ainda</p>
          <p className="text-cinza text-sm">
            Quando alguém enviar o formulário, aparece aqui.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {leads.map((l) => (
            <div
              key={l.id}
              className="rounded-2xl bg-white border border-[#DDEDE3] p-5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-display font-bold text-lg">{l.nome}</p>
                  {l.assunto && (
                    <span className="inline-block mt-1 text-xs bg-verde-claro text-verde-escuro px-2.5 py-0.5 rounded-full font-medium">
                      {l.assunto}
                    </span>
                  )}
                </div>
                <span className="text-sm text-cinza whitespace-nowrap">
                  {formatarData(l.criado_em)}
                </span>
              </div>
              {l.mensagem && (
                <p className="text-cinza mt-3 whitespace-pre-wrap">
                  {l.mensagem}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
