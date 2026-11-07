import * as React from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <section className="section bg-[#FAF9F6] border-b border-stone-200/80">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and 3 Action Options */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary uppercase tracking-wider bg-secondary-50 border border-secondary-200/60 px-3 py-1 rounded-full">
                <HeartHandshake className="h-4 w-4 text-secondary" />
                <span>Roommate Matching Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                Find your people. <br />
                <span className="text-secondary">Share your space.</span>
              </h2>
              <p className="text-base text-foreground-secondary leading-relaxed max-w-xl">
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
                    className="group block p-4 rounded-xl border border-stone-200 bg-white transition-all hover:border-secondary/50 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary border border-secondary-100 group-hover:bg-secondary group-hover:text-white transition-colors duration-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-sm text-foreground group-hover:text-secondary transition-colors">
                            {opt.title}
                          </h3>
                          <Badge variant="subtle" className="text-[10px] bg-stone-100 text-stone-700 font-semibold border-stone-200">
                            {opt.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-foreground-secondary mt-1">
                          {opt.desc}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-secondary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Privacy Promise Notice */}
            <div className="flex items-center gap-2.5 text-xs text-foreground-secondary bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                <strong className="text-foreground">Privacy Guaranteed:</strong> Phone numbers and exact addresses remain private until mutual connection acceptance.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Profile Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
                Recent Verified Profiles
              </h3>
              <Link href="/roommates" className="text-xs font-bold text-secondary hover:underline">
                View all profiles →
              </Link>
            </div>

            <div className="space-y-3.5">
              {DEMO_ROOMMATES.slice(0, 2).map((rm) => (
                <Card key={rm.id} className="rounded-2xl border border-stone-200 bg-white shadow-sm p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-foreground">{rm.displayName}</h4>
                        <span className="text-xs text-stone-500 font-medium">({rm.age} yrs)</span>
                      </div>
                      <p className="text-xs text-foreground-secondary mt-0.5">{rm.occupationDetail} • {rm.city}</p>
                    </div>
                    <Badge variant="success" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold">
                      Verified ID
                    </Badge>
                  </div>

                  {/* Preferences Badges */}
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="bg-stone-100 border border-stone-200/70 px-2 py-0.5 rounded-md text-stone-700 font-medium">
                      Budget: {formatINR(rm.monthlyBudgetMin)} - {formatINR(rm.monthlyBudgetMax)}
                    </span>
                    <span className="bg-stone-100 border border-stone-200/70 px-2 py-0.5 rounded-md text-stone-700 font-medium capitalize">
                      {rm.foodPreference} Diet
                    </span>
                    <span className="bg-stone-100 border border-stone-200/70 px-2 py-0.5 rounded-md text-stone-700 font-medium capitalize">
                      {rm.smokingPreference.replace("_", " ")}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 italic bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    &ldquo;{rm.introduction}&rdquo;
                  </p>

                  <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">
                      Preferred: {rm.preferredLocalities.join(", ")}
                    </span>
                    <Button size="sm" variant="outline" asChild className="text-xs h-7 px-3 border-stone-300 hover:border-secondary hover:text-secondary">
                      <Link href={`/roommates`}>Connect</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Button size="lg" className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold text-sm shadow-sm" asChild>
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
