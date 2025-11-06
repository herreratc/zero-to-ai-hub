import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">404</h1>
        <p className="text-lg text-muted-foreground">Ops! A página que você procura não existe.</p>
        <Button asChild>
          <a href="/">Voltar para a página inicial</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
