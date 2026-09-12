"use client";

import { useMemo, useState } from "react";
import { Search, Download, MessageCircle } from "lucide-react";

export type Lead = {
  id: string;
  nome: string;
  telefone: string | null;
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

// Monta o link do WhatsApp a partir do telefone salvo (só dígitos + 55 se faltar).
function linkWhats(telefone: string) {
  let d = telefone.replace(/\D/g, "");
  if (d.length <= 11) d = `55${d}`;
  return `https://wa.me/${d}`;
}

// Gera e baixa um CSV dos leads visíveis (abre no Excel/Sheets).
function baixarCSV(leads: Lead[]) {
  const cabecalho = ["Nome", "Telefone", "Assunto", "Mensagem", "Recebido em"];
  const escapar = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
  const linhas = leads.map((l) =>
    [
      l.nome,
      l.telefone ?? "",
      l.assunto ?? "",
      l.mensagem ?? "",
      formatarData(l.criado_em),
    ]
      .map(escapar)
      .join(","),
  );
  // BOM (﻿) pra o Excel abrir acentos corretamente.
  const csv = "﻿" + [cabecalho.join(","), ...linhas].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-studio-mova-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function LeadsLista({ leads }: { leads: Lead[] }) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const t = busca.trim().toLowerCase();
    if (!t) return leads;
    return leads.filter((l) =>
      [l.nome, l.telefone, l.assunto, l.mensagem]
        .filter(Boolean)
        .some((campo) => campo!.toLowerCase().includes(t)),
    );
  }, [busca, leads]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-cinza"
            aria-hidden
          />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, telefone, assunto ou mensagem…"
            aria-label="Buscar contatos"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-3 focus:ring-verde/30"
          />
        </div>
        <button
          type="button"
          onClick={() => baixarCSV(filtrados)}
          disabled={filtrados.length === 0}
          className="inline-flex items-center gap-2 rounded-xl bg-preto text-white px-4 py-2.5 font-display font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Download size={17} aria-hidden />
          Exportar CSV
        </button>
      </div>

      <p className="text-sm text-cinza mb-4">
        {filtrados.length} de {leads.length}{" "}
        {leads.length === 1 ? "contato" : "contatos"}
        {busca.trim() && " (filtrado)"}.
      </p>

      {filtrados.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#DDEDE3] p-8 text-center text-cinza">
          Nenhum contato encontrado para “{busca}”.
        </div>
      ) : (
        <div className="grid gap-3">
          {filtrados.map((l) => (
            <div
              key={l.id}
              className="rounded-2xl bg-white border border-[#DDEDE3] p-5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-display font-bold text-lg">{l.nome}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {l.telefone && (
                      <span className="text-sm text-cinza">{l.telefone}</span>
                    )}
                    {l.assunto && (
                      <span className="inline-block text-xs bg-verde-claro text-verde-escuro px-2.5 py-0.5 rounded-full font-medium">
                        {l.assunto}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {l.telefone && (
                    <a
                      href={linkWhats(l.telefone)}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 rounded-full bg-verde text-white px-3.5 py-1.5 text-sm font-display font-bold transition-colors hover:bg-verde-medio"
                    >
                      <MessageCircle size={16} aria-hidden />
                      WhatsApp
                    </a>
                  )}
                  <span className="text-sm text-cinza whitespace-nowrap">
                    {formatarData(l.criado_em)}
                  </span>
                </div>
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
