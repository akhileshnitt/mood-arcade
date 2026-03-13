import type { Metadata } from "next";
import { Space_Grotesk, Chivo_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const chivoMono = Chivo_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Mood Arcade",
  description:
    "A playful mental wellbeing playground for quick mood resets and micro-celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${chivoMono.variable} bg-slate-950 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
