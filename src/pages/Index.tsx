import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import PricingPlans from "@/components/PricingPlans";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            IA do Zero
          </h1>
          <Button 
            variant="outline"
            onClick={() => navigate("/auth")}
          >
            Área do Aluno
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
