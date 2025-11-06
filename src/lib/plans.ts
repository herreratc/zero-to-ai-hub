export interface PlanJourneyStage {
  title: string;
  duration: string;
  focus: string;
  outcomes: string[];
  deliverable?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  originalPrice?: string;
  paymentNote?: string;
  installmentInfo?: string;
  bestFor?: string;
  bonuses?: string[];
  journey?: PlanJourneyStage[];
}

export const plans: Plan[] = [
  {
    id: "ebook",
    name: "Ebook IA do Zero",
    price: "19,99",
    description: "Para quem quer iniciar agora com base sólida",
    features: [
      "Ebook completo em PDF",
      "Acesso vitalício",
      "Atualizações gratuitas",
      "Checklist de ferramentas",
    ],
    bestFor: "Comece rápido com fundamentos essenciais",
  },
  {
    id: "journey",
    name: "Jornada Completa",
    price: "149,90",
    originalPrice: "300,00",
    paymentNote: "no PIX",
    installmentInfo: "Ou em até 12x no cartão de crédito",
    description: "Programa completo com mentoria e projetos reais",
    features: [
      "Todos os recursos do Ebook",
      "Acesso à plataforma completa",
      "50+ horas de videoaulas",
      "Certificado de conclusão",
      "Projetos práticos reais",
      "Comunidade exclusiva",
      "Suporte prioritário",
      "Atualizações vitalícias",
    ],
    highlight: true,
    bestFor: "Experiência imersiva com acompanhamento ao vivo",
    bonuses: [
      "Mentorias coletivas semanais",
      "Trilha acelerada com desafios guiados",
      "Biblioteca de prompts e automações",
    ],
  },
  {
    id: "master",
    name: "Master Corporate IA",
    price: "499,90",
    originalPrice: "1.200,00",
    paymentNote: "no PIX",
    installmentInfo: "Ou em até 12x no cartão de crédito",
    description: "Imersão premium com mentoria individual e consultoria aplicada em projetos corporativos.",
    features: [
      "Inclui todos os recursos da Jornada Completa",
      "Mentorias individuais quinzenais com especialistas sêniores",
      "Squads fechados com profissionais experientes para desafios estratégicos",
      "Diagnóstico de maturidade e plano executivo de IA para sua empresa",
      "Revisão técnica e acompanhamento de projetos críticos",
      "Laboratórios privados com modelos, prompts e automações inéditas",
      "Playbooks de governança, segurança e compliance",
      "Canal direto com suporte prioritário 24h",
    ],
    bestFor: "Empresas e líderes que precisam implementar IA com acompanhamento individual",
    bonuses: [
      "Imersão executiva com C-levels convidados a cada trimestre",
      "Sessão estratégica exclusiva com especialista em growth e dados",
      "Template executivo para apresentar resultados ao board e investidores",
    ],
    journey: [
      {
        title: "Kickoff estratégico e diagnóstico 360°",
        duration: "Semana 1",
        focus:
          "Sessão individual com mentor sênior para mapear objetivos, maturidade e oportunidades prioritárias.",
        outcomes: [
          "Mentoria personalizada para alinhar metas de negócio e indicadores de sucesso.",
          "Análise de processos, dados disponíveis e stakeholders-chave.",
          "Roadmap de 90 dias com milestones semanais e responsáveis definidos.",
        ],
        deliverable: "Plano tático personalizado com metas e indicadores",
      },
      {
        title: "Arquitetura e stack personalizada",
        duration: "Semanas 2-3",
        focus: "Construção de base técnica com foco em arquitetura, segurança e governança corporativa.",
        outcomes: [
          "Trilhas guiadas sobre LLMOps, RAG e integrações com sistemas internos.",
          "Setups recomendados de pipelines, automações e versionamento.",
          "Checklist de compliance, privacidade e avaliação de riscos.",
        ],
        deliverable: "Blueprint técnico da solução priorizada",
      },
      {
        title: "Projetos guiados com squads",
        duration: "Semanas 4-6",
        focus: "Execução de sprints supervisionadas para entregar POCs de alto impacto.",
        outcomes: [
          "Reuniões semanais com especialistas para destravar desafios técnicos.",
          "Feedback estruturado sobre código, prompts e UX das soluções.",
          "Testes com usuários e alinhamento com stakeholders do negócio.",
        ],
        deliverable: "POC validada com métricas de desempenho",
      },
      {
        title: "Automação e integração avançada",
        duration: "Semanas 7-8",
        focus: "Escala de automações e conexão com sistemas legados e ferramentas internas.",
        outcomes: [
          "Implementação de agentes autônomos e workflows multi-ferramentas.",
          "Integrações com APIs internas, ERPs e plataformas de dados.",
          "Estratégias de monitoramento, observabilidade e retreinamento contínuo.",
        ],
        deliverable: "Pipelines em produção com monitoramento ativo",
      },
      {
        title: "Liderança, rollout e impacto",
        duration: "Semanas 9-10",
        focus: "Preparação do time para escalar IA e comunicar resultados ao board.",
        outcomes: [
          "Sessões de liderança para governança, orçamento e gestão de riscos.",
          "Plano de rollout e capacitação das equipes envolvidas.",
          "Preparação do pitch executivo com storytelling, KPIs e próximos passos.",
        ],
        deliverable: "Playbook final e apresentação executiva para o board",
      },
    ],
  },
];
