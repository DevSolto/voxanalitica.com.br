import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/Hero";
import { SolutionsSection } from "@/components/sections/Solutions";
import { MethodologySection } from "@/components/sections/Methodology";
import {
  AdvantageSection,
  type AdvantageContent,
} from "@/components/sections/Advantage";
import { CasesSection } from "@/components/sections/Cases";
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

const advantageContent: AdvantageContent = {
  title: "A Vantagem Vox",
  subtitle: "O que você ganha ao decidir com inteligência",
  audiences: [
    {
      title: "Deputados",
      subtitle: "Manter e expandir a base eleitoral",
      description:
        "Inteligência Territorial e Blindagem: Mapeamento preciso de sua base, avaliação de imagem e identificação de riscos regionais. Fornecemos os subsídios para que seus recursos sejam investidos onde o voto está.",
      icon: "users",
    },
    {
      title: "Prefeitos",
      subtitle: "Garantir aprovação e planejar reeleição",
      description:
        "Diagnóstico de Gestão e Reeleição Segura: Leitura aprofundada das prioridades locais e percepção de gestão. Fornecemos os insumos para ajustar a comunicação e neutralizar a oposição.",
      icon: "building",
    },
    {
      title: "Partidos Políticos",
      subtitle: "Definir narrativas macro",
      description:
        "Arquitetura de Narrativa: Inteligência para clusterização de eleitores e definição de narrativas que ressoem em diferentes regiões e grupos, fortalecendo a marca partidária.",
      icon: "layers",
    },
    {
      title: "Candidatos",
      subtitle: "Identificar pontos fortes e fracos",
      description:
        "Discurso Vencedor e Estratégia Cirúrgica: Identificação de vulnerabilidades e forças. Ajuste fino do discurso e criação de \"vacinas\" e \"ataques\" estratégicos baseados em dados emocionais.",
      icon: "target",
    },
  ],
  benefitsTitle: "Ganhos Inegáveis",
  benefits: [
    {
      title: "Vantagem Competitiva Real",
      description:
        "Você terá acesso a informações de bastidor e percepções que seus adversários não possuem.",
      icon: "trophy",
    },
    {
      title: "Planejamento Estratégico Sólido",
      description:
        "Fim do \"achismo\". Seu discurso, marketing e posicionamento serão definidos com precisão cirúrgica, baseados em nossos subsídios.",
      icon: "compass",
    },
    {
      title: "Tomada de Decisão com Segurança",
      description:
        "Reduza a incerteza em momentos críticos. Suas decisões serão baseadas em ciência política, não em especulação.",
      icon: "shield-check",
    },
    {
      title: "Transformação em Ação",
      description:
        "Transformamos a complexidade da opinião pública em subsídios para a estratégia prática de comunicação e ação governamental.",
      icon: "refresh-cw",
    },
  ],
};

const successCases = [
  {
    title: "A Voz das Ruas e a Política Pública",
    scenario:
      "Uma Frente Parlamentar Municipalista precisava de subsídios para criar uma política pública de alto impacto e baixo custo.",
    action:
      "Realizamos uma Pesquisa Qualitativa de Rua aprofundada, capturando as demandas e sentimentos de um grupo específico (corredores de rua).",
    result:
      "O relatório final não apenas diagnosticou os problemas mas entregou um Manifesto dos Corredores com propostas acionáveis. O cliente pôde transformar a voz da base em um plano de ação robusto e factível, gerando capital político imediato e impacto social duradouro.",
  },
  {
    title: "Blindagem e Ajuste de Discurso",
    scenario: "Um candidato a prefeito, com alta rejeição em um nicho específico, precisava reverter o quadro em 60 dias.",
    action:
      "Utilizamos a Pesquisa Híbrida Automatizada para segmentar o nicho de eleitores e aplicar um teste de discurso emocional. A análise de IA identificou que a rejeição era baseada em uma percepção de \"distância\" e não em fatos de gestão.",
    result:
      "O discurso foi ajustado para uma linguagem de proximidade e empatia, utilizando termos e narrativas extraídas diretamente das respostas emocionais dos eleitores. O candidato reverteu a rejeição no nicho e venceu a eleição por uma margem apertada, provando que a interpretação qualitativa foi o fator decisivo.",
  },
  {
    title: "Diagnóstico de Conjuntura Política",
    scenario:
      "Um grupo político precisava entender a dinâmica de transferência de votos e a força de figuras políticas em uma cidade estratégica.",
    action:
      "Conduzimos Entrevistas em Profundidade com líderes locais e formadores de opinião, focando na percepção de continuidade de gestão e na influência de ex-prefeitos.",
    result:
      "O relatório forneceu um mapa de influência detalhado, indicando que a transferência de votos não seria automática, mas dependeria de um endosso explícito e da associação a projetos de alto impacto. Isso permitiu ao cliente reposicionar o apoio e garantir que a transferência de capital político fosse efetiva.",
  },
];

