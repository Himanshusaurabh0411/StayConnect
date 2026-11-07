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
  Sparkles,
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
    <section className="relative bg-white pt-10 pb-12 md:pt-14 md:pb-16 border-b border-border">
      <div className="container-app">
        {/* Editorial Heading */}
        <div className="max-w-3xl space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary uppercase tracking-wider bg-secondary-50 px-2.5 py-1 rounded">
            <span>Direct Owner Connect • Pan-India</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.12]">
            Find your perfect stay <br className="hidden sm:inline" />
            <span className="text-secondary">anywhere in India.</span>
          </h1>

          <p className="text-sm sm:text-base text-foreground-secondary max-w-xl leading-relaxed">
            Discover verified PGs, hostels, flats and roommates without unnecessary brokerage.
            Connect directly with verified property owners across Indian colleges and tech hubs.
          </p>
        </div>

        {/* Real Product Search Box */}
        <div className="rounded-2xl border border-border bg-white shadow-card-hover overflow-hidden max-w-4xl">
          {/* Segmented Category Tabs */}
          <div className="flex border-b border-border bg-surface/50 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("pg")}
              className={`flex-1 sm:flex-initial px-6 py-3.5 border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "pg"
                  ? "border-secondary text-secondary bg-white"
                  : "border-transparent text-foreground-secondary hover:text-foreground"
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
                  ? "border-secondary text-secondary bg-white"
                  : "border-transparent text-foreground-secondary hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Find Roommates</span>
              <span className="hidden sm:inline text-[9px] bg-secondary-50 text-secondary font-black px-1.5 py-0.2 rounded">
                NEW
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("flats")}
              className={`flex-1 sm:flex-initial px-6 py-3.5 border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "flats"
                  ? "border-secondary text-secondary bg-white"
                  : "border-transparent text-foreground-secondary hover:text-foreground"
              }`}
            >
              <Building className="h-4 w-4" />
              <span>Rental Flats</span>
            </button>
          </div>

          {/* Search Inputs Bar */}
          <form onSubmit={handleSearch} className="p-4 sm:p-5 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* City Selector Field */}
            <div className="md:w-56 rounded-xl border border-border bg-surface px-3 py-2.5 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-secondary shrink-0" />
              <div className="flex-1 text-left">
                <span className="text-[10px] font-bold text-foreground-secondary uppercase block leading-none mb-1">
                  City
                </span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer"
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
            <div className="flex-1 rounded-xl border border-border bg-surface px-3 py-2.5 flex items-center gap-2">
              <Search className="h-4 w-4 text-foreground-muted shrink-0" />
              <div className="flex-1">
                <span className="text-[10px] font-bold text-foreground-secondary uppercase block leading-none mb-1">
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
                  className="w-full bg-transparent text-xs font-medium text-foreground placeholder:text-foreground-muted focus:outline-none"
                />
              </div>
            </div>

            {/* Search Submit CTA */}
            <Button
              type="submit"
              className="bg-secondary hover:bg-secondary-dark text-white font-extrabold text-sm h-12 md:h-auto md:py-3.5 px-8 rounded-xl shadow-sm cursor-pointer"
            >
              Search
            </Button>
          </form>

          {/* Quick Locality Chips */}
          <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] font-bold text-foreground-secondary mr-1">Trending in {selectedCity}:</span>
            {(quickLocalities[selectedCity] || quickLocalities["Bangalore"]).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setLocalityQuery(loc);
                  router.push(`/properties?city=${selectedCity.toLowerCase()}&q=${encodeURIComponent(loc)}`);
                }}
                className="text-[11px] font-medium text-foreground-secondary hover:text-foreground bg-surface hover:bg-surface-hover px-2.5 py-1 rounded-md transition-colors"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Value Highlights */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl text-xs text-foreground-secondary">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/70 border border-border">
            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center font-bold text-secondary shadow-sm">
              ₹0
            </div>
            <div>
              <strong className="text-foreground block">Zero Mandatory Brokerage</strong>
              <span>Contact verified owners directly at no fee.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/70 border border-border">
            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-secondary shadow-sm">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <strong className="text-foreground block">4-Tier Verified Listings</strong>
              <span>Electricity bills, tax proofs &amp; ground checks.</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface/70 border border-border">
            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center font-bold text-secondary shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <strong className="text-foreground block">True Cost Transparency</strong>
              <span>All mandatory electricity and food bills disclosed.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
