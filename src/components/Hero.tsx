import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-ai.jpg";

const Hero = () => {
  const handleCTA = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre o curso IA do Zero.");
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          background: 'var(--gradient-hero)',
        }}
      />
      
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
        }}
      />
      
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)' }} />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Domine a Inteligência Artificial</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
          IA do Zero
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          Aprenda Inteligência Artificial do básico ao avançado. 
          Transforme sua carreira com conhecimento prático e certificação.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-elegant)] transition-all"
            onClick={handleCTA}
          >
            Começar Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 backdrop-blur-sm"
            onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Planos
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border shadow-[var(--shadow-elegant)]">
            <div className="text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-muted-foreground">Alunos Satisfeitos</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border shadow-[var(--shadow-elegant)]">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Horas de Conteúdo</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border shadow-[var(--shadow-elegant)]">
            <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
            <div className="text-muted-foreground">Avaliação Média</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
