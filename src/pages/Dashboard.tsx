import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Flame,
  LogOut,
  MessageSquare,
  PlayCircle,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import ThemeToggle from "@/components/ThemeToggle";

import modulo0Pdf from "../../ebook/Modeulo-0-IA-do-Zero.pdf";
import modulo1Pdf from "../../ebook/Modulo-1-Introducao-a-Inteligencia-Artificial.pdf";
import modulo2Pdf from "../../ebook/Modulo-2-Tipos-de-Inteligencia-Artificial.pdf";
import modulo3Pdf from "../../ebook/Modulo-3-Ferramentas-Essenciais-de-Inteligencia-Artificial.pdf";
import modulo4Pdf from "../../ebook/Modulo-4-IA-Visual.pdf";
import modulo5Pdf from "../../ebook/Modulo-5-Automacoes-com-Inteligencia-Artificial.pdf";
import modulo6Pdf from "../../ebook/Modulo-6-Projetos-Avancados-com-Inteligencia-Artificial.pdf";
import modulo7Pdf from "../../ebook/Modulo-7-Monetizacao-com-Inteligencia-Artificial.pdf";
import modulo8Pdf from "../../ebook/Modulo-8-O-Futuro-da-Inteligencia-Artificial.pdf";

type ProductivityRange = "week" | "month";
type ProductivityPoint = { name: string; lessons: number; practice: number };

type LearningStepStatus = "completed" | "in-progress" | "upcoming";

type EbookModule = {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
};

const EBOOK_PROGRESS_STORAGE_KEY = "ebook-reading-progress";

const chartConfig = {
  lessons: {
    label: "Aulas assistidas",
    color: "hsl(var(--primary))",
  },
  practice: {
    label: "Práticas concluídas",
    color: "hsl(var(--accent))",
  },
};

const productivityData: Record<ProductivityRange, ProductivityPoint[]> = {
  week: [
    { name: "Seg", lessons: 2, practice: 1 },
    { name: "Ter", lessons: 3, practice: 2 },
    { name: "Qua", lessons: 2, practice: 2 },
    { name: "Qui", lessons: 4, practice: 3 },
    { name: "Sex", lessons: 3, practice: 2 },
    { name: "Sáb", lessons: 1, practice: 1 },
    { name: "Dom", lessons: 1, practice: 1 },
  ],
  month: [
    { name: "Sem 1", lessons: 9, practice: 5 },
    { name: "Sem 2", lessons: 11, practice: 7 },
    { name: "Sem 3", lessons: 13, practice: 9 },
    { name: "Sem 4", lessons: 15, practice: 11 },
  ],
};

const ebookModules: EbookModule[] = [
  {
    id: "module-0",
    title: "Módulo 0 · Boas-vindas e mentalidade",
    description: "Entenda como tirar máximo proveito do ebook e organize sua rotina de estudos.",
    pdfUrl: modulo0Pdf,
  },
  {
    id: "module-1",
    title: "Módulo 1 · Introdução à Inteligência Artificial",
    description: "Domine os conceitos fundamentais, a evolução histórica e os casos de uso essenciais.",
    pdfUrl: modulo1Pdf,
  },
  {
    id: "module-2",
    title: "Módulo 2 · Tipos de Inteligência Artificial",
    description: "Explore as principais categorias de IA e identifique qual aplicar em cada cenário.",
    pdfUrl: modulo2Pdf,
  },
  {
    id: "module-3",
    title: "Módulo 3 · Ferramentas essenciais",
    description: "Monte seu kit de ferramentas e aprenda a configurá-las para o dia a dia profissional.",
    pdfUrl: modulo3Pdf,
  },
  {
    id: "module-4",
    title: "Módulo 4 · IA Visual",
    description: "Descubra fluxos para criação de imagens, vídeos e assets com qualidade profissional.",
    pdfUrl: modulo4Pdf,
  },
  {
    id: "module-5",
    title: "Módulo 5 · Automações inteligentes",
    description: "Implemente rotinas automatizadas que conectam IA a processos e ferramentas populares.",
    pdfUrl: modulo5Pdf,
  },
  {
    id: "module-6",
    title: "Módulo 6 · Projetos avançados",
    description: "Construa soluções completas com integrações, APIs e monitoramento de resultados.",
    pdfUrl: modulo6Pdf,
  },
  {
    id: "module-7",
    title: "Módulo 7 · Monetização com IA",
    description: "Crie ofertas, valide produtos e monte estratégias de vendas apoiadas por IA.",
    pdfUrl: modulo7Pdf,
  },
  {
    id: "module-8",
    title: "Módulo 8 · Futuro da Inteligência Artificial",
    description: "Mapeie tendências e defina seus próximos passos para continuar evoluindo na área.",
    pdfUrl: modulo8Pdf,
  },
];

