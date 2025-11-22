import "./globals.css";
import type { ReactNode } from "react";
import { Montserrat } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={[
        // Cores globais via tokens do @theme
        "text-foreground",
        // Família tipográfica padrão
        "font-sans",
        montserrat.variable,
      ].join(" ")}
    >
      <body className="antialiased bg-bg text-text">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
