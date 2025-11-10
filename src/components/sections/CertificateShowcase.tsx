import { Award, Clock, Share2, ShieldCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-ia-do-zero.svg";

const CertificateShowcase = () => {
  return (
    <section
      id="certificate"
      className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-primary/5 py-20 sm:py-24 px-4"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_55%)]" />
      <div className="relative container mx-auto max-w-6xl grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            <Award className="h-4 w-4" />
            Certificação Oficial
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-primary/80">
            <Shield className="h-4 w-4" />
            Documento Profissional
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground">
              Conclua a Jornada Completa e receba seu certificado exclusivo
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Valide suas 180 horas de estudos com um documento digital, verificável e pronto para compartilhar no LinkedIn.
              O certificado segue um padrão executivo com selo de autenticidade, código único e área de verificação pública.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-primary/20 bg-background/80 p-5 shadow-[0_20px_50px_rgba(37,99,235,0.08)]">
              <div className="flex items-center gap-3">
                <Clock className="h-10 w-10 rounded-2xl border border-primary/30 bg-primary/10 p-2 text-primary" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70">Carga horária</p>
                  <p className="text-xl font-semibold text-foreground">180 horas certificadas</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-primary/20 bg-background/80 p-5 shadow-[0_20px_50px_rgba(37,99,235,0.08)]">
              <div className="flex items-center gap-3">
                <Share2 className="h-10 w-10 rounded-2xl border border-primary/30 bg-primary/10 p-2 text-primary" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/70">Pronto para compartilhar</p>
                  <p className="text-xl font-semibold text-foreground">Link público e QR code</p>
                </div>
              </div>
            </div>
          </div>
          <ul className="grid gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Assinatura digital com verificação de autenticidade.
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Emissão automática após aprovação do projeto final.
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Disponível em PDF de alta resolução e link compartilhável.
            </li>
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              className="shadow-[0_12px_35px_rgba(37,99,235,0.25)]"
              onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver como desbloquear
            </Button>
            <p className="text-sm text-muted-foreground">
              Complete os módulos obrigatórios e apresente o projeto final para gerar o documento com seu nome e registro oficial.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 rounded-[3rem] bg-primary/20 blur-3xl" />
          <div className="relative rounded-[3rem] border border-primary/30 bg-gradient-to-br from-background via-background/95 to-primary/10 p-10 shadow-[0_30px_90px_rgba(37,99,235,0.18)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img src={logo} alt="IA do Zero" className="h-14 w-14 rounded-2xl border border-primary/30 bg-background/80 p-3" />
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-primary/70">Academia</p>
                  <p className="text-xl font-semibold text-foreground">IA do Zero</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Certificado nº</p>
                <p className="text-sm font-semibold text-foreground">ZD-2024-00128</p>
              </div>
            </div>

            <div className="mt-10 space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-primary/60">Certificado de conclusão</p>
              <h3 className="text-3xl font-semibold text-foreground">Nome do Aluno</h3>
              <p className="text-sm text-muted-foreground">
                Concluiu com êxito a Jornada Completa de Inteligência Artificial Aplicada, totalizando 180 horas de conteúdos, mentorias e projetos práticos.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Data</p>
                <p className="text-sm font-semibold text-foreground">28 de Março de 2024</p>
              </div>
              <div className="sm:border-l sm:border-r sm:border-primary/20 sm:px-6">
                <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Carga horária</p>
                <p className="text-sm font-semibold text-foreground">180h</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Registro</p>
                <p className="text-sm font-semibold text-foreground">IAZ-2024-180</p>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-2">
              <div className="h-12 w-32 border-b border-primary/40" />
              <p className="text-sm font-semibold text-foreground">João Victor Costa</p>
              <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Head de Educação • IA do Zero</p>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-primary/20 bg-background/70 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-primary/60">Verificação</p>
              <p className="text-sm text-muted-foreground">
                Escaneie o QR code ou acesse <span className="text-primary font-semibold">ia.dozero/certificado/iazd-2024-00128</span>
              </p>
              <div className="h-24 w-24 rounded-2xl border border-dashed border-primary/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateShowcase;
