import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Desenvolvedora Full Stack",
      content: "O curso IA do Zero transformou minha carreira! Saí do zero absoluto e hoje trabalho com IA em uma multinacional. O conteúdo é extremamente prático.",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Analista de Dados Sênior",
      content: "Melhor investimento da minha vida! A didática é perfeita e consegui aplicar no trabalho já nas primeiras semanas. Meu salário aumentou 60%.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Cientista de Dados",
      content: "Estava perdida sobre por onde começar. Este curso me deu toda a base necessária de forma clara. Hoje sou referência em IA na minha empresa.",
      rating: 5,
    },
    {
      name: "Pedro Oliveira",
      role: "Empreendedor Tech",
      content: "Como empreendedor, precisava entender IA para o meu negócio. O curso superou todas as expectativas. Já implementei 3 soluções que aumentaram vendas.",
      rating: 5,
    },
    {
      name: "Carla Mendes",
      role: "UX Designer",
      content: "Sem formação técnica, achei que seria impossível. O curso provou o contrário! Hoje integro IA nos meus designs e sou muito mais valorizada.",
      rating: 5,
    },
    {
      name: "Lucas Ferreira",
      role: "Engenheiro de ML",
      content: "Mesmo já trabalhando com dados, o curso trouxe insights valiosos. Material de altíssima qualidade que me fez evoluir para Machine Learning Engineer.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-semibold text-primary">Avaliação 4.9/5.0</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            O Que Dizem Nossos Alunos
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de transformação profissional
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="hover:shadow-xl transition-all border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="pt-8 pb-6 px-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t border-border/50 pt-4">
                  <div className="font-semibold text-foreground text-lg">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
