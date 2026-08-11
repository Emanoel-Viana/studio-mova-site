"use client";

import { useState } from "react";
import { MessageCircle, Check } from "lucide-react";
import { waLink } from "@/lib/site";
import { Turnstile } from "@/components/Turnstile";
import { enviarContato } from "@/app/(site)/contato/actions";

const assuntos = [
  "Agendar sessão avaliativa",
  "Dúvida sobre planos",
  "Wellhub / TotalPass",
  "Outro assunto",
];

export function FormContato({
  turnstileSiteKey = "",
}: {
  turnstileSiteKey?: string;
}) {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState(assuntos[0]);
  const [mensagem, setMensagem] = useState("");
  const [token, setToken] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);
  // Muda a key do Turnstile pra remontar o widget e gerar um token NOVO
  // (o token do captcha é de uso único).
  const [captchaKey, setCaptchaKey] = useState(0);

  // Só exige o captcha quando a chave está configurada.
  const precisaCaptcha = !!turnstileSiteKey;

  const linkWhats = waLink(
    `Olá! Meu nome é ${nome}. Assunto: ${assunto}.` +
      (mensagem ? ` ${mensagem}` : ""),
  );

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (enviando) return;
    setErro("");

    if (precisaCaptcha && !token) {
      setErro("Aguarde a verificação de segurança carregar…");
      return;
    }

    setEnviando(true);
    try {
      const resultado = await enviarContato({ nome, assunto, mensagem, token });
      if (!resultado.ok) {
        setErro(resultado.erro);
        // Token é de uso único: gera um novo pra permitir tentar de novo.
        setToken("");
        setCaptchaKey((k) => k + 1);
        return;
      }
      setEnviado(true);
    } catch {
      setErro(
        "Não conseguimos enviar agora. Tente de novo ou fale direto no WhatsApp.",
      );
      setToken("");
      setCaptchaKey((k) => k + 1);
    } finally {
      setEnviando(false);
    }
  }

  function novaMensagem() {
    setEnviado(false);
    setErro("");
    setToken("");
    setCaptchaKey((k) => k + 1);
    setMensagem("");
  }

  const campo =
    "w-full px-4 py-3.5 rounded-xl border border-[#D5E5DB] bg-white text-base focus:outline-none focus:border-verde focus:ring-3 focus:ring-verde/30";

  // Tela de sucesso: link clicável (gesto real do usuário → o navegador NÃO
  // bloqueia como bloquearia um window.open disparado depois do await).
  if (enviado) {
    return (
      <div className="max-w-xl rounded-2xl border border-[#CDEBD9] bg-verde-claro p-6 sm:p-8 text-center">
        <span className="grid place-items-center w-14 h-14 rounded-full bg-verde text-white mx-auto mb-4">
          <Check size={30} aria-hidden />
        </span>
        <h3 className="text-xl sm:text-2xl mb-2">Recebemos sua mensagem! 💚</h3>
        <p className="text-cinza mb-6">
          Toque no botão abaixo para abrir o WhatsApp com a sua mensagem já
          pronta — é só enviar pra gente.
        </p>
        <a
          href={linkWhats}
          target="_blank"
          rel="noopener"
          className="btn btn-coral text-lg"
        >
          <MessageCircle size={22} aria-hidden />
          Abrir o WhatsApp
        </a>
        <button
          type="button"
          onClick={novaMensagem}
          className="block mx-auto mt-5 text-sm text-verde-escuro font-semibold hover:underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="grid gap-5 max-w-xl">
      <div>
        <label htmlFor="nome" className="block font-semibold mb-1.5">
          Seu nome
        </label>
        <input
          id="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={campo}
          placeholder="Como podemos te chamar?"
        />
      </div>

      <div>
        <label htmlFor="assunto" className="block font-semibold mb-1.5">
          Assunto
        </label>
        <select
          id="assunto"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          className={campo}
        >
          {assuntos.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className="block font-semibold mb-1.5">
          Mensagem{" "}
          <span className="font-normal text-cinza">(opcional)</span>
        </label>
        <textarea
          id="mensagem"
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className={campo}
          placeholder="Conte o que você precisa…"
        />
      </div>

      {precisaCaptcha && (
        <Turnstile
          key={captchaKey}
          siteKey={turnstileSiteKey}
          onToken={setToken}
        />
      )}

      {erro && (
        <p className="text-sm text-coral font-medium" role="alert">
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="btn btn-coral justify-self-start text-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {enviando ? "Enviando…" : "Enviar pelo WhatsApp"}
      </button>
      <p className="text-sm text-cinza">
        Ao enviar, abrimos o WhatsApp com sua mensagem já pronta. Você confere e
        manda. 💚
      </p>
    </form>
  );
}
