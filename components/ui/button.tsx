"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonSize = "md" | "lg";

const focusBase =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-sm hover:bg-[color-mix(in_srgb,var(--color-primary)_92%,white)]",
    focusBase,
    "focus-visible:outline-[var(--color-accent)]",
  ),
  secondary: cn(
    "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] shadow-sm hover:bg-[color-mix(in_srgb,var(--color-accent)_92%,white)]",
    focusBase,
    "focus-visible:outline-[var(--color-primary)]",
  ),
  outline: cn(
    "border border-[color-mix(in_srgb,var(--color-primary)_65%,white)] text-[var(--color-foreground)] hover:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]",
    focusBase,
    "focus-visible:outline-[var(--color-accent)]",
  ),
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm font-semibold",
  lg: "h-12 px-6 text-base font-semibold",
};

type CommonButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: React.ReactNode;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & CommonButtonProps;

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  CommonButtonProps & { href: string; as?: typeof Link | "a" };

function BaseButton(
  { variant = "primary", size = "lg", className, icon, children, ...props }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

function ButtonLink(
  { variant = "primary", size = "lg", className, icon, children, as = Link, ...props }: ButtonLinkProps,
  ref: React.Ref<HTMLAnchorElement>,
) {
  const Component = as as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </Component>
  );
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(BaseButton);
const ButtonLinkComponent = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(ButtonLink);

ButtonRoot.displayName = "Button";
ButtonLinkComponent.displayName = "ButtonLink";

const Button = Object.assign(ButtonRoot, { Link: ButtonLinkComponent });

export { Button };
