"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Início", href: "#home" },
  { id: "solucoes", label: "Soluções", href: "#solucoes" },
  { id: "metodologia", label: "Metodologia", href: "#metodologia" },
  { id: "vantagem", label: "A Vantagem Vox", href: "#vantagem" },
  { id: "depoimentos", label: "Depoimentos", href: "#depoimentos" },
  { id: "insights", label: "Insights", href: "#insights" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "contato", label: "Contato", href: "#contato" },
  { id: "politica", label: "Política", href: "#politica" },
];

export function Nav() {
  const [activeId, setActiveId] = useState<string>("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-id]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target) {
          const id = visible.target.getAttribute("data-section-id");
          if (id && id !== activeId) {
            setActiveId(id);
          }
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [activeId]);

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
    <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-[#E9ECEF]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="#home" className="flex items-center gap-2 font-bold text-[#043873]">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#4F9CF9] text-white font-semibold">
            VA
          </span>
          <span className="hidden text-lg md:block">VoxAnalitica</span>
        </Link>
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-full border border-[#DEE2E6] p-2 text-[#043873] lg:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
        <ul className="hidden items-center gap-3 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-[#4F9CF9]/10 text-[#043873]"
                      : "text-[#495057] hover:text-[#043873]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div
        className={cn(
          "lg:hidden", "transition-[max-height] duration-300 ease-in-out overflow-hidden border-t border-[#E9ECEF] bg-white/95",
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
                    "block rounded-full px-4 py-2 text-sm font-medium",
                    isActive
                      ? "bg-[#4F9CF9]/10 text-[#043873]"
                      : "text-[#495057] hover:bg-[#F1F3F5] hover:text-[#043873]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
