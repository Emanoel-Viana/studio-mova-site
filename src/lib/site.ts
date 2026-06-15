// ============================================================
// STUDIO MOVA — fonte única de conteúdo do site.
// Toda informação editável (contato, horários, planos, textos)
// vive aqui. Na Fase 2, o painel administrativo vai editar
// estes dados — por isso ficam centralizados e tipados.
// ============================================================

export const site = {
  nome: "Studio MOVA",
  slogan: "Sua nova segunda casa!",
  descricao:
    "Academia boutique na Asa Norte, Brasília: treino 100% personalizado em turmas de até 4 alunos, com um professor ao seu lado do início ao fim.",
  url: "https://studiomova.com.br",

  contato: {
    whatsapp: "5561996751909",
    whatsappVisivel: "(61) 9 9675-1909",
    email: "studiomovabsb@gmail.com",
    instagram: "@studio.mova",
    instagramUrl: "https://www.instagram.com/studio.mova/",
  },

  endereco: {
    linha1: "SHCN EQN 102/103, Ed. Estação 102",
    linha2: "Sala 9A, 1º andar — Asa Norte",
    cidade: "Brasília/DF",
    cep: "70722-400",
  },

  avaliacao: {
    nota: "4.94",
    total: 173,
    fonte: "Wellhub",
  },

  // Horários — atenção ao intervalo de Ter/Qui (13h–15h)
  horarios: [
    { dias: "Segunda, Quarta e Sexta", faixas: ["06h às 20h"] },
    { dias: "Terça e Quinta", faixas: ["06h às 13h", "15h às 20h"] },
    { dias: "Sábado", faixas: ["07h às 12h"] },
    { dias: "Domingo", faixas: ["Fechado"] },
  ],

  planos: [
    {
      freq: "2x por semana",
      icone: "ti-flame",
      desc: "Pra criar rotina e sair do sedentarismo com segurança.",
      preco: "630",
      destaque: false,
    },
    {
      freq: "3x por semana",
      icone: "ti-barbell",
      desc: "Resultado mais rápido e mudança visível no corpo.",
      preco: "820",
      destaque: true,
      selo: "Mais escolhido",
    },
    {
      freq: "4x por semana",
      icone: "ti-trophy",
      desc: "Máxima evolução e total dedicação aos treinos.",
      preco: "940",
      destaque: false,
    },
  ],

  parcerias: [
    {
      nome: "Wellhub",
      detalhe: "a partir do plano Gold+",
      url: "https://wellhub.com/pt-br/search/partners/studio-mova-asa-norte/",
    },
    {
      nome: "TotalPass",
      detalhe: "a partir do TP5+",
      url: "https://totalpass.com/br/academias/studio-mova/",
    },
  ],

  modalidades: [
    {
      titulo: "Musculação personalizada",
      desc: "Treino montado para o seu corpo e objetivos, com professor acompanhando cada exercício.",
      imagem: "/fotos/reabilitacao/DSC01993.jpg",
      foco: "center 22%",
      emBreve: false,
    },
    {
      titulo: "HIIT bike / Spinning",
      desc: "Aulas dinâmicas, intensas e sem monotonia — condicionamento com energia lá em cima.",
      imagem: "/fotos/modalidades/MOVA-72.jpg",
      foco: "center",
      emBreve: false,
    },
    {
      titulo: "Pilates",
      desc: "Fortalecimento, mobilidade e consciência corporal com atenção individualizada.",
      imagem: "",
      foco: "center",
      emBreve: true,
    },
  ],

  metodologia: [
    {
      titulo: "Mobilidade e core",
      desc: "Seu corpo preparado para render mais e evitar lesões.",
    },
    {
      titulo: "Musculação + funcional",
      desc: "Força, resistência e evolução progressiva — treino feito pra você.",
    },
    {
      titulo: "HIIT bike / spinning",
      desc: "Fechamento energizante que queima calorias e eleva o espírito.",
    },
  ],

  depoimentos: [
    {
      texto:
        "O Studio Mova oferece um ambiente espaçoso, com todos os equipamentos necessários para um treino completo, e uma professora 'bravinha' e incrível. E podemos aproveitar os momentos de descanso curtindo o verde da quadra residencial ao lado.",
      autor: "Flávia Mendim",
    },
    {
      texto:
        "Amo e estou amando o estúdio de atividade física MOVA! É lindo, de bom gosto, banheiros amplos, limpeza evidente; aparelhos modernos e uma profissional dedicada que me ajuda a manter meu corpo bem cuidado e saudável com exercícios dinâmicos e inteligentes.",
      autor: "Indira Vale",
    },
    {
      texto:
        "Infraestrutura excelente, ambiente climatizado, ótima localização, mas o melhor do Studio MOVA é a personal. Juliana é uma profissional dedicada, animada, capacitada... e uma pessoa incrível! Recomendadíssimo!",
      autor: "Marly Osugi",
    },
  ],

  equipe: [
    {
      nome: "Juliana",
      papel: "Professora",
      bio: "Especialista em treino personalizado e reabilitação, à frente do método MOVA.",
      foto: "/fotos/equipe/professorajuliana.jpeg",
      foco: "center",
    },
    {
      nome: "Nathalia",
      papel: "Professora",
      bio: "Acompanha cada aluno de perto, com atenção e energia em todo treino.",
      foto: "/fotos/equipe/professoranathalia.jpg",
      foco: "top",
    },
    {
      nome: "Yasmine",
      papel: "Professora",
      bio: "Treino seguro e motivador, do aquecimento ao fechamento.",
      foto: "/fotos/equipe/professorayasmine.jpg",
      foco: "top",
    },
    {
      nome: "Fabrício",
      papel: "Professor",
      bio: "Foco em técnica e evolução, sempre ao seu lado durante o treino.",
      foto: "/fotos/equipe/professorfabricio.jpg",
      foco: "top",
    },
  ],

  // Agendamento online (Cal.com) — DESLIGADO por opção do studio.
  // Vazio = o site direciona todo agendamento para o WhatsApp.
  // Se um dia quiserem ativar, basta colar o link em /admin/agendamento.
  agendamento: {
    calUrl: "",
  },
} as const;

// Gera um link de WhatsApp com mensagem pronta.
export function waLink(mensagem: string): string {
  return `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

// Mensagens padrão reutilizadas em vários botões.
export const wa = {
  agendar: waLink(
    "Olá! Quero agendar minha sessão avaliativa no Studio MOVA.",
  ),
  conhecer: waLink("Olá! Vim pelo site e quero conhecer o Studio MOVA."),
  geral: waLink("Olá! Vim pelo site do Studio MOVA."),
};

// Itens de navegação do site.
export const navegacao = [
  { href: "/", label: "Início" },
  { href: "/o-studio", label: "O Studio" },
  { href: "/metodologia", label: "Metodologia" },
  { href: "/planos", label: "Planos" },
  { href: "/equipe", label: "Equipe" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
];
