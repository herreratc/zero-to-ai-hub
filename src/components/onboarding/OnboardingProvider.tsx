import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { plans } from "@/lib/plans";
import type { Plan } from "@/lib/plans";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Layers,
  MessageCircle,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface OnboardingOptions {
  planId?: string;
  initialStep?: number;
}

interface OnboardingContextValue {
  startOnboarding: (options?: OnboardingOptions) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

const stepConfigs = [
  {
    title: "Bem-vindo à jornada IA do Zero",
    description: "Entenda em poucos passos como funcionam nossos planos e como aproveitar a oferta Black Friday.",
  },
  {
    title: "Veja o que cada plano oferece",
    description: "Compare benefícios, escolha o plano ideal e descubra os bônus exclusivos desta semana.",
  },
  {
    title: "Garanta sua vaga com suporte dedicado",
    description: "Finalize falando direto com nossa equipe no WhatsApp para ativar seu acesso imediatamente.",
  },
];

const stepsCount = stepConfigs.length;

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans[0]?.id ?? "");

  const startOnboarding = useCallback((options: OnboardingOptions = {}) => {
    const safeStep = Math.min(Math.max(options.initialStep ?? 0, 0), stepsCount - 1);
    const initialPlanId = options.planId ?? plans[0]?.id ?? "";

    setSelectedPlanId(initialPlanId);
    setStep(safeStep);
    setOpen(true);
  }, []);

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? plans[0],
    [selectedPlanId],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    setStep(0);
  }, []);

  const handleNext = useCallback(() => {
    setStep((current) => Math.min(current + 1, stepsCount - 1));
  }, []);

  const handlePrevious = useCallback(() => {
    setStep((current) => Math.max(current - 1, 0));
  }, []);

  const handlePlanSelection = useCallback((planId: string) => {
    setSelectedPlanId(planId);
  }, []);

  const handleFinish = useCallback(() => {
    const planName = selectedPlan?.name ?? "IA do Zero";
    const message = encodeURIComponent(
      `Olá! Quero garantir minha vaga no ${planName} com a oferta Black Friday da IA do Zero.`,
    );
    window.open(`https://wa.me/5535992158486?text=${message}`, "_blank");
    handleClose();
  }, [handleClose, selectedPlan?.name]);

  const progressValue = ((step + 1) / stepsCount) * 100;
  const isLastStep = step === stepsCount - 1;

  const contextValue = useMemo(() => ({ startOnboarding }), [startOnboarding]);

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (!value) {
            handleClose();
            return;
          }
          setOpen(value);
        }}
      >
        <DialogContent className="w-[calc(100vw-2rem)] max-w-3xl sm:max-w-4xl sm:w-auto border border-primary/20 bg-background/95 backdrop-blur-xl">
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <Badge className="bg-amber-500/15 text-amber-600 border border-amber-500/40 uppercase tracking-[0.3em]">
                Black Friday
              </Badge>
              <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground/70">
                Oferta por tempo limitado
              </span>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-semibold text-foreground">
              {stepConfigs[step]?.title}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              {stepConfigs[step]?.description}
            </DialogDescription>
            <Progress value={progressValue} className="h-2" />
          </DialogHeader>

          <div className="space-y-6">
            {step === 0 && <IntroStep />}
            {step === 1 && (
              <PlansStep selectedPlanId={selectedPlanId} onSelectPlan={handlePlanSelection} />
            )}
            {step === 2 && <FinalStep selectedPlanName={selectedPlan?.name ?? "IA do Zero"} />}

            <Separator className="bg-primary/20" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-muted-foreground">
                Plano selecionado: {" "}
                <span className="font-semibold text-foreground">{selectedPlan?.name}</span>
                <span className="text-muted-foreground/70">
                  {selectedPlan?.price ? ` • R$ ${selectedPlan.price}` : ""}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {step > 0 && (
                  <Button variant="ghost" onClick={handlePrevious}>
                    Voltar
                  </Button>
                )}
                <Button variant="outline" onClick={handleClose}>
                  Fechar
                </Button>
                <Button
                  onClick={isLastStep ? handleFinish : handleNext}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isLastStep ? (
                    <span className="flex items-center gap-2">
                      Falar no WhatsApp
                      <MessageCircle className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Avançar
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </OnboardingContext.Provider>
  );
};

