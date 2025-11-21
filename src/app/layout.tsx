import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Chen | Creative Developer & Designer",
  description:
    "Award-winning creative developer and designer crafting exceptional digital experiences. Specializing in interactive design, 3D web experiences, and brand identity.",
  keywords: [
    "web designer",
    "creative developer",
    "UI/UX designer",
    "portfolio",
    "frontend developer",
    "interactive design",
    "3D web",
  ],
  authors: [{ name: "Alex Chen" }],
  openGraph: {
    title: "Alex Chen | Creative Developer & Designer",
    description: "Crafting exceptional digital experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
