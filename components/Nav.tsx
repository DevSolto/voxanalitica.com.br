"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "solucoes", label: "Diferenciais", href: "#solucoes" },
  { id: "metodologia", label: "Metodologia", href: "#metodologia" },
  { id: "vantagem", label: "Vantagens", href: "#vantagem" },
  { id: "vitorias", label: "Cases", href: "#vitorias" },
  { id: "blog", label: "Blog", href: "#blog" },
  { id: "faq", label: "FAC", href: "#faq" },
  { id: "contato", label: "Contato", href: "#contato" },
];

export function Nav() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(`[data-section-id="${item.id}"]`),
    ).filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target) {
          const id = visible.target.getAttribute("data-section-id");
          if (id) {
            setActiveId((prev) => (prev === id ? prev : id));
          }
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-primary/95 text-primary-foreground backdrop-blur border-b border-border/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          href="#home"
          className="flex items-center gap-3 font-bold text-primary-foreground"
          aria-label="VoxAnalitica"
        >
          <Image
            src="/logos/VOX ANALÍTICA - LOGO PRINCIPAL - MARCAD´ÁGUA - BRANCA.png"
            alt="VoxAnalitica"
            width={200}
            height={74}
            priority
            className="h-14 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
            sizes="(max-width: 768px) 140px, 190px"
          />
        </Link>
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-full p-2 text-primary-foreground transition-colors lg:hidden hover:bg-accent/10"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
        <div className="hidden items-center gap-3 lg:flex">
          <ul className="flex items-center gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition",
                      isActive
                        ? "bg-accent text-white shadow-sm"
                        : "text-primary-foreground/80 hover:text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
      <div
        className={cn(
          "lg:hidden", "transition-[max-height] duration-300 ease-in-out overflow-hidden bg-surface",
          isOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <ul className="space-y-1 px-4 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "block rounded-full px-4 py-2 text-sm font-semibold",
                    isActive
                      ? "bg-accent text-white shadow-sm"
                      : "text-primary-foreground/90 hover:bg-accent/10 hover:text-primary-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <div className="pt-3">
              <ThemeToggle className="w-full justify-center bg-text/10 text-primary-foreground" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
