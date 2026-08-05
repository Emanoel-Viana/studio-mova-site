"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { salvarConteudo } from "../../actions";

// Tipos MUTÁVEIS (o `site` é `as const` / readonly). O editor mexe só nos
// VALORES; a estrutura (modalidades, níveis, frequências) vem do código.
type Preco = { mensal: string; semestral: string; anual: string };
type Freq = { freq: string; precos: Preco[] };
type Nivel = { nome: string; nota: string };
type Modalidade = {
  id: string;
  nome: string;
  titulo: string;
  tagline: string;
  icone: string;
  temNiveis: boolean;
  niveis: Nivel[];
  frequencias: Freq[];
  complementares: string[];
};
type Clube = {
  id: string;
  nome: string;
  tagline: string;
  semestral: string;
  anual: string;
  inclui: string[];
  beneficios: string[];
  destaque: boolean;
  selo: string;
};
export type CatalogoEditavel = { modalidades: Modalidade[]; clubes: Clube[] };

const campo =
  "w-full px-2.5 py-2 rounded-lg border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-2 focus:ring-verde/30";

function CampoPreco({
  label,
  value,
  onChange,
  opcional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  opcional?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-cinza mb-1">
        {label}
        {opcional && <span className="font-normal"> (opcional)</span>}
      </span>
      <span className="relative flex items-center">
        <span className="absolute left-2.5 text-cinza text-sm">R$</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputMode="numeric"
          placeholder={opcional ? "—" : ""}
          className={campo + " pl-8"}
        />
      </span>
    </label>
  );
}

export function PlanosForm({
  catalogoInicial,
}: {
  catalogoInicial: CatalogoEditavel;
}) {
  const [cat, setCat] = useState<CatalogoEditavel>(() =>
    structuredClone(catalogoInicial),
  );
  const [pendente, iniciar] = useTransition();
  const [msg, setMsg] = useState<{ ok?: boolean; erro?: string } | null>(null);

  function setPreco(
    mIdx: number,
    fIdx: number,
    pIdx: number,
    chave: keyof Preco,
    valor: string,
  ) {
    setCat((prev) => {
      const next = structuredClone(prev);
      next.modalidades[mIdx].frequencias[fIdx].precos[pIdx][chave] = valor;
      return next;
    });
  }
  function setClube(cIdx: number, chave: "semestral" | "anual", valor: string) {
    setCat((prev) => {
      const next = structuredClone(prev);
      next.clubes[cIdx][chave] = valor;
      return next;
    });
  }

  function salvar() {
    setMsg(null);
    iniciar(async () => {
      const r = await salvarConteudo({ catalogo: cat });
      setMsg(r);
    });
  }

  return (
    <div className="grid gap-6">
      <p className="text-cinza text-sm bg-verde-claro rounded-xl p-4">
        Edite aqui os <strong>valores mensais</strong> de cada plano. O campo
        <strong> Anual</strong> pode ficar vazio quando o plano não tem essa
        opção. Os nomes das modalidades e níveis ficam no código — se quiser
        mudar algum, me avise.
      </p>

      {/* Modalidades */}
      {cat.modalidades.map((mod, mIdx) => (
        <section
          key={mod.id}
          className="rounded-2xl bg-white border border-[#DDEDE3] p-5 sm:p-6"
        >
          <h2 className="text-lg mb-1">{mod.titulo}</h2>
          <p className="text-cinza text-sm mb-4">{mod.tagline}</p>

          <div className="grid gap-5">
            {mod.frequencias.map((f, fIdx) => (
              <div key={f.freq}>
                <h3 className="font-display font-bold text-sm uppercase tracking-wide text-verde-escuro mb-3">
                  {f.freq}
                </h3>
                <div className="grid gap-4">
                  {f.precos.map((p, pIdx) => (
                    <div key={pIdx} className="grid gap-2">
                      {mod.temNiveis && mod.niveis[pIdx] && (
                        <span className="font-semibold text-sm">
                          {mod.niveis[pIdx].nome}{" "}
                          <span className="font-normal text-cinza">
                            ({mod.niveis[pIdx].nota})
                          </span>
                        </span>
                      )}
                      <div className="grid grid-cols-3 gap-2.5">
                        <CampoPreco
                          label="Mensal"
                          value={p.mensal}
                          onChange={(v) =>
                            setPreco(mIdx, fIdx, pIdx, "mensal", v)
                          }
                        />
                        <CampoPreco
                          label="Semestral"
                          value={p.semestral}
                          onChange={(v) =>
                            setPreco(mIdx, fIdx, pIdx, "semestral", v)
                          }
                        />
                        <CampoPreco
                          label="Anual"
                          value={p.anual}
                          opcional
                          onChange={(v) =>
                            setPreco(mIdx, fIdx, pIdx, "anual", v)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Clubes */}
      <h2 className="font-display font-bold text-cinza uppercase tracking-wide text-sm mt-2">
        Planos Clube (só semestral e anual)
      </h2>
      {cat.clubes.map((clube, cIdx) => (
        <section
          key={clube.id}
          className="rounded-2xl bg-white border border-[#DDEDE3] p-5 sm:p-6"
        >
          <h3 className="text-lg mb-3">{clube.nome}</h3>
          <div className="grid grid-cols-2 gap-2.5 max-w-sm">
            <CampoPreco
              label="Semestral"
              value={clube.semestral}
              onChange={(v) => setClube(cIdx, "semestral", v)}
            />
            <CampoPreco
              label="Anual"
              value={clube.anual}
              onChange={(v) => setClube(cIdx, "anual", v)}
            />
          </div>
        </section>
      ))}

      <div className="flex items-center gap-4 flex-wrap sticky bottom-4 bg-cinza-claro/80 backdrop-blur rounded-xl p-3 -mx-3">
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
