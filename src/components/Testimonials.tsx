import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Desenvolvedora",
      content: "O curso IA do Zero transformou minha carreira! Saí do zero absoluto e hoje trabalho com IA. O conteúdo é muito bem explicado e prático.",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Analista de Dados",
      content: "Excelente investimento! O material é completo e a didática é perfeita. Consegui aplicar os conceitos no meu trabalho já nas primeiras semanas.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Estudante",
      content: "Estava perdida sobre por onde começar com IA. Este curso me deu toda a base necessária de forma clara e objetiva. Super recomendo!",
      rating: 5,
    },
    {
      name: "Pedro Oliveira",
      role: "Empreendedor",
      content: "Como empreendedor, precisava entender IA para aplicar no meu negócio. O curso me deu muito mais do que esperava. Valeu cada centavo!",
      rating: 5,
    },
    {
      name: "Carla Mendes",
      role: "Designer",
      content: "Não imaginava que conseguiria aprender IA sem ter formação técnica. O curso provou que é possível! Metodologia excepcional.",
      rating: 5,
    },
    {
      name: "Lucas Ferreira",
      role: "Cientista de Dados",
      content: "Mesmo já trabalhando na área, o curso me trouxe insights valiosos e atualizações importantes. Material de altíssima qualidade.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            O Que Nossos Alunos Dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Centenas de alunos já transformaram suas carreiras
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="hover:shadow-[var(--shadow-elegant)] transition-all"
            >
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
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
