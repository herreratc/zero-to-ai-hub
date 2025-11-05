import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqs = [
    {
      question: "Preciso ter conhecimento prévio em programação?",
      answer: "Não! O curso IA do Zero foi desenvolvido para iniciantes. Começamos do básico e avançamos gradualmente, garantindo que você compreenda cada conceito antes de prosseguir.",
    },
    {
      question: "Quanto tempo tenho para acessar o conteúdo?",
      answer: "Você terá acesso vitalício a todo o conteúdo adquirido! Estude no seu próprio ritmo, sem pressão de prazos.",
    },
    {
      question: "Como funciona o suporte?",
      answer: "Oferecemos suporte por email para todos os planos. Os alunos da Jornada Completa têm acesso prioritário e à comunidade exclusiva onde podem tirar dúvidas e trocar experiências.",
    },
    {
      question: "Vou receber certificado?",
      answer: "Sim! Os alunos da Jornada Completa recebem certificado digital de conclusão após completarem todos os módulos do curso.",
    },
    {
      question: "Quais métodos de pagamento são aceitos?",
      answer: "Aceitamos pagamentos via PIX, cartão de crédito e boleto bancário. Entre em contato pelo WhatsApp para mais detalhes sobre as opções de pagamento.",
    },
    {
      question: "O conteúdo é atualizado?",
      answer: "Sim! O campo de IA evolui rapidamente e mantemos nosso conteúdo sempre atualizado. Você receberá todas as atualizações gratuitamente.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre o curso
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Não encontrou sua pergunta?
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              const message = encodeURIComponent("Olá! Tenho uma dúvida sobre o curso.");
              window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
            }}
          >
            Entre em Contato
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
