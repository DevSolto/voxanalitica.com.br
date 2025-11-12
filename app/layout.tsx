// app/layout.tsx
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google"; // ou @next/font/local

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={[
        // Cores globais via tokens do @theme
        "bg-background text-foreground",
        // Familia tipográfica padrão
        "font-sans",
        // Registra as CSS vars vindas do next/font (variáveis usadas no @theme)
        geistSans.variable,
        geistMono.variable,
      ].join(" ")}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
