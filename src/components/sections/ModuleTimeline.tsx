import { Calendar, Cpu, GraduationCap, Network } from "lucide-react";

const modules = [
  {
    title: "Fundamentos que Importam",
    description:
      "Construímos a base sólida: lógica, pensamento computacional, Python aplicado e visão geral dos principais conceitos de IA.",
    focus: "Ferramentas: Python, Google Colab, Prompt Engineering",
    icon: GraduationCap,
  },
  {
    title: "Modelos Clássicos e Machine Learning",
    description:
      "Do entendimento matemático à prática com algoritmos supervisionados, não supervisionados e métricas que o mercado usa.",
    focus: "Ferramentas: Scikit-learn, Pandas, Streamlit",
    icon: Cpu,
  },
  {
    title: "IA Generativa na Prática",
    description:
      "Aplicações com LLMs, automações com agentes, integrações via APIs e cases de negócios para gerar impacto imediato.",
    focus: "Ferramentas: OpenAI, LangChain, Supabase, Automations",
    icon: Network,
  },
  {
    title: "Deploy, Portfólio e Carreira",
    description:
      "Você vai colocar seus projetos no mundo, criar um portfólio que vende e aprender estratégias para acelerar sua carreira.",
    focus: "Ferramentas: Vercel, GitHub Actions, Storytelling de Dados",
    icon: Calendar,
  },
];

const ModuleTimeline = () => {
  return (
    <section id="timeline" className="py-20 sm:py-24" aria-labelledby="module-timeline">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">Cronograma guiado</p>
          <h2 id="module-timeline" className="text-3xl sm:text-4xl font-bold">
            Evolução semana a semana com acompanhamento especializado
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Um roteiro premium construído para transformar iniciantes em especialistas capazes de liderar projetos de Inteligência Artificial.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-[0.35fr,1fr] gap-10 md:gap-16 items-start">
          <div className="hidden md:block rounded-3xl border border-primary/10 bg-card/60 p-8 shadow-[0_1px_30px_rgba(37,99,235,0.22)]">
            <div className="flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                <Calendar className="h-4 w-4" />
                4 módulos
              </span>
              <h3 className="text-2xl font-semibold leading-tight">
                Mentor acompanhando você em cada fase da jornada
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Lives semanais, correção de desafios e comunidade no Discord garantem evolução constante.
              </p>
            </div>
          </div>

          <ol className="relative space-y-8">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/70 via-primary/20 to-transparent" />
            {modules.map(({ title, description, focus, icon: Icon }, index) => (
              <li
                key={title}
                className="group relative ml-10 rounded-3xl border border-primary/10 bg-card/80 p-8 shadow-[0_1px_40px_rgba(37,99,235,0.16)] transition-transform hover:-translate-y-1"
              >
                <span className="absolute -left-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-background/90 text-xs font-semibold text-primary/80">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-primary">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
                  <p className="text-xs sm:text-sm font-medium text-primary/90 uppercase tracking-[0.3em]">
                    {focus}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ModuleTimeline;
