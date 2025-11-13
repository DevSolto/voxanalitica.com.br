import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
