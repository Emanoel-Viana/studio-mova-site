-- ============================================================
-- STUDIO MOVA — schema do banco (Supabase)
-- Rode este SQL no painel do Supabase:
--   Dashboard → SQL Editor → New query → cole tudo → Run
-- ============================================================

-- Tabela de conteúdo editável do site (linha única, id = 1).
-- "content" guarda em JSON tudo que o admin pode editar:
-- planos, horários, contato, depoimentos, equipe, etc.
create table if not exists public.site_studiomova_configuracoes (
  id          int primary key default 1,
  content     jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  constraint apenas_uma_linha check (id = 1)
);

-- Garante que a linha 1 exista (começa vazia → site usa os padrões do código).
insert into public.site_studiomova_configuracoes (id, content)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- Liga a segurança por linha (Row Level Security).
alter table public.site_studiomova_configuracoes enable row level security;

-- LEITURA: liberada para todos (o site público precisa ler o conteúdo).
drop policy if exists "leitura publica do conteudo" on public.site_studiomova_configuracoes;
create policy "leitura publica do conteudo"
  on public.site_studiomova_configuracoes
  for select
  using (true);

-- ESCRITA: somente usuários autenticados (o administrador logado).
drop policy if exists "escrita apenas admin" on public.site_studiomova_configuracoes;
create policy "escrita apenas admin"
  on public.site_studiomova_configuracoes
  for update
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- Atualiza updated_at automaticamente a cada alteração.
create or replace function public.tocar_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_settings_updated_at on public.site_studiomova_configuracoes;
create trigger trg_site_settings_updated_at
  before update on public.site_studiomova_configuracoes
  for each row execute function public.tocar_updated_at();

-- ============================================================
-- FASE 3 — Leads (contatos recebidos pelo formulário do site)
-- ============================================================
create table if not exists public.site_studiomova_leads_contato (
  id         uuid primary key default gen_random_uuid(),
  nome       text not null,
  assunto    text,
  mensagem   text,
  origem     text default 'site',
  criado_em  timestamptz not null default now()
);

alter table public.site_studiomova_leads_contato enable row level security;

-- INSERIR: liberado para todos (o formulário público registra o contato).
drop policy if exists "inserir lead publico" on public.site_studiomova_leads_contato;
create policy "inserir lead publico"
  on public.site_studiomova_leads_contato for insert
  with check (true);

-- LER: somente o administrador autenticado.
drop policy if exists "ler leads admin" on public.site_studiomova_leads_contato;
create policy "ler leads admin"
  on public.site_studiomova_leads_contato for select
  using (auth.uid() is not null);
