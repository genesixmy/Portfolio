import type { Metadata } from "next";
import { Exo_2, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-exo2",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Khalid Zainal | Web Developer Malaysia",
  description:
    "Saya Khalid Zainal, web developer dari Malaysia yang membangunkan projek web yang fokus pada kegunaan sebenar, fungsi praktikal, dan pengalaman pengguna yang ringkas tetapi berkesan.",
  keywords: [
    "web developer",
    "malaysia",
    "next.js",
    "react",
    "portfolio",
    "frontend developer",
    "khalid",
  ],
  authors: [{ name: "Khalid Zainal" }],
  openGraph: {
    title: "Khalid Zainal | Web Developer Malaysia",
    description: "Membangunkan projek web yang praktikal dan mesra pengguna",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" className="dark" style={{
      "--font-exo2": exo2.style.fontFamily,
      "--font-orbitron": orbitron.style.fontFamily,
      "--font-jetbrains-mono": jetbrainsMono.style.fontFamily,
    } as React.CSSProperties}>
      <body className={`${exo2.variable} ${orbitron.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
