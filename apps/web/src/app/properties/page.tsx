"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyFilters } from "@/components/property/property-filters";
import { DEMO_PROPERTIES } from "@/data/demo-data";
import { Button } from "@/components/ui/button";

function PropertiesSearchContent() {
  const searchParams = useSearchParams();
  const initialCity = searchParams.get("city") || "all";
  const initialType = searchParams.get("type") || "all";
  const queryParam = searchParams.get("q") || "";

  const [selectedCity, setSelectedCity] = React.useState(initialCity);
  const [selectedType, setSelectedType] = React.useState(initialType);
  const [selectedGender, setSelectedGender] = React.useState("any");
  const [maxBudget, setMaxBudget] = React.useState(30000);
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);
  const [foodIncluded, setFoodIncluded] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<"rent_low" | "rent_high" | "best_rated" | "recently_added">("rent_low");

  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  // Filter properties dynamically
  const filteredProperties = DEMO_PROPERTIES.filter((item) => {
    if (selectedCity !== "all" && item.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (selectedType !== "all" && item.type !== selectedType) {
      return false;
    }
    if (selectedGender !== "any" && item.genderPreference !== selectedGender && item.genderPreference !== "any") {
      return false;
    }
    if (item.monthlyRentMin > maxBudget) {
      return false;
    }
    if (verifiedOnly && !item.isVerified) {
      return false;
    }
    if (foodIncluded && !item.hasFood) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "rent_low") return a.monthlyRentMin - b.monthlyRentMin;
    if (sortBy === "rent_high") return b.monthlyRentMin - a.monthlyRentMin;
    if (sortBy === "best_rated") return (b.averageRating || 0) - (a.averageRating || 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleReset = () => {
    setSelectedCity("all");
    setSelectedType("all");
    setSelectedGender("any");
    setMaxBudget(30000);
    setVerifiedOnly(false);
    setFoodIncluded(false);
    setSortBy("rent_low");
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 border-b border-[#E2E8F0]">
      <div className="container-app">
        {/* Top Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
              <span className="font-bold text-[#0F172A]">Discover Stays</span>
              <span>•</span>
              <span className="capitalize">{selectedCity === "all" ? "All India" : selectedCity}</span>
              {queryParam && <span>• Keyword: &quot;{queryParam}&quot;</span>}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-[-0.03em]">
              Accommodations &amp; Rooms for Rent
            </h1>
            <p className="text-xs sm:text-sm text-[#475569]">
              Showing <span className="font-bold text-[#0F172A] tabular-nums font-mono-numbers">{filteredProperties.length}</span> verified stays with zero broker commission.
            </p>
          </div>

          {/* Action Row: Sort + Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-bold text-[#0F172A] shadow-2xs"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#0F172A]" />
              <span>Filters {verifiedOnly || foodIncluded ? "(Active)" : ""}</span>
            </button>

            <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 py-1.5 shadow-2xs">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#64748B]" />
              <span className="text-xs text-[#64748B] font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-[#0F172A] focus:outline-none cursor-pointer"
              >
                <option value="rent_low">Lowest Rent</option>
                <option value="rent_high">Highest Rent</option>
                <option value="best_rated">Best Rated</option>
                <option value="recently_added">Recently Added</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar Filters + Property Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24">
            <PropertyFilters
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedGender={selectedGender}
              onGenderChange={setSelectedGender}
              maxBudget={maxBudget}
              onMaxBudgetChange={setMaxBudget}
              verifiedOnly={verifiedOnly}
              onVerifiedOnlyChange={setVerifiedOnly}
              foodIncluded={foodIncluded}
              onFoodIncludedChange={setFoodIncluded}
              onReset={handleReset}
            />
          </aside>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden col-span-1 mb-4">
              <PropertyFilters
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                selectedGender={selectedGender}
                onGenderChange={setSelectedGender}
                maxBudget={maxBudget}
                onMaxBudgetChange={setMaxBudget}
                verifiedOnly={verifiedOnly}
                onVerifiedOnlyChange={setVerifiedOnly}
                foodIncluded={foodIncluded}
                onFoodIncludedChange={setFoodIncluded}
                onReset={handleReset}
              />
            </div>
          )}

          {/* Properties Grid */}
          <main className="lg:col-span-8">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white p-12 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#EA580C]">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] tracking-[-0.02em]">No stays found matching your criteria</h3>
                  <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                    Try raising the budget slider, resetting the gender filter, or selecting &quot;All Cities&quot;.
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={handleReset} className="text-xs font-bold border-[#E2E8F0]">
                  Reset All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function PropertiesSearchPage() {
  return (
    <Suspense fallback={<div className="container-app py-12 text-center text-xs">Loading stays...</div>}>
      <PropertiesSearchContent />
    </Suspense>
  );
}
