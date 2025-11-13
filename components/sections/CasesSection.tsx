import { Section, SectionHeader } from "@/components/Section";

type ImpactCase = {
  title: string;
  scenario: string;
  action: string;
  result: string;
};

type CasesSectionProps = {
  title: string;
  subtitle: string;
  cases: ImpactCase[];
};

export function CasesSection({ title, subtitle, cases }: CasesSectionProps) {
  return (
    <Section id="vitorias" className="bg-[color-mix(in_srgb,var(--color-primary)_4%,var(--color-background))]">
      <SectionHeader
        eyebrow="Casos Reais"
        title={title}
        subtitle={subtitle}
        align="center"
        className="mx-auto max-w-3xl"
      />
      <div className="mt-12 grid gap-6">
        {cases.map((impactCase) => (
          <article
            key={impactCase.title}
            className="rounded-3xl bg-[var(--color-primary)] px-6 py-8 text-left text-[var(--color-primary-foreground)] shadow-sm"
          >
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                Case
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                {impactCase.title}
              </h3>
            </header>
            <dl className="mt-6 space-y-6 text-sm text-[color-mix(in_srgb,var(--color-primary-foreground)_80%,transparent)]">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[color-mix(in_srgb,var(--color-primary-foreground)_75%,transparent)]">
                  Cenário
                </dt>
                <dd className="mt-2 leading-relaxed">{impactCase.scenario}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[color-mix(in_srgb,var(--color-primary-foreground)_75%,transparent)]">
                  Ação Vox
                </dt>
                <dd className="mt-2 leading-relaxed">{impactCase.action}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[color-mix(in_srgb,var(--color-primary-foreground)_75%,transparent)]">
                  Resultado
                </dt>
                <dd className="mt-2 leading-relaxed">{impactCase.result}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </Section>
  );
}
