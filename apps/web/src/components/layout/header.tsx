"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "Find Stays", href: "/properties" },
    { label: "Find Roommates", href: "/roommates", tag: "Popular" },
    { label: "True Cost Calculator", href: "/properties/sunrise-pg-boys-koramangala#calculator" },
    { label: "Trust & Safety", href: "/admin" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md">
      <div className="container-app flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F172A] text-white font-extrabold text-sm tracking-tighter shadow-2xs">
            <span className="text-[#EA580C] font-black">S</span>C
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-[-0.03em] text-[#0F172A] leading-none">
              Stay<span className="text-[#EA580C]">Connect</span>
            </span>
            <span className="text-[10px] font-semibold text-[#64748B] tracking-wider uppercase mt-0.5">
              Zero Brokerage India
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-3">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-semibold transition-colors relative flex items-center gap-1.5",
                  isActive
                    ? "text-[#0F172A] bg-slate-100/70"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
                )}
              >
                <span>{link.label}</span>
                {link.tag && (
                  <span className="text-[10px] font-bold text-[#EA580C] bg-orange-50 border border-orange-200/60 px-1.5 py-0.5 rounded">
                    {link.tag}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Button variant="ghost" size="sm" asChild className="text-xs font-bold text-[#0F172A] hover:bg-slate-100">
            <Link href="/auth/login">Login</Link>
          </Button>

          <Button
            size="sm"
            asChild
            className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs h-9 px-3.5 shadow-2xs transition-colors"
          >
            <Link href="/owner">
              <Plus className="mr-1 h-3.5 w-3.5 stroke-[2.5]" />
              Post Free Property
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border border-[#E2E8F0] text-[#0F172A] hover:bg-slate-50"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E8F0] bg-white px-5 pt-3 pb-6 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm font-semibold text-[#0F172A]"
              >
                <span>{link.label}</span>
                {link.tag && (
                  <span className="text-[10px] font-bold text-[#EA580C] bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded">
                    {link.tag}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
            <Button variant="outline" asChild className="w-full text-xs font-semibold justify-center border-[#E2E8F0]">
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                Login to Account
              </Link>
            </Button>
            <Button asChild className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs justify-center shadow-2xs">
              <Link href="/owner" onClick={() => setMobileMenuOpen(false)}>
                Post Free Property (Zero Brokerage)
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
