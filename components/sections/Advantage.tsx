import {
  Building,
  Compass,
  Layers,
  RefreshCw,
  ShieldCheck,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import { Section, SectionHeader } from "@/components/Section";

const ICONS = {
  users: Users,
  building: Building,
  layers: Layers,
  target: Target,
  trophy: Trophy,
  compass: Compass,
  "shield-check": ShieldCheck,
  "refresh-cw": RefreshCw,
} as const;

export type IconName = keyof typeof ICONS;

export type Audience = {
  title: string;
  subtitle: string;
  description: string;
  icon: IconName;
};

export type Benefit = {
  title: string;
  description: string;
  icon: IconName;
};

export type AdvantageContent = {
  title: string;
  subtitle: string;
  audiences: Audience[];
  benefitsTitle: string;
  benefits: Benefit[];
};

export function AdvantageSection({
  title,
  subtitle,
  audiences,
  benefitsTitle,
  benefits,
}: AdvantageContent) {
  return (
    <Section id="vantagem" className="bg-white">
      <SectionHeader
        eyebrow="Por que VoxAnalitica"
        title={title}
        subtitle={subtitle}
        className="max-w-3xl"
        align="center"
        subtitleClassName="text-base md:text-lg text-[#495057]"
        titleClassName="text-3xl font-bold tracking-tight text-[#043873] md:text-4xl"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {audiences.map((audience) => {
          const Icon = ICONS[audience.icon];
          return (
            <article
              key={audience.title}
              className="rounded-3xl border border-[#E9ECEF] bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7F0FF] text-[#043873]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ADB5BD]">
                    {audience.subtitle}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[#043873]">{audience.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#495057] leading-relaxed">{audience.description}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-16 rounded-3xl bg-[#043873] px-6 py-10 text-white md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#89C2FF]">
            Ganhos estratégicos
          </p>
          <h3 className="mt-2 text-2xl font-semibold md:text-3xl">{benefitsTitle}</h3>
          <p className="mt-3 text-base text-white/80">
            Transformamos inteligência política em ações concretas para quem precisa decidir com rapidez e segurança.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = ICONS[benefit.icon];
            return (
              <div key={benefit.title} className="flex gap-4 rounded-2xl bg-white/5 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{benefit.title}</h4>
                  <p className="mt-1 text-sm text-white/80 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
