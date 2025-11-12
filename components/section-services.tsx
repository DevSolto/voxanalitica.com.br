"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  AudioLines,
  BarChart3,
  ClipboardList,
  MessageSquare,
  PlayCircle,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type IconName =
  | "MessageSquare"
  | "Users"
  | "ClipboardList"
  | "BarChart3"
  | "PlayCircle"
  | "AudioLines"
  | (string & {});

const iconMap = {
  MessageSquare,
  Users,
  ClipboardList,
  BarChart3,
  PlayCircle,
  AudioLines,
};

export type ServiceItem = {
  icon: IconName;
  title: string;
  desc: string;
  bullets?: string[];
  tag?: string;
};

export type SectionServicesProps = {
  title?: string;
  subtitle?: string;
  services: ServiceItem[];
  ctaPrimary?: {
    label: string;
    href: string;
    ariaLabel?: string;
    id?: string;
  };
  ctaSecondary?: {
    label: string;
    href?: string;
    href_template?: string;
    ariaLabel?: string;
    id?: string;
  };
};

const SECTION_ID = "servicos";
const SECTION_ANALYTICS_ID = "servicos";
const SECTION_KEYWORDS = [
  "pesquisa WhatsApp",
  "pesquisa qualitativa",
  "pesquisa quantitativa",
  "relatórios",
  "relatórios em áudio",
  "vídeos explicativos",
];

function getIconComponent(name: IconName) {
  if (name && name in iconMap) {
    return iconMap[name as keyof typeof iconMap];
  }
  return MessageSquare;
}

function sanitizeNumber(value: string | undefined) {
  if (!value) return "";
  return value.replace(/[^0-9+]/g, "");
}

function getServiceHeadingId(title: string) {
  const normalized = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "");
  return `${SECTION_ID}-${normalized || "item"}`;
}

type ServiceCardProps = {
  service: ServiceItem;
  index: number;
};

