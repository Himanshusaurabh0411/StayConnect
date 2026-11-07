"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  UserPlus,
  Search,
  Sparkles,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { DEMO_ROOMMATES } from "@/data/demo-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";

function RoommateFinderContent() {
  const searchParams = useSearchParams();
  const initialIntent = searchParams.get("intent") || "all";

  const [selectedIntent, setSelectedIntent] = React.useState(initialIntent);
  const [selectedCity, setSelectedCity] = React.useState("all");
  const [requestSentIds, setRequestSentIds] = React.useState<string[]>([]);

  const handleSendRequest = (id: string) => {
    setRequestSentIds((prev) => [...prev, id]);
  };

  const intents = [
    {
      id: "all",
      label: "All Roommates",
      icon: Users,
    },
    {
      id: "flatmates_to_rent",
      label: "Find Flatmates to Rent Together",
      icon: Users,
    },
    {
      id: "roommate_for_my_flat",
      label: "I Have a Flat & Need a Roommate",
      icon: UserPlus,
    },
    {
      id: "room_in_shared_flat",
      label: "Looking for a Room in Shared Flat",
      icon: Search,
    },
  ];

  const filteredRoommates = DEMO_ROOMMATES.filter((rm) => {
    if (selectedIntent !== "all" && rm.lookingFor !== selectedIntent) return false;
    if (selectedCity !== "all" && rm.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 border-b border-[#E2E8F0]">
      <div className="container-app space-y-8">
        {/* Header Hero Banner (Solid Deep Slate with purposeful terracotta accent) */}
        <div className="rounded-2xl bg-[#0F172A] p-6 sm:p-10 text-white shadow-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1 text-xs font-bold text-[#EA580C]">
            <HeartHandshake className="h-4 w-4" />
            <span>StayConnect Roommate Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-tight">
            Find your people. <br />
            <span className="text-[#EA580C]">Share your space.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Discover verified students and professionals to share an apartment, split rent costs,
            and build a peaceful home with like-minded individuals.
          </p>

          {/* Privacy & Safety Note + Dashboard Shortcut */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#059669] shrink-0" />
              <span>
                Phone numbers remain hidden until mutual connection is accepted. Always meet in a public cafe for initial introductions.
              </span>
            </div>
            <Button size="sm" asChild className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shrink-0 shadow-2xs">
              <Link href="/roommates/dashboard">
                <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                My Requests &amp; Chats (1)
              </Link>
            </Button>
          </div>
        </div>

        {/* 3 Core Selection Tabs */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Select Your Intent
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {intents.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedIntent === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedIntent(item.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-2xs"
                      : "bg-white text-[#0F172A] border-[#E2E8F0] hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isSelected ? "bg-white/10 text-white" : "bg-orange-50 text-[#EA580C]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold leading-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* City Filter & Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0F172A]">Showing:</span>
            <span className="text-xs text-[#475569]">
              <strong className="text-[#0F172A] font-mono-numbers tabular-nums">{filteredRoommates.length}</strong> active roommate profiles
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#64748B]">Filter City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-xs font-bold text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="all">All India</option>
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
              <option value="hyderabad">Hyderabad</option>
            </select>
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredRoommates.map((rm) => {
            const hasSent = requestSentIds.includes(rm.id);

            return (
              <Card key={rm.id} className="rounded-2xl border border-[#E2E8F0] bg-white shadow-2xs hover:border-slate-300 hover:shadow-md transition-all p-6 space-y-5">
                {/* Profile Top Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    {/* Avatar Initials Placeholder */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#0F172A] font-extrabold text-base border border-[#E2E8F0]">
                      {rm.displayName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-[#0F172A] tracking-[-0.02em]">
                          {rm.displayName}
                        </h3>
                        <span className="text-xs text-[#64748B] font-medium">({rm.age} yrs)</span>
                      </div>
                      <p className="text-xs text-[#475569] flex items-center gap-1.5 mt-0.5">
                        {rm.occupation === "professional" ? (
                          <Briefcase className="h-3 w-3 text-[#EA580C]" />
                        ) : (
                          <GraduationCap className="h-3 w-3 text-[#EA580C]" />
                        )}
                        <span>{rm.occupationDetail}</span>
                        <span>•</span>
                        <span>{rm.city}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#059669] border border-emerald-200/80">
                      <ShieldCheck className="h-3 w-3 text-[#059669]" />
                      ID Checked
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#EA580C] bg-orange-50 border border-orange-200/60 px-2 py-0.5 rounded-md tabular-nums font-mono-numbers">
                      <Sparkles className="h-3 w-3 text-[#EA580C]" />
                      94% Match
                    </span>
                  </div>
                </div>

                {/* Intent Tag */}
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] bg-slate-100 px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                  <span className="capitalize">{rm.lookingFor.replace(/_/g, " ")}</span>
                </div>

                {/* Intro */}
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0] text-xs text-[#475569] leading-relaxed italic">
                  &ldquo;{rm.introduction}&rdquo;
                </div>

                {/* Preferences Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold">
                      Budget Range
                    </span>
                    <span className="font-bold text-[#0F172A] tabular-nums font-mono-numbers">
                      {formatINR(rm.monthlyBudgetMin)} – {formatINR(rm.monthlyBudgetMax)}/mo
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold">
                      Move-in Date
                    </span>
                    <span className="font-bold text-[#0F172A]">Next 2-3 Weeks</span>
                  </div>

                  <div className="p-2.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold">
                      Diet / Food Preference
                    </span>
                    <span className="font-bold text-[#0F172A] capitalize">
                      {rm.foodPreference}
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl">
                    <span className="text-[#64748B] block text-[10px] uppercase font-bold">
                      Smoking Habit
                    </span>
                    <span className="font-bold text-[#0F172A] capitalize">
                      {rm.smokingPreference.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {/* Preferred Localities */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                    Preferred Localities:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rm.preferredLocalities.map((loc) => (
                      <span
                        key={loc}
                        className="text-xs bg-[#F8FAFC] px-2.5 py-0.5 rounded-md text-[#334155] border border-[#E2E8F0] font-medium"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommendation Reason */}
                <div className="rounded-xl bg-orange-50/70 border border-orange-200/60 p-2.5 text-[11px] text-[#475569] space-y-1">
                  <div className="flex items-center gap-1 font-bold text-[#EA580C]">
                    <Sparkles className="h-3 w-3" />
                    <span>Why you matched:</span>
                  </div>
                  <p>
                    Matching budget range, similar commute zone in {rm.city}, and compatible lifestyle habits.
                  </p>
                </div>

                {/* Action Row */}
                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => alert("Report submitted for moderation review.")}
                    className="text-[11px] text-[#64748B] hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Report Profile
                  </button>

                  {hasSent ? (
                    <Button size="sm" variant="outline" disabled className="text-xs text-[#059669] border-[#059669]/30 bg-emerald-50/50">
                      <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-[#059669]" />
                      Request Sent
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleSendRequest(rm.id)}
                      className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold shadow-2xs"
                    >
                      <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                      Connect for Free
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Safety & Legal Guardrail Notice */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 text-xs text-[#475569] flex items-start gap-2.5 shadow-2xs">
          <AlertCircle className="h-4 w-4 text-[#EA580C] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#0F172A]">Platform Safety Disclaimer:</strong> StayConnect uses algorithmic preference scoring to identify common criteria (budget, location, and lifestyle choices). A high compatibility match does not constitute a legal endorsement or guarantee personal safety. Please exercise prudent judgment and meet candidates in well-lit public venues before finalizing lease co-signings.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RoommateFinderPage() {
  return (
    <Suspense fallback={<div className="container-app py-12 text-center text-xs">Loading roommates...</div>}>
      <RoommateFinderContent />
    </Suspense>
  );
}
