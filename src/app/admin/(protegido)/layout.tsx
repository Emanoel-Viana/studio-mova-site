import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { sair } from "../actions";

export default async function LayoutProtegido({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Portão: sem login, vai para a tela de entrada.
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cinza-claro">
      <header className="bg-verde-escuro text-white">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between gap-4 py-3.5">
          <Link href="/admin" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/marca/simbolo-branco.png" alt="" className="h-8 w-auto" />
            <span className="font-display font-bold">
              studioMOVA{" "}
              <span className="font-normal text-[#9BE8BF]">· admin</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#D9E6DE] hover:text-white px-3 py-2"
            >
              <ExternalLink size={16} aria-hidden />
              Ver site
            </Link>
            <form action={sair}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-sm bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-colors"
              >
                <LogOut size={16} aria-hidden />
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 lg:py-12">{children}</div>
    </div>
  );
}
