import type { Metadata } from "next";
import { SectionHero } from "@/components/section-hero";
import { SectionHowItWorks } from "@/components/section-how-it-works";
import { SectionQuickProofs } from "@/components/section-quick-proofs";
import { SectionServices } from "@/components/section-services";

const WHATSAPP_MESSAGE = "Olá VoxAnalitica, gostaria de uma proposta";

const encodeMessage = (message: string) => encodeURIComponent(message);

function buildWhatsAppLink(rawNumber: string | undefined) {
  if (!rawNumber) return "";
  const digits = rawNumber.replace(/[^0-9+]/g, "");
  if (!digits) return "";
  const message = encodeMessage(WHATSAPP_MESSAGE);
  return `https://wa.me/${digits}?text=${message}`;
}

export const metadata: Metadata = {
  title: "VoxAnalitica — Pesquisa & Inteligência de Dados",
  description:
    "Decisões orientadas por dados com recorte local, relatórios express e vídeos explicativos.",
  openGraph: {
    title: "VoxAnalitica — Pesquisa & Inteligência de Dados",
    description:
      "Decisões orientadas por dados com recorte local, relatórios express e vídeos explicativos.",
    images: [
      {
        url: "/og/hero.png",
        width: 1200,
        height: 630,
        alt: "VoxAnalitica hero",
      },
    ],
  },
};

export default function HomePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappHref = buildWhatsAppLink(whatsappNumber);

  const heroBadges = [
    { label: "Relatório Express 24–72h", variant: "accent" as const },
    { label: "Transparência Metodológica", variant: "outline" as const },
  ];

  const howItWorksSteps = [
    {
      icon: "MessageSquare",
      title: "Coleta no WhatsApp",
      desc: "Disparamos questionários e recebemos respostas direto no WhatsApp, com funis e regras de qualidade.",
    },
    {
      icon: "Database",
      title: "Tratamento & Análise",
      desc: "Limpeza, checagens e modelos estatísticos para cortar ruído e elevar a precisão.",
    },
    {
      icon: "BarChart3",
      title: "Relatório Express",
      desc: "Resumo executivo + dashboards e pontos-chave em texto. SLA típico: 24–72 horas.",
    },
    {
      icon: "PlayCircle",
      title: "Vídeo Explicativo",
      desc: "Entrega de vídeo curto e didático para stakeholders entenderem o cenário em minutos.",
    },
  ];

  const howItWorksBadges = [
    { label: "SLA 24–72h", tooltip: "Prazo comum para projetos padrão" },
    { label: "Qualidade amostral", tooltip: "Validações e filtros de inconsistência" },
    { label: "Privacidade", tooltip: "Boas práticas de dados e consentimento" },
  ];

  const quickProofsMetrics = [
    {
      id: "metric-projetos",
      label: "Projetos entregues",
      value: 120,
      suffix: "+",
      tooltip: "Inclui estudos eleitorais e de opinião",
    },
    {
      id: "metric-sla",
      label: "SLA típico",
      value: 24,
      suffix: "–72h",
      tooltip: "Janela comum para relatório express",
    },
    {
      id: "metric-videos",
      label: "Entregas em vídeo",
      value: 80,
      suffix: "%+",
      tooltip: "Projetos com vídeo explicativo",
    },
    {
      id: "metric-estados",
      label: "Estados atendidos",
      value: 2,
      suffix: "+",
      tooltip: "PB, PE e expansão regional",
    },
  ];

  const services = [
    {
      icon: "MessageSquare",
      title: "Pesquisa via WhatsApp",
      desc: "Questionários automatizados, regras de qualidade e funis conversacionais.",
      bullets: ["Triagem por perfil", "Validação de respostas", "Alta taxa de retorno"],
      tag: "Diferencial",
    },
    {
      icon: "Users",
      title: "Qualitativa (IDIs/Grupos)",
      desc: "Entrevistas em profundidade e grupos focais com roteiro e síntese temática.",
      bullets: ["Guias customizados", "Codificação temática", "Insights acionáveis"],
    },
    {
      icon: "ClipboardList",
      title: "Quantitativa de Campo",
      desc: "Amostras representativas, coleta assistida e auditoria de consistência.",
      bullets: ["Desenho amostral", "Pesquisadores treinados", "Checagem por GPS"],
    },
    {
      icon: "BarChart3",
      title: "Relatório Express",
      desc: "Resumo executivo com gráficos claros e storytelling de achados.",
      bullets: ["SLA 24–72h", "Sumário para decisão", "Recomendações práticas"],
      tag: "Rápido",
    },
    {
      icon: "PlayCircle",
      title: "Vídeo Explicativo",
      desc: "Apresentação didática para stakeholders entenderem o cenário em minutos.",
      bullets: ["Roteiro enxuto", "Narrativa visual", "Export em HD"],
    },
    {
      icon: "LayoutDashboard",
      title: "Dashboards & Mapas",
      desc: "Painéis interativos e recortes geográficos por bairro/segmento.",
      bullets: ["Filtros por público", "Mapa de calor", "Export CSV/PNG"],
    },
  ] as const;

  return (
    <main className="bg-white">
      <SectionHero
        title="Pesquisa que vira estratégia."
        subtitle="Da coleta automatizada pelo WhatsApp à decisão com menos risco — relatórios em tempo record em texto e vídeos explicativos."
        primaryCta={{
          label: "Falar no WhatsApp",
          href: whatsappHref || "#",
          id: "cta-whatsapp",
          disabled: !whatsappHref,
          ariaLabel: "Abrir conversa no WhatsApp",
        }}
        secondaryCta={{
          label: "Solicitar proposta",
          href: "/contato",
          id: "cta-proposta",
          ariaLabel: "Ir para formulário de proposta",
        }}
        badges={heroBadges}
      />
      <SectionHowItWorks
        title="Como funciona"
        subtitle="Do contato ao insight acionável em horas, não semanas."
        steps={howItWorksSteps}
        metricsBadges={howItWorksBadges}
        cta={{
          label: "Quero esse fluxo",
          href: "/contato",
          ariaLabel: "Solicitar proposta de projeto VoxAnalitica",
          id: "cta-how-it-works",
        }}
      />
      <SectionQuickProofs
        title="Provas rápidas"
        description="Métricas que mostram como entregamos resultados confiáveis com agilidade e suporte próximo."
        metrics={quickProofsMetrics}
      />
      <SectionServices
        title="Serviços"
        subtitle="Pesquisa, análise e apresentação clara para decisões com menos risco."
        services={services}
        ctaPrimary={{
          label: "Montar meu projeto",
          href: "/contato",
          id: "cta-services-primary",
          ariaLabel: "Solicitar proposta VoxAnalitica",
        }}
        ctaSecondary={{
          label: "Falar no WhatsApp",
          href_template: "https://wa.me/${NEXT_PUBLIC_WHATSAPP_NUMBER}",
          id: "cta-services-secondary",
          ariaLabel: "Falar com a VoxAnalitica no WhatsApp",
        }}
      />
    </main>
  );
}
