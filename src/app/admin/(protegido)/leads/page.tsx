import Link from "next/link";
import { ArrowLeft, Inbox } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { LeadsLista, type Lead } from "./LeadsLista";

export default async function Leads() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_studiomova_leads_contato")
    .select("id, nome, telefone, assunto, mensagem, criado_em")
    .order("criado_em", { ascending: false })
    .limit(500);

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
        <LeadsLista leads={leads} />
      )}
    </>
  );
}
