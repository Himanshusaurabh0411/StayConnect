"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Stays", href: "/properties", icon: Search },
    { label: "Roommates", href: "/roommates", icon: Users },
    { label: "Owner", href: "/owner", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] shadow-md pb-safe">
      <div className="grid grid-cols-4 h-16">
        {items.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                isActive
                  ? "text-[#EA580C] font-bold"
                  : "text-[#64748B] hover:text-[#0F172A]"
              )}
            >
              <div
                className={cn(
                  "p-1 rounded-full transition-transform",
                  isActive && "bg-orange-50 text-[#EA580C] scale-105"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "stroke-[2.5]" : "stroke-[1.75]")} />
              </div>
              <span className="text-[11px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
