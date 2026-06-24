import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={hanken.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
