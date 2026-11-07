"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Star,
  Users,
  UtensilsCrossed,
  Heart,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR, PROPERTY_TYPE_LABELS, GENDER_LABELS } from "@/lib/utils";
import type { PropertyCardData } from "@/data/types";

interface PropertyCardProps {
  property: PropertyCardData;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isSaved, setIsSaved] = React.useState(false);

  // Architectural, grounded color palette for room placeholders
  const roomThemes: Record<string, { bg: string; label: string }> = {
    pg: { bg: "from-stone-100 via-stone-200/60 to-stone-100", label: "Furnished Room & Workstation" },
    hostel: { bg: "from-slate-100 via-slate-200/60 to-slate-100", label: "Student Sharing Dormitory" },
    flat: { bg: "from-zinc-100 via-zinc-200/60 to-zinc-100", label: "Private Apartment Suite" },
    coliving: { bg: "from-neutral-100 via-neutral-200/60 to-neutral-100", label: "Co-living Studio Suite" },
  };

  const theme = roomThemes[property.type] || roomThemes["pg"];

  return (
    <div className="group rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden transition-all duration-200 hover:border-slate-300 hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Photo Area */}
        <div className={`relative aspect-[16/10] w-full bg-gradient-to-tr ${theme.bg} overflow-hidden flex items-center justify-center p-4 border-b border-[#E2E8F0]/70`}>
          {/* Authentic Room Badge Graphic */}
          <div className="text-center space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#334155] bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#E2E8F0] shadow-2xs">
              {PROPERTY_TYPE_LABELS[property.type]}
            </span>
            <p className="text-[10px] text-[#64748B] font-medium">{theme.label}</p>
          </div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.isVerified && (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-[#059669] border border-emerald-200/80 shadow-2xs">
                <ShieldCheck className="h-3 w-3 text-[#059669]" />
                Verified Owner
              </span>
            )}
            <span className="inline-flex items-center rounded-md bg-[#0F172A]/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs">
              {GENDER_LABELS[property.genderPreference]}
            </span>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(!isSaved);
            }}
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#64748B] border border-[#E2E8F0] shadow-2xs hover:text-[#EA580C] transition-colors"
            aria-label="Save stay"
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-[#EA580C] text-[#EA580C]" : ""}`} />
          </button>

          {/* Vacancy Banner */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0F172A]/90 backdrop-blur-sm px-2 py-0.5 text-[11px] font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EA580C]" />
              <span className="tabular-nums">{property.availableBeds}</span> beds vacant
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Locality & Rating */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-[#475569] truncate max-w-[70%]">
              <MapPin className="h-3.5 w-3.5 text-[#EA580C] shrink-0" />
              <span className="truncate font-medium">{property.locality}, {property.city}</span>
            </div>

            {property.averageRating ? (
              <div className="flex items-center gap-1 font-bold text-[#0F172A] tabular-nums">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span>{property.averageRating.toFixed(1)}</span>
                <span className="text-[11px] text-[#64748B] font-normal">({property.reviewCount})</span>
              </div>
            ) : (
              <span className="text-[11px] text-[#64748B]">Fresh Listing</span>
            )}
          </div>

          {/* Property Name */}
          <h3 className="font-extrabold text-base text-[#0F172A] leading-snug line-clamp-1 tracking-[-0.03em] group-hover:text-[#EA580C] transition-colors">
            <Link href={`/properties/${property.slug}`}>
              {property.name}
            </Link>
          </h3>

          {/* Amenities Strip */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {property.hasFood && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#EA580C] bg-orange-50/80 border border-orange-200/60 px-2 py-0.5 rounded-md">
                <UtensilsCrossed className="h-3 w-3" />
                Food Included
              </span>
            )}
            {property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-[11px] font-medium text-[#475569] bg-slate-50 border border-[#E2E8F0] px-2 py-0.5 rounded-md"
              >
                {amenity}
              </span>
            ))}
          </div>

          {/* Pricing Box */}
          <div className="pt-3 border-t border-[#E2E8F0] flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-[#0F172A] tabular-nums tracking-tight font-mono-numbers">
                  {formatINR(property.monthlyRentMin)}
                </span>
                {property.monthlyRentMax > property.monthlyRentMin && (
                  <span className="text-xs text-[#64748B] font-normal tabular-nums font-mono-numbers">
                    – {formatINR(property.monthlyRentMax)}
                  </span>
                )}
                <span className="text-xs text-[#475569] font-medium">/ mo</span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5 tabular-nums">
                Deposit: <span className="font-mono-numbers font-medium text-[#334155]">{formatINR(property.securityDeposit)}</span> • Zero Brokerage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full text-xs font-bold border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#0F172A] shadow-2xs"
        >
          <Link href={`/properties/${property.slug}`}>
            View Details
          </Link>
        </Button>
        <Button
          size="sm"
          asChild
          className="w-full text-xs font-bold bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-2xs"
        >
          <Link href={`/properties/${property.slug}#contact`}>
            Contact Owner
          </Link>
        </Button>
      </div>
    </div>
  );
}
