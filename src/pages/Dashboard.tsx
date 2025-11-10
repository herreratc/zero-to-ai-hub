import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import CompletionCertificate from "@/components/dashboard/CompletionCertificate";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  ExternalLink,
  FileText,
  Flame,
  Lock,
  LogOut,
  MessageSquare,
  RefreshCcw,
  PlayCircle,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import ThemeToggle from "@/components/ThemeToggle";
import {
  clearResourceProgressCache,
  fetchResourceProgress,
  upsertResourceProgress,
} from "@/lib/resource-progress";

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

type VideoModule = {
  id: string;
  title: string;
  description: string;
  youtubeUrl?: string;
};

type ProfilePlan = "basic" | "complete";

type ResourceTab = {
  value: "ebook" | "video" | "community" | "mentorship";
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  requiredPlan: ProfilePlan;
};

type DashboardUser = Pick<User, "id" | "email" | "user_metadata">;

const LOCAL_PROFILE_NAME_KEY = "zero-to-ai-hub:profile-name";

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

const videoModules: VideoModule[] = [
  {
    id: "video-0",
    title: "Módulo 0 · Boas-vindas e orientações",
    description: "Entenda como aproveitar as videoaulas e organize sua jornada de estudos.",
  },
  {
    id: "video-1",
    title: "Módulo 1 · Introdução à Inteligência Artificial",
    description: "Conceitos fundamentais, evolução da área e aplicações no mercado.",
  },
  {
    id: "video-2",
    title: "Módulo 2 · Tipos de Inteligência Artificial",
    description: "Classificações de IA, quando usar cada abordagem e cases reais.",
  },
  {
    id: "video-3",
    title: "Módulo 3 · Ferramentas essenciais de IA",
    description: "Tour pelas ferramentas indispensáveis e como configurá-las corretamente.",
  },
  {
    id: "video-4",
    title: "Módulo 4 · IA Visual na prática",
    description: "Fluxos para criar imagens e vídeos profissionais com apoio da IA.",
  },
  {
    id: "video-5",
    title: "Módulo 5 · Automações inteligentes",
    description: "Automatize processos e conecte a IA a ferramentas populares.",
  },
  {
    id: "video-6",
    title: "Módulo 6 · Projetos avançados",
    description: "Construa soluções completas, monitore resultados e publique MVPs.",
  },
  {
    id: "video-7",
    title: "Módulo 7 · Monetização com IA",
    description: "Crie ofertas, valide produtos e estruture estratégias de vendas.",
  },
  {
    id: "video-8",
    title: "Módulo 8 · Futuro da Inteligência Artificial",
    description: "Mapeie tendências e defina seus próximos passos para continuar evoluindo.",
  },
];

const defaultVideoProgress = videoModules.reduce<Record<string, boolean>>((acc, module) => {
  acc[module.id] = false;
  return acc;
}, {});

const totalVideoModules = videoModules.length;

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

