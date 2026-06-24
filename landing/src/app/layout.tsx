import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estudio Cimiento · sistemas que ordenan tu operación",
  description:
    "Construimos sistemas a medida para pymes y equipos que necesitan ordenar su operación: tareas, finanzas, stock y más.",
  openGraph: {
    title: "Estudio Cimiento",
    description: "Sistemas que ordenan tu operación",
    siteName: "Estudio Cimiento",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jakarta.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
