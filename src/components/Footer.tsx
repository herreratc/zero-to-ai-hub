import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">
            Pronto Para Começar?
          </h3>
          <p className="text-secondary-foreground/80 mb-6 max-w-2xl mx-auto">
            Junte-se a centenas de alunos que já estão dominando a Inteligência Artificial
          </p>
          <Button 
            size="lg"
            variant="secondary"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)]"
            onClick={() => {
              const message = encodeURIComponent("Olá! Quero começar minha jornada em IA agora!");
              window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
            }}
          >
            Falar com Especialista
          </Button>
        </div>
        
        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>© 2025 IA do Zero. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
