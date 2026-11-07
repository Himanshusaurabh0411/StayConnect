"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Search,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_ROOMMATES } from "@/data/demo-data";
import { formatINR } from "@/lib/utils";

export function RoommateCta() {
  const options = [
    {
      title: "Find People to Rent a Flat Together",
      desc: "Connect with students or professionals in your budget to rent a 2BHK/3BHK together.",
      icon: Users,
      href: "/roommates?intent=flatmates_to_rent",
      badge: "Group Renting",
    },
    {
      title: "I Have a Flat and Need a Roommate",
      desc: "Already have an apartment lease? Fill the vacant room with a verified, compatible tenant.",
      icon: UserPlus,
      href: "/roommates?intent=roommate_for_my_flat",
      badge: "List Empty Room",
    },
    {
      title: "I Am Looking for a Room in a Shared Flat",
      desc: "Move into an established shared flat without the hassle of setting up furniture or Wi-Fi.",
      icon: Search,
      href: "/roommates?intent=room_in_shared_flat",
      badge: "Move-in Ready",
    },
  ];

  return (
    <section className="section bg-[#FAF9F6] border-b border-[#E2E8F0]">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and 3 Action Options */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA580C] uppercase tracking-wider bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-md">
                <HeartHandshake className="h-4 w-4 text-[#EA580C]" />
                <span>Roommate Matching Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-[-0.03em] leading-tight">
                Find your people. <br />
                <span className="text-[#EA580C]">Share your space.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl">
                Moving to a new city? Match with compatible flatmates based on verified occupation,
                budget, sleep schedule, dietary preferences, and commute.
              </p>
            </div>

            {/* 3 Core Pathway Cards */}
            <div className="space-y-3">
              {options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <Link
                    key={opt.title}
                    href={opt.href}
                    className="group block p-4 rounded-xl border border-[#E2E8F0] bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#EA580C] border border-orange-200/60 group-hover:bg-[#EA580C] group-hover:text-white transition-colors duration-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-sm text-[#0F172A] tracking-[-0.02em] group-hover:text-[#EA580C] transition-colors">
                            {opt.title}
                          </h3>
                          <span className="text-[10px] bg-slate-100 text-[#475569] font-bold px-2 py-0.5 rounded border border-[#E2E8F0]">
                            {opt.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#EA580C] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Privacy Promise Notice */}
            <div className="flex items-center gap-2.5 text-xs text-[#475569] bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-[#059669] shrink-0" />
              <span>
                <strong className="text-[#0F172A]">Privacy Guaranteed:</strong> Phone numbers and exact addresses remain private until mutual connection acceptance.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Profile Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Recent Verified Profiles
              </h3>
              <Link href="/roommates" className="text-xs font-bold text-[#EA580C] hover:underline">
                View all profiles →
              </Link>
            </div>

            <div className="space-y-3.5">
              {DEMO_ROOMMATES.slice(0, 2).map((rm) => (
                <div key={rm.id} className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-[#0F172A] tracking-[-0.02em]">{rm.displayName}</h4>
                        <span className="text-xs text-[#64748B] font-medium">({rm.age} yrs)</span>
                      </div>
                      <p className="text-xs text-[#475569] mt-0.5">{rm.occupationDetail} • {rm.city}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#059669] border border-emerald-200/80">
                      <ShieldCheck className="h-3 w-3 text-[#059669]" />
                      Verified ID
                    </span>
                  </div>

                  {/* Preferences Badges */}
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-md text-[#334155] font-medium tabular-nums font-mono-numbers">
                      Budget: {formatINR(rm.monthlyBudgetMin)} - {formatINR(rm.monthlyBudgetMax)}
                    </span>
                    <span className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-md text-[#334155] font-medium capitalize">
                      {rm.foodPreference} Diet
                    </span>
                    <span className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-md text-[#334155] font-medium capitalize">
                      {rm.smokingPreference.replace("_", " ")}
                    </span>
                  </div>

                  <p className="text-xs text-[#475569] line-clamp-2 italic bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
                    &ldquo;{rm.introduction}&rdquo;
                  </p>

                  <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between">
                    <span className="text-[11px] text-[#64748B]">
                      Preferred: {rm.preferredLocalities.join(", ")}
                    </span>
                    <Button size="sm" variant="outline" asChild className="text-xs h-7 px-3 border-[#E2E8F0] text-[#0F172A] hover:border-[#EA580C] hover:text-[#EA580C] font-bold">
                      <Link href={`/roommates`}>Connect</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-xs transition-colors" asChild>
              <Link href="/roommates">
                Explore Full Roommate Network
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
