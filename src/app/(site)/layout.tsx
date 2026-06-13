import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { getContent } from "@/lib/content";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getContent();

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:bg-white focus:text-verde-escuro focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>
      <Header
        avaliacao={content.avaliacao}
        whatsappVisivel={content.contato.whatsappVisivel}
      />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer content={content} />
      <WhatsAppFloat />
    </>
  );
}