const IntroStep = () => {
  const featureCards = [
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Mentorias semanais",
      description: "Encontros ao vivo para tirar dúvidas com especialistas que atuam no mercado.",
    },
    {
      icon: <Layers className="h-5 w-5 text-primary" />,
      title: "Projetos reais",
      description: "Construa soluções aplicadas com feedback e materiais de apoio passo a passo.",
    },
    {
      icon: <Rocket className="h-5 w-5 text-primary" />,
      title: "Carreira acelerada",
      description: "Portfólio validado para impulsionar promoções, freelas e novas oportunidades.",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
      title: "Certificação reconhecida",
      description: "Comprove 180h de formação com certificado compartilhável no LinkedIn.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-primary/20 bg-primary/10 p-5 sm:p-6">
        <div className="flex items-center gap-3 text-primary">
          <Sparkles className="h-5 w-5" />
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">Experiência completa</p>
        </div>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Acesse uma trilha estruturada para implementar Inteligência Artificial no trabalho com projetos guiados e mentorias ao
          vivo, tudo organizado em etapas práticas.
        </p>
      </div>

      <div className="sm:hidden">
        <ScrollArea className="w-full pb-2">
          <div className="flex gap-3">
            {featureCards.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="min-w-[16rem] shrink-0"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="mt-2 h-2" />
        </ScrollArea>
      </div>

      <div className="hidden sm:grid gap-4 sm:grid-cols-2">
        {featureCards.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className="h-full"
          />
        ))}
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        <AccordionItem value="extras" className="border-0">
          <div className="rounded-[2rem] border border-primary/15 bg-background/80">
            <AccordionTrigger className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Ver bônus da Black Friday e da comunidade
            </AccordionTrigger>
            <AccordionContent className="space-y-4 px-5">
              <div className="rounded-[2rem] border border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-background/95 to-background/80 p-5 shadow-[0_1px_35px_rgba(245,158,11,0.25)]">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-600">🔥 Oferta Black Friday</p>
                <p className="mt-3 text-base font-semibold text-foreground">
                  Economize mais de 50% na Jornada Completa: de R$ 300,00 por apenas R$ 149,90.
                </p>
                <p className="mt-2 text-sm text-amber-600/80">
                  Somente até 30/11 você desbloqueia mentorias extras e materiais bônus exclusivos.
                </p>
              </div>
              <div className="rounded-[2rem] border border-primary/20 bg-background/80 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Comunidade ativa</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Mais de 500 alunos já aplicaram IA nos negócios com suporte do nosso hub privado e desafios quinzenais.
                </p>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const PlansStep = ({
  selectedPlanId,
  onSelectPlan,
}: {
  selectedPlanId: string;
  onSelectPlan: (planId: string) => void;
}) => (
  <div className="space-y-5">
    <div className="grid gap-4 md:grid-cols-2">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} isActive={plan.id === selectedPlanId} onSelectPlan={onSelectPlan} />
      ))}
    </div>

    <div className="rounded-[2rem] border border-amber-500/40 bg-amber-500/10 p-5 text-sm text-amber-700">
      🎁 Inscreva-se durante a Black Friday e receba upgrades exclusivos: 2 mentorias coletivas extras, um workshop ao vivo de
      automações com IA e acesso antecipado às próximas atualizações da plataforma.
    </div>
  </div>
);

const PlanCard = ({
  plan,
  isActive,
  onSelectPlan,
}: {
  plan: Plan;
  isActive: boolean;
  onSelectPlan: (planId: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const previewFeatures = plan.features.slice(0, 3);
  const remainingFeatures = plan.features.slice(3);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        onSelectPlan(plan.id);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelectPlan(plan.id);
        }
      }}
      className={cn(
        "group h-full rounded-[2rem] border p-6 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "border-primary/60 bg-primary/10 shadow-[0_1px_40px_rgba(37,99,235,0.25)]"
          : "border-primary/10 bg-background/80 hover:border-primary/40 hover:bg-primary/5",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground/70">{plan.name}</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">R$ {plan.price}</p>
          {plan.originalPrice && (
            <p className="text-xs text-muted-foreground/70 line-through">De R$ {plan.originalPrice}</p>
          )}
        </div>
        {plan.highlight && (
          <Badge className="bg-primary text-primary-foreground border border-primary/40">Mais popular</Badge>
        )}
      </div>

      {plan.bestFor && <p className="mt-3 text-sm font-medium text-primary/80">{plan.bestFor}</p>}

      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {previewFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {(remainingFeatures.length > 0 || plan.bonuses) && (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger
            onClick={(event) => {
              event.stopPropagation();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.stopPropagation();
              }
            }}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
          >
            {open ? "Ver menos" : "Ver todos os benefícios"}
            <ArrowRight className={cn("h-4 w-4 transition-transform", open && "rotate-90")} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-3 text-sm text-muted-foreground">
            {remainingFeatures.length > 0 && (
              <ul className="space-y-2">
                {remainingFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            {plan.bonuses && (
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-primary">
                <p className="font-semibold uppercase tracking-[0.3em] text-xs">Bônus Black Friday</p>
                <ul className="mt-3 space-y-2">
                  {plan.bonuses.map((bonus) => (
                    <li key={bonus} className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4" />
                      <span>{bonus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

const FinalStep = ({ selectedPlanName }: { selectedPlanName: string }) => (
  <div className="space-y-5">
    <div className="rounded-[2rem] border border-primary/30 bg-gradient-to-br from-primary/15 via-background/95 to-background/80 p-6">
      <h3 className="text-lg font-semibold text-foreground">Como funciona o onboarding</h3>
      <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
        <li>
          <span className="font-semibold text-foreground">1. Confirmação no WhatsApp:</span> fale com nossa equipe para garantir a oferta
          Black Friday.
        </li>
        <li>
          <span className="font-semibold text-foreground">2. Receba o link de pagamento seguro:</span> pode ser via PIX ou cartão em até 12x.
        </li>
        <li>
          <span className="font-semibold text-foreground">3. Acesso imediato liberado:</span> em minutos você já entra na plataforma e na
          comunidade IA do Zero.
        </li>
      </ol>
    </div>
    <div className="rounded-[2rem] border border-amber-500/40 bg-amber-500/10 p-5 text-sm text-amber-700">
      ⏰ Oferta Black Friday garantida somente para conversas iniciadas nesta semana. Garanta seu desconto antes que as vagas se
      esgotem!
    </div>
    <div className="rounded-2xl border border-primary/20 bg-background/80 p-4 text-sm text-muted-foreground">
      Estamos prontos para receber você no <span className="font-semibold text-foreground">{selectedPlanName}</span>. Clique em
      “Falar no WhatsApp” para finalizar com suporte humano em poucos minutos.
    </div>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  description,
  className,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}) => (
  <div className={cn("rounded-2xl border border-primary/15 bg-background/80 p-4", className)}>
    <div className="flex items-center gap-3">
      {icon}
      <p className="text-sm font-semibold text-foreground">{title}</p>
    </div>
    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
  </div>
);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
