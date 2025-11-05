import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const PricingPlans = () => {
  const handlePurchase = (plan: string) => {
    const message = encodeURIComponent(`Olá! Gostaria de adquirir o ${plan}.`);
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const plans = [
    {
      name: "Ebook IA do Zero",
      price: "R$ 19,99",
      description: "Material completo em PDF para começar sua jornada",
      features: [
        "Ebook completo em PDF",
        "Acesso vitalício ao material",
        "Atualizações gratuitas",
        "Suporte por email",
      ],
      highlight: false,
    },
    {
      name: "Jornada Completa",
      price: "R$ 297,00",
      description: "Acesso total à plataforma com todos os recursos",
      features: [
        "Todos os recursos do Ebook",
        "Acesso à plataforma completa",
        "50+ horas de videoaulas",
        "Certificado de conclusão",
        "Projetos práticos",
        "Comunidade exclusiva",
        "Suporte prioritário",
        "Atualizações vitalícias",
      ],
      highlight: true,
    },
  ];

  return (
    <section id="plans" className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Invista no seu futuro com IA. Escolha o plano ideal para você.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all hover:shadow-[var(--shadow-elegant)] ${
                plan.highlight 
                  ? 'border-primary shadow-[var(--shadow-glow)] scale-105' 
                  : ''
              }`}
              style={plan.highlight ? { background: 'var(--gradient-card)' } : {}}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Mais Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold">{plan.price}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full text-lg py-6"
                  variant={plan.highlight ? "default" : "outline"}
                  onClick={() => handlePurchase(plan.name)}
                >
                  Adquirir Agora
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
