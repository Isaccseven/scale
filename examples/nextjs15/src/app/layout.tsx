import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@telekom/scale-components/dist/scale-components/scale-components.css";
import ScaleInitializer from "../features/scale/components/ScaleInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scale Components Example - Next.js 15",
  description: "Beispielanwendung für die Integration von Telekom Scale-Komponenten in Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScaleInitializer />
        {children}
      </body>
    </html>
  );
}
