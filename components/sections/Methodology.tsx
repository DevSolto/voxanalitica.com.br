"use client";

import { Section, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Database, MessageSquare, Zap } from "lucide-react";

type MethodologyBlock = {
  icon: keyof typeof iconMap;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
};

type MethodologyProps = {
  title: string;
  subtitle: string;
  blocks: MethodologyBlock[];
  cta: { label: string; href: string; id?: string; ariaLabel?: string };
};

const iconMap = {
  MessageSquare,
  Database,
  Zap,
};

export function MethodologySection({ title, subtitle, blocks, cta }: MethodologyProps) {
  return (
    <Section id="metodologia">
      <SectionHeader eyebrow="Metodologia" title={title} subtitle={subtitle} className="max-w-3xl" />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {blocks.map((block) => {
          const Icon = iconMap[block.icon] ?? MessageSquare;
          return (
            <article
              key={block.title}
              className="relative flex h-full flex-col items-center rounded-2xl border border-[#E9ECEF] bg-white p-6 text-center shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F2FF] text-[#043873]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#ADB5BD]">{block.subtitle}</p>
              <h3 className="mt-1 text-lg font-semibold text-[#212529]">{block.title}</h3>
              <p className="mt-4 text-sm text-[#495057]">{block.description}</p>
              <ul className="mt-4 w-full space-y-3 text-left">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#343A40]">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#0D6EFD]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="mt-12 flex justify-center">
        <Button.Link
          id={cta.id}
          href={cta.href}
          aria-label={cta.ariaLabel ?? cta.label}
          variant="secondary"
        >
          {cta.label}
        </Button.Link>
      </div>
    </Section>
  );
}
