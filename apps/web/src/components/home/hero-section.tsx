"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  MapPin,
  Building,
  Users,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"pg" | "roommates" | "flats">("pg");
  const [selectedCity, setSelectedCity] = React.useState("Bangalore");
  const [localityQuery, setLocalityQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "roommates") {
      router.push(`/roommates?city=${selectedCity.toLowerCase()}`);
      return;
    }
    const params = new URLSearchParams();
    if (selectedCity && selectedCity !== "All") params.set("city", selectedCity.toLowerCase());
    if (localityQuery) params.set("q", localityQuery);
    if (activeTab === "pg") params.set("type", "pg");
    if (activeTab === "flats") params.set("type", "flat");
    router.push(`/properties?${params.toString()}`);
  };

  const quickLocalities: Record<string, string[]> = {
    Bangalore: ["Koramangala", "HSR Layout", "Indiranagar", "Bellandur", "Whitefield"],
    Mumbai: ["Andheri West", "Powai", "Bandra", "BKC", "Thane"],
    Delhi: ["Hauz Khas", "North Campus", "Saket", "Noida Sec 62", "Gurgaon Cyber City"],
    Pune: ["Hinjewadi", "Viman Nagar", "Kothrud", "Wakad", "Baner"],
    Hyderabad: ["Madhapur", "Gachibowli", "Kondapur", "Hitec City"],
  };

  return (
    <section className="relative bg-[#FAF9F6] pt-10 pb-12 md:pt-16 md:pb-20 border-b border-[#E2E8F0]">
      <div className="container-app">
        {/* Editorial Heading (Series-A Stanza/Linear high-contrast) */}
        <div className="max-w-3xl space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
            <BadgeCheck className="h-3.5 w-3.5 text-[#059669]" />
            <span>Direct Owner Connect • Zero Brokerage</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.12]">
            Find your perfect stay <br className="hidden sm:inline" />
            <span className="relative inline-block text-[#0F172A]">
              anywhere in India.
              <span className="absolute bottom-1 left-0 w-full h-[4px] bg-[#EA580C] rounded-full opacity-80" />
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#475569] max-w-xl leading-relaxed">
            Discover verified PGs, hostels, flats and roommates without unnecessary brokerage.
            Connect directly with verified property owners across Indian colleges and tech hubs.
          </p>
        </div>

        {/* Real Product Search Box */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm hover:border-slate-300 transition-all overflow-hidden max-w-4xl">
          {/* Segmented Category Tabs */}
          <div className="flex border-b border-[#E2E8F0] bg-slate-50/70 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("pg")}
              className={`flex-1 sm:flex-initial px-6 py-3.5 border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "pg"
                  ? "border-[#EA580C] text-[#EA580C] bg-white font-extrabold"
                  : "border-transparent text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <Building className="h-4 w-4" />
              <span>PGs &amp; Hostels</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("roommates")}
              className={`flex-1 sm:flex-initial px-6 py-3.5 border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "roommates"
                  ? "border-[#EA580C] text-[#EA580C] bg-white font-extrabold"
                  : "border-transparent text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Find Roommates</span>
              <span className="hidden sm:inline text-[9px] bg-orange-100 text-[#EA580C] font-black px-1.5 py-0.5 rounded">
                NEW
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("flats")}
              className={`flex-1 sm:flex-initial px-6 py-3.5 border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "flats"
                  ? "border-[#EA580C] text-[#EA580C] bg-white font-extrabold"
                  : "border-transparent text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <Building className="h-4 w-4" />
              <span>Rental Flats</span>
            </button>
          </div>

          {/* Search Inputs Bar */}
          <form onSubmit={handleSearch} className="p-4 sm:p-5 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* City Selector Field */}
            <div className="md:w-56 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#EA580C] shrink-0" />
              <div className="flex-1 text-left">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block leading-none mb-1">
                  City
                </span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-[#0F172A] focus:outline-none cursor-pointer"
                >
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
            </div>

            {/* Hyperlocal Locality / College / Landmark Field */}
            <div className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 flex items-center gap-2">
              <Search className="h-4 w-4 text-[#94A3B8] shrink-0" />
              <div className="flex-1">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block leading-none mb-1">
                  Locality, College or Tech Park
                </span>
                <input
                  type="text"
                  value={localityQuery}
                  onChange={(e) => setLocalityQuery(e.target.value)}
                  placeholder={
                    activeTab === "roommates"
                      ? "e.g. Near Koramangala, Powai, or Cyber City..."
                      : "e.g. Near Christ Univ, Manyata Tech Park, 560034..."
                  }
                  className="w-full bg-transparent text-xs font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none"
                />
              </div>
            </div>

            {/* Search Submit CTA */}
            <Button
              type="submit"
              className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm h-12 md:h-auto md:py-3.5 px-8 rounded-xl shadow-xs cursor-pointer transition-colors"
            >
              Search Stays
            </Button>
          </form>

          {/* Quick Locality Chips */}
          <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] font-bold text-[#64748B] mr-1">Trending in {selectedCity}:</span>
            {(quickLocalities[selectedCity] || quickLocalities["Bangalore"]).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setLocalityQuery(loc);
                  router.push(`/properties?city=${selectedCity.toLowerCase()}&q=${encodeURIComponent(loc)}`);
                }}
                className="text-[11px] font-medium text-[#475569] hover:text-[#0F172A] bg-[#F1F5F9] hover:bg-[#E2E8F0] px-2.5 py-1 rounded-md transition-colors"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Trust Signals */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl text-xs text-[#475569]">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center font-bold text-[#059669] shrink-0 font-mono-numbers">
              ₹0
            </div>
            <div>
              <strong className="text-[#0F172A] block font-bold">Zero Mandatory Brokerage</strong>
              <span className="text-[11px]">Connect directly with owners without middlemen.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#059669] shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <strong className="text-[#0F172A] block font-bold">4-Tier Verified Listings</strong>
              <span className="text-[11px]">Electricity bills, tax proofs &amp; ground checks.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
            <div className="h-8 w-8 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center font-bold text-[#EA580C] shrink-0">
              100%
            </div>
            <div>
              <strong className="text-[#0F172A] block font-bold">True Cost Transparency</strong>
              <span className="text-[11px]">All mandatory electricity and food bills disclosed.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
