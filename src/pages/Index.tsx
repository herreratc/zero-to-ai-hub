import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import PricingPlans from "@/components/PricingPlans";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            IA do Zero
          </h1>
          <Button 
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigate("/auth")}
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Área do Aluno</span>
            <span className="sm:hidden">Entrar</span>
          </Button>
        </div>
      </nav>
      
      <div className="pt-16">
        <Hero />
        <PricingPlans />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