const defaultEbookProgress = ebookModules.reduce<Record<string, boolean>>((acc, module) => {
  acc[module.id] = false;
  return acc;
}, {});

const totalEbookModules = ebookModules.length;

const learningPath: { title: string; description: string; status: LearningStepStatus; highlight?: string }[] = [
  {
    title: "Fundamentos de IA",
    description: "Conceitos básicos, tipos de modelos e mindset do especialista",
    status: "completed",
    highlight: "Concluído em 12 Jan",
  },
  {
    title: "Domine o Prompt Engineering",
    description: "Estruturas avançadas, frameworks e automatizações com GPTs",
    status: "in-progress",
    highlight: "Faltam 2 aulas",
  },
  {
    title: "Deploy de soluções reais",
    description: "Construindo aplicações com IA e integrando APIs",
    status: "upcoming",
    highlight: "Desbloqueia ao concluir o módulo atual",
  },
  {
    title: "Portfólio e certificação",
    description: "Entrega do projeto final e acesso à certificação",
    status: "upcoming",
    highlight: "Mentoria coletiva agendada",
  },
];

const upcomingSessions = [
  {
    title: "Mentoria ao vivo com especialistas",
    date: "Terça, 21 Jan",
    time: "19:00",
    type: "Mentoria",
    cta: "Entrar na sala",
  },
  {
    title: "Desafio prático guiado",
    date: "Quinta, 23 Jan",
    time: "20:30",
    type: "Workshop",
    cta: "Salvar na agenda",
  },
];

const resourceTabs = [
  {
    value: "ebook",
    label: "Ebook",
    icon: BookOpen,
    title: "Guia completo e atualizado",
    description: "Baixe os capítulos, marque sua leitura e acompanhe o avanço do plano Ebook IA do Zero.",
    cta: "Ver capítulos",
  },
  {
    value: "video",
    label: "Videoaulas",
    icon: Video,
    title: "Trilhas guiadas e curadoria inteligente",
    description: "Aulas curtas com roteiros acionáveis e anotações inteligentes para revisar quando quiser.",
    cta: "Ver aulas",
  },
  {
    value: "community",
    label: "Comunidade",
    icon: MessageSquare,
    title: "Networking com especialistas",
    description: "Participe do fórum exclusivo, desafios semanais e feedback dos mentores.",
    cta: "Abrir comunidade",
  },
  {
    value: "mentorship",
    label: "Mentorias",
    icon: Compass,
    title: "Agenda personalizada",
    description: "Agende sessões individuais com mentores para acelerar seu plano de estudos.",
    cta: "Reservar horário",
  },
];

