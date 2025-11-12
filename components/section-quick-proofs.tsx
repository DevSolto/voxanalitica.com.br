"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { trackEvent } from "@/lib/analytics";

export type QuickProofMetric = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  tooltip?: string;
};

export type SectionQuickProofsProps = {
  metrics: QuickProofMetric[];
  title: string;
  description?: string;
  disclaimer?: string;
};

const SECTION_ID = "provas-rapidas";
const SECTION_ANALYTICS_ID = "provas-rapidas";

function useCountUp(target: number, shouldStart: boolean, shouldReduceMotion: boolean, duration = 1.2) {
  const [value, setValue] = React.useState(() => (shouldReduceMotion ? target : 0));

  React.useEffect(() => {
    if (!shouldStart) {
      setValue(shouldReduceMotion ? target : 0);
      return;
    }

    if (shouldReduceMotion) {
      setValue(target);
      return;
    }

    let animationFrame: number;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      const nextValue = Math.round(progress * target);
      setValue(nextValue);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [target, shouldStart, shouldReduceMotion, duration]);

  return value;
}

function MetricCard({ metric, shouldStart, shouldReduceMotion }: { metric: QuickProofMetric; shouldStart: boolean; shouldReduceMotion: boolean }) {
  const value = useCountUp(metric.value, shouldStart, shouldReduceMotion);
  const formattedValue = React.useMemo(() => new Intl.NumberFormat("pt-BR").format(value), [value]);
  const labelId = `${metric.id}-label`;
  const tooltipId = metric.tooltip ? `${metric.id}-tooltip` : undefined;

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      aria-describedby={tooltipId}
      className="flex flex-col rounded-2xl border border-[#E9ECEF] bg-white p-5 shadow-sm transition hover:shadow-md focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#4F9CF9]"
      title={metric.tooltip}
    >
      <dl className="flex flex-col">
        <dd
          aria-live="polite"
          className="order-1 text-2xl font-bold text-[#043873] md:text-3xl"
        >
          {formattedValue}
          {metric.suffix ? <span aria-hidden="true">{metric.suffix}</span> : null}
          {metric.suffix ? (
            <span className="sr-only">{metric.suffix}</span>
          ) : null}
        </dd>
        <dt id={labelId} className="order-2 mt-1 text-sm text-[#495057]">
          {metric.label}
        </dt>
      </dl>
      {metric.tooltip ? (
        <p id={tooltipId} className="sr-only">
          {metric.tooltip}
        </p>
      ) : null}
    </div>
  );
}

export function SectionQuickProofs({ metrics, title, description, disclaimer }: SectionQuickProofsProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();
  const [hasStarted, setHasStarted] = React.useState(false);
  const hasTrackedView = React.useRef(false);
  const headingId = React.useId();

  React.useEffect(() => {
    if (inView) {
      setHasStarted(true);
    }
  }, [inView]);

  React.useEffect(() => {
    if (!inView || hasTrackedView.current) return;

    trackEvent("metrics_view", { section: SECTION_ANALYTICS_ID });
    hasTrackedView.current = true;
  }, [inView]);

  const startAnimation = hasStarted || shouldReduceMotion;

  return (
    <section
      id={SECTION_ID}
      ref={sectionRef}
      aria-labelledby={headingId}
      className="relative w-full border-t border-[#E9ECEF] bg-[#F8F9FA] py-12 md:py-16"
      data-keywords="cases,clientes,provas sociais,números de credibilidade"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2
            id={headingId}
            className="text-2xl font-semibold text-[#043873] md:text-3xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base text-[#495057] md:text-lg">{description}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              shouldStart={startAnimation}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {disclaimer ? (
          <p className="mt-8 text-xs text-[#868E96]">{disclaimer}</p>
        ) : null}
      </div>
    </section>
  );
}
