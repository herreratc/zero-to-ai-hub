import { useMemo } from "react";
import { Award, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CompletionCertificateProps {
  studentName: string;
  isUnlocked: boolean;
  onDownload: () => void;
  progressValue: number;
  completedModules: number;
  totalModules: number;
}

const CompletionCertificate = ({
  studentName,
  isUnlocked,
  onDownload,
  progressValue,
  completedModules,
  totalModules,
}: CompletionCertificateProps) => {
  const formattedDate = useMemo(() => {
    const date = new Date();
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  }, []);

  const remainingModules = Math.max(totalModules - completedModules, 0);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/95 shadow-[var(--shadow-elegant)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,97,251,0.08),_transparent_55%)]" />
      <div className="relative space-y-6 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
              <Sparkles className="h-3 w-3" />
              Certificado oficial
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Seu certificado está {isUnlocked ? "pronto" : "quase lá"}
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              Complete o ebook ou as videoaulas e gere instantaneamente o certificado personalizado com selo de autenticação.
            </p>
          </div>
          <Badge
            variant="outline"
            className={`flex items-center gap-2 border-2 px-3 py-1 text-sm ${
              isUnlocked ? "border-primary/60 text-primary" : "border-muted-foreground/30 text-muted-foreground"
            }`}
          >
            <Award className="h-4 w-4" />
            {isUnlocked ? "Liberado" : "Bloqueado"}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.45fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-white/95 via-slate-100/95 to-white/80 p-8 text-slate-900 shadow-2xl">
            <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-primary/10" />
            <div className="absolute top-8 right-8 flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-primary/20 bg-gradient-to-br from-primary to-primary/70 text-white shadow-xl">
              <ShieldCheck className="h-8 w-8" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">IA</span>
            </div>
            <div className="relative space-y-6">
              <div className="space-y-2 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  Zero to AI Hub · 180h
                </p>
                <h3 className="text-3xl font-bold uppercase tracking-[0.25em]">Certificado</h3>
                <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">de Conclusão</p>
              </div>

              <div className="space-y-2 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Conferimos a</p>
                <p className="text-2xl font-semibold tracking-tight text-primary">
                  {studentName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Pela conclusão integral do programa "IA do Zero" com aproveitamento de 100%.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6 pt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex-row md:justify-between md:text-[11px]">
                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="h-[1px] w-32 bg-slate-300" />
                  <span>Coordenação Pedagógica</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="h-[1px] w-32 bg-slate-300" />
                  <span>Emissão</span>
                  <span className="text-[10px] normal-case tracking-normal">{formattedDate}</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="h-[1px] w-32 bg-slate-300" />
                  <span>Registro #IAZD-2024</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border/60 bg-background/80 p-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">Resumo de progresso</p>
              <div className="rounded-xl border border-border/60 bg-background/80 p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Módulos concluídos</span>
                  <span className="font-semibold text-foreground">
                    {completedModules} de {totalModules}
                  </span>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary via-primary/80 to-accent"
                    style={{ width: `${progressValue}%` }}
                  />
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  {isUnlocked
                    ? "Parabéns! Seu certificado pode ser emitido imediatamente."
                    : `Faltam apenas ${remainingModules} capítulo${remainingModules === 1 ? "" : "s"} para desbloquear o certificado.`}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">Validação</p>
              <p className="text-xs text-muted-foreground">
                O certificado possui selo digital de autenticidade e código único de verificação. Compartilhe no LinkedIn ou com o RH da sua empresa.
              </p>
              <Button size="lg" className="w-full" onClick={onDownload} disabled={!isUnlocked}>
                {isUnlocked ? "Baixar certificado" : "Concluir jornada"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionCertificate;
