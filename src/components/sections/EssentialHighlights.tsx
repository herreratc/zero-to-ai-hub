import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, MonitorPlay, Users } from "lucide-react";

const highlights = [
  {
    title: "Trilha guiada e objetiva",
    description:
      "Siga um roteiro claro com checkpoints semanais para aprender IA com segurança, sem sentir sobrecarga de conteúdos.",
    icon: Compass,
  },
  {
    title: "Aulas curtas e aplicáveis",
    description:
      "Vídeos diretos ao ponto e projetos práticos que mostram exatamente como aplicar IA no dia a dia do trabalho.",
    icon: MonitorPlay,
  },
  {
    title: "Mentoria próxima",
    description:
      "Encontros ao vivo em pequenos grupos para tirar dúvidas e receber feedback personalizado quando precisar avançar.",
    icon: Users,
  },
];

const EssentialHighlights = () => {
  return (
    <section
      id="overview"
      className="py-16 sm:py-20 bg-muted/30"
      aria-labelledby="overview-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-background/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Um começo leve
          </span>
          <h2 id="overview-heading" className="text-3xl sm:text-4xl font-bold">
            Tudo que você precisa para dar os primeiros passos com IA
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Organizamos a experiência para você focar no essencial: entender, praticar e colocar inteligência artificial em produção.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {highlights.map(({ title, description, icon: Icon }) => (
            <Card
              key={title}
              className="h-full rounded-3xl border border-primary/10 bg-card/80 shadow-[0_1px_25px_rgba(37,99,235,0.12)]"
            >
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {title}
                </CardTitle>
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

export default EssentialHighlights;
