"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, Database, MessageSquare, PlayCircle } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const iconMap = {
  MessageSquare,
  Database,
  BarChart3,
  PlayCircle,
};

export type HowItWorksStep = {
  icon: keyof typeof iconMap | string;
  title: string;
  desc: string;
};

export type HowItWorksBadge = {
  label: string;
  tooltip?: string;
};

export type HowItWorksCta = {
  label: string;
  href: string;
  ariaLabel?: string;
  id?: string;
};

export type SectionHowItWorksProps = {
  title?: string;
  subtitle?: string;
  steps: HowItWorksStep[];
  metricsBadges?: HowItWorksBadge[];
  cta?: HowItWorksCta;
};

function getIconComponent(name: HowItWorksStep["icon"]) {
  if (name && name in iconMap) {
    return iconMap[name as keyof typeof iconMap];
  }
  return MessageSquare;
}

type ResolvedStep = HowItWorksStep & {
  iconNode: React.ReactNode;
};

type StepCardProps = {
  step: ResolvedStep;
  index: number;
};

function StepCard({ step, index }: StepCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasTracked, setHasTracked] = React.useState(false);

  const handleViewportEnter = React.useCallback(() => {
    if (hasTracked) return;
    trackEvent("how_it_works_step_view", {
      section: "como-funciona",
      step: step.title,
    });
    setHasTracked(true);
  }, [hasTracked, step.title]);

  return (
    <motion.article
      tabIndex={0}
      className={cn(
        "group rounded-3xl border border-white/70 bg-white/90 p-6 shadow-md transition backdrop-blur",
        "hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9]",
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={handleViewportEnter}
      variants={{
        hidden: {
          opacity: 0,
          y: shouldReduceMotion ? 0 : 32,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label={`${step.title} — ${step.desc}`}
    >
      <div
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4F9CF9]/10 text-[#043873] shadow-inner"
        aria-hidden="true"
      >
        {step.iconNode}
      </div>
      <h3 className="text-lg font-semibold text-[#043873]">
        <span aria-hidden="true">{step.title}</span>
        <span className="sr-only">Etapa {index + 1}: {step.title}</span>
      </h3>
      <p className="mt-2 text-sm text-[#495057]">{step.desc}</p>
    </motion.article>
  );
}

export function SectionHowItWorks({
  title = "Como funciona",
  subtitle = "Do contato ao insight acionável em horas, não semanas.",
  steps,
  metricsBadges = [],
  cta,
}: SectionHowItWorksProps) {
  const sectionId = "como-funciona";
  const resolvedSteps = React.useMemo<ResolvedStep[]>(
    () =>
      steps.map((step) => ({
        ...step,
        iconNode: React.createElement(getIconComponent(step.icon), {
          className: "h-5 w-5 text-[#043873]",
          "aria-hidden": true,
          focusable: false,
        }),
      })),
    [steps],
  );

  const handleCtaClick = React.useCallback(() => {
    if (!cta) return;
    trackEvent("cta_how_it_works_click", {
      section: sectionId,
    });
  }, [cta]);

  return (
    <section
      id={sectionId}
      aria-labelledby="how-it-works-title"
      className="relative isolate overflow-hidden bg-neutral-50 py-16 md:py-24"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-white/80 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 -z-20 hero-surface" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#043873] shadow-sm">
            <span>PESQUISA NO WHATSAPP</span>
            <span aria-hidden="true" className="text-[#4F9CF9]">·</span>
            <span>ANÁLISE DE DADOS</span>
          </div>
          <h2 id="how-it-works-title" className="mt-6 text-3xl font-bold tracking-tight text-[#043873] md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-[#495057] md:text-lg">{subtitle}</p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {resolvedSteps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>

        {metricsBadges.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {metricsBadges.map((badge) => (
              <span
                key={badge.label}
                className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#043873]/80 shadow-sm"
                title={badge.tooltip}
                aria-label={badge.tooltip ? `${badge.label}. ${badge.tooltip}` : badge.label}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        {cta && (
          <div className="mt-10 flex justify-center">
            <Button.Link
              id={cta.id ?? "cta-how-it-works"}
              href={cta.href}
              aria-label={cta.ariaLabel ?? cta.label}
              onClick={handleCtaClick}
              as={Link}
              className="inline-flex items-center"
            >
              {cta.label}
            </Button.Link>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-white/80 to-transparent" aria-hidden="true" />
    </section>
  );
}
