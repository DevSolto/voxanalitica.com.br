"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { icon, label, text } = useMemo(() => {
    if (!mounted) {
      return {
        icon: <Sun className="h-4 w-4" aria-hidden="true" />,
        label: "Alternar tema",
        text: "Alternar tema",
      };
    }

    const isDark = theme === "dark";
    return {
      icon: isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ),
      label: isDark ? "Ativar modo claro" : "Ativar modo escuro",
      text: isDark ? "Modo claro" : "Modo escuro",
    };
  }, [mounted, theme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition",
        "border-border text-text",
        "bg-surface/80",
        "hover:border-accent hover:text-text hover:shadow-sm",
        className,
      )}
      aria-label={label}
    >
      {icon}
      <span className="hidden sm:inline">{text}</span>
    </button>
  );
}
