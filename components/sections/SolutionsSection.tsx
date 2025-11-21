"use client";

import {
  Brain,
  Briefcase,
  ClipboardList,
  MessageSquare,
  PlayCircle,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionColumns, SectionHeader } from "@/components/Section";

type SolutionItem = {
  icon: keyof typeof iconMap;
  title: string;
  description: string;
  bullets?: string[];
  tag?: string;
};

type SolutionsProps = {
  title: string;
  subtitle: string;
  itemsTitle?: string;
  items: SolutionItem[];
  primaryCta: { label: string; href: string; id?: string; ariaLabel?: string };
  secondaryCta?: { label: string; href: string; id?: string; ariaLabel?: string };
};

const iconMap = {
  Brain,
  MessageSquare,
  TrendingUp,
  Users,
  ClipboardList,
  Briefcase,
  PlayCircle,
  Zap,
};

export function SolutionsSection({
  title,
  subtitle,
  itemsTitle,
  items,
  primaryCta,
  secondaryCta,
}: SolutionsProps) {
  return (
    <Section id="solucoes" className="bg-primary/4">
      <SectionHeader
        eyebrow="Diferenciais"
        title={title}
        subtitle={subtitle}
        align="center"
        className="mx-auto max-w-3xl"
      />
      {itemsTitle ? (
        <p className="mt-6 text-center text-base font-semibold text-foreground">{itemsTitle}</p>
      ) : null}
      <SectionColumns className="mt-12 grid-cols-1 md:grid-cols-2">
        {items.map((item) => {
          const Icon = iconMap[item.icon] ?? MessageSquare;
          return (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-2xl border border-white bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
                {item.tag ? (
                  <span className="ml-2 inline-flex items-center rounded-full bg-accent/35 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {item.tag}
                  </span>
                ) : null}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              {item.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-1 block h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          );
        })}
      </SectionColumns>
      <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
          >
            {secondaryCta.label}
          </Button.Link>
        ) : null}
      </div>
    </Section>
  );
}
