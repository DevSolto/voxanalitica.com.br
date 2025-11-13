"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ExpressBadgeProps = {
  label: string;
  variant?: "accent" | "outline";
  icon?: React.ReactNode;
  className?: string;
};

export function ExpressBadge({ label, variant = "accent", icon, className }: ExpressBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        variant === "accent"
          ? "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
          : "border border-[color-mix(in_srgb,var(--color-primary)_55%,white)] text-[var(--color-foreground)]",
        className,
      )}
    >
      {icon}
      {label}
    </span>
  );
}
