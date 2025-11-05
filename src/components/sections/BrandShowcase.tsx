const BrandShowcase = () => {
  const brands = ["Nubank", "Itaú", "Magazine Luiza", "Ambev", "Stone", "Boticário"];

  return (
    <section className="py-16 sm:py-20" aria-labelledby="brand-showcase">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 px-6 sm:px-10 py-10 sm:py-14 backdrop-blur-xl">
          <div className="text-center space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/70">
              Nossos alunos trabalham em
            </p>
            <h2
              id="brand-showcase"
              className="text-2xl sm:text-3xl font-semibold text-foreground/80 max-w-2xl mx-auto"
            >
              Profissionais de todo o Brasil já usam a metodologia IA do Zero em empresas líderes
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
            {brands.map((brand) => (
              <div
                key={brand}
                className="rounded-2xl border border-primary/10 bg-background/80 px-4 py-5 text-sm font-semibold text-primary/80 shadow-[0_1px_20px_rgba(37,99,235,0.15)]"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
