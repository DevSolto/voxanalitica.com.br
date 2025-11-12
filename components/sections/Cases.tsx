"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Section, SectionColumns, SectionHeader } from "@/components/Section";
import { Button } from "@/components/ui/button";

export type CaseStudy = {
  title: string;
  segment: string;
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  metrics: Array<{ label: string; value: string }>;
};

type CasesProps = {
  title: string;
  subtitle: string;
  items: CaseStudy[];
};

export function CasesSection({ title, subtitle, items }: CasesProps) {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const closeDialog = useCallback(() => setSelectedCase(null), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    if (selectedCase) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCase, closeDialog]);

  return (
    <Section id="cases" className="bg-white">
      <SectionHeader eyebrow="Cases" title={title} subtitle={subtitle} className="max-w-3xl" />
      <SectionColumns className="mt-12 grid-cols-1 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col justify-between rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-sm"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ADB5BD]">{item.segment}</p>
              <h3 className="mt-2 text-lg font-semibold text-[#212529]">{item.title}</h3>
              <p className="mt-3 text-sm text-[#495057]">{item.summary}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {item.metrics.map((metric) => (
                  <div
                    key={`${item.title}-${metric.label}`}
                    className="rounded-xl bg-[#F1F3F5] px-3 py-2"
                  >
                    <dt className="text-xs font-medium uppercase tracking-[0.2em] text-[#868E96]">{metric.label}</dt>
                    <dd className="text-base font-semibold text-[#043873]">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-center"
                onClick={() => setSelectedCase(item)}
                aria-label={`Ver detalhes do case ${item.title}`}
              >
                Ver abordagem
              </Button>
            </div>
          </article>
        ))}
      </SectionColumns>

      {selectedCase ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-dialog-title"
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={closeDialog}
              className="absolute right-4 top-4 rounded-full border border-[#DEE2E6] p-2 text-[#495057] hover:text-[#212529]"
              aria-label="Fechar detalhes do case"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ADB5BD]">{selectedCase.segment}</p>
            <h3 id="case-dialog-title" className="mt-2 text-2xl font-semibold text-[#043873]">
              {selectedCase.title}
            </h3>
            <div className="mt-6 space-y-4 text-sm text-[#495057]">
              <div>
                <h4 className="text-sm font-semibold text-[#212529]">Desafio</h4>
                <p className="mt-1 leading-relaxed">{selectedCase.challenge}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#212529]">Abordagem VoxAnalitica</h4>
                <p className="mt-1 leading-relaxed">{selectedCase.approach}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#212529]">Resultado</h4>
                <p className="mt-1 leading-relaxed">{selectedCase.result}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button.Link href="#contato" variant="secondary">
                Conversar com o time
              </Button.Link>
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
