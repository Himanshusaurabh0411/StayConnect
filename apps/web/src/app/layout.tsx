import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "StayConnect — India's Nationwide Accommodation & Roommate Discovery Platform",
  description:
    "Find verified PGs, hostels, flats, co-living spaces, and compatible roommates across all Indian cities without mandatory brokerage fees.",
  keywords: [
    "PG in Bangalore",
    "Hostels in Mumbai",
    "Flats for rent Delhi",
    "Roommates India",
    "Zero Brokerage PG",
    "Coliving Spaces",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-[#0F172A]">
        <Suspense fallback={<div className="h-16 w-full bg-white border-b border-[#E2E8F0]" />}>
          <Header />
        </Suspense>
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <MobileNav />
        </Suspense>
      </body>
    </html>
  );
}
