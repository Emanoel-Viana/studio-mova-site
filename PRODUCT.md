# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pessoas de Brasília (Asa Norte e região) que **não se identificam com academia convencional** e procuram acompanhamento próximo. Todos os públicos têm o mesmo peso (confirmado pelo cliente):

- quem quer **sair do sedentarismo** / começar do zero com segurança;
- quem busca **emagrecer com saúde** (inclusive usando medicação como GLP-1), preservando músculo;
- quem está em **reabilitação** / voltando de lesão e precisa de movimento adaptado;
- **50+** que quer força, equilíbrio e disposição sem intimidação;
- quem **já treina** e quer sair do platô com treino personalizado.

Job principal do visitante do site: avaliar se o MOVA combina com ele e **agendar a sessão avaliativa gratuita**.

## Product Purpose

Academia **boutique** com metodologia própria: o aluno treina com um **professor ao seu lado durante todo o treino**, em turmas reduzidas, num espaço pensado para ser "a sua segunda casa". Oferece musculação personalizada, Spin, Pilates, aulas coletivas e atendimento de quiropraxia. O site existe para apresentar o método e **converter o visitante em um agendamento de avaliação gratuita** (ação nº1 confirmada).

## Positioning

O que um concorrente não copia honestamente: **musculação personalizada em turmas de até 4 alunos com o professor ao lado o tempo todo**, num método de 60 min em 3 etapas (mobilidade/core → musculação + funcional → fechamento de HIIT na bike), com forte componente de **reabilitação** e acolhimento para todas as idades. Não é self-service nem academia de volume; é atenção individual.

## Operating Context

- **Local:** Asa Norte, Brasília – DF.
- **Formas de acesso:** pagamento regular (Pix, cartão, recorrência); **Wellhub** (a partir do Gold; coletivas no Gold+); **TotalPass** (a partir do TP5+, agendamento pelo app do TotalPass, 3 check-ins/semana).
- **Horários:** Seg/Qua/Sex 06h–20h · Ter/Qui 06h–13h e 15h–21h · Sáb 07h–12h · Dom fechado. Quiropraxia Ter/Qui (12h–13h e 14h–15h).
- **Capacidades por turma:** musculação/Pilates até 4 · coletivas até 8 · Spin até 12.
- **Captação:** formulário público (nome + WhatsApp + assunto) → grava no Supabase, abre WhatsApp com mensagem pronta e notifica a recepção (n8n). Conteúdo do site é editável por um painel `/admin`.

## Capabilities and Constraints

- Stack existente: Next.js 16 (App Router, `src/proxy.ts` como middleware), React 19, Tailwind v4, TypeScript, Supabase. Deploy por `git push` → EasyPanel; PWA com service worker versionado (`public/sw.js`). CSP com nonce por request (toda página renderiza dinâmica).
- Conteúdo (textos, planos, horários, depoimentos, nota) vem de `getContent()` mesclado sobre os padrões de `src/lib/site.ts`; o `/admin` edita por cima.
- 10+ modalidades; catálogo de planos por modalidade; grade de horários.
- Restrição: mudanças visuais exigem verificação ao vivo (desktop + mobile) e aprovação antes do deploy — histórico de "branco no branco" por cascata de CSS.

## Brand Commitments

- Nome **Studio MOVA**; logo (símbolo em "V"/seta + wordmark "studioMOVA"). Instagram **@studio.mova**.
- Voz: **acolhedora, sem julgamento, humana, para todas as idades**; "segunda casa"; fala direto com o visitante ("você").
- O conteúdo e os fatos atuais devem ser preservados (podem ser reescritos no tom, não inventados).
- **Paleta de cores atual é BINDING (decisão do cliente, 14/10/2026):** manter a identidade verde do MOVA (verde `#2bb673`, verde-escuro `#14532d`, verde-claro, coral de CTA, neutros). O trabalho é **refinamento premium** (layout, tipografia, profundidade, ritmo, componentes, motion), **não** um novo mundo visual/rebrand.

## Evidence on Hand

Confirmado como atual pelo cliente e seguro para destacar:

- **Google 5,0** · **Wellhub 4,94 (175 avaliações)** · **+150 alunos** · **+10 anos** de experiência dos professores · **máx 4 alunos/turma** (musculação).
- **9 avaliações reais** do Google (texto) + **6 vídeos reais de alunos** (`public/fotos/historias/`, hoje linkam pro Instagram).
- Fotos reais: `public/fotos/` (galeria, modalidades, equipe, reabilitação). Parcerias **Wellhub** e **TotalPass** (reais).
- NÃO fabricar depoimentos, números, preços ou claims além destes.

## Product Principles

1. **O acompanhamento é o produto** — professor ao lado o tempo todo, não self-service.
2. **Turma pequena e atenção individual** acima de volume.
3. **Acolhimento sem julgamento**, para todas as idades e níveis.
4. **Reabilitação e movimento seguro** são centrais, não acessório.
5. **O primeiro passo é a avaliação gratuita**, sem pressão de venda.

## Accessibility & Inclusion

Público multi-idade (inclui 50+) e iniciantes — acessibilidade é prioridade do projeto. Meta de contraste WCAG **AA** (texto normal ≥ 4,5:1), alvos de toque confortáveis, foco de teclado visível.
