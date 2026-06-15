"use client";

import { useState, useTransition } from "react";
import { Check, Star } from "lucide-react";
import { salvarConteudo } from "../../actions";

export type PlanoEditavel = {
  freq: string;
  desc: string;
  precoMensal: string;
  precoSemestral: string;
  precoAnual: string;
  icone: string;
  destaque: boolean;
  selo: string;
};

export function PlanosForm({
  planosIniciais,
}: {
  planosIniciais: PlanoEditavel[];
}) {
  const [planos, setPlanos] = useState<PlanoEditavel[]>(planosIniciais);
  const [pendente, iniciar] = useTransition();
  const [msg, setMsg] = useState<{ ok?: boolean; erro?: string } | null>(null);

  function atualizar(i: number, campo: keyof PlanoEditavel, valor: string | boolean) {
    setPlanos((atual) =>
      atual.map((p, idx) => (idx === i ? { ...p, [campo]: valor } : p)),
    );
  }

  function definirDestaque(i: number) {
    setPlanos((atual) =>
      atual.map((p, idx) => ({ ...p, destaque: idx === i })),
    );
  }

  function salvar() {
    setMsg(null);
    const paraSalvar = planos.map((p) => ({
      freq: p.freq,
      desc: p.desc,
      icone: p.icone,
      destaque: p.destaque,
      selo: p.selo,
      precos: {
        mensal: p.precoMensal,
        semestral: p.precoSemestral,
        anual: p.precoAnual,
      },
    }));
    iniciar(async () => {
      const r = await salvarConteudo({ planos: paraSalvar });
      setMsg(r);
    });
  }

  const campo =
    "w-full px-3.5 py-2.5 rounded-lg border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-2 focus:ring-verde/30";

  return (
    <div className="grid gap-5">
      {planos.map((plano, i) => (
        <div
          key={i}
          className={`rounded-2xl bg-white p-6 border ${
            plano.destaque ? "border-2 border-verde" : "border-[#DDEDE3]"
          }`}
        >
          <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-start">
            <div className="grid gap-4">
              <div>
                <label className="block font-semibold mb-1.5 text-sm">
                  Frequência (título do plano)
                </label>
                <input
                  value={plano.freq}
                  onChange={(e) => atualizar(i, "freq", e.target.value)}
                  className={campo}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1.5 text-sm">
                  Descrição
                </label>
                <input
                  value={plano.desc}
                  onChange={(e) => atualizar(i, "desc", e.target.value)}
                  className={campo}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold mb-1.5 text-sm">
                    Mensal (R$)
                  </label>
                  <input
                    value={plano.precoMensal}
                    onChange={(e) => atualizar(i, "precoMensal", e.target.value)}
                    inputMode="numeric"
                    className={campo}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1.5 text-sm">
                    Semestral (R$)
                  </label>
                  <input
                    value={plano.precoSemestral}
                    onChange={(e) =>
                      atualizar(i, "precoSemestral", e.target.value)
                    }
                    inputMode="numeric"
                    className={campo}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1.5 text-sm">
                    Anual (R$)
                  </label>
                  <input
                    value={plano.precoAnual}
                    onChange={(e) => atualizar(i, "precoAnual", e.target.value)}
                    inputMode="numeric"
                    className={campo}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1.5 text-sm">
                    Selo
                  </label>
                  <input
                    value={plano.selo}
                    onChange={(e) => atualizar(i, "selo", e.target.value)}
                    placeholder="opcional"
                    className={campo}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => definirDestaque(i)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                plano.destaque
                  ? "bg-verde text-white"
                  : "bg-cinza-claro text-cinza hover:bg-[#E2EEE7]"
              }`}
            >
              <Star
                size={15}
                className={plano.destaque ? "fill-white" : ""}
                aria-hidden
              />
              {plano.destaque ? "Em destaque" : "Destacar"}
            </button>
          </div>
        </div>
      ))}

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
