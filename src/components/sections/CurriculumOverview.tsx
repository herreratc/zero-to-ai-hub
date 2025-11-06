import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Lightbulb, Rocket } from "lucide-react";

const modules = [
  {
    title: "Semanas 1-2",
    focus: "Fundamentos e mindset",
    description:
      "Construa a base de IA com conceitos claros, pratique com notebooks guiados e organize seu plano de estudos personalizado.",
    icon: Lightbulb,
  },
  {
    title: "Semanas 3-5",
    focus: "Aplicação prática",
    description:
      "Implemente automações, modelos clássicos e IA generativa acompanhando projetos reais adaptados ao mercado brasileiro.",
    icon: CalendarClock,
  },
  {
    title: "Semanas 6-8",
    focus: "Projeto final e mentoria",
    description:
      "Construa um case completo com apoio dos mentores, receba feedback ao vivo e publique seu resultado com certificação.",
    icon: Rocket,
  },
];

const CurriculumOverview = () => {
  return (
    <section id="curriculum" className="py-16 sm:py-20" aria-labelledby="curriculum-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-background/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Jornada em 3 etapas
          </span>
          <h2 id="curriculum-heading" className="text-3xl sm:text-4xl font-bold">
            Uma estrutura simples para você avançar sem se perder
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Avance módulo a módulo com foco e clareza. Cada etapa desbloqueia novos desafios quando você estiver pronto.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {modules.map(({ title, focus, description, icon: Icon }) => (
            <Card
              key={title}
              className="h-full rounded-3xl border border-primary/10 bg-card/80 shadow-[0_1px_25px_rgba(37,99,235,0.12)]"
            >
              <CardHeader className="space-y-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/80">{title}</p>
                  <CardTitle className="mt-1 text-xl text-foreground">{focus}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumOverview;
