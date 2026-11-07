import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Suspense fallback={<div className="h-16 w-full bg-white border-b border-border" />}>
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
