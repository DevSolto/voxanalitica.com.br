"use client";

type AnalyticsPayload = Record<string, unknown> | undefined;

type PlausibleFn = (event: string, options?: { props?: AnalyticsPayload }) => void;
type UmamiFn = (event: string, data?: AnalyticsPayload) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
    umami?: { track: UmamiFn };
    umamiTrackEvent?: UmamiFn;
  }
}

export function trackEvent(event: string, payload?: AnalyticsPayload) {
  if (typeof window === "undefined") return;

  if (typeof window.plausible === "function") {
    window.plausible(event, payload ? { props: payload } : undefined);
  }

  if (window.umami?.track) {
    window.umami.track(event, payload);
  } else if (typeof window.umamiTrackEvent === "function") {
    window.umamiTrackEvent(event, payload);
  }
}
