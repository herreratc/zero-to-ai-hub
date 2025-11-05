import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, ArrowRight } from "lucide-react";

const PricingPlans = () => {
  const handlePurchase = (plan: string) => {
    const message = encodeURIComponent(`Olá! Gostaria de adquirir o ${plan}.`);
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const plans = [
    {
      name: "Ebook IA do Zero",
      price: "19,99",
      description: "Conteúdo completo para começar",
      features: [
        "Ebook completo em PDF",
        "Acesso vitalício",
        "Atualizações gratuitas",
        "Suporte por email",
      ],
      highlight: false,
    },
    {
      name: "Jornada Completa",
      price: "297,00",
      description: "Tudo que você precisa para dominar IA",
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
    },
  ];

  return (
    <section id="plans" className="py-20 sm:py-28 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Invista no seu futuro</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Escolha Seu Plano
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Investimento que transforma carreiras. Comece hoje mesmo.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all hover:shadow-2xl ${
                plan.highlight 
                  ? 'border-2 border-primary shadow-xl lg:scale-105' 
                  : 'border border-border'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 text-sm font-bold rounded-bl-2xl shadow-lg">
                  MAIS POPULAR
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-10">
                <CardTitle className="text-2xl sm:text-3xl mb-3">{plan.name}</CardTitle>
                <CardDescription className="text-base sm:text-lg">{plan.description}</CardDescription>
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-semibold">R$</span>
                    <span className="text-5xl sm:text-6xl font-bold">{plan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">pagamento único</p>
                </div>
              </CardHeader>
              
              <CardContent className="px-6 sm:px-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="px-6 sm:px-8 pb-8">
                <Button 
                  className="w-full text-base sm:text-lg py-6 sm:py-7 shadow-lg hover:shadow-xl transition-all"
                  variant={plan.highlight ? "default" : "outline"}
                  onClick={() => handlePurchase(plan.name)}
                >
                  Adquirir Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
