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
      desc: "Ideal pra criar rotina, sair do sedentarismo e evoluir com constância — perfeito pra retomar os treinos com segurança e mais disposição.",
      precos: { mensal: "720", semestral: "680", anual: "630" },
      destaque: false,
    },
    {
      freq: "3x por semana",
      icone: "ti-barbell",
      desc: "A escolha de quem quer resultado mais rápido e mudança visível no corpo — emagrecer, ganhar força e manter a constância que transforma.",
      precos: { mensal: "980", semestral: "890", anual: "820" },
      destaque: true,
      selo: "Mais escolhido",
    },
    {
      freq: "4x por semana",
      icone: "ti-trophy",
      desc: "Para quem quer máxima evolução, resultado acelerado e total dedicação aos treinos.",
      precos: { mensal: "1.280", semestral: "1.110", anual: "940" },
      destaque: false,
    },
  ],

  // Formas de pagamento aceitas.
  pagamento: [
    { titulo: "Pix", desc: "Pagamento instantâneo via chave ou QR code." },
    { titulo: "Cartão de crédito", desc: "Com parcelamento disponível." },
    {
      titulo: "Recorrência automática",
      desc: "Débito mensal automático, sem preocupação.",
    },
  ],

  parcerias: [
    {
      nome: "Wellhub",
      detalhe: "A partir do plano Gold (Gold, Gold+, Platinum, Diamond e Diamond+).",
      checkins: "2 check-ins por semana",
      agendamento:
        "Agendamento, reagendamento e cancelamento direto pelo app da Wellhub. As vagas são liberadas com cerca de 5 dias de antecedência.",
      url: "https://wellhub.com/pt-br/search/partners/studio-mova-asa-norte/",
    },
    {
      nome: "TotalPass",
      detalhe: "A partir do plano TP5+ (TP5+, TP6 e TP7).",
      checkins: "3 check-ins por semana",
      agendamento:
        "Agendamento via WhatsApp com a nossa especialista. Toda sexta-feira você envia suas disponibilidades para a semana seguinte.",
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
      desc: "Aquecimento, mobilidade e ativação do core para preparar o corpo. Você rende mais, se movimenta melhor e treina protegido de lesões.",
    },
    {
      titulo: "Musculação + funcional",
      desc: "O coração do treino: força, postura e resistência com carga ajustada ao seu nível, evoluindo de forma progressiva e segura.",
    },
    {
      titulo: "HIIT bike / spinning",
      desc: "Fechamento energizante na bike que acelera o gasto calórico, turbina o condicionamento e encerra o treino com sensação de dever cumprido.",
    },
  ],

  // Diferenciais — o que faz o MOVA ser diferente de academia comum.
  diferenciais: [
    {
      titulo: "Turmas de até 4 alunos",
      desc: "Nada de academia lotada e fila por aparelho. Aqui você tem espaço, equipamento livre e atenção de verdade.",
    },
    {
      titulo: "Professor ao seu lado o tempo todo",
      desc: "Cada série, cada repetição e cada ajuste de postura acompanhados de perto — do primeiro ao último minuto.",
    },
    {
      titulo: "Treino 100% personalizado",
      desc: "Seu treino é montado pro seu corpo, seus objetivos e seu momento. Iniciante ou avançado, jovem ou com mais idade.",
    },
    {
      titulo: "Ambiente acolhedor e climatizado",
      desc: "Um espaço boutique pensado pra ser a sua segunda casa: bem cuidado, sem julgamento e fácil de criar rotina.",
    },
  ],

  // Chips de confiança exibidos no hero da home.
  heroDestaques: [
    "Turmas de até 4 alunos",
    "Professor ao seu lado o tempo todo",
    "Para todas as idades e níveis",
  ],

  // "Para quem é o MOVA" — personas para o visitante se identificar.
  publico: [
    {
      titulo: "Quer sair do sedentarismo",
      desc: "Começar do zero com segurança e criar a rotina que finalmente não para na segunda-feira.",
    },
    {
      titulo: "Busca emagrecer com saúde",
      desc: "Perder gordura preservando músculo, com treino que cabe na sua rotina — até se você usa medicação.",
    },
    {
      titulo: "Está voltando de uma lesão",
      desc: "Reabilitação e movimento seguro, com exercícios adaptados à sua condição e professor por perto.",
    },
    {
      titulo: "Já treina e quer evoluir",
      desc: "Sair do platô com treino personalizado, carga bem ajustada e a variação que mantém a constância.",
    },
    {
      titulo: "Quer se cuidar com mais idade",
      desc: "Mais força, equilíbrio e disposição no dia a dia, no seu ritmo e sem nenhuma intimidação.",
    },
    {
      titulo: "Não curte academia lotada",
      desc: "Um espaço boutique, turmas pequenas e atenção de verdade — a sua segunda casa na Asa Norte.",
    },
  ],

  // Sessão avaliativa — o primeiro passo, usado na home e na metodologia.
  sessaoAvaliativa: {
    intro:
      "Antes de escolher qualquer plano, você passa por um encontro individual com a nossa professora especialista — sem compromisso. É onde a gente entende o seu corpo, a sua rotina e os seus objetivos para montar o caminho certo até os seus resultados.",
    etapas: [
      "Conversa sobre seus objetivos e sua rotina",
      "Avaliação postural e de mobilidade",
      "Análise do seu movimento",
      "Apresentação do método na prática",
    ],
  },

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