function ServiceCard({ service, index }: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasTracked, setHasTracked] = React.useState(false);

  const iconNode = React.useMemo(
    () =>
      React.createElement(getIconComponent(service.icon), {
        className: "h-5 w-5",
        "aria-hidden": true,
        focusable: false,
      }),
    [service.icon],
  );
  const headingId = React.useMemo(() => getServiceHeadingId(service.title), [service.title]);

  const handleViewportEnter = React.useCallback(() => {
    if (hasTracked) return;
    trackEvent("service_card_view", {
      section: SECTION_ANALYTICS_ID,
      service: service.title,
    });
    setHasTracked(true);
  }, [hasTracked, service.title]);

  const variants = React.useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
      visible: { opacity: 1, y: 0 },
    }),
    [shouldReduceMotion],
  );

  return (
    <motion.article
      tabIndex={0}
      role="group"
      aria-labelledby={headingId}
      className={cn(
        "group rounded-2xl border bg-white p-6 shadow-sm transition",
        "hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9]",
      )}
      data-analytics="service-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={variants}
      transition={{
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onViewportEnter={handleViewportEnter}
    >
      <div
        className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F2FF] text-[#043873]"
        aria-hidden="true"
      >
        {iconNode}
      </div>
      <h3 id={headingId} className="text-lg font-semibold text-[#212529]">
        {service.title}
        {service.tag ? (
          <span className="ml-2 inline-flex items-center rounded-full bg-[#FFE6A8] px-2 py-0.5 text-[10px] font-medium text-[#212529]">
            {service.tag}
          </span>
        ) : null}
      </h3>
      <p className="mt-1 text-sm text-[#495057]">{service.desc}</p>
      {service.bullets && service.bullets.length > 0 ? (
        <ul className="mt-4 space-y-1 text-sm text-[#495057]">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <span aria-hidden="true" className="mt-1 block h-1.5 w-1.5 rounded-full bg-[#4F9CF9]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </motion.article>
  );
}

export function SectionServices({
  title = "Serviços",
  subtitle = "Pesquisa, análise e apresentação clara para decisões com menos risco.",
  services,
  ctaPrimary,
  ctaSecondary,
}: SectionServicesProps) {
  const headingId = React.useId();

  const resolvedSecondaryHref = React.useMemo(() => {
    if (!ctaSecondary) return undefined;
    if (ctaSecondary.href) return ctaSecondary.href;
    if (!ctaSecondary.href_template) return undefined;

    const envNumber = sanitizeNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
    if (!envNumber) return undefined;

    return ctaSecondary.href_template.replace("${NEXT_PUBLIC_WHATSAPP_NUMBER}", envNumber);
  }, [ctaSecondary]);

  const secondaryDisabled = Boolean(ctaSecondary) && !resolvedSecondaryHref;

  const primaryHref = ctaPrimary?.href ?? "";
  const primaryIsExternal = primaryHref.startsWith("http");
  const primaryAs = !ctaPrimary?.href ? "a" : primaryIsExternal ? "a" : Link;
  const primaryTarget = ctaPrimary?.href && primaryIsExternal ? "_blank" : undefined;
  const primaryRel = ctaPrimary?.href && primaryIsExternal ? "noopener noreferrer" : undefined;

  const handlePrimaryClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!ctaPrimary?.href) {
        event.preventDefault();
        return;
      }
      trackEvent("cta_services_primary_click", { section: SECTION_ANALYTICS_ID });
    },
    [ctaPrimary?.href],
  );

  const handleSecondaryClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (secondaryDisabled || !ctaSecondary) {
        event.preventDefault();
        return;
      }
      trackEvent("cta_services_secondary_click", { section: SECTION_ANALYTICS_ID });
    },
    [secondaryDisabled, ctaSecondary],
  );

  const secondaryIsExternal = resolvedSecondaryHref?.startsWith("http");
  const secondaryAs = secondaryDisabled ? "a" : secondaryIsExternal ? "a" : Link;
  const secondaryTarget = !secondaryDisabled && secondaryIsExternal ? "_blank" : undefined;
  const secondaryRel = !secondaryDisabled && secondaryIsExternal ? "noopener noreferrer" : undefined;

  return (
    <section
      id={SECTION_ID}
      aria-labelledby={headingId}
      className="relative w-full bg-[#F8F9FA] py-16 md:py-24"
      data-keywords={SECTION_KEYWORDS.join(",")}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <header className="max-w-3xl">
          <h2 id={headingId} className="text-2xl font-bold tracking-tight text-[#043873] md:text-4xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-base text-[#495057] md:text-lg">{subtitle}</p>
          ) : null}
        </header>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {(ctaPrimary || ctaSecondary) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {ctaPrimary ? (
              <Button.Link
                id={ctaPrimary.id ?? "cta-services-primary"}
                href={primaryHref || "#"}
                aria-label={ctaPrimary.ariaLabel ?? ctaPrimary.label}
                onClick={handlePrimaryClick}
                as={primaryAs}
                target={primaryTarget}
                rel={primaryRel}
                variant="secondary"
                className={cn(
                  !ctaPrimary.href ? "cursor-not-allowed opacity-60" : "",
                )}
                aria-disabled={!ctaPrimary.href || undefined}
                tabIndex={!ctaPrimary.href ? -1 : undefined}
                title={
                  !ctaPrimary.href
                    ? "Informe o link para habilitar o CTA principal"
                    : undefined
                }
              >
                {ctaPrimary.label}
              </Button.Link>
            ) : null}
            {ctaSecondary ? (
              <Button.Link
                id={ctaSecondary.id ?? "cta-services-secondary"}
                href={resolvedSecondaryHref || "#"}
                aria-label={
                  ctaSecondary.ariaLabel ?? ctaSecondary.label
                }
                onClick={handleSecondaryClick}
                as={secondaryAs}
                target={secondaryTarget}
                rel={secondaryRel}
                variant="outline"
                className={cn(
                  secondaryDisabled
                    ? "cursor-not-allowed border-dashed opacity-60"
                    : "",
                )}
                aria-disabled={secondaryDisabled}
                tabIndex={secondaryDisabled ? -1 : undefined}
                title={
                  secondaryDisabled
                    ? "Informe o número do WhatsApp (NEXT_PUBLIC_WHATSAPP_NUMBER) para habilitar"
                    : undefined
                }
              >
                {ctaSecondary.label}
              </Button.Link>
            ) : null}
          </div>
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DEE2E6] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
