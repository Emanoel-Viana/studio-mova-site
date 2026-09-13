import { describe, it, expect } from "vitest";
import { mergeProfundo } from "./merge";

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
