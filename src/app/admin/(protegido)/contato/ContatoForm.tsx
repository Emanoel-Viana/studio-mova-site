"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { salvarConteudo } from "../../actions";

type Campos = {
  nota: string;
  total: string;
  fonte: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  whatsappVisivel: string;
  whatsapp: string;
  endLinha1: string;
  endLinha2: string;
  endCidade: string;
  endCep: string;
};

const classeCampo =
  "w-full px-3.5 py-2.5 rounded-lg border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-2 focus:ring-verde/30";

function CampoTexto({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: "numeric" | "text" | "email" | "url";
}) {
  return (
    <div>
      <label className="block font-semibold mb-1.5 text-sm">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className={classeCampo}
      />
    </div>
  );
}

export function ContatoForm({ inicial }: { inicial: Campos }) {
  const [c, setC] = useState<Campos>(inicial);
  const [pendente, iniciar] = useTransition();
  const [msg, setMsg] = useState<{ ok?: boolean; erro?: string } | null>(null);

  const set = (campo: keyof Campos) => (valor: string) =>
    setC((a) => ({ ...a, [campo]: valor }));

  function salvar() {
    setMsg(null);
    iniciar(async () => {
      const r = await salvarConteudo({
        avaliacao: {
          nota: c.nota,
          total: Number(c.total) || 0,
          fonte: c.fonte,
        },
        contato: {
          whatsapp: c.whatsapp,
          whatsappVisivel: c.whatsappVisivel,
          email: c.email,
          instagram: c.instagram,
          instagramUrl: c.instagramUrl,
        },
        endereco: {
          linha1: c.endLinha1,
          linha2: c.endLinha2,
          cidade: c.endCidade,
          cep: c.endCep,
        },
      });
      setMsg(r);
    });
  }

  return (
    <div className="grid gap-6">
      {/* Avaliação */}
      <section className="rounded-2xl bg-white border border-[#DDEDE3] p-6">
        <h2 className="text-lg mb-4">Avaliação (prova social)</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <CampoTexto
            label="Nota"
            value={c.nota}
            onChange={set("nota")}
            placeholder="4.94"
            inputMode="numeric"
          />
          <CampoTexto
            label="Qtd. de avaliações"
            value={c.total}
            onChange={set("total")}
            placeholder="173"
            inputMode="numeric"
          />
          <CampoTexto
            label="Fonte"
            value={c.fonte}
            onChange={set("fonte")}
            placeholder="Wellhub"
          />
        </div>
      </section>

      {/* Contato */}
      <section className="rounded-2xl bg-white border border-[#DDEDE3] p-6">
        <h2 className="text-lg mb-4">Contato</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <CampoTexto
            label="E-mail"
            value={c.email}
            onChange={set("email")}
            inputMode="email"
          />
          <CampoTexto
            label="Instagram (@)"
            value={c.instagram}
            onChange={set("instagram")}
            placeholder="@studio.mova"
          />
          <CampoTexto
            label="Link do Instagram"
            value={c.instagramUrl}
            onChange={set("instagramUrl")}
            inputMode="url"
          />
          <CampoTexto
            label="WhatsApp (como aparece)"
            value={c.whatsappVisivel}
            onChange={set("whatsappVisivel")}
            placeholder="(61) 9 9675-1909"
          />
        </div>
        <p className="text-sm text-cinza mt-3">
          Para mudar o número que abre o WhatsApp ao clicar, me avise — isso eu
          ajusto no código (muda raramente).
        </p>
      </section>

      {/* Endereço */}
      <section className="rounded-2xl bg-white border border-[#DDEDE3] p-6">
        <h2 className="text-lg mb-4">Endereço</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <CampoTexto label="Linha 1" value={c.endLinha1} onChange={set("endLinha1")} />
          <CampoTexto label="Linha 2" value={c.endLinha2} onChange={set("endLinha2")} />
          <CampoTexto
            label="Cidade/UF"
            value={c.endCidade}
            onChange={set("endCidade")}
          />
          <CampoTexto label="CEP" value={c.endCep} onChange={set("endCep")} />
        </div>
      </section>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={salvar}
          disabled={pendente}
          className="btn btn-verde disabled:opacity-60"
        >
          {pendente ? "Salvando…" : "Salvar alterações"}
        </button>
        {msg?.ok && (
          <span className="inline-flex items-center gap-1.5 text-verde-medio font-medium">
            <Check size={18} aria-hidden /> Salvo! O site já foi atualizado.
          </span>
        )}
        {msg?.erro && (
          <span className="text-coral-escuro bg-[#F7E4E0] rounded-lg px-3 py-1.5 text-sm">
            {msg.erro}
          </span>
        )}
      </div>
    </div>
  );
}
