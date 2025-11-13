import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={[
        // Cores globais via tokens do @theme
        "text-foreground",
        // Família tipográfica padrão
        "font-sans",
      ].join(" ")}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
