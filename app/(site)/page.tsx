import type { Metadata } from "next";
import { SectionHero } from "@/components/section-hero";

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
    </main>
  );
}
