import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo-ia-do-zero.svg";

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-gradient-to-b from-background via-background/80 to-background/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="IA do Zero" className="h-12 w-12 rounded-2xl border border-primary/30" />
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-primary/70">Academia</p>
                <p className="text-2xl font-semibold text-foreground">IA do Zero</p>
              </div>
            </div>
            <p className="max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Um ecossistema completo para acelerar sua carreira com Inteligência Artificial. Conecte-se com especialistas, aprenda com projetos reais e faça parte da comunidade mais vibrante do Brasil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:bg-primary/90"
                onClick={() => {
                  const message = encodeURIComponent("Olá! Quero começar minha jornada em IA agora!");
                  window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");
                }}
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Falar com especialista
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 bg-background/80 text-primary hover:bg-primary/10"
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver planos
              </Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-primary/20 bg-background/60 p-6 shadow-[0_1px_30px_rgba(37,99,235,0.2)]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Conteúdo</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>Trilha de Fundamentos</li>
                <li>Machine Learning aplicado</li>
                <li>IA Generativa & Automação</li>
                <li>Deploy e Carreira</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-primary/20 bg-background/60 p-6 shadow-[0_1px_30px_rgba(56,189,248,0.2)]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Fale conosco</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>contato@iadozero.com</li>
                <li>Suporte 09h - 18h</li>
                <li>Comunidade exclusiva no Discord</li>
                <li>Eventos presenciais trimestrais</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary/10 pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} IA do Zero. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:contato@iadozero.com"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                contato@iadozero.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
