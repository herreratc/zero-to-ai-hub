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
import CurriculumOverview from "@/components/sections/CurriculumOverview";
import TrustSignals from "@/components/sections/TrustSignals";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-ia-do-zero.svg";
import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider";
import ThemeToggle from "@/components/ThemeToggle";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";

const navLinks = [
  { label: "Resumo", href: "#overview" },
  { label: "Conteúdo", href: "#curriculum" },
  { label: "Planos", href: "#plans" },
  { label: "Dúvidas", href: "#faq" },
];

const Index = () => {
  const [studentAreaTarget, setStudentAreaTarget] = useState("/auth");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStudentAreaTarget("/dashboard");
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
        <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="IA do Zero" className="h-10 w-10 rounded-xl shadow-lg shadow-primary/40" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary/70">Academia</p>
              <p className="text-lg font-semibold text-foreground">IA do Zero</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex gap-2 text-muted-foreground hover:text-primary"
              onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Planos
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary"
            >
              <Link to={studentAreaTarget}>
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Área do Aluno</span>
                <span className="sm:hidden">Entrar</span>
              </Link>
            </Button>
          </div>
        </div>
      </nav>

        <main className="pt-24 sm:pt-28">
          <Hero />
          <EssentialHighlights />
          <BrandShowcase />
          <TrustSignals />
          <CurriculumOverview />
          <PricingPlans />
          <Testimonials />
          <FAQ />
          <CtaBanner />
          <Footer />
        </main>
      </div>
    </OnboardingProvider>
  );
};

export default Index;
