import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/Hero";
import { SolutionsSection } from "@/components/sections/Solutions";
import { MethodologySection } from "@/components/sections/Methodology";
import { CasesSection, type CaseStudy } from "@/components/sections/Cases";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { InsightsSection } from "@/components/sections/Insights";
import { FaqSection } from "@/components/sections/Faq";
import { FinalCtaSection } from "@/components/sections/FinalCta";
import { ContactSection } from "@/components/sections/Contact";
import { buildWhatsAppLink } from "@/lib/whatsapp";

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

const cases: CaseStudy[] = [
  {
    title: "Audiência jovem nas capitais",
    segment: "Gestão Pública",
    summary:
      "Mapeamento de interesses e hábitos de jovens em capitais do Nordeste para calibrar políticas de educação e cultura.",
    challenge:
      "Identificar expectativas de públicos com baixa participação em consultas tradicionais e consolidar dados qualitativos e quantitativos em um material executivo.",
    approach:
      "Aplicamos questionário interativo via WhatsApp, grupos de discussão com estudantes bolsistas e análise de sentimento sobre menções públicas.",
    result:
      "Priorização de três programas estratégicos, com aprovação de orçamento e cronograma acelerado para implementação.",
    metrics: [
      { label: "Entrevistados", value: "2.4k" },
      { label: "Estados", value: "3" },
      { label: "Satisfação", value: "92%" },
      { label: "Prazo", value: "28 dias" },
    ],
  },
  {
    title: "Reposicionamento para fintech B2B",
    segment: "Mercado Privado",
    summary:
      "Diagnóstico de percepção de marca em PMEs e redes de franquias para reposicionar a solução de crédito inteligente.",
    challenge:
      "Entender objeções comerciais em diferentes estágios do funil e gerar evidências para uma nova narrativa de produto.",
    approach:
      "Entrevistas em profundidade com leads ativos, painel quantitativo com 1.200 respondentes e leitura de concorrência com web scraping.",
    result:
      "Aumento de 35% no NPS e 18% na taxa de conversão após ajustes de discurso e jornada comercial.",
    metrics: [
      { label: "Respondentes", value: "1.2k" },
      { label: "IDIs", value: "28" },
      { label: "Conversão", value: "+18%" },
      { label: "SLA", value: "6 semanas" },
    ],
  },
];

const testimonials = [
  {
    name: "Mariana Albuquerque",
    role: "Secretária de Juventude",
    company: "Prefeitura de João Pessoa",
    quote:
      "Conseguimos montar uma política de juventude com metas realistas porque tivemos evidências claras sobre necessidades e linguagem dos nossos jovens.",
  },
  {
    name: "Rodrigo Farias",
    role: "Head de Marketing",
    company: "Fintech B2B",
    quote:
      "O material da VoxAnalitica virou apresentação oficial no conselho. Sintetiza dados complexos em argumentos simples para decisão.",
  },
  {
    name: "Ana Luiza Campos",
    role: "Diretora de Pesquisa",
    company: "Instituto Independente",
    quote:
      "A equipe consegue conectar campo, análise e storytelling multimídia em prazos que outras consultorias não conseguem atingir.",
  },
];

const insights = [
  {
    title: "WhatsApp como canal de pesquisa: boas práticas",
    description:
      "Checklist de configuração, roteiros e validações para rodar estudos quantitativos e qualitativos no aplicativo.",
    category: "Guia",
    href: "#contato",
  },
  {
    title: "Como explicar resultados com vídeos executivos",
    description:
      "Formato ideal de roteiro, visual e narrativa para compartilhar achados com stakeholders em poucos minutos.",
    category: "Playbook",
    href: "#contato",
  },
  {
    title: "LGPD em pesquisas locais",
    description:
      "Checklist de segurança, consentimento e governança para estudos com dados sensíveis de municípios.",
    category: "Compliance",
    href: "#politica",
  },
  {
    title: "Painéis de opinião contínua",
    description:
      "Modelo VoxAnalitica de monitoramento recorrente com dashboards e alertas semanais.",
    category: "Estratégia",
    href: "#solucoes",
  },
];

const faqItems = [
  {
    question: "Quanto tempo leva para receber um relatório?",
    answer:
      "Projetos express são entregues entre 24 e 72 horas após o campo. Estudos híbridos levam de 2 a 6 semanas, conforme a complexidade.",
  },
  {
    question: "Quais canais vocês utilizam para coleta?",
    answer:
      "Operamos com WhatsApp, web, telefone assistido e parcerias de campo. A escolha depende do público-alvo e da taxa de resposta esperada.",
  },
  {
    question: "Vocês atendem órgãos públicos?",
    answer:
      "Sim. Adequamos contratos e fluxos à legislação vigente, com cláusulas de confidencialidade e aderência à LGPD.",
  },
  {
    question: "Como funciona o suporte pós-entrega?",
    answer:
      "Incluímos sessão de apresentação, ajustes pontuais no relatório e acompanhamento de indicadores por 30 dias para projetos recorrentes.",
  },
];

