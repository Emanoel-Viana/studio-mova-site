// ============================================================
// STUDIO MOVA — fonte única de conteúdo do site.
// Toda informação editável (contato, horários, planos, textos)
// vive aqui. Na Fase 2, o painel administrativo vai editar
// estes dados — por isso ficam centralizados e tipados.
// ============================================================

export const site = {
  nome: "Studio MOVA",
  slogan: "Seu movimento. Sua melhor versão.",
  subSlogan: "Musculação, Pilates, Bike e Coletivas — para todas as idades.",
  descricao:
    "Musculação, Pilates, Bike e Coletivas para todas as idades. Academia boutique na Asa Norte, Brasília, com treino personalizado em turmas de até 4 alunos e professor ao seu lado do início ao fim.",
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
    total: 175,
    fonte: "Wellhub",
  },

  // Horários — atenção ao intervalo de Ter/Qui (13h–15h)
  horarios: [
    { dias: "Segunda, Quarta e Sexta", faixas: ["06h às 20h"] },
    { dias: "Terça e Quinta", faixas: ["06h às 13h", "15h às 20h"] },
    { dias: "Sábado", faixas: ["07h às 12h"] },
    { dias: "Domingo", faixas: ["Fechado"] },
  ],

  // ============================================================
  // CATÁLOGO (nova grade — lançamento). O visitante escolhe "o que
  // quer treinar" e vê os planos daquela modalidade.
  // Preço sempre { mensal, semestral, anual } — anual "" quando não houver.
  // ============================================================
  catalogo: {
    modalidades: [
      {
        id: "musculacao",
        nome: "Musculação",
        titulo: "MOVA Musculação",
        tagline: "Sua base de força e saúde",
        icone: "dumbbell",
        temNiveis: true,
        niveis: [
          { nome: "Essencial", nota: "só musculação" },
          { nome: "Equilíbrio", nota: "+1 modalidade/semana" },
          { nome: "Performance", nota: "+2 modalidades/semana" },
        ],
        frequencias: [
          {
            freq: "2x por semana",
            precos: [
              { mensal: "720", semestral: "680", anual: "630" },
              { mensal: "850", semestral: "790", anual: "740" },
              { mensal: "960", semestral: "890", anual: "850" },
            ],
          },
          {
            freq: "3x por semana",
            precos: [
              { mensal: "980", semestral: "890", anual: "820" },
              { mensal: "1.110", semestral: "1.000", anual: "930" },
              { mensal: "1.220", semestral: "1.110", anual: "1.040" },
            ],
          },
        ],
        complementares: [
          "Bike", "HIIT", "Funcional", "GAP",
          "Mobilidade", "Flexibilidade", "Ritmos", "Abdominal",
        ],
      },
      {
        id: "pilates",
        nome: "Pilates",
        titulo: "MOVA Pilates",
        tagline: "Mobilidade, estabilidade, força profunda e longevidade",
        icone: "flower",
        temNiveis: true,
        niveis: [
          { nome: "Essencial", nota: "só pilates" },
          { nome: "Equilíbrio", nota: "+1 modalidade/semana" },
          { nome: "Performance", nota: "+2 modalidades/semana" },
        ],
        frequencias: [
          {
            freq: "2x por semana",
            precos: [
              { mensal: "650", semestral: "610", anual: "570" },
              { mensal: "780", semestral: "720", anual: "680" },
              { mensal: "890", semestral: "830", anual: "790" },
            ],
          },
          {
            freq: "3x por semana",
            precos: [
              { mensal: "890", semestral: "790", anual: "730" },
              { mensal: "1.010", semestral: "900", anual: "840" },
              { mensal: "1.120", semestral: "1.010", anual: "950" },
            ],
          },
        ],
        complementares: [],
      },
      {
        id: "bike",
        nome: "Bike",
        titulo: "MOVA Bike",
        tagline: "Pedale. Supere. Evolua.",
        icone: "bike",
        temNiveis: false,
        niveis: [],
        frequencias: [
          { freq: "2x por semana", precos: [{ mensal: "650", semestral: "550", anual: "" }] },
          { freq: "3x por semana", precos: [{ mensal: "890", semestral: "790", anual: "" }] },
        ],
        complementares: [],
      },
      {
        id: "coletivas",
        nome: "Coletivas",
        titulo: "MOVA Coletivas",
        tagline: "Energia que motiva. Resultados que ficam.",
        icone: "users",
        temNiveis: false,
        niveis: [],
        frequencias: [
          { freq: "2x por semana", precos: [{ mensal: "650", semestral: "550", anual: "" }] },
          { freq: "3x por semana", precos: [{ mensal: "890", semestral: "790", anual: "" }] },
        ],
        complementares: [],
      },
      {
        id: "kids",
        nome: "Kids",
        titulo: "MOVA Kids",
        tagline: "Movimento, coordenação e desenvolvimento saudável — 7 a 11 anos",
        icone: "baby",
        temNiveis: false,
        niveis: [],
        frequencias: [
          { freq: "2x por semana", precos: [{ mensal: "390", semestral: "350", anual: "" }] },
          { freq: "3x por semana", precos: [{ mensal: "490", semestral: "450", anual: "" }] },
        ],
        complementares: [],
      },
      {
        id: "teens",
        nome: "Teens",
        titulo: "MOVA Teens",
        tagline: "Performance, força, autoestima e movimento — 12 a 17 anos",
        icone: "sparkles",
        temNiveis: false,
        niveis: [],
        frequencias: [
          { freq: "2x por semana", precos: [{ mensal: "480", semestral: "430", anual: "390" }] },
          { freq: "3x por semana", precos: [{ mensal: "590", semestral: "540", anual: "490" }] },
        ],
        complementares: [],
      },
    ],

    // Planos "tudo incluso" (destaque) — só Semestral e Anual.
    clubes: [
      {
        id: "clube",
        nome: "MOVA Clube",
        tagline: "O melhor do MOVA numa rotina completa de saúde e movimento",
        semestral: "1.320",
        anual: "1.240",
        inclui: [
          "Até 3x de musculação por semana",
          "Até 2x de pilates por semana",
          "Até 5 aulas coletivas por semana",
          "1 acesso por dia",
        ],
        beneficios: [
          "Avaliação física trimestral cortesia",
          "Prioridade de agenda",
          "Congelamento de valor do plano",
          "Aula guest (leve um convidado)",
          "Benefícios com parceiros MOVA",
          "Condições especiais em terapias e massoterapia",
          "Prioridade na rematrícula",
        ],
        destaque: false,
        selo: "",
      },
      {
        id: "premium",
        nome: "MOVA Club Premium",
        tagline: "A experiência MOVA de forma integral",
        semestral: "1.650",
        anual: "1.550",
        inclui: [
          "Até 3x de musculação por semana",
          "Até 2x de pilates por semana",
          "Coletivas ampliadas (até 5 acessos/semana)",
          "Até 2 acessos por dia (2 modalidades)",
        ],
        beneficios: [
          "Todos os benefícios do MOVA Clube",
          "Metodologia exclusiva",
          "Flexibilidade ampliada de remarcação",
          "Acesso antecipado a novas modalidades",
          "Experiências premium MOVA",
          "Convites VIP para eventos e desafios",
        ],
        destaque: true,
        selo: "Vagas limitadas",
      },
    ],
  },

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

  // Grade de aulas coletivas do Studio MOVA (a "grade de modalidades").
  // icone: chave mapeada para um ícone lucide em GradeAulas.tsx.
  aulas: [
    {
      nome: "Abdominal",
      duracao: "40 min",
      capacidade: "até 8 alunos",
      icone: "shield",
      descricao:
        "Foco no fortalecimento do core (abdômen, lombar e pelve) — essencial para postura, estabilidade e prevenção de lesões.",
      beneficios: [
        "Fortalece abdômen e lombar",
        "Melhora a postura",
        "Mais equilíbrio e estabilidade",
        "Previne dores e lesões",
      ],
    },
    {
      nome: "Alongamento",
      duracao: "40 min",
      capacidade: "até 8 alunos",
      icone: "wind",
      descricao:
        "Alivia tensões musculares, aumenta a mobilidade e proporciona relaxamento. Ideal para mais leveza e recuperação.",
      beneficios: [
        "Reduz tensões musculares",
        "Aumenta a amplitude dos movimentos",
        "Diminui o estresse",
        "Auxilia na recuperação",
      ],
    },
    {
      nome: "Flexibilidade",
      duracao: "40 min",
      capacidade: "até 8 alunos",
      icone: "person",
      descricao:
        "Desenvolve a flexibilidade corporal com técnicas de alongamento e mobilidade, para movimentos mais livres e eficientes.",
      beneficios: [
        "Mais flexibilidade",
        "Melhora a mobilidade articular",
        "Reduz a rigidez muscular",
        "Previne lesões",
      ],
    },
    {
      nome: "Funcional",
      duracao: "40 min",
      capacidade: "até 8 alunos",
      icone: "activity",
      descricao:
        "Treino dinâmico com movimentos naturais do corpo: força, resistência, equilíbrio, coordenação e agilidade.",
      beneficios: [
        "Fortalecimento global",
        "Melhora o condicionamento",
        "Desenvolve a coordenação",
        "Alta queima calórica",
      ],
    },
    {
      nome: "GAP",
      duracao: "40 min",
      capacidade: "até 8 alunos",
      icone: "target",
      descricao:
        "Glúteos, abdômen e pernas: treino direcionado que fortalece e tonifica os membros inferiores e o core, com definição e resistência.",
      beneficios: [
        "Fortalece glúteos, pernas e abdômen",
        "Mais resistência muscular",
        "Definição corporal",
        "Mais estabilidade e equilíbrio",
      ],
    },
    {
      nome: "Mobilidade",
      duracao: "40 min",
      capacidade: "até 8 alunos",
      icone: "move",
      descricao:
        "Dedicada à mobilidade articular e à qualidade dos movimentos, com ativação, coordenação e controle corporal.",
      beneficios: [
        "Melhora a mobilidade articular",
        "Movimentos mais eficientes",
        "Reduz o risco de lesões",
        "Mais autonomia e qualidade de vida",
      ],
    },
    {
      nome: "Ritmos",
      duracao: "40 min",
      capacidade: "até 8 alunos",
      icone: "music",
      descricao:
        "Dança, música e movimento para melhorar o condicionamento, estimular a coordenação e tornar o treino mais divertido.",
      beneficios: [
        "Alto gasto calórico",
        "Condicionamento cardiovascular",
        "Desenvolve a coordenação",
        "Mais disposição e alegria",
      ],
    },
    {
      nome: "Spin MOVA",
      duracao: "45 min",
      capacidade: "até 12 alunos",
      icone: "bike",
      descricao:
        "Bike indoor intensa e motivadora, com diferentes níveis de intensidade ao som de playlists envolventes — baixo impacto nas articulações.",
      beneficios: [
        "Alto gasto calórico",
        "Fortalece os membros inferiores",
        "Melhora a capacidade cardiovascular",
        "Baixo impacto nas articulações",
      ],
    },
    {
      nome: "Pilates",
      duracao: "50 min",
      capacidade: "até 4 alunos",
      icone: "flower",
      descricao:
        "Em pequenos grupos, com atendimento personalizado: força, controle, postura, mobilidade e equilíbrio nos aparelhos e no solo.",
      beneficios: [
        "Fortalece o core",
        "Melhora a postura",
        "Ganho de flexibilidade e mobilidade",
        "Mais consciência corporal",
      ],
    },
    {
      nome: "HIIT MOVA",
      duracao: "40 min",
      capacidade: "até 8 alunos",
      icone: "flame",
      descricao:
        "Treino intervalado de alta intensidade: exercícios rápidos e intensos com recuperação ativa, para condicionamento, queima e força.",
      beneficios: [
        "Alto gasto calórico",
        "Melhora o condicionamento físico",
        "Desenvolve força e resistência",
        "Acompanhamento profissional",
      ],
    },
  ],

  // Perguntas frequentes (editáveis no /admin/faq).
  faq: [
    {
      q: "Como funciona o treino no Studio MOVA?",
      a: "Você treina em turmas de até 4 alunos, com um professor ao seu lado durante todo o treino. São 60 minutos divididos em 3 etapas: mobilidade e core, musculação + funcional, e um fechamento de HIIT bike. Tudo personalizado para o seu corpo e objetivos.",
    },
    {
      q: "Preciso já estar em forma para começar?",
      a: "Não! Recebemos pessoas de todas as idades e níveis — de quem está saindo do sedentarismo a quem já treina há anos. O treino é adaptado para você, no seu ritmo e com segurança.",
    },
    {
      q: "O que é a sessão avaliativa?",
      a: "É o seu primeiro passo, sem compromisso: o momento de conhecer o Studio pessoalmente, sentir o clima do espaço e entender se o MOVA combina com você — com a nossa professora especialista do seu lado desde o primeiro minuto. Conversamos sobre seus objetivos e sua rotina, fazemos uma avaliação postural e de mobilidade, e você sente o método na prática. Só depois a gente fala de plano, com calma e sem pressão. Dica: leve roupa leve e confortável, tênis, garrafinha de água e toalha — e, se tiver exame ou laudo, pode trazer.",
    },
    {
      q: "Quais são os planos e valores?",
      a: "Você escolhe a modalidade que quer treinar — Musculação, Pilates, Bike, Coletivas, ou as turmas MOVA Kids (7–11) e Teens (12–17) — e a frequência (2x ou 3x por semana). Musculação e Pilates têm níveis (Essencial, Equilíbrio e Performance, que liberam modalidades complementares). E há os planos completos MOVA Clube e Club Premium, que reúnem várias modalidades numa rotina só. Cada plano tem valores Mensal, Semestral e Anual (quanto maior o período, melhor o valor por mês). Veja tudo, com preços, na página de Planos.",
    },
    {
      q: "Quais as formas de pagamento?",
      a: "Você escolhe a que for mais confortável: Pix (instantâneo via chave ou QR code), cartão de crédito (com parcelamento) ou recorrência automática (débito mensal automático).",
    },
    {
      q: "Tenho dores ou alguma limitação física. Posso treinar?",
      a: "Pode sim — é justamente para isso que servimos. Nossos professores são especializados em treino adaptado e ajustam cada exercício à sua condição. Se você tiver laudo, exame ou orientação médica, pode trazer no dia da sessão avaliativa: ajuda muito na personalização. Importante: o exercício supervisionado é um grande aliado na reabilitação e no fortalecimento, mas não substitui a avaliação do seu médico ou fisioterapeuta.",
    },
    {
      q: "Uso medicação para emagrecer (Ozempic, Mounjaro). Vale a pena treinar?",
      a: "Vale muito! Essas medicações ajudam a baixar o peso, mas sem treino de força o corpo perde músculo junto com a gordura. A musculação personalizada protege a sua massa muscular, o que mantém o metabolismo e garante um emagrecimento mais firme e saudável. Como as turmas são de até 4 alunos, o professor ajusta a intensidade conforme a sua disposição no dia.",
    },
    {
      q: "Vocês aceitam convênio ou plano de saúde?",
      a: "No momento não trabalhamos com convênios ou planos de saúde. As formas de acesso são: pagamento regular (Pix, cartão ou recorrência), Wellhub (a partir do Gold) e TotalPass (a partir do TP5+).",
    },
    {
      q: "Como funciona pelo Wellhub?",
      a: "Aceitamos a partir do plano Gold (Gold, Gold+, Platinum, Diamond e Diamond+). Você tem 2 check-ins por semana, e a sessão avaliativa já conta como 1 check-in. Todos os agendamentos, reagendamentos e cancelamentos são feitos direto pelo app da Wellhub — as vagas são liberadas com cerca de 5 dias de antecedência.",
    },
    {
      q: "Como funciona pelo TotalPass?",
      a: "Aceitamos a partir do plano TP5+ (TP5+, TP6 e TP7), com direito a 3 check-ins por semana. Aqui o agendamento é feito via WhatsApp com a nossa especialista: toda sexta-feira da semana anterior você envia seus dias e horários disponíveis, e ela confirma sua agenda da semana seguinte.",
    },
    {
      q: "Onde fica o Studio?",
      a: "Estamos na Asa Norte, Brasília — SHCN EQN 102/103, Ed. Estação 102, Sala 9A, 1º andar. Pertinho da quadra residencial, em um espaço climatizado e acolhedor.",
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
      emBreve: false,
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
      "A sessão avaliativa é o seu primeiro passo: o momento de conhecer o Studio pessoalmente, sentir o clima do espaço e entender se o MOVA combina com você — com a nossa professora especialista do seu lado desde o primeiro minuto e sem nenhum compromisso. Você sente na prática a diferença de um treino feito pra você e, depois, a gente conversa sobre o plano com calma, sem pressa.",
    etapas: [
      "Conheça o Studio e a professora especialista pessoalmente",
      "Conversa sobre seus objetivos e sua rotina",
      "Avaliação postural e de mobilidade",
      "Sinta o método na prática — e fale de plano sem pressão",
    ],
    levar:
      "Leve roupa leve e confortável, tênis, garrafinha de água e toalha. Se tiver algum exame ou laudo, pode trazer também.",
  },

  // Depoimentos reais. Cada um pode ter:
  //  - foto: caminho em /fotos/depoimentos/... (opcional; se vazio, mostra
  //          um avatar com as iniciais do nome)
  //  - fonte: "Wellhub" | "TotalPass" | "Google" | "" (mostra um selo de origem)
  depoimentos: [
    {
      texto:
        "O Studio Mova oferece um ambiente espaçoso, com todos os equipamentos necessários para um treino completo, e uma professora 'bravinha' e incrível. E podemos aproveitar os momentos de descanso curtindo o verde da quadra residencial ao lado.",
      autor: "Flávia Mendim",
      foto: "",
      fonte: "",
    },
    {
      texto:
        "Amo e estou amando o estúdio de atividade física MOVA! É lindo, de bom gosto, banheiros amplos, limpeza evidente; aparelhos modernos e uma profissional dedicada que me ajuda a manter meu corpo bem cuidado e saudável com exercícios dinâmicos e inteligentes.",
      autor: "Indira Vale",
      foto: "",
      fonte: "",
    },
    {
      texto:
        "Infraestrutura excelente, ambiente climatizado, ótima localização, mas o melhor do Studio MOVA é a personal. Juliana é uma profissional dedicada, animada, capacitada... e uma pessoa incrível! Recomendadíssimo!",
      autor: "Marly Osugi",
      foto: "",
      fonte: "",
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
