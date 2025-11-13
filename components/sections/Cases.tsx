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
    <Section id="vitorias" className="bg-[#F8F9FA]">
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
            className="rounded-3xl bg-[#043873] px-6 py-8 text-left text-white shadow-sm"
          >
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#89C2FF]">
                Case
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {impactCase.title}
              </h3>
            </header>
            <dl className="mt-6 space-y-6 text-sm text-white/80">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5E5FF]">
                  Cenário
                </dt>
                <dd className="mt-2 leading-relaxed">{impactCase.scenario}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5E5FF]">
                  Ação Vox
                </dt>
                <dd className="mt-2 leading-relaxed">{impactCase.action}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5E5FF]">
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