const resourceTabs: ResourceTab[] = [
  {
    value: "ebook",
    label: "Ebook",
    icon: BookOpen,
    title: "Guia completo e atualizado",
    description: "Baixe os capítulos, marque sua leitura e acompanhe o avanço do plano Ebook IA do Zero.",
    cta: "Ver capítulos",
    requiredPlan: "basic",
  },
  {
    value: "video",
    label: "Videoaulas",
    icon: Video,
    title: "Trilhas guiadas e curadoria inteligente",
    description: "Aulas curtas com roteiros acionáveis e anotações inteligentes para revisar quando quiser.",
    cta: "Ver aulas",
    requiredPlan: "complete",
  },
  {
    value: "community",
    label: "Comunidade",
    icon: MessageSquare,
    title: "Networking com especialistas",
    description: "Participe do fórum exclusivo, desafios semanais e feedback dos mentores.",
    cta: "Abrir comunidade",
    requiredPlan: "complete",
  },
  {
    value: "mentorship",
    label: "Mentorias",
    icon: Compass,
    title: "Agenda personalizada",
    description: "Agende sessões individuais com mentores para acelerar seu plano de estudos.",
    cta: "Reservar horário",
    requiredPlan: "complete",
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

const LOCAL_DEMO_USER: DashboardUser = {
  id: "local-demo-student",
  email: "aluno@local.dev",
  user_metadata: {
    full_name: "Aluno Demo",
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileAccessLoading, setProfileAccessLoading] = useState(isSupabaseConfigured);
  const [accessGranted, setAccessGranted] = useState(!isSupabaseConfigured);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [plan, setPlan] = useState<ProfilePlan>(isSupabaseConfigured ? "basic" : "complete");
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const [range, setRange] = useState<ProductivityRange>("week");
  const [ebookProgress, setEbookProgress] = useState<Record<string, boolean>>(() => ({
    ...defaultEbookProgress,
  }));
  const [videoProgress, setVideoProgress] = useState<Record<string, boolean>>(() => ({
    ...defaultVideoProgress,
  }));
  const [progressLoading, setProgressLoading] = useState(false);
  const [progressSaving, setProgressSaving] = useState<Record<string, boolean>>({});

  const rawWhatsAppContact = (import.meta.env.VITE_WHATSAPP_CONTACT as string | undefined) ?? "";
  const whatsappMessage = ((import.meta.env.VITE_WHATSAPP_CONTACT_MESSAGE as string | undefined) ?? "").trim();

  const sanitizedWhatsAppContact = useMemo(() => rawWhatsAppContact.replace(/\D/g, ""), [rawWhatsAppContact]);

  const whatsappUrl = useMemo(() => {
    if (!sanitizedWhatsAppContact) {
      return "https://wa.me/";
    }

    const query = whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : "";
    return `https://wa.me/${sanitizedWhatsAppContact}${query}`;
  }, [sanitizedWhatsAppContact, whatsappMessage]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setUser(LOCAL_DEMO_USER);
      setLoading(false);
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setLoading(false);
    });

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Falha ao obter sessão do Supabase", error);
        setLoading(false);
      });

    return () => subscription.unsubscribe();
  }, [isSupabaseConfigured, navigate]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      toast.info("Modo offline ativo: seu progresso ficará salvo apenas neste dispositivo.");
    }
  }, [isSupabaseConfigured]);

  useEffect(() => {
    if (isSupabaseConfigured) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const storedName = window.localStorage.getItem(LOCAL_PROFILE_NAME_KEY);
    if (storedName) {
      setProfileName(storedName);
    }
  }, [isSupabaseConfigured]);

  const fetchProfileAccess = useCallback(async () => {
    if (!user?.id) {
      setProfileName(null);
      setAccessGranted(!isSupabaseConfigured);
      setProfileAccessLoading(false);
      return;
    }

    if (!isSupabaseConfigured) {
      setAccessGranted(true);
      setProfileName(user.user_metadata?.full_name ?? null);
      setPlan("complete");
      setProfileAccessLoading(false);
      return;
    }

    setProfileAccessLoading(true);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("access_granted, full_name, plan")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      const granted = Boolean(data?.access_granted);
      const fetchedPlan = (data?.plan as ProfilePlan | null) ?? "basic";
      setAccessGranted(granted);
      setProfileName(data?.full_name ?? user.user_metadata?.full_name ?? null);
      setPlan(fetchedPlan);
    } catch (error) {
      console.error("Falha ao carregar dados de acesso do perfil", error);
      toast.error("Não foi possível validar a liberação do seu acesso agora. Tente novamente em instantes.");
    } finally {
      setProfileAccessLoading(false);
    }
  }, [user, isSupabaseConfigured]);

  useEffect(() => {
    void fetchProfileAccess();
  }, [fetchProfileAccess]);

  const handleRefreshAccess = useCallback(() => {
    void fetchProfileAccess();
  }, [fetchProfileAccess]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if ((accessGranted || !isSupabaseConfigured) && !profileName?.trim()) {
      setNameInput("");
      setIsNameDialogOpen(true);
    }
  }, [accessGranted, isSupabaseConfigured, loading, profileName]);

  const handleNameDialogChange = useCallback(
    (open: boolean) => {
      if (!open && !profileName?.trim()) {
        toast.info("Informe seu nome para personalizar o certificado.");
        return;
      }

      setIsNameDialogOpen(open);

      if (open) {
        setNameInput(profileName ?? "");
      }
    },
    [profileName],
  );

  const handleOpenNameDialog = useCallback(() => {
    setNameInput(profileName ?? "");
    setIsNameDialogOpen(true);
  }, [profileName]);

  const handleScrollToResources = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    document.getElementById("student-resources")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSaveProfileName = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const trimmedName = nameInput.trim();

      if (!trimmedName) {
        toast.error("Digite um nome válido para personalizar o certificado.");
        return;
      }

      if (isSupabaseConfigured && !user?.id) {
        toast.error("Faça login novamente para atualizar seu nome.");
        return;
      }

      setIsSavingName(true);

      try {
        if (isSupabaseConfigured && user?.id) {
          const { error } = await supabase
            .from("profiles")
            .update({ full_name: trimmedName })
            .eq("user_id", user.id);

          if (error) {
            throw error;
          }

          const { error: metadataError } = await supabase.auth.updateUser({
            data: { full_name: trimmedName },
          });

          if (metadataError) {
            console.warn("Falha ao sincronizar metadados do Supabase", metadataError);
          }
        } else if (typeof window !== "undefined") {
          window.localStorage.setItem(LOCAL_PROFILE_NAME_KEY, trimmedName);
        }

        setProfileName(trimmedName);
        setNameInput(trimmedName);
        toast.success("Nome salvo com sucesso! Seu certificado será atualizado.");
        setIsNameDialogOpen(false);
      } catch (error) {
        console.error("Falha ao salvar nome do aluno", error);
        toast.error("Não foi possível salvar seu nome agora. Tente novamente em instantes.");
      } finally {
        setIsSavingName(false);
      }
    },
    [isSupabaseConfigured, nameInput, user],
  );

  useEffect(() => {
    let isActive = true;

    if (!user?.id || !accessGranted) {
      setEbookProgress({ ...defaultEbookProgress });
      setVideoProgress({ ...defaultVideoProgress });
      setProgressSaving({});
      setProgressLoading(false);
      return undefined;
    }

    const loadProgress = async () => {
      setProgressLoading(true);

      try {
        const data = await fetchResourceProgress(user.id);

        if (!isActive) {
          return;
        }

        const ebookState = { ...defaultEbookProgress };
        const videoState = { ...defaultVideoProgress };

        data.forEach((item) => {
          if (item.resourceType === "ebook" && Object.prototype.hasOwnProperty.call(ebookState, item.resourceId)) {
            ebookState[item.resourceId] = item.completed;
          }

          if (item.resourceType === "video" && Object.prototype.hasOwnProperty.call(videoState, item.resourceId)) {
            videoState[item.resourceId] = item.completed;
          }
        });

        setEbookProgress(ebookState);
        setVideoProgress(videoState);
      } catch (error) {
        if (isActive) {
          console.error("Falha ao carregar progresso salvo no Supabase", error);
          toast.error("Não foi possível carregar seu progresso agora. Tente novamente em instantes.");
        }
      } finally {
        if (isActive) {
          setProgressLoading(false);
        }
      }
    };

    loadProgress();

    return () => {
      isActive = false;
    };
  }, [user?.id, accessGranted]);

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

  const completedVideoModules = useMemo(
    () =>
      videoModules.reduce((count, module) => {
        return videoProgress[module.id] ? count + 1 : count;
      }, 0),
    [videoProgress],
  );

  const videoProgressValue =
    totalVideoModules === 0 ? 0 : Math.round((completedVideoModules / totalVideoModules) * 100);
  const videoProgressBadgeLabel = `${completedVideoModules}/${totalVideoModules} aulas`;
  const videoProgressDescription =
    completedVideoModules === totalVideoModules
      ? "Você assistiu a todas as videoaulas disponíveis. Continue revisando os conteúdos favoritos!"
      : `Você assistiu ${completedVideoModules} de ${totalVideoModules} videoaulas. Marque cada aula após concluir.`;

  const isCompletePlan = plan === "complete";
  const planLabel = isCompletePlan ? "Plano Completo" : "Plano Básico";
  const planBadgeClass = isCompletePlan
    ? "border-primary/50 bg-primary/10 text-primary"
    : "border-muted-foreground/40 bg-muted/10 text-muted-foreground";

  const hasCompletedEbook = completedModules === totalEbookModules;
  const hasCompletedVideos = completedVideoModules === totalVideoModules;
  const certificateUnlocked = hasCompletedEbook || hasCompletedVideos;

  const handleDownloadCertificate = () => {
    if (!certificateUnlocked) {
      toast.info("Finalize o ebook ou as videoaulas para liberar o certificado digital.");
      return;
    }

    const issueDate = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());

    const certificateHtml = `<!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8" />
          <title>Certificado Zero to AI Hub</title>
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 0;
              font-family: 'Inter', 'Segoe UI', sans-serif;
              background: #0f172a;
              color: #0f172a;
            }
            .certificate-wrapper {
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 32px;
              background: radial-gradient(circle at top, rgba(56,97,251,0.08), transparent 55%);
            }
            .certificate-card {
              width: 842px;
              max-width: 100%;
              padding: 72px 80px;
              background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(241,245,249,0.95));
              border-radius: 28px;
              border: 2px solid rgba(56,97,251,0.12);
              box-shadow: 0 40px 80px rgba(15,23,42,0.25);
              position: relative;
              overflow: hidden;
            }
            .certificate-card::before {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: 28px;
              padding: 3px;
              background: linear-gradient(135deg, rgba(56,97,251,0.2), rgba(129,161,255,0.05));
              mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              mask-composite: exclude;
              -webkit-mask-composite: xor;
            }
            .certificate-content {
              position: relative;
              z-index: 1;
              display: flex;
              flex-direction: column;
              gap: 48px;
              align-items: center;
              text-align: center;
            }
            .certificate-header {
              display: flex;
              flex-direction: column;
              gap: 12px;
              text-transform: uppercase;
              letter-spacing: 0.32em;
            }
            .certificate-header h1 {
              font-size: 48px;
              letter-spacing: 0.18em;
              margin: 0;
              color: #1d4ed8;
            }
            .certificate-header p {
              margin: 0;
              font-size: 13px;
              color: #475569;
              font-weight: 600;
            }
            .certificate-body {
              display: flex;
              flex-direction: column;
              gap: 16px;
              color: #1f2937;
              max-width: 560px;
            }
            .certificate-name {
              font-size: 32px;
              font-weight: 700;
              color: #1d4ed8;
              letter-spacing: 0.04em;
            }
            .certificate-footer {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              text-transform: uppercase;
              color: #475569;
              font-size: 12px;
              letter-spacing: 0.24em;
            }
            .certificate-line {
              width: 200px;
              height: 1px;
              background: #cbd5f5;
              margin-bottom: 8px;
            }
            .certificate-seal {
              position: absolute;
              top: 72px;
              right: 72px;
              width: 124px;
              height: 124px;
              border-radius: 999px;
              border: 6px solid rgba(56,97,251,0.25);
              background: linear-gradient(135deg, rgba(56,97,251,1), rgba(37,99,235,0.9));
              color: #fff;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 6px;
              box-shadow: 0 12px 30px rgba(15,23,42,0.25);
            }
            .seal-title {
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 0.32em;
            }
            .seal-subtitle {
              font-size: 10px;
              letter-spacing: 0.28em;
              opacity: 0.8;
            }
          </style>
        </head>
        <body>
          <div class="certificate-wrapper">
            <div class="certificate-card">
              <div class="certificate-seal">
                <div class="seal-title">IA</div>
                <div style="font-size:36px;font-weight:800;letter-spacing:0.12em;">✔</div>
                <div class="seal-subtitle">Certificação</div>
              </div>
              <div class="certificate-content">
                <div class="certificate-header">
                  <p>Zero to AI Hub · 180h</p>
                  <h1>Certificado</h1>
                  <p>de conclusão oficial</p>
                </div>
                <div class="certificate-body">
                  <p style="letter-spacing:0.32em;text-transform:uppercase;color:#64748b;font-size:12px;margin:0;">Conferimos a</p>
                  <div class="certificate-name">${displayName}</div>
                  <p style="line-height:1.6;font-size:15px;margin:0;">
                    pela conclusão integral do programa <strong>"IA do Zero"</strong>, cumprindo 100% das atividades obrigatórias e
                    projetos aplicados. Este certificado confirma ${displayName.split(" ")[0] || displayName}
                    como profissional apto a implementar soluções com Inteligência Artificial Generativa.
                  </p>
                </div>
                <div class="certificate-footer">
                  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                    <div class="certificate-line"></div>
                    <span>Coordenação Pedagógica</span>
                  </div>
                  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                    <div class="certificate-line"></div>
                    <span>Emissão</span>
                    <span style="letter-spacing:0.08em;text-transform:none;font-size:11px;">${issueDate}</span>
                  </div>
                  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                    <div class="certificate-line"></div>
                    <span>Registro #IAZD-2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>`;

    const certificateWindow = window.open("", "_blank", "width=960,height=720");

    if (!certificateWindow) {
      toast.error("Não foi possível gerar o certificado. Desative o bloqueador de pop-ups e tente novamente.");
      return;
    }

    certificateWindow.document.write(certificateHtml);
    certificateWindow.document.close();
    certificateWindow.focus();

    setTimeout(() => {
      certificateWindow.print();
    }, 300);

    certificateWindow.onafterprint = () => {
      certificateWindow.close();
    };
  };

  const handleModuleToggle = async (moduleId: string, checked: boolean) => {
    if (!user?.id) {
      toast.error("Faça login novamente para salvar seu progresso.");
      return;
    }

    if (!accessGranted) {
      toast.error("Seu acesso ainda não foi liberado. Aguarde a confirmação manual do pagamento pelo WhatsApp X1.");
      return;
    }

    if (progressLoading) {
      toast.info("Aguarde a sincronização do progresso.");
      return;
    }

    const previousValue = ebookProgress[moduleId];
    const savingKey = `ebook:${moduleId}`;

    setEbookProgress((prev) => ({
      ...prev,
      [moduleId]: checked,
    }));

    setProgressSaving((prev) => ({
      ...prev,
      [savingKey]: true,
    }));

    try {
      await upsertResourceProgress(user.id, "ebook", moduleId, checked);
    } catch (error) {
      console.error("Falha ao atualizar o progresso do ebook no Supabase", error);
      setEbookProgress((prev) => ({
        ...prev,
        [moduleId]: previousValue,
      }));
      toast.error("Não foi possível atualizar o progresso. Tente novamente.");
    } finally {
      setProgressSaving((prev) => {
        const next = { ...prev };
        delete next[savingKey];
        return next;
      });
    }
  };

  const handleVideoModuleToggle = async (moduleId: string, checked: boolean) => {
    if (!user?.id) {
      toast.error("Faça login novamente para salvar seu progresso.");
      return;
    }

    if (!accessGranted) {
      toast.error("Seu acesso ainda não foi liberado. Aguarde a confirmação manual do pagamento pelo WhatsApp X1.");
      return;
    }

    if (progressLoading) {
      toast.info("Aguarde a sincronização do progresso.");
      return;
    }

    const previousValue = videoProgress[moduleId];
    const savingKey = `video:${moduleId}`;

    setVideoProgress((prev) => ({
      ...prev,
      [moduleId]: checked,
    }));

    setProgressSaving((prev) => ({
      ...prev,
      [savingKey]: true,
    }));

    try {
      await upsertResourceProgress(user.id, "video", moduleId, checked);
    } catch (error) {
      console.error("Falha ao atualizar o progresso das aulas no Supabase", error);
      setVideoProgress((prev) => ({
        ...prev,
        [moduleId]: previousValue,
      }));
      toast.error("Não foi possível atualizar o progresso. Tente novamente.");
    } finally {
      setProgressSaving((prev) => {
        const next = { ...prev };
        delete next[savingKey];
        return next;
      });
    }
  };

  const handleLogout = async () => {
    if (!isSupabaseConfigured) {
      if (user?.id) {
        clearResourceProgressCache(user.id);
      }
      toast.success("Sessão encerrada! Até breve.");
      navigate("/");
      return;
    }

    await supabase.auth.signOut();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const displayName = useMemo(() => {
    const trimmedProfileName = profileName?.trim();
    if (trimmedProfileName) {
      return trimmedProfileName;
    }

    const metadataName = user?.user_metadata?.full_name?.trim();
    if (metadataName) {
      return metadataName;
    }

    const emailHandle = user?.email?.split("@")[0];
    if (emailHandle) {
      return emailHandle.charAt(0).toUpperCase() + emailHandle.slice(1);
    }

    return "Aluno";
  }, [profileName, user]);

  const quickHighlights = useMemo(() => {
    const highlights = [
      {
        id: "ebook",
        title: "Ebook IA do Zero",
        value: `${progressValue}%`,
        caption: progressBadgeLabel,
        description: progressDescription,
        icon: BookOpen,
        iconClass: "bg-primary/10 text-primary",
        badgeClass: "border-primary/40 bg-primary/10 text-primary",
      },
    ];

    if (isCompletePlan) {
      highlights.push({
        id: "video",
        title: "Videoaulas guiadas",
        value: `${videoProgressValue}%`,
        caption: videoProgressBadgeLabel,
        description: videoProgressDescription,
        icon: PlayCircle,
        iconClass: "bg-accent/10 text-accent",
        badgeClass: "border-accent/40 bg-accent/10 text-accent",
      });
    } else {
      highlights.push({
        id: "video-locked",
        title: "Videoaulas premium",
        value: "Bloqueado",
        caption: "Plano completo",
        description: "Atualize para o Plano Completo e libere aulas, comunidade e mentorias.",
        icon: Lock,
        iconClass: "bg-muted/80 text-muted-foreground",
        badgeClass: "border-muted-foreground/40 text-muted-foreground",
      });
    }

    highlights.push({
      id: "streak",
      title: "Sequência ativa",
      value: "7 dias",
      caption: "Rotina consistente",
      description: "Mantenha blocos curtos de foco para avançar diariamente.",
      icon: Flame,
      iconClass: "bg-orange-400/10 text-orange-400",
      badgeClass: "border-orange-300/40 bg-orange-400/10 text-orange-400",
    });

    return highlights;
  }, [
    isCompletePlan,
    progressBadgeLabel,
    progressDescription,
    progressValue,
    videoProgressBadgeLabel,
    videoProgressDescription,
    videoProgressValue,
  ]);

  const availableResourceTabs = useMemo(
    () => resourceTabs.filter((tab) => tab.requiredPlan === "basic" || isCompletePlan),
    [isCompletePlan],
  );

  const nextMilestone =
    learningPath.find((step) => step.status === "in-progress") ??
    learningPath.find((step) => step.status === "upcoming") ??
    learningPath[learningPath.length - 1];

  if (loading || profileAccessLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!accessGranted) {
    return (
      <div
        className="relative min-h-screen flex items-center justify-center px-4 bg-background"
        style={{ background: "var(--dashboard-background)" }}
      >
        <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
          <ThemeToggle />
        </div>
        <Card className="w-full max-w-xl border border-border/60 bg-card/95 text-center shadow-[var(--shadow-elegant)]">
          <CardHeader className="space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-semibold">Pagamento em análise</CardTitle>
            <CardDescription className="text-base">
              Assim que confirmarmos manualmente o pagamento pelo WhatsApp X1, liberamos toda a Área do Aluno.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Olá, {displayName}! Nosso time realiza a liberação manual após validar o comprovante enviado no WhatsApp. Se já
              recebeu a confirmação, avise a equipe para liberar o seu acesso.
            </p>
            <p className="text-xs">
              Depois que o pagamento for aprovado, clique em "Atualizar status" ou recarregue a página para entrar direto no
              dashboard.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-4 w-4" /> Conversar com suporte no WhatsApp
              </a>
            </Button>
            <Button variant="outline" className="w-full" onClick={handleRefreshAccess}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Atualizar status
            </Button>
            <Button variant="ghost" className="w-full text-sm" onClick={handleLogout}>
              Sair da conta
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const activeProductivity = productivityData[range];

  return (
    <div className="relative min-h-screen bg-background" style={{ background: "var(--dashboard-background)" }}>
      <header className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-background via-primary/10 to-background">
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at top right, rgba(56,97,251,0.18), transparent 55%)" }} />
        <div className="relative container mx-auto px-4 py-12">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                  <Sparkles className="h-3 w-3" />
                  Jornada Zero to AI
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" onClick={() => navigate("/")}>
                    Central de suporte
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="mt-1 h-16 w-16 border border-primary/40">
                    <AvatarFallback className="text-xl font-semibold text-primary">
                      {displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Olá, {displayName} 👋</h1>
                      <p className="text-sm text-muted-foreground md:text-base">
                        Simplificamos sua visão geral para você focar no que realmente importa: dominar IA aplicada com consistência.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline" className={`rounded-full px-3 py-1 text-xs ${planBadgeClass}`}>
                        {planLabel}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 text-xs text-muted-foreground hover:text-primary"
                        onClick={handleOpenNameDialog}
                      >
                        Atualizar nome
                      </Button>
                      {!isCompletePlan && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="h-8 border-primary/40 px-3 text-xs"
                        >
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            Quero plano completo
                          </a>
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {isCompletePlan ? (
                        <>
                          <Button size="sm" className="shadow-[var(--shadow-elegant)]">
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Continuar última aula
                          </Button>
                          <Button variant="outline" size="sm" className="border-primary/40">
                            Ver trilha completa
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" className="shadow-[var(--shadow-elegant)]" onClick={handleScrollToResources}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            Abrir capítulos do ebook
                          </Button>
                          <Button variant="outline" size="sm" className="border-primary/40" onClick={handleOpenNameDialog}>
                            Personalizar certificado
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {nextMilestone && (
                  <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background/70 p-6 shadow-[var(--shadow-elegant)]">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                      <Compass className="h-3.5 w-3.5" />
                      Próximo foco
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-foreground">{nextMilestone.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{nextMilestone.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                      <Calendar className="h-3.5 w-3.5" />
                      {nextMilestone.highlight}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {quickHighlights.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/80 p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full ${item.iconClass}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className={`rounded-full px-3 py-1 text-xs ${item.badgeClass}`}>
                      {item.caption}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                    <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-12">
        <section className={cn("grid gap-8", isCompletePlan && "2xl:grid-cols-[2.2fr_1fr]")}>
          <div className="space-y-8">
            <CompletionCertificate
              studentName={displayName}
              isUnlocked={certificateUnlocked}
              onDownload={handleDownloadCertificate}
              progressValue={progressValue}
              completedModules={completedModules}
              totalModules={totalEbookModules}
            />

            <Card id="student-resources" className="border border-border/60 bg-card/90 shadow-[var(--shadow-elegant)]">
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Seu ritmo de aprendizado</CardTitle>
                  <CardDescription>Visualize a evolução entre aulas assistidas e práticas concluídas.</CardDescription>
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
              <CardContent className="space-y-6">
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
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-background/70 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tempo médio por sessão</span>
                      <Badge variant="outline" className="border-primary/40 text-primary">
                        +12%
                      </Badge>
                    </div>
                    <p className="mt-2 text-lg font-semibold">47 minutos</p>
                    <p className="text-xs text-muted-foreground">Ideal para manter foco profundo sem sobrecarga.</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/70 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Taxa de conclusão</span>
                      <Badge variant="outline" className="border-accent/40 text-accent">
                        +3 aulas
                      </Badge>
                    </div>
                    <p className="mt-2 text-lg font-semibold">82%</p>
                    <p className="text-xs text-muted-foreground">Documente aprendizados-chave ao fim de cada aula.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-card/90">
              <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle>Trilhas e recursos premium</CardTitle>
                  <CardDescription>Escolha a trilha ideal para o momento.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-border/60 bg-background/60 text-xs">
                    Atualizado diariamente
                  </Badge>
                  {progressLoading && (
                    <Badge variant="outline" className="border-primary/40 bg-primary/10 text-xs text-primary">
                      Sincronizando progresso...
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ebook" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 gap-2 bg-background/60 p-1 md:grid-cols-4">
                    {availableResourceTabs.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value} className="rounded-lg text-xs md:text-sm">
                        <tab.icon className="mr-2 h-4 w-4" />
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {availableResourceTabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                      {tab.value === "ebook" ? (
                        <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
                          <div className="space-y-4">
                            {ebookModules.map((module) => {
                              const isCompleted = ebookProgress[module.id];
                              const progressKey = `ebook:${module.id}`;
                              const isSaving = Boolean(progressSaving[progressKey]);
                              const isDisabled = progressLoading || isSaving;
                              return (
                                <div
                                  key={module.id}
                                  className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/65 p-4 md:flex-row md:items-center md:justify-between"
                                >
                                  <div className="space-y-1">
                                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                                      <FileText className="h-3.5 w-3.5" />
                                      Capítulo
                                    </div>
                                    <h3 className="text-base font-semibold leading-tight">{module.title}</h3>
                                    <p className="text-xs text-muted-foreground">{module.description}</p>
                                  </div>
                                  <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/80 p-3 md:w-auto">
                                    <a
                                      href={module.pdfUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-xs font-medium text-primary"
                                    >
                                      <ExternalLink className="h-3.5 w-3.5" />
                                      Abrir PDF
                                    </a>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Checkbox
                                        id={module.id}
                                        checked={isCompleted}
                                        disabled={isDisabled}
                                        onCheckedChange={(checked) => {
                                          void handleModuleToggle(module.id, Boolean(checked));
                                        }}
                                        aria-busy={isSaving}
                                      />
                                      <label htmlFor={module.id} className="cursor-pointer select-none">
                                        {isSaving ? "Sincronizando..." : progressLoading ? "Carregando..." : "Concluído"}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6">
                            <div className="space-y-3">
                              <h4 className="text-lg font-semibold text-primary">Checklist rápido</h4>
                              <p className="text-xs text-primary/80">
                                Marque sua leitura e mantenha o progresso do certificado sempre visível.
                              </p>
                            </div>
                            <div className="mt-6 space-y-4 text-xs text-primary/80">
                              <p>
                                <strong className="text-sm text-primary">{completedModules}</strong> capítulos concluídos de {totalEbookModules}.
                              </p>
                              <p>{progressDescription}</p>
                            </div>
                          </div>
                        </div>
                      ) : tab.value === "video" ? (
                        <div className="space-y-4">
                          {videoModules.map((module) => {
                            const isCompleted = videoProgress[module.id];
                            const progressKey = `video:${module.id}`;
                            const isSaving = Boolean(progressSaving[progressKey]);
                            const isDisabled = progressLoading || isSaving;
                            return (
                              <div
                                key={module.id}
                                className="flex flex-col gap-4 rounded-xl border border-border/60 bg-background/65 p-4 md:flex-row md:items-center md:justify-between"
                              >
                                <div className="space-y-2">
                                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                                    <Video className="h-3.5 w-3.5" />
                                    Aula
                                  </div>
                                  <h3 className="text-base font-semibold leading-tight">{module.title}</h3>
                                  <p className="text-xs text-muted-foreground">{module.description}</p>
                                </div>
                                <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/80 p-3 md:w-auto">
                                  <Button size="sm" variant="outline" className="border-accent/40 text-accent">
                                    <PlayCircle className="mr-2 h-4 w-4" />
                                    Assistir aula
                                  </Button>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Checkbox
                                      id={module.id}
                                      checked={isCompleted}
                                      disabled={isDisabled}
                                      onCheckedChange={(checked) => {
                                        void handleVideoModuleToggle(module.id, Boolean(checked));
                                      }}
                                      aria-busy={isSaving}
                                    />
                                    <label htmlFor={module.id} className="cursor-pointer select-none">
                                      {isSaving ? "Sincronizando..." : progressLoading ? "Carregando..." : "Concluída"}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
                {!isCompletePlan && (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                          <Lock className="h-3.5 w-3.5" />
                          Recursos premium bloqueados
                        </div>
                        <p className="text-sm text-primary/80">
                          Videoaulas, comunidade e mentorias fazem parte do Plano Completo. Atualize seu acesso quando quiser.
                        </p>
                      </div>
                      <Button asChild size="sm" className="w-full md:w-auto shadow-[var(--shadow-elegant)]">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                          Falar com suporte
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {isCompletePlan && (
            <aside className="space-y-8">
              <Card className="border border-border/60 bg-card/90">
                <CardHeader className="space-y-1">
                  <CardTitle>Agenda da semana</CardTitle>
                  <CardDescription>Organize-se para aproveitar cada encontro ao vivo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {upcomingSessions.map((session) => (
                    <div key={session.title} className="rounded-2xl border border-border/60 bg-background/70 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {session.date} • {session.time}
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

              <Card className="border border-border/60 bg-card/90">
                <CardHeader>
                  <CardTitle>Reconhecimentos</CardTitle>
                  <CardDescription>Pequenas vitórias que aceleram sua evolução.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((item) => (
                    <div key={item.title} className="flex items-start gap-4 rounded-xl border border-border/50 bg-background/70 p-4">
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

              <Card className="border border-border/60 bg-card/90">
                <CardHeader>
                  <CardTitle>Plano de evolução</CardTitle>
                  <CardDescription>Enxergue, em uma linha, o que já foi desbloqueado.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {learningPath.map((step) => (
                      <div
                        key={step.title}
                        className={cn(
                          "rounded-2xl border p-5",
                          step.status === "completed" && "border-primary/40 bg-primary/5",
                          step.status === "in-progress" && "border-accent/40 bg-accent/5 shadow-[var(--shadow-elegant)]",
                          step.status === "upcoming" && "border-border/60 bg-background/70",
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
                </CardContent>
              </Card>
            </aside>
          )}
        </section>

        {isCompletePlan ? (
          <Card className="border border-border/60 bg-card/90">
            <CardHeader>
              <CardTitle>Últimas novidades</CardTitle>
              <CardDescription>Atualizações que podem impulsionar seus próximos passos.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Atualização liberada
                </div>
                <p className="mt-3 text-sm font-semibold text-primary-foreground">
                  Biblioteca de prompts estratégicos disponível para download.
                </p>
                <p className="mt-2 text-xs text-primary/80">
                  Acesse em Recursos premium → Comunidade para salvar seus favoritos.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <Compass className="h-3.5 w-3.5" />
                  Comunidade
                </div>
                <p className="mt-3 text-sm font-semibold">Desafio semanal aberto</p>
                <p className="text-xs text-muted-foreground">
                  Entregue seu protótipo até sexta-feira e receba feedback direto dos mentores.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Fórum
                </div>
                <p className="mt-3 text-sm font-semibold">Debate sobre monetização</p>
                <p className="text-xs text-muted-foreground">
                  Aprenda com colegas que fecharam as primeiras vendas usando automações de IA.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-dashed border-primary/40 bg-primary/5">
            <CardHeader>
              <CardTitle>Desbloqueie novidades exclusivas</CardTitle>
              <CardDescription>
                Recursos da comunidade, mentorias e trilhas em vídeo ficam disponíveis no Plano Completo.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-primary/80">
              <p>
                Atualize seu plano quando desejar e acesse eventos ao vivo, desafios semanais e suporte direto com especialistas.
              </p>
              <Button asChild className="w-full shadow-[var(--shadow-elegant)] md:w-fit">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Conversar com o suporte e migrar de plano
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <Dialog open={isNameDialogOpen} onOpenChange={handleNameDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Personalize seu certificado</DialogTitle>
            <DialogDescription>
              Digite como deseja que seu nome apareça no certificado digital e nas áreas do aluno.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveProfileName} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student-full-name">Nome completo</Label>
              <Input
                id="student-full-name"
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                placeholder="Como deseja exibir no certificado"
                autoComplete="name"
                disabled={isSavingName}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSavingName || !nameInput.trim()}>
                {isSavingName ? "Salvando..." : "Salvar nome"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
