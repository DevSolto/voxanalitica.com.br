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
    "bg-accent text-white shadow-sm hover:bg-accent/92",
    focusBase,
    "focus-visible:outline-accent",
  ),
  secondary: cn(
    "bg-primary text-white shadow-sm hover:bg-primary/92",
    focusBase,
    "focus-visible:outline-accent",
  ),
  outline: cn(
    "border border-accent/70 text-text hover:bg-accent/12",
    focusBase,
    "focus-visible:outline-accent",
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
