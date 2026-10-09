import { describe, it, expect } from "vitest";
import { mergeProfundo, formaCoerente } from "./merge";

describe("mergeProfundo", () => {
  it("mescla objetos em profundidade sem apagar as chaves irmãs", () => {
    const base = { a: { x: 1, y: 2 }, b: 3 };
    const over = { a: { y: 20 } };
    expect(mergeProfundo(base, over)).toEqual({ a: { x: 1, y: 20 }, b: 3 });
  });

  it("array do override SUBSTITUI o array da base (não concatena)", () => {
    expect(mergeProfundo({ lista: [1, 2, 3] }, { lista: [9] })).toEqual({
      lista: [9],
    });
  });

  it("primitivo do override substitui o da base", () => {
    expect(mergeProfundo({ nome: "a" }, { nome: "b" })).toEqual({ nome: "b" });
  });

  it("undefined no override mantém a base", () => {
    expect(mergeProfundo({ a: 1 }, undefined)).toEqual({ a: 1 });
  });

  it("adiciona chaves novas trazidas pelo override", () => {
    expect(mergeProfundo({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  // O caso que o merge RASO antigo do admin quebrava: salvar só parte de uma
  // sub-seção NÃO pode apagar as irmãs (ex.: editar `modalidades` sem perder
  // `clubes`). Esta é a regressão que o merge profundo corrige.
  it("editar uma sub-seção parcial preserva as irmãs (bug do admin)", () => {
    const base = { catalogo: { modalidades: [{ id: "a" }], clubes: [{ id: "c" }] } };
    const over = { catalogo: { modalidades: [{ id: "b" }] } };
    expect(mergeProfundo(base, over)).toEqual({
      catalogo: { modalidades: [{ id: "b" }], clubes: [{ id: "c" }] },
    });
  });
});

describe("mergeProfundo — segurança (prototype pollution na leitura)", () => {
  it("ignora __proto__ vindo do banco (não polui o Object.prototype)", () => {
    const malicioso = JSON.parse('{"a":1,"__proto__":{"poluido":true}}');
    const out = mergeProfundo({ a: 0 }, malicioso) as Record<string, unknown>;
    expect(out.a).toBe(1);
    expect(({} as Record<string, unknown>).poluido).toBeUndefined();
    expect(Object.prototype.hasOwnProperty.call(out, "__proto__")).toBe(false);
  });

  it("null no override substitui (comportamento de merge, cru)", () => {
    expect(mergeProfundo({ a: 1 }, { a: null })).toEqual({ a: null });
  });
});

describe("formaCoerente", () => {
  it("aceita o patch do ContatoForm (nota=string, total=number)", () => {
    const base = {
      avaliacao: { nota: "4.94", total: 175, fonte: "Wellhub" },
      avaliacaoGoogle: { nota: "5,0", total: 48, fonte: "Google", url: "x" },
      contato: { whatsapp: "a", whatsappVisivel: "b", email: "c", instagram: "d", instagramUrl: "e" },
      endereco: { linha1: "a", linha2: "b", cidade: "c", cep: "d" },
    };
    const patch = {
      avaliacao: { nota: "5,0", total: 200, fonte: "Google" },
      avaliacaoGoogle: { nota: "5,0", total: 50 },
      contato: { whatsapp: "a", whatsappVisivel: "b", email: "c", instagram: "d", instagramUrl: "e" },
      endereco: { linha1: "a", linha2: "b", cidade: "c", cep: "d" },
    };
    expect(formaCoerente(patch, base)).toBe(true);
  });

  it("aceita edição parcial de arrays (lista de objetos)", () => {
    const base = { catalogo: { modalidades: [{ nome: "a", precos: [1, 2] }] } };
    const over = { catalogo: { modalidades: [{ nome: "b", precos: [3, 4] }, { nome: "c", precos: [5] }] } };
    expect(formaCoerente(over, base)).toBe(true);
  });

  it("aceita grade (lista de listas de objetos) e arrays vazios", () => {
    const base = { grade: { linhas: [{ hora: "6h", cels: [[{ t: "x" }]] }] }, niveis: ["a"] };
    const over = { grade: { linhas: [{ hora: "7h", cels: [[]] }] }, niveis: [] };
    expect(formaCoerente(over, base)).toBe(true);
  });

  it("RECUSA número onde a base é string", () => {
    expect(formaCoerente({ nota: 5 }, { nota: "5,0" })).toBe(false);
  });

  it("RECUSA null onde a base é primitivo (evita crash no .replace)", () => {
    expect(formaCoerente({ nota: null }, { nota: "5,0" })).toBe(false);
    expect(formaCoerente({ total: null }, { total: 48 })).toBe(false);
  });

  it("RECUSA trocar array por objeto e vice-versa", () => {
    expect(formaCoerente({ lista: {} }, { lista: [1] })).toBe(false);
    expect(formaCoerente({ obj: [1] }, { obj: { a: 1 } })).toBe(false);
  });

  it("RECUSA __proto__ no patch", () => {
    const patch = JSON.parse('{"__proto__":{"x":1}}');
    expect(formaCoerente(patch, { a: 1 })).toBe(false);
  });

  it("permite chaves novas que não existem na base", () => {
    expect(formaCoerente({ nova: "x" }, { a: 1 })).toBe(true);
  });

  it("aceita undefined (mantém a base)", () => {
    expect(formaCoerente({ a: undefined }, { a: 1 })).toBe(true);
  });
});
