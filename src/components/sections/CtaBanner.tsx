import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CtaBanner = () => {
  const handleCTA = () => {
    const message = encodeURIComponent("Quero garantir minha vaga na próxima turma da IA do Zero!");
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");
  };

  return (
    <section className="relative py-20 sm:py-24" aria-labelledby="cta-banner">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-64 -translate-y-1/2 bg-gradient-to-r from-primary/20 via-accent/20 to-transparent blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/10 to-background/80 p-10 sm:p-14 shadow-[0_1px_60px_rgba(37,99,235,0.35)]">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                <Sparkles className="h-4 w-4" />
                Vagas limitadas
              </span>
              <h2 id="cta-banner" className="text-3xl sm:text-4xl font-bold leading-tight">
                Entre para a próxima turma e comece a construir soluções de IA profissionais
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Mentoria em tempo real, projetos reais e uma comunidade pronta para apoiar sua transformação.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 min-w-[220px]">
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground shadow-[0_10px_40px_rgba(37,99,235,0.4)] hover:bg-primary/90"
                onClick={handleCTA}
              >
                Garantir minha vaga
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary/40 bg-background/70 text-primary hover:bg-primary/10"
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver planos disponíveis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
