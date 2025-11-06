import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, ArrowRight } from "lucide-react";
import { plans } from "@/lib/plans";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";

const PricingPlans = () => {
  const { startOnboarding } = useOnboarding();

  const handlePlanSelection = (planId: string) => {
    startOnboarding({ planId, initialStep: 1 });
  };

  return (
    <section id="plans" className="py-20 sm:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            <Zap className="h-4 w-4" />
            Investimento Inteligente
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Escolha o plano ideal para sua jornada</h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Garanta acesso imediato a conteúdos, mentorias e comunidade que vão acelerar sua carreira em IA.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden rounded-[2.5rem] border ${
                plan.highlight
                  ? "border-primary/50 bg-gradient-to-br from-primary/20 via-background/80 to-background/90 shadow-[0_1px_70px_rgba(37,99,235,0.35)]"
                  : "border-primary/10 bg-gradient-to-br from-card/80 via-card/50 to-background/30 shadow-[0_1px_40px_rgba(37,99,235,0.2)]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-6 right-6 rounded-full border border-primary/60 bg-primary/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
                  Mais escolhido
                </div>
              )}

              <CardHeader className="text-center pb-6 pt-10">
                <CardTitle className="text-2xl sm:text-3xl font-semibold">{plan.name}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  {plan.description}
                </CardDescription>
                {plan.bestFor && <p className="mt-3 text-sm font-semibold text-primary/80">{plan.bestFor}</p>}
                <div className="mt-6">
                  <div className="flex flex-col items-center justify-center gap-2 text-primary">
                    {plan.originalPrice && (
                      <div className="flex items-baseline justify-center gap-1 text-muted-foreground/70 line-through">
                        <span className="text-sm font-medium">R$</span>
                        <span className="text-2xl font-semibold">{plan.originalPrice}</span>
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-xl font-semibold">R$</span>
                      <span className="text-5xl sm:text-6xl font-bold">{plan.price}</span>
                    </div>
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2">
                    {plan.paymentNote ? plan.paymentNote : "Pagamento único"}
                  </p>
                  {plan.installmentInfo && (
                    <p className="text-xs text-primary font-semibold mt-2">{plan.installmentInfo}</p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="px-6 sm:px-10">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-sm sm:text-base text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="px-6 sm:px-10 pb-10">
                <Button
                  className={`w-full py-6 text-base shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition-transform hover:-translate-y-0.5 ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border-primary/30 bg-background/80 text-primary hover:bg-primary/10"
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                  onClick={() => handlePlanSelection(plan.id)}
                >
                  QUERO ESSE PLANO
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            Compra protegida
          </p>
          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
            Se em até 7 dias você entender que não é o momento certo, basta enviar uma mensagem e cancelamos sua matrícula com reembolso integral.
            Mantemos sua vaga garantida para uma próxima turma.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
