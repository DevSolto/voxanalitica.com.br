"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  title: string;
  subtitle: string;
  items: FaqItem[];
};

export function FaqSection({ title, subtitle, items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState(0);

  const structuredData = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }),
    [items],
  );

  return (
    <Section id="faq" className="bg-primary/4">
      <SectionHeader eyebrow="FAQ" title={title} subtitle={subtitle} className="mx-auto max-w-3xl text-center" align="center" />
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="overflow-hidden rounded-2xl border border-accent-foreground bg-background">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-foreground">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform",
                    isOpen ? "rotate-180" : "rotate-0",
                  )}
                  aria-hidden="true"
                />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-4 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </Section>
  );
}
