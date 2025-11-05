import { Button } from "@/components/ui/button";
import { BadgeCheck, MessageCircle, Users } from "lucide-react";

const InstructorSpotlight = () => {
  return (
    <section id="mentoria" className="py-20 sm:py-24" aria-labelledby="instructor-spotlight">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card/90 via-card/50 to-background/40 p-10 shadow-[0_1px_50px_rgba(37,99,235,0.25)]">
            <div className="absolute -top-40 -right-32 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                <BadgeCheck className="h-4 w-4" />
                Mentoria Premium
              </span>
              <h2 id="instructor-spotlight" className="text-3xl sm:text-4xl font-bold leading-tight">
                Acelere com quem já construiu soluções de IA em grandes empresas
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Diego Martins, Lead AI Engineer, liderou times em projetos para fintechs e grandes varejistas. Ele estará com você ao longo da jornada para garantir que cada projeto saia do papel.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-primary/10 bg-background/80 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">12+</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Anos de experiência</p>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-background/80 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">80+</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Projetos entregues</p>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-background/80 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">4.9</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Nota dos alunos</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground shadow-[0_10px_40px_rgba(37,99,235,0.35)] hover:bg-primary/90"
                  onClick={() => {
                    const message = encodeURIComponent("Quero conversar sobre a mentoria IA do Zero.");
                    window.open(`https://wa.me/5535992158486?text=${message}`, "_blank");
                  }}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Conversar com o time
                </Button>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Mentoria em grupo + sessões individuais quinzenais.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-primary/20 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent p-4 shadow-[0_1px_60px_rgba(37,99,235,0.25)]">
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
                  alt="Mentor do curso IA do Zero"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-10 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:flex flex-col gap-3 rounded-3xl border border-primary/30 bg-background/90 px-6 py-5 text-sm shadow-[0_1px_30px_rgba(56,189,248,0.4)]">
              <div className="flex items-center gap-2 text-primary">
                <Users className="h-4 w-4" />
                Comunidade ativa 24/7
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Feedback contínuo da equipe de especialistas e networking entre alunos de todo o país.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSpotlight;
