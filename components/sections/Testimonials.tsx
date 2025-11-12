import { Section, SectionColumns, SectionHeader } from "@/components/Section";
import { Quote } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
};

type TestimonialsProps = {
  title: string;
  subtitle: string;
  items: Testimonial[];
};

export function TestimonialsSection({ title, subtitle, items }: TestimonialsProps) {
  return (
    <Section id="depoimentos" className="bg-[#F8F9FA]">
      <SectionHeader eyebrow="Depoimentos" title={title} subtitle={subtitle} align="center" className="mx-auto max-w-3xl" />
      <SectionColumns className="mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure
            key={`${item.name}-${item.company}`}
            className="flex h-full flex-col justify-between rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-sm"
          >
            <Quote className="h-8 w-8 text-[#4F9CF9]" aria-hidden="true" />
            <blockquote className="mt-4 flex-1 text-sm text-[#495057]">“{item.quote}”</blockquote>
            <figcaption className="mt-6">
              <p className="text-sm font-semibold text-[#212529]">{item.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#868E96]">
                {item.role} · {item.company}
              </p>
            </figcaption>
          </figure>
        ))}
      </SectionColumns>
    </Section>
  );
}
