"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#043873] text-white shadow-sm hover:bg-[#043873]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9]",
  secondary:
    "bg-[#4F9CF9] text-white shadow-sm hover:bg-[#4F9CF9]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#043873]",
  outline:
    "border border-[#043873] text-[#043873] hover:bg-[#043873]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F9CF9]",
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

type ButtonComponent = {
  (props: ButtonProps): JSX.Element;
  Link(props: ButtonLinkProps): JSX.Element;
};

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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(BaseButton) as ButtonComponent;

Button.displayName = "Button";
Button.Link = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(ButtonLink);
Button.Link.displayName = "ButtonLink";

export { Button };
