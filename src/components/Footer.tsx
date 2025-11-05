import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Pronto Para Transformar Sua Carreira?
          </h3>
          <p className="text-lg sm:text-xl text-secondary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Junte-se a centenas de profissionais que já estão dominando a Inteligência Artificial 
            e conquistando as melhores oportunidades do mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl px-8 py-6 text-lg w-full sm:w-auto"
              onClick={() => {
                const message = encodeURIComponent("Olá! Quero começar minha jornada em IA agora!");
                window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
              }}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Falar com Especialista
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-secondary-foreground/20 hover:bg-secondary-foreground/10 px-8 py-6 text-lg w-full sm:w-auto"
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Planos
            </Button>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/60">
            <p>© 2025 IA do Zero. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <a href="mailto:contato@iadozero.com" className="hover:text-secondary-foreground/80 transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
