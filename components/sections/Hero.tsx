"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExpressBadge } from "@/components/express-badge";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Section } from "@/components/Section";

type Cta = {
  label: string;
  href: string;
  id?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  badges?: Array<{ label: string; variant?: "accent" | "outline" }>;
  cards?: Array<{ title: string; content: string }>;
};

const WhatsAppIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[var(--color-accent-foreground)]"
  >
    <path
      d="M12.0002 2.75C7.16894 2.75 3.25 6.5264 3.25 11.2419C3.25 13.1747 3.89779 14.9617 5.01198 16.4174L4.16667 20.75L8.62053 19.9436C9.95106 20.5936 11.4317 20.9837 13.0004 20.9837C17.8317 20.9837 21.7507 17.2073 21.7507 12.4918C21.7504 7.77636 17.8317 2.75 12.0002 2.75Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M9.414 8.98716C9.276 8.65473 9.14754 8.64492 8.93583 8.64492C8.72412 8.64492 8.51432 8.64492 8.30452 8.64492C7.80911 8.64492 7.33706 9.11732 7.33706 9.61338C7.33706 10.1094 7.33706 10.6055 7.33706 11.1015C7.33706 11.913 7.73757 12.8226 8.30103 13.5702C8.86449 14.3179 9.71652 14.9928 10.6419 15.3445C11.5674 15.6962 12.5787 15.7356 13.5261 15.5061C14.4735 15.2767 15.3278 14.5071 15.6412 13.5817C15.7045 13.3963 15.7732 13.1469 15.618 12.9806C15.4628 12.8144 15.2046 12.8655 15.0076 12.8156C14.6037 12.7099 13.8094 12.3466 13.5662 12.2318C13.3231 12.117 13.1974 12.0886 13.0635 12.2609C12.9296 12.4331 12.5238 12.8664 12.409 12.9806C12.2942 13.0949 12.1754 13.1086 11.9793 13.0177C11.7833 12.9269 11.1588 12.6983 10.5601 12.1848C9.96141 11.6714 9.67139 11.1656 9.53749 10.9821C9.4036 10.7986 9.48534 10.6957 9.57609 10.6055C9.66684 10.5153 9.79751 10.3573 9.87329 10.2624C9.94907 10.1675 9.96378 10.1094 10.0218 9.9608C10.0799 9.81223 10.005 9.68248 9.9541 9.55274C9.90323 9.423 9.55203 8.98716 9.414 8.98716Z"
      fill="currentColor"
    />
  </svg>
);

function useRevealAnimation<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return { ref, isVisible } as const;
}

export function HeroSection({ title, subtitle, primaryCta, secondaryCta, badges = [], cards = [] }: HeroProps) {
  const { ref, isVisible } = useRevealAnimation<HTMLDivElement>();

  const handlePrimaryClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (primaryCta.disabled) {
        event.preventDefault();
        return;
      }
      trackEvent("cta_whatsapp_click", { section: "hero" });
    },
    [primaryCta.disabled],
  );

  const handleSecondaryClick = React.useCallback(() => {
    trackEvent("cta_proposal_click", { section: "hero" });
  }, []);

  const isPrimaryExternal = primaryCta.href.startsWith("http");
  const primaryComponent = primaryCta.disabled ? "a" : isPrimaryExternal ? "a" : Link;
  const primaryTarget = !primaryCta.disabled && isPrimaryExternal ? "_blank" : undefined;
  const primaryRel = !primaryCta.disabled && isPrimaryExternal ? "noopener noreferrer" : undefined;

  return (
    <Section id="home" className="relative isolate overflow-hidden bg-[var(--color-background)] hero-surface pb-20 pt-24 md:pb-24">
      <div
        className={cn(
          "flex flex-col items-center text-center", "transition-all duration-700",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
        ref={ref}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_6%,white)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] shadow-sm">
          <span>PESQUISA E INTELIGÊNCIA</span>
        </div>
        <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-[var(--color-foreground)] md:text-5xl md:leading-[1.1]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--color-muted-foreground)] md:text-lg">{subtitle}</p>
        {badges.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {badges.map((badge) => (
              <ExpressBadge key={badge.label} label={badge.label} variant={badge.variant} />
            ))}
          </div>
        )}
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Button.Link
            id={primaryCta.id}
            href={primaryCta.href}
            aria-label={primaryCta.ariaLabel ?? "Abrir conversa no WhatsApp"}
            onClick={handlePrimaryClick}
            variant={primaryCta.disabled ? "outline" : "secondary"}
            className={cn(
              primaryCta.disabled ? "cursor-not-allowed border-dashed opacity-60" : "",
              "justify-center",
            )}
            rel={primaryRel}
            target={primaryTarget}
            title={primaryCta.disabled ? "Informe o número do WhatsApp para habilitar" : undefined}
            aria-disabled={primaryCta.disabled}
            tabIndex={primaryCta.disabled ? -1 : undefined}
            as={primaryComponent}
            icon={!primaryCta.disabled ? <WhatsAppIcon /> : undefined}
          >
            {primaryCta.label}
          </Button.Link>
          <Button.Link
            id={secondaryCta.id}
            href={secondaryCta.href}
            aria-label={secondaryCta.ariaLabel ?? "Ir para formulário de proposta"}
            onClick={handleSecondaryClick}
            variant="outline"
            className="justify-center"
            as={Link}
          >
            {secondaryCta.label}
          </Button.Link>
        </div>
        {cards.length > 0 && (
          <div className="mt-12 grid w-full max-w-4xl gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-background)_90%,white)] p-6 text-left shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{card.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{card.content}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
