import { BrainCircuit, Rocket, LineChart, ShieldCheck } from "lucide-react";

const highlights = [
  {
    title: "Formação Completa",
    description:
      "Do básico ao avançado em Inteligência Artificial com aulas guiadas, desafios reais e projetos aplicados ao mercado brasileiro.",
    icon: BrainCircuit,
  },
  {
    title: "Aprenda Fazendo",
    description:
      "Laboratórios semanais com frameworks atuais, templates prontos e mentorias para acelerar seu portfólio profissional.",
    icon: Rocket,
  },
  {
    title: "Resultados Medidos",
    description:
      "Dashboards de desempenho, feedback individualizado e planos de evolução personalizados para cada aluno.",
    icon: LineChart,
  },
  {
    title: "Comunidade & Mentoria",
    description:
      "Networking ativo com especialistas, encontros ao vivo e suporte contínuo para implementar IA com segurança.",
    icon: ShieldCheck,
  },
];

const ProgramHighlights = () => {
  return (
    <section id="program" className="py-20 sm:py-24" aria-labelledby="program-highlights">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">Jornada IA do Zero</p>
          <h2 id="program-highlights" className="text-3xl sm:text-4xl font-bold">
            Aprenda com uma experiência imersiva e orientada para o mercado
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Cada módulo foi desenhado para transformar curiosidade em domínio técnico, combinando fundamentos sólidos com execução prática.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-2">
          {highlights.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-card/90 via-card/60 to-background/60 p-8 shadow-[0_1px_40px_rgba(37,99,235,0.18)] transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 to-accent/10" />
              <div className="relative flex flex-col gap-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;
