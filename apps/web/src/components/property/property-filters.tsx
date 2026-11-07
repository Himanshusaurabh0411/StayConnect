"use client";

import * as React from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface PropertyFiltersProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedGender: string;
  onGenderChange: (gender: string) => void;
  maxBudget: number;
  onMaxBudgetChange: (val: number) => void;
  verifiedOnly: boolean;
  onVerifiedOnlyChange: (val: boolean) => void;
  foodIncluded: boolean;
  onFoodIncludedChange: (val: boolean) => void;
  onReset: () => void;
}

export function PropertyFilters({
  selectedCity,
  onCityChange,
  selectedType,
  onTypeChange,
  selectedGender,
  onGenderChange,
  maxBudget,
  onMaxBudgetChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  foodIncluded,
  onFoodIncludedChange,
  onReset,
}: PropertyFiltersProps) {
  const cities = [
    { label: "All Cities", value: "all" },
    { label: "Bangalore", value: "bangalore" },
    { label: "Mumbai", value: "mumbai" },
    { label: "Delhi NCR", value: "delhi" },
    { label: "Pune", value: "pune" },
    { label: "Hyderabad", value: "hyderabad" },
    { label: "Chennai", value: "chennai" },
  ];

  const types = [
    { label: "All Stays", value: "all" },
    { label: "PG (Paying Guest)", value: "pg" },
    { label: "Student Hostel", value: "hostel" },
    { label: "Flat / Apartment", value: "flat" },
    { label: "Co-living Space", value: "coliving" },
  ];

  const genders = [
    { label: "Any Gender", value: "any" },
    { label: "Boys Only", value: "male" },
    { label: "Girls Only", value: "female" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#0F172A]" />
          <h3 className="font-bold text-sm text-[#0F172A] tracking-[-0.02em]">Filters</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-[#64748B] hover:text-[#EA580C] flex items-center gap-1 font-semibold transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Reset All
        </button>
      </div>

      {/* City Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
          City
        </label>
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="w-full h-9 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-xs text-[#0F172A] font-semibold focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
        >
          {cities.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Accommodation Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
          Stay Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {types.map((t) => {
            const isSelected = selectedType === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => onTypeChange(t.value)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  isSelected
                    ? "bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-2xs"
                    : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:border-slate-300 font-medium"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gender Preference */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
          Gender Specific
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {genders.map((g) => {
            const isSelected = selectedGender === g.value;
            return (
              <button
                key={g.value}
                type="button"
                onClick={() => onGenderChange(g.value)}
                className={`text-xs py-1.5 rounded-lg border text-center transition-all ${
                  isSelected
                    ? "bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-2xs"
                    : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:border-slate-300 font-medium"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Budget Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold uppercase tracking-wider text-[#64748B]">
            Max Monthly Budget
          </label>
          <span className="font-bold text-[#0F172A] tabular-nums font-mono-numbers">{formatINR(maxBudget)}</span>
        </div>
        <input
          type="range"
          min="4000"
          max="35000"
          step="1000"
          value={maxBudget}
          onChange={(e) => onMaxBudgetChange(Number(e.target.value))}
          className="w-full accent-[#EA580C] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#94A3B8] tabular-nums font-mono-numbers">
          <span>₹4,000</span>
          <span>₹35,000+</span>
        </div>
      </div>

      {/* Checkbox Toggles */}
      <div className="space-y-2.5 pt-2 border-t border-[#E2E8F0] text-xs">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="font-semibold text-[#0F172A]">Verified listings only</span>
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => onVerifiedOnlyChange(e.target.checked)}
            className="h-4 w-4 rounded border-[#E2E8F0] text-[#059669] focus:ring-[#059669] cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <span className="font-semibold text-[#0F172A]">Food &amp; Meals included</span>
          <input
            type="checkbox"
            checked={foodIncluded}
            onChange={(e) => onFoodIncludedChange(e.target.checked)}
            className="h-4 w-4 rounded border-[#E2E8F0] text-[#EA580C] focus:ring-[#EA580C] cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}
