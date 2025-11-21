import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ms" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800&family=Orbitron:wght@500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
