import { Section, SectionColumns, SectionHeader } from "@/components/Section";

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
      <SectionHeader eyebrow="Casos Reais" title={title} subtitle={subtitle} align="center" className="mx-auto max-w-3xl" />
      <SectionColumns className="mt-12 grid-cols-1 md:grid-cols-2">
        {cases.map((impactCase) => (
          <article key={impactCase.title} className="flex h-full flex-col rounded-2xl border border-[#E9ECEF] bg-white p-8 shadow-sm">
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F9CF9]">Case</p>
              <h3 className="mt-2 text-xl font-semibold text-[#212529]">{impactCase.title}</h3>
            </header>
            <dl className="mt-6 space-y-6 text-sm text-[#495057]">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#868E96]">Cenário</dt>
                <dd className="mt-2 leading-relaxed">{impactCase.scenario}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#868E96]">Ação Vox</dt>
                <dd className="mt-2 leading-relaxed">{impactCase.action}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[#868E96]">Resultado</dt>
                <dd className="mt-2 leading-relaxed">{impactCase.result}</dd>
              </div>
            </dl>
          </article>
        ))}
      </SectionColumns>
    </Section>
  );
}
