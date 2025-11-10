import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

import Hero from "@/components/Hero";
import PricingPlans from "@/components/PricingPlans";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BrandShowcase from "@/components/sections/BrandShowcase";
import CtaBanner from "@/components/sections/CtaBanner";
import EssentialHighlights from "@/components/sections/EssentialHighlights";
import CertificateShowcase from "@/components/sections/CertificateShowcase";
import CurriculumOverview from "@/components/sections/CurriculumOverview";
import TrustSignals from "@/components/sections/TrustSignals";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-ia-do-zero.svg";
import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";

const navLinks = [
  { label: "Resumo", href: "#overview" },
  { label: "Certificado", href: "#certificate" },
  { label: "Conteúdo", href: "#curriculum" },
  { label: "Planos", href: "#plans" },
  { label: "Dúvidas", href: "#faq" },
];

const Index = () => {
  const [studentAreaTarget, setStudentAreaTarget] = useState("/auth");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStudentAreaTarget("/auth");
      return;
    }

    const updateTarget = (hasSession: boolean) => {
      setStudentAreaTarget(hasSession ? "/dashboard" : "/auth");
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      updateTarget(Boolean(session?.user));
    });

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        updateTarget(Boolean(session?.user));
      })
      .catch((error) => {
        console.error("Falha ao verificar sessão do aluno", error);
        updateTarget(false);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [isSupabaseConfigured]);

  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-background">
        <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <a href="#inicio" className="flex items-center gap-3">
              <img src={logo} alt="IA do Zero" className="h-10 w-10 rounded-xl shadow-lg shadow-primary/40" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs uppercase tracking-[0.35em] text-primary/70">Academia</span>
                <span className="text-lg font-semibold text-foreground">IA do Zero</span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="h-6 w-6 rounded-full border border-border/60 text-[11px] font-semibold text-muted-foreground/80 group-hover:border-primary group-hover:text-primary/80 flex items-center justify-center">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex gap-2 text-muted-foreground hover:text-primary"
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver planos
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="gap-2 border-primary/40 bg-primary/10 text-primary transition hover:bg-primary/20"
              >
                <Link to={studentAreaTarget}>
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Área do aluno</span>
                  <span className="sm:hidden">Entrar</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden border-t border-border/30 bg-muted/10 lg:block">
            <div className="container mx-auto flex items-center justify-between gap-6 px-6 py-2 text-xs text-muted-foreground">
              <p>Estrutura completa em 8 módulos • Certificado executivo com validação digital • Atualizações mensais</p>
              <button
                type="button"
                className="inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primary/80"
                onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
              >
                Dúvidas frequentes
              </button>
            </div>
          </div>
        </header>

        <main id="inicio" className="pt-28 sm:pt-32">
          <div className="space-y-24 sm:space-y-32">
            <section className="space-y-16">
              <Hero />
              <div className="mx-auto w-full max-w-6xl rounded-3xl border border-border/40 bg-background/80 p-6 sm:p-10">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-6 text-sm sm:text-base text-muted-foreground">
                    <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Por que começar com a IA do Zero?</h2>
                    <p>
                      Reorganizamos nosso conteúdo em blocos simples, com foco em guiar você por cada etapa sem sobrecarregar.
                      Explore os destaques essenciais logo abaixo ou avance direto para o conteúdo completo.
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                      {navLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 font-medium transition hover:border-primary/40 hover:text-primary"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 rounded-2xl border border-primary/20 bg-primary/10 p-6 text-sm text-primary/90">
                    <h3 className="text-lg font-semibold text-primary">O que você encontra aqui</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
                        Trilha guiada com checkpoints claros para manter o foco nos fundamentos.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
                        Recursos complementares organizados por momento de aprendizagem.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
                        Comunidade, mentorias e suporte acessíveis em um só lugar.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary"></span>
                        Certificado executivo com selo digital e código de verificação exclusivo.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <CertificateShowcase />

            <section aria-label="Destaques essenciais" className="space-y-16">
              <EssentialHighlights />
              <BrandShowcase />
              <TrustSignals />
            </section>

            <section aria-label="Conteúdo programático" className="space-y-16">
              <CurriculumOverview />
              <div className="mx-auto w-full max-w-5xl rounded-3xl border border-border/40 bg-muted/20 p-6 text-center text-sm text-muted-foreground sm:p-8">
                <p>
                  Cada módulo combina teoria aplicada, práticas guiadas e acompanhamento para você construir projetos reais.
                  Use o painel do aluno para seguir a ordem recomendada ou adapte conforme seu ritmo.
                </p>
              </div>
            </section>

            <section aria-label="Planos e depoimentos" className="space-y-16">
              <PricingPlans />
              <Testimonials />
            </section>

            <section aria-label="Perguntas e chamada para ação" className="space-y-16">
              <FAQ />
              <CtaBanner />
            </section>

            <Footer />
          </div>
        </main>
      </div>
    </OnboardingProvider>
  );
};

export default Index;