export default function HomePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappHref = buildWhatsAppLink(whatsappNumber, { utmContent: "hero_primary_cta" });

  const heroBadges = [
    { label: "Relatório Express 24–72h", variant: "accent" as const },
    { label: "Transparência Metodológica", variant: "outline" as const },
  ];
  const heroCards = [
    {
      title: "Decifre o Eleitorado",
      content: "Vá além da intenção de voto. Entenda o porquê o eleitor escolhe, rejeita ou se emociona.",
    },
    {
      title: "Subsídios Estratégicos",
      content:
        "Transforme dados brutos em insumos valiosos para narrativas vencedoras e planos de governo com impacto real.",
    },
    {
      title: "Segurança na Decisão",
      content: "Reduza a incerteza e blinde sua campanha contra surpresas.",
    },
  ];

  const solutionItems = [
    {
      icon: "MessageSquare" as const,
      title: "Pesquisa via WhatsApp",
      description:
        "Questionários conversacionais com filtros, regras de qualidade e acompanhamento diário do campo.",
      bullets: ["Funis por persona", "Checagem de respostas", "Painel em tempo real"],
      tag: "Automação",
    },
    {
      icon: "Users" as const,
      title: "Entrevistas em profundidade",
      description: "Roteiros guiados, gravação e síntese temática para captar nuances que números não mostram.",
      bullets: ["Guias customizados", "Codificação temática", "Clipes em vídeo"],
    },
    {
      icon: "ClipboardList" as const,
      title: "Campo presencial",
      description:
        "Rede de pesquisadores treinados, controle de amostra e auditoria contínua para garantir representatividade.",
      bullets: ["Auditoria por GPS", "Supervisão híbrida", "Relatórios de campo"],
    },
    {
      icon: "Briefcase" as const,
      title: "Inteligência competitiva",
      description:
        "Desk research, web scraping e análise de concorrência com dashboards acionáveis para diretoria.",
      bullets: ["Monitoramento semanal", "Alertas automáticos", "Resumo executivo"],
    },
    {
      icon: "PlayCircle" as const,
      title: "Vídeo e áudio briefing",
      description:
        "Narrativas em vídeo e podcasts curtos para apresentar descobertas a stakeholders e imprensa.",
      bullets: ["Roteiro enxuto", "Motion simplificado", "Distribuição fácil"],
    },
  ];

  const methodologySteps = [
    {
      icon: "MessageSquare" as const,
      title: "Imersão & briefing",
      description:
        "Entendimento do desafio, definição de recortes e seleção de abordagens qualitativas ou quantitativas.",
    },
    {
      icon: "Database" as const,
      title: "Coleta & qualidade",
      description:
        "Programação de questionários, disparos multicanal e auditorias automáticas para garantir consistência dos dados.",
    },
    {
      icon: "Sparkles" as const,
      title: "Análise & storytelling",
      description:
        "Modelos estatísticos, recortes territoriais e geração de hipóteses com apoio de insights qualitativos.",
    },
    {
      icon: "PlayCircle" as const,
      title: "Entrega multimídia",
      description:
        "Relatório executivo, dashboards interativos e vídeo explicativo para engajar o time decisor.",
    },
  ];

  return (
    <div className="bg-white">
      <Nav />
      <main>
        <HeroSection
          title="A Inteligência que Vence Eleições e Transforma Governos"
          subtitle="Transformamos a Opinião Pública em Subsídios Estratégicos Acionáveis. Pare de Chutar. Comece a Decidir com Segurança."
          primaryCta={{
            label: "Fale com um Estrategista",
            href: whatsappHref || "#contato",
            id: "cta-whatsapp",
            disabled: !whatsappHref,
            ariaLabel: "Abrir conversa no WhatsApp",
          }}
          secondaryCta={{
            label: "Conheça Nossas Soluções",
            href: "#solucoes",
            id: "cta-proposta",
            ariaLabel: "Ir para seção de soluções",
          }}
          badges={heroBadges}
          cards={heroCards}
        />
        <SolutionsSection
          title="Soluções para entender e agir rápido"
          subtitle="Diagnóstico completo: coleta inteligente, análise aprofundada e apresentações que convencem quem decide."
          items={solutionItems}
          primaryCta={{
            label: "Montar meu projeto",
            href: "#contato",
            id: "cta-solucoes-primary",
          }}
          secondaryCta={{
            label: "Ver metodologia",
            href: "#metodologia",
            id: "cta-solucoes-secondary",
          }}
        />
        <MethodologySection
          title="Metodologia transparente de ponta a ponta"
          subtitle="Processo enxuto, validado e documentado para transformar respostas em decisões acionáveis."
          steps={methodologySteps}
          cta={{
            label: "Quero este fluxo",
            href: "#contato",
            id: "cta-metodologia",
          }}
        />
        <CasesSection
          title="Cases que aceleraram decisões"
          subtitle="Projetos recentes que combinaram dados de campo, análise automatizada e storytelling audiovisual."
          items={cases}
        />
        <TestimonialsSection
          title="Confiança de gestores e líderes"
          subtitle="Quem trabalha conosco destaca o equilíbrio entre profundidade analítica, velocidade e clareza na entrega."
          items={testimonials}
        />
        <InsightsSection
          title="Insights e materiais exclusivos"
          subtitle="Conteúdos para guiar seu próximo projeto de pesquisa e comunicação orientada por dados."
          items={insights}
        />
        <FaqSection
          title="Perguntas frequentes"
          subtitle="Ainda está com dúvidas? Confira respostas diretas sobre prazos, canais de coleta e suporte."
          items={faqItems}
        />
        <FinalCtaSection
          title="Vamos mapear seu próximo projeto de pesquisa?"
          subtitle="Montamos o escopo com você em uma call rápida e enviamos proposta personalizada em até 24 horas."
          primaryCta={{
            label: "Agendar conversa",
            href: "#contato",
            id: "cta-final-primary",
          }}
          secondaryCta={{
            label: "Baixar one-pager",
            href: "#insights",
            id: "cta-final-secondary",
          }}
        />
        <ContactSection
          title="Conte sobre o desafio que precisa resolver"
          subtitle="Preencha o briefing rápido para receber um plano de pesquisa e investimento estimado."
        />
      </main>
      <Footer />
    </div>
  );
}
