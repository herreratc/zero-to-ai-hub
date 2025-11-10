import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles, Users, Shield } from "lucide-react";
import heroImage from "@/assets/hero-ai.jpg";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";

const stats = [
  { value: "500+", label: "Carreiras aceleradas" },
  { value: "50h", label: "de conteúdo aplicado" },
  { value: "4.9/5", label: "Satisfação média" },
];

const Hero = () => {
  const { startOnboarding } = useOnboarding();

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.35),_transparent_55%)]" />
      <div className="absolute -top-40 -right-20 h-96 w-96 -translate-y-10 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              <Sparkles className="h-4 w-4" />
              Nova turma aberta
            </span>

            <div className="space-y-6">
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground"
              >
                Domine Inteligência Artificial do Zero ao Avançado
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                A jornada mais completa para quem deseja implementar IA no trabalho ou empreender em tecnologia. Aprenda com especialistas que já entregaram soluções reais em grandes empresas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-6 text-base shadow-[0_15px_50px_rgba(37,99,235,0.45)] hover:bg-primary/90"
                onClick={() => startOnboarding()}
              >
                QUERO FAZER PARTE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary/30 bg-background/80 text-primary hover:bg-primary/10"
                onClick={() => startOnboarding({ initialStep: 0 })}
              >
                VER COMO FUNCIONA
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground/90">
              Matrículas com garantia total de 7 dias e suporte próximo durante toda a jornada.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-primary/15 bg-background/60 px-4 py-5 text-center shadow-[0_1px_30px_rgba(37,99,235,0.15)]"
                >
                  <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-12 hidden sm:block rounded-3xl border border-primary/20 bg-background/90 px-5 py-4 text-sm shadow-[0_1px_30px_rgba(56,189,248,0.4)]">
              <div className="flex items-center gap-3 text-primary">
                <Shield className="h-5 w-5" />
                Certificado reconhecido
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Receba certificado com validação de 180h e compartilhável no LinkedIn.
              </p>
            </div>
            <div className="overflow-hidden rounded-[3rem] border border-primary/20 bg-gradient-to-br from-primary/20 via-background/90 to-background/60 p-4 shadow-[0_1px_70px_rgba(37,99,235,0.4)]">
              <div className="overflow-hidden rounded-[2.5rem]">
                <img
                  src={heroImage}
                  alt="Profissionais aprendendo sobre Inteligência Artificial"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-10 right-6 flex max-w-xs items-center gap-3 rounded-3xl border border-primary/30 bg-background/90 px-6 py-4 text-sm shadow-[0_1px_30px_rgba(37,99,235,0.3)]">
              <BookOpen className="h-5 w-5 text-primary" />
              <p className="text-muted-foreground leading-relaxed">
                Trilhas atualizadas mensalmente com conteúdo hands-on.
              </p>
            </div>
            <div className="absolute -bottom-16 left-1/2 hidden sm:flex h-32 w-32 -translate-x-1/2 items-center justify-center rounded-full border border-primary/40 bg-background/80 text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Comunidade exclusiva
              <Users className="mt-2 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
