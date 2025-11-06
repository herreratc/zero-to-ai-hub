import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, ThumbsUp, Headset, Wallet } from "lucide-react";

const trustPoints = [
  {
    title: "Garantia de 7 dias",
    description:
      "Se perceber que a jornada não é para você, devolvemos 100% do investimento sem burocracia.",
    icon: ShieldCheck,
  },
  {
    title: "Metodologia validada",
    description:
      "Conteúdo construído com quem implementou IA em empresas como Nubank, Itaú e Ambev.",
    icon: ThumbsUp,
  },
  {
    title: "Suporte dedicado",
    description:
      "Mentorias em grupo, plantões semanais e canal direto com especialistas para acelerar suas entregas.",
    icon: Headset,
  },
  {
    title: "Pagamento seguro",
    description:
      "Ambiente protegido, opções de boleto ou cartão em até 12x e nota fiscal emitida automaticamente.",
    icon: Wallet,
  },
];

const TrustSignals = () => {
  return (
    <section className="py-16 sm:py-20 bg-muted/20" aria-labelledby="trust-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-background/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Você em primeiro lugar
          </span>
          <h2 id="trust-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Transparência e suporte para você decidir com segurança
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Da inscrição ao certificado, nossa equipe acompanha cada etapa para que sua evolução seja consistente e sem surpresas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ title, description, icon: Icon }) => (
            <Card
              key={title}
              className="h-full rounded-3xl border border-primary/15 bg-background/90 shadow-[0_1px_35px_rgba(37,99,235,0.14)]"
            >
              <CardContent className="flex h-full flex-col gap-4 p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="space-y-2 text-left">
                  <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-primary/25 bg-gradient-to-r from-primary/20 via-primary/10 to-background/80 px-8 py-8 text-center sm:flex-row sm:text-left">
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Compromisso com resultados</p>
            <p className="text-lg sm:text-xl font-medium text-foreground">
              92% dos alunos aplicam IA em até 60 dias e avaliam a experiência com nota 4,9/5.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Caso precise de apoio extra, nossa equipe estende o acesso às mentorias sem custo adicional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
