import type { ReactNode } from "react";

import "../globals.css";
import { Inter, Montserrat } from "next/font/google";

const headingFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={[
        "bg-background text-foreground",
        "font-sans",
        headingFont.variable,
        bodyFont.variable,
      ].join(" ")}
    >
      <body className="antialiased font-[var(--font-body,inherit)]">{children}</body>
    </html>
  );
}
