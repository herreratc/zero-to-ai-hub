import { Camera } from "lucide-react";

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    alt: "Mentor orientando alunos em frente ao notebook",
    label: "Mentorias ao vivo",
    description: "Sessões semanais em pequenos grupos para tirar dúvidas com especialistas.",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    alt: "Time colaborando em um projeto de tecnologia",
    label: "Projetos reais",
    description: "Construção de soluções completas para o portfólio com acompanhamento passo a passo.",
  },
  {
    src: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80",
    alt: "Profissional analisando gráficos de desempenho",
    label: "Resultados medidos",
    description: "Dashboards de evolução e feedback individual para acelerar sua trajetória.",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
    alt: "Sala moderna com estudantes concentrados",
    label: "Ambiente imersivo",
    description: "Experiência visual inspiradora com recursos premium e materiais exclusivos.",
  },
];

const VisualShowcase = () => {
  return (
    <section className="py-20 sm:py-24 bg-muted/20" aria-labelledby="visual-showcase">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              <Camera className="h-4 w-4" />
              Bastidores
            </span>
            <h2 id="visual-showcase" className="text-3xl sm:text-4xl font-bold">
              Um ambiente visual pensado para impulsionar sua jornada
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Conheça um pouco do clima das mentorias, laboratórios e experiências que preparamos para tornar o aprendizado mais profissional e inspirador.
            </p>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground/80 max-w-md">
            Cada encontro é conduzido com roteiros exclusivos, materiais de referência e demonstrações práticas que ajudam você a aplicar IA no mundo real desde a primeira semana.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <figure
              key={item.label}
              className="group relative overflow-hidden rounded-3xl border border-primary/15 bg-background/80 shadow-[0_1px_40px_rgba(15,23,42,0.12)]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <figcaption className="p-6 space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
                  {item.label}
                </p>
                <p className="text-base font-medium text-foreground">
                  {item.description}
                </p>
              </figcaption>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualShowcase;
