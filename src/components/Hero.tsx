import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen, Award, Users } from "lucide-react";
import heroImage from "@/assets/hero-ai.jpg";

const Hero = () => {
  const handleCTA = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre o curso IA do Zero.");
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2.5 rounded-full mb-8 backdrop-blur-sm border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Transforme sua carreira com IA</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            Domine a <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Inteligência Artificial</span> do Zero
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Aprenda IA do básico ao avançado com um curso completo, prático e certificado. 
            Seja um profissional requisitado no mercado mais promissor da tecnologia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              onClick={handleCTA}
            >
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 backdrop-blur-sm w-full sm:w-auto"
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Planos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <div className="bg-card/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 mx-auto" />
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">500+</div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">Alunos Certificados</div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all">
              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-accent mb-4 mx-auto" />
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">50+</div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">Horas de Conteúdo</div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4 mx-auto" />
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">4.9★</div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">Avaliação Média</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