const blogSection = {
  section_id: "blog",
  section_title: "Insights Vox",
  section_subtitle: "Análises e conteúdo para quem decide com dados.",
  cta_label: "Ver todos os artigos",
  cta_href: "/blog",
  posts: [
    {
      slug: "como-ler-pesquisas-eleitorais-sem-cair-em-armadilhas",
      title: "Como ler pesquisas eleitorais sem cair em armadilhas",
      excerpt:
        "Margem de erro, recorte territorial, metodologia e recortes sociodemográficos: o que realmente importa antes de confiar em um número. Margem de erro, recorte territorial, metodologia e recortes sociodemográficos: o que realmente importa antes de confiar em um número. ",
      category: "Eleições",
      read_time: "8 min",
      published_at: "2025-09-10",
      featured: true,
    },
    {
      slug: "whatsapp-como-canal-de-coleta-o-que-ninguem-te-conta",
      title: "WhatsApp como canal de coleta: o que ninguém te conta",
      excerpt:
        "Vieses, vantagens e limites da pesquisa via WhatsApp — e como a automação certa reduz riscos sem perder velocidade.",
      category: "Metodologia",
      read_time: "7 min",
      published_at: "2025-09-02",
      featured: false,
    },
    {
      slug: "humor-do-eleitor-no-nordeste-licoes-da-ultima-temporada",
      title: "Humor do eleitor no Nordeste: lições da última temporada",
      excerpt:
        "Quais temas realmente mobilizaram voto, quais narrativas perderam força e como isso impacta campanhas municipais.",
      category: "Opinião Pública",
      read_time: "6 min",
      published_at: "2025-08-25",
      featured: false,
    },
  ],
};

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
      title: "Qualitativa de Rua",
      description: "Capturamos a verdade nua e crua do eleitorado em seu ambiente natural. É a voz das ruas traduzida em inteligência.",
    },
    {
      icon: "Zap" as const,
      title: "Inteligência Híbrida e Automação",
      description:
        "Utilizamos IA e automação via WhatsApp (PesqZap) para pesquisas em escala, com velocidade e baixo custo.",
    },
    {
      icon: "Brain" as const,
      title: "Foco na Emoção e Sentimento",
      description: "Nossas análises se aprofundam nas motivações emocionais que definem o voto.",
    },
    {
      icon: "TrendingUp" as const,
      title: "Tradução Estratégica",
      description: "Transformamos relatórios complexos em subsídios valiosos para a sua estratégia.",
    },
  ];

  const methodologyBlocks = [
    {
      icon: "MessageSquare" as const,
      title: "Pesquisa Qualitativa",
      subtitle: "A Profundidade",
      description:
        "Entrevistas em profundidade, análise de discurso e a inovadora Pesquisa Qualitativa de Rua. Focada em decifrar o porquê das intenções e sentimentos.",
      items: [
        "Diagnóstico de Gestão — entender a percepção real de aprovação e as prioridades não atendidas.",
        "Testes de Narrativa — avaliar a ressonância de um discurso antes de lançá-lo publicamente.",
        "Mapeamento de Sentimentos — identificar o estado emocional do eleitorado para ajustar a comunicação.",
      ],
    },
    {
      icon: "Database" as const,
      title: "Pesquisa Quantitativa",
      subtitle: "A Escala",
      description:
        "Pesquisas tradicionais de grande escala, com rigor estatístico. Focada em medir a intenção de voto, avaliação de governo, perfil do eleitorado, recall e rejeição.",
      items: [
        "Intenção de Voto — medição precisa da corrida eleitoral e simulação de cenários.",
        "Avaliação de Governo — índices de aprovação por área e segmentação demográfica.",
        "Recall e Rejeição — identificação dos limites de crescimento e vulnerabilidades.",
      ],
    },
    {
      icon: "Zap" as const,
      title: "Pesquisa Híbrida e Automatizada",
      subtitle: "A Velocidade",
      description:
        "A fusão da profundidade qualitativa com a escala quantitativa, utilizando plataformas como o Pesquizap e automação via n8n. Permite pesquisas rápidas, segmentadas e com alto engajamento via WhatsApp.",
      items: [
        "Pulsos de Opinião — pesquisas diárias ou semanais para medir o impacto de eventos (tracking).",
        "Segmentação de Mensagem — envio de perguntas específicas para nichos de eleitores via Meta Ads.",
        "Captação Mista — combinação de tráfego pago e listas para maximizar a amostra.",
      ],
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
          title="Vox Analytica: Ciência Política Aplicada à Vitória"
          subtitle="A Vox Analytica nasceu da convicção de que a pesquisa política precisava evoluir. Fundada por especialistas com vasta experiência em campanhas e gestão pública, nossa empresa se estabeleceu como uma referência em inteligência estratégica no Nordeste, atuando onde a pesquisa tradicional falha: na captura da emoção e do sentimento não-racional do eleitor. Não somos apenas coletores de dados; somos tradutores de realidades políticas."
          itemsTitle="Nossos Diferenciais Metodológicos"
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
          title="O Arsenal Completo de Inteligência"
          subtitle="Oferecemos um portfólio de soluções de pesquisa e análise que se complementam, garantindo uma visão 360º do seu cenário político."
          blocks={methodologyBlocks}
          cta={{
            label: "Quero este fluxo",
            href: "#contato",
            id: "cta-metodologia",
          }}
        />
        <AdvantageSection {...advantageContent} />
        <CasesSection
          title="Nossas Vitórias"
          subtitle="O Impacto da Inteligência Vox na Política"
          cases={successCases}
        />
        <InsightsSection
          sectionId={blogSection.section_id}
          title={blogSection.section_title}
          subtitle={blogSection.section_subtitle}
          ctaLabel={blogSection.cta_label}
          ctaHref={blogSection.cta_href}
          posts={blogSection.posts}
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
            href: "#blog",
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
