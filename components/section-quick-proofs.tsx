"use client";

import * as React from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";

import { trackEvent } from "@/lib/analytics";

export type QuickProofMetric = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  tooltip?: string;
};

export type QuickProofLogo = {
  alt: string;
  src: string;
  width?: number;
  height?: number;
  href?: string;
};

export type SectionQuickProofsProps = {
  metrics: QuickProofMetric[];
  logos: QuickProofLogo[];
  titleSrOnly?: string;
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

function LogoItem({ logo }: { logo: QuickProofLogo }) {
  const content = (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width ?? 160}
      height={logo.height ?? 40}
      sizes="(min-width: 768px) 20vw, 50vw"
      className="h-auto w-auto"
      priority={false}
    />
  );

  if (logo.href) {
    const handleClick = () => {
      trackEvent("logo_click", {
        section: SECTION_ANALYTICS_ID,
        logoAlt: logo.alt,
      });
    };

    return (
      <li className="shrink-0">
        <a
          href={logo.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Abrir case ou site de ${logo.alt}`}
          className="inline-flex items-center justify-center rounded-md px-2 py-1 text-[#495057] opacity-80 transition hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9]"
          onClick={handleClick}
        >
          {content}
        </a>
      </li>
    );
  }

  return (
    <li className="shrink-0 opacity-80 transition hover:opacity-100">
      <div className="inline-flex items-center justify-center">{content}</div>
    </li>
  );
}

export function SectionQuickProofs({ metrics, logos, titleSrOnly = "Provas rápidas", disclaimer }: SectionQuickProofsProps) {
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
        <h2 id={headingId} className="sr-only">
          {titleSrOnly}
        </h2>

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

        <div
          className="mt-10 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Logotipos de clientes e parceiros"
        >
          <ul className="flex items-center gap-8 md:grid md:grid-cols-5 md:gap-10 md:justify-items-center">
            {logos.map((logo) => (
              <LogoItem key={logo.alt} logo={logo} />
            ))}
          </ul>
        </div>

        {disclaimer ? (
          <p className="mt-8 text-xs text-[#868E96]">{disclaimer}</p>
        ) : null}
      </div>
    </section>
  );
}
