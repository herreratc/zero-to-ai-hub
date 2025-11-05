import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Preciso ter conhecimento prévio em programação?",
      answer: "Absolutamente não! O curso IA do Zero foi desenvolvido pensando em quem está começando do zero. Partimos do básico e avançamos de forma gradual e didática, garantindo que você compreenda cada conceito antes de prosseguir para o próximo nível.",
    },
    {
      question: "Quanto tempo tenho para acessar o conteúdo?",
      answer: "Você terá acesso vitalício a todo o conteúdo adquirido! Isso significa que pode estudar no seu próprio ritmo, rever as aulas quantas vezes quiser e acessar todas as atualizações futuras sem custo adicional. Sem pressão de prazos!",
    },
    {
      question: "Como funciona o suporte?",
      answer: "Oferecemos suporte por email para todos os planos, com resposta em até 24h. Os alunos da Jornada Completa têm acesso prioritário ao suporte e fazem parte da nossa comunidade exclusiva no Discord, onde podem tirar dúvidas em tempo real e trocar experiências com outros alunos.",
    },
    {
      question: "Vou receber certificado?",
      answer: "Sim! Os alunos da Jornada Completa recebem certificado digital de conclusão reconhecido no mercado após completarem todos os módulos do curso e o projeto final. O certificado pode ser compartilhado no LinkedIn e em seu portfólio profissional.",
    },
    {
      question: "Quais são as formas de pagamento?",
      answer: "Facilitamos ao máximo: aceitamos PIX (com desconto especial), cartão de crédito em até 12x sem juros, e boleto bancário. Entre em contato pelo WhatsApp e nossa equipe te ajudará a escolher a melhor opção para você.",
    },
    {
      question: "O conteúdo é atualizado regularmente?",
      answer: "Sim! O campo de IA evolui rapidamente e nosso compromisso é manter o conteúdo sempre atualizado com as últimas tendências e tecnologias. Você receberá todas as atualizações gratuitamente, garantindo que seu conhecimento esteja sempre na vanguarda do mercado.",
    },
    {
      question: "Consigo aplicar o conhecimento no mercado de trabalho?",
      answer: "Definitivamente! O curso é focado em aplicação prática. Você desenvolverá projetos reais que podem compor seu portfólio e demonstrar suas habilidades para potenciais empregadores. Muitos alunos conseguiram novas oportunidades ou promoções após o curso.",
    },
    {
      question: "Existe garantia de satisfação?",
      answer: "Sim! Oferecemos 7 dias de garantia incondicional. Se por qualquer motivo você não estiver satisfeito com o curso, devolvemos 100% do seu investimento, sem perguntas. Acreditamos tanto na qualidade do nosso conteúdo que assumimos todo o risco.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 border border-primary/20">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Tire suas dúvidas</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Tudo que você precisa saber antes de começar
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 shadow-sm hover:shadow-md transition-all"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:text-primary py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pt-2 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-16 text-center bg-card border border-border rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-3">Ainda tem dúvidas?</h3>
          <p className="text-muted-foreground mb-6">
            Nossa equipe está pronta para te ajudar. Fale conosco agora!
          </p>
          <Button 
            size="lg"
            className="px-8 py-6"
            onClick={() => {
              const message = encodeURIComponent("Olá! Tenho algumas dúvidas sobre o curso IA do Zero.");
              window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
            }}
          >
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
