import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Desenvolvedora Full Stack na Ambev",
    content:
      "Comecei sem experiência prática em IA e hoje lidero projetos internos. O acompanhamento da equipe foi determinante para minha promoção.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "João Santos",
    role: "Analista de Dados Sênior na XP",
    content:
      "O curso tem ritmo intenso, mas extremamente aplicável. Em três meses implementei um modelo que reduziu custos em 18% na minha área.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Ana Costa",
    role: "Cientista de Dados na 99",
    content:
      "As mentorias e a comunidade me deram clareza sobre como posicionar meu portfólio. Consegui uma nova vaga com aumento de 70%.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Pedro Oliveira",
    role: "Empreendedor Tech",
    content:
      "Implementei automações com IA generativa e vi meu faturamento crescer. Os templates entregues nas aulas economizaram semanas de trabalho.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Carla Mendes",
    role: "UX Designer",
    content:
      "Sem background técnico, eu tinha receio de começar. A didática é impecável e hoje incorporo IA em cada projeto com segurança.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Lucas Ferreira",
    role: "Engenheiro de Machine Learning",
    content:
      "Mesmo já atuando na área, consegui elevar o nível dos meus projetos. A curadoria de ferramentas é atualizada constantemente.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            <Star className="h-4 w-4 text-primary fill-primary" />
            Resultados Reais
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Histórias de transformação dos nossos alunos</h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Do primeiro contato com IA à liderança de projetos, eles mostram o que é possível com a metodologia IA do Zero.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.name}-${index}`}
              className="relative h-full overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-card/90 via-card/60 to-background/40 shadow-[0_1px_40px_rgba(37,99,235,0.18)]"
            >
              <CardContent className="flex h-full flex-col gap-6 p-8">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-2xl border border-primary/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <Quote className="h-10 w-10 text-primary/20" />

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">"{testimonial.content}"</p>

                <div className="mt-auto flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-primary text-primary" />
                  ))}
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
