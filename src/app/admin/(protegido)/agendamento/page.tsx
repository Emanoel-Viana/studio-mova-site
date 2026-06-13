import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { AgendamentoForm } from "./AgendamentoForm";

export default async function EditarAgendamento() {
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
      <h1 className="text-3xl mb-2">Agendamento online</h1>
      <p className="text-cinza mb-8">
        Cole o link do seu Cal.com para ativar o agendamento na página{" "}
        <span className="font-semibold">/agendar</span>. Deixe vazio para manter
        só o WhatsApp.
      </p>

      <AgendamentoForm calUrlInicial={c.agendamento?.calUrl ?? ""} />
    </>
  );
}
