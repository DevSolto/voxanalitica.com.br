"use client";

import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";

type FinalCtaProps = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string; id?: string; ariaLabel?: string };
  secondaryCta?: { label: string; href: string; id?: string; ariaLabel?: string };
};

export function FinalCtaSection({ title, subtitle, primaryCta, secondaryCta }: FinalCtaProps) {
  return (
    <Section id="cta-final" className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]">
      <div className="flex flex-col items-center gap-6 text-center">
        <SectionHeader
          eyebrow="Vamos conversar?"
          title={title}
          subtitle={subtitle}
          align="center"
          className="mx-auto max-w-3xl"
          eyebrowClassName="text-[color-mix(in_srgb,var(--color-primary-foreground)_70%,transparent)]"
          titleClassName="text-[var(--color-primary-foreground)]"
          subtitleClassName="text-[color-mix(in_srgb,var(--color-primary-foreground)_80%,transparent)]"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button.Link
            id={primaryCta.id}
            href={primaryCta.href}
            aria-label={primaryCta.ariaLabel ?? primaryCta.label}
            variant="secondary"
          >
            {primaryCta.label}
          </Button.Link>
          {secondaryCta ? (
            <Button.Link
              id={secondaryCta.id}
              href={secondaryCta.href}
              aria-label={secondaryCta.ariaLabel ?? secondaryCta.label}
              variant="outline"
              className="border-[var(--color-primary-foreground)] text-[var(--color-primary-foreground)] hover:bg-[color-mix(in_srgb,var(--color-primary-foreground)_10%,transparent)]"
            >
              {secondaryCta.label}
            </Button.Link>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