const achievements = [
  {
    title: "Sequência de estudos",
    value: "7 dias",
    description: "Mantenha a constância para ganhar acesso antecipado às masterclasses.",
    icon: Flame,
  },
  {
    title: "Média de evolução",
    value: "+18%",
    description: "Seu ritmo está acima da média da turma nesta semana.",
    icon: TrendingUp,
  },
  {
    title: "Certificação",
    value: "Disponível em 62%",
    description: "Complete os projetos práticos para liberar o certificado oficial.",
    icon: Award,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<ProductivityRange>("week");
  const [ebookProgress, setEbookProgress] = useState<Record<string, boolean>>(() => ({
    ...defaultEbookProgress,
  }));

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(EBOOK_PROGRESS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, boolean>;
        setEbookProgress((prev) => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.error("Falha ao carregar o progresso do ebook", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(EBOOK_PROGRESS_STORAGE_KEY, JSON.stringify(ebookProgress));
    } catch (error) {
      console.error("Falha ao salvar o progresso do ebook", error);
    }
  }, [ebookProgress]);

  const completedModules = useMemo(
    () =>
      ebookModules.reduce((count, module) => {
        return ebookProgress[module.id] ? count + 1 : count;
      }, 0),
    [ebookProgress],
  );

  const progressValue = totalEbookModules === 0 ? 0 : Math.round((completedModules / totalEbookModules) * 100);
  const progressBadgeLabel = `${completedModules}/${totalEbookModules} capítulos`;
  const progressDescription =
    completedModules === totalEbookModules
      ? "Você concluiu todos os capítulos do ebook. Continue revisando sempre que precisar!"
      : `Você leu ${completedModules} de ${totalEbookModules} capítulos. Marque cada capítulo após finalizar a leitura.`;

  const handleModuleToggle = (moduleId: string, checked: boolean) => {
    setEbookProgress((prev) => ({
      ...prev,
      [moduleId]: checked,
    }));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const displayName = useMemo(() => {
    if (!user?.email) return "Aluno";
    const name = user.user_metadata?.full_name || user.email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeProductivity = productivityData[range];

  return (
    <div className="relative min-h-screen bg-background" style={{ background: "var(--dashboard-background)" }}>
      <header className="relative border-b border-border/40 bg-gradient-to-br from-primary/15 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,97,251,0.2),_transparent_55%)]" />
        <div className="relative container mx-auto px-4 py-10 space-y-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                <Sparkles className="h-3 w-3" />
                Dashboard do aluno
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border border-primary/40">
                  <AvatarFallback className="text-lg font-semibold text-primary">
                    {displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Olá, {displayName} 👋
                  </h1>
                  <p className="text-muted-foreground">
                    Seu plano personalizado está pronto. Continue evoluindo na jornada para dominar IA aplicada.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="border-primary/40" onClick={() => navigate("/")}>
                Central de suporte
              </Button>
              <Button size="sm" className="shadow-[var(--shadow-elegant)]">
                <PlayCircle className="mr-2 h-4 w-4" />
                Continuar última aula
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card className="bg-card/80 backdrop-blur">
              <CardHeader className="pb-3">
                <CardDescription>Progresso do ebook</CardDescription>
                <div className="flex items-end justify-between">
                  <CardTitle className="text-3xl font-semibold">{progressValue}%</CardTitle>
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    {progressBadgeLabel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={progressValue} className="h-2 bg-muted" />
                <p className="mt-3 text-xs text-muted-foreground">{progressDescription}</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur">
              <CardHeader className="pb-2">
                <CardDescription>Horas dedicadas</CardDescription>
                <CardTitle className="text-2xl font-semibold">18h 40m</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                +4h em relação à semana anterior. Continue com sessões de foco de 45 minutos.
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur">
              <CardHeader className="pb-2">
                <CardDescription>Sequência ativa</CardDescription>
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <Flame className="h-5 w-5 text-orange-400" /> 7 dias
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Complete uma atividade por dia para desbloquear a mentoria exclusiva da semana.
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur">
              <CardHeader className="pb-2">
                <CardDescription>Próxima entrega</CardDescription>
                <CardTitle className="text-2xl font-semibold">Projeto 02</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Entrega do MVP com automações. Feedback dos mentores em 26 Jan.
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border border-border/60 bg-card/90 shadow-[var(--shadow-elegant)]">
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Seu ritmo de aprendizado</CardTitle>
                <CardDescription>
                  Compare o volume de aulas assistidas e práticas concluídas no período selecionado.
                </CardDescription>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 p-1 text-xs">
                <Button
                  size="sm"
                  variant={range === "week" ? "default" : "ghost"}
                  className={cn("rounded-full px-4", range === "week" ? "shadow-[var(--shadow-elegant)]" : "text-muted-foreground")}
                  onClick={() => setRange("week")}
                >
                  Últimos 7 dias
                </Button>
                <Button
                  size="sm"
                  variant={range === "month" ? "default" : "ghost"}
                  className={cn("rounded-full px-4", range === "month" ? "shadow-[var(--shadow-elegant)]" : "text-muted-foreground")}
                  onClick={() => setRange("month")}
                >
                  Últimos 30 dias
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={activeProductivity} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.4)" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} fontSize={12} width={40} />
                  <ChartTooltip cursor={{ strokeDasharray: "4 4" }} content={<ChartTooltipContent indicator="line" />} />
                  <Line type="monotone" dataKey="lessons" stroke="var(--color-lessons)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="practice" stroke="var(--color-practice)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ChartContainer>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-background/60 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tempo médio por sessão</span>
                    <Badge variant="outline" className="border-primary/40 text-primary">
                      +12%
                    </Badge>
                  </div>
                  <p className="mt-2 text-lg font-semibold">47 minutos</p>
                  <p className="text-xs text-muted-foreground">
                    Ajuste os blocos de estudo para manter o foco sem interrupções.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/60 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de conclusão</span>
                    <Badge variant="outline" className="border-accent/40 text-accent">
                      +3 aulas
                    </Badge>
                  </div>
                  <p className="mt-2 text-lg font-semibold">82%</p>
                  <p className="text-xs text-muted-foreground">
                    Excelente! Aproveite para documentar os principais aprendizados da semana.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-card/90">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Próximas sessões</CardTitle>
                  <CardDescription>Prepare-se para os encontros ao vivo.</CardDescription>
                </div>
                <Badge variant="outline" className="border-primary/40 text-primary">
                  2 eventos
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {upcomingSessions.map((session) => (
                <div key={session.title} className="rounded-xl border border-border/50 bg-background/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {session.date} • {session.time}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold leading-tight">{session.title}</h3>
                      <p className="text-xs text-muted-foreground">{session.type}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-primary/40 text-primary">
                      {session.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border border-border/60 bg-card/90 lg:col-span-2">
            <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle>Trilhas e recursos premium</CardTitle>
                <CardDescription>Escolha o próximo passo conforme sua prioridade.</CardDescription>
              </div>
              <Badge variant="outline" className="border-border/60 bg-background/60 text-xs">
                Atualizado diariamente
              </Badge>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ebook" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 gap-2 bg-background/60 p-1 md:grid-cols-4">
                  {resourceTabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="rounded-lg text-xs md:text-sm">
                      <tab.icon className="mr-2 h-4 w-4" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {resourceTabs.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                    {tab.value === "ebook" ? (
                      <div className="space-y-5">
                        <div className="rounded-xl border border-border/60 bg-background/70 p-6 shadow-[var(--shadow-elegant)]">
                          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-2">
                              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                                <tab.icon className="h-3.5 w-3.5" />
                                Ebook IA do Zero
                              </div>
                              <h3 className="text-xl font-semibold">{tab.title}</h3>
                              <p className="text-sm text-muted-foreground">{tab.description}</p>
                            </div>
                            <div className="w-full space-y-3 rounded-lg border border-border/60 bg-background/60 p-4 md:w-72">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Progresso total</span>
                                <span className="font-semibold text-foreground">{progressValue}%</span>
                              </div>
                              <Progress value={progressValue} className="h-2" />
                              <p className="text-[11px] text-muted-foreground">
                                {completedModules} de {totalEbookModules} capítulos concluídos
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {ebookModules.map((module) => {
                            const checkboxId = `${module.id}-checkbox`;
                            const isCompleted = ebookProgress[module.id];

                            return (
                              <div
                                key={module.id}
                                className={cn(
                                  "flex flex-col gap-4 rounded-lg border border-border/60 bg-background/60 p-4 transition-colors md:flex-row md:items-center md:justify-between",
                                  isCompleted && "border-primary/40 bg-primary/10",
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    id={checkboxId}
                                    checked={isCompleted}
                                    onCheckedChange={(checked) => handleModuleToggle(module.id, checked === true)}
                                  />
                                  <div className="space-y-2">
                                    <label htmlFor={checkboxId} className="block text-sm font-semibold leading-snug text-foreground">
                                      {module.title}
                                    </label>
                                    <p className="text-xs text-muted-foreground">{module.description}</p>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <Button variant="outline" size="sm" asChild>
                                        <a href={module.pdfUrl} target="_blank" rel="noopener noreferrer">
                                          <FileText className="h-4 w-4" />
                                          Abrir PDF
                                        </a>
                                      </Button>
                                      <Badge
                                        variant="outline"
                                        className={cn(
                                          "border-border/60 text-[10px] font-semibold uppercase tracking-wide",
                                          isCompleted ? "border-primary/40 text-primary" : "text-muted-foreground",
                                        )}
                                      >
                                        {isCompleted ? "Leitura concluída" : "Marque após ler"}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 self-end text-xs text-muted-foreground md:self-center">
                                  {isCompleted ? (
                                    <>
                                      <CheckCircle2 className="h-4 w-4 text-primary" />
                                      <span>Capítulo concluído</span>
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="h-4 w-4" />
                                      <span>Em leitura</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-border/60 bg-background/70 p-6 shadow-[var(--shadow-elegant)]">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                              <tab.icon className="h-3.5 w-3.5" />
                              {tab.label}
                            </div>
                            <h3 className="text-xl font-semibold">{tab.title}</h3>
                            <p className="text-sm text-muted-foreground">{tab.description}</p>
                          </div>
                          <Button size="sm" className="w-full md:w-auto">
                            {tab.cta}
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-card/90">
            <CardHeader>
              <CardTitle>Reconhecimentos</CardTitle>
              <CardDescription>Celebrando sua evolução semanal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-xl border border-border/50 bg-background/60 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-lg font-semibold text-primary">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border border-border/60 bg-card/90 lg:col-span-2">
            <CardHeader>
              <CardTitle>Plano de evolução</CardTitle>
              <CardDescription>Acompanhe o que já foi desbloqueado e o que vem a seguir.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[320px] pr-4">
                <div className="space-y-6">
                  {learningPath.map((step) => (
                    <div
                      key={step.title}
                      className={cn(
                        "relative rounded-xl border p-5 transition-all",
                        step.status === "completed" && "border-primary/40 bg-primary/5",
                        step.status === "in-progress" && "border-accent/40 bg-accent/5 shadow-[var(--shadow-elegant)]",
                        step.status === "upcoming" && "border-border/60 bg-background/60",
                      )}
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1.5">
                          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                            {step.status === "completed" && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
                            {step.status === "in-progress" && <PlayCircle className="h-3.5 w-3.5 text-accent" />}
                            {step.status === "upcoming" && <Clock className="h-3.5 w-3.5 text-muted-foreground" />}
                            {step.status === "completed" ? "Concluído" : step.status === "in-progress" ? "Em andamento" : "Em breve"}
                          </div>
                          <h3 className="text-lg font-semibold">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "w-fit border-foreground/10 text-xs",
                            step.status === "completed" && "border-primary/50 text-primary",
                            step.status === "in-progress" && "border-accent/40 text-accent",
                          )}
                        >
                          {step.highlight}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="border border-border/60 bg-card/90">
            <CardHeader>
              <CardTitle>Últimas novidades</CardTitle>
              <CardDescription>Fique por dentro do que está acontecendo na comunidade.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Atualização liberada
                </div>
                <p className="mt-3 text-sm font-semibold text-primary-foreground">
                  Nova biblioteca de prompts estratégicos disponível para download.
                </p>
                <Button size="sm" variant="link" className="px-0 text-primary">
                  Acessar agora
                </Button>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-border/50 bg-background/60 p-4">
                  <p className="text-sm font-semibold">Top 10 projetos em destaque</p>
                  <p className="text-xs text-muted-foreground">Inspire-se com o que a comunidade está construindo com IA.</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-background/60 p-4">
                  <p className="text-sm font-semibold">Mentorias on demand</p>
                  <p className="text-xs text-muted-foreground">A agenda da próxima semana abre amanhã às 8h.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
