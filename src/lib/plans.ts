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
];
