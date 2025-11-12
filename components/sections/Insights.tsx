import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionColumns, SectionHeader } from "@/components/Section";

type InsightItem = {
  title: string;
  description: string;
  category: string;
  href: string;
};

type InsightsProps = {
  title: string;
  subtitle: string;
  items: InsightItem[];
};

export function InsightsSection({ title, subtitle, items }: InsightsProps) {
  return (
    <Section id="insights">
      <SectionHeader eyebrow="Insights" title={title} subtitle={subtitle} className="max-w-3xl" />
      <SectionColumns className="mt-10 grid-cols-1 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col justify-between rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ADB5BD]">{item.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-[#212529]">{item.title}</h3>
              <p className="mt-2 text-sm text-[#495057]">{item.description}</p>
            </div>
            <div className="mt-6">
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#043873] hover:text-[#021F46]"
              >
                Ler insight completo
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </SectionColumns>
    </Section>
  );
}
