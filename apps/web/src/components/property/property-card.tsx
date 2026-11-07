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
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR, PROPERTY_TYPE_LABELS, GENDER_LABELS } from "@/lib/utils";
import type { PropertyCardData } from "@/data/types";

interface PropertyCardProps {
  property: PropertyCardData;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isSaved, setIsSaved] = React.useState(false);

  // Realistic architectural color themes for room placeholders
  const roomThemes: Record<string, { bg: string; accent: string; label: string }> = {
    pg: { bg: "from-amber-950/10 via-stone-100 to-stone-200", accent: "text-amber-800", label: "Furnished Room & Study Desk" },
    hostel: { bg: "from-slate-900/10 via-slate-100 to-slate-200", accent: "text-slate-700", label: "Student Sharing Dormitory" },
    flat: { bg: "from-orange-950/10 via-stone-100 to-stone-200", accent: "text-orange-900", label: "Apartment Hall & Kitchen" },
    coliving: { bg: "from-stone-900/10 via-zinc-100 to-zinc-200", accent: "text-zinc-800", label: "Co-living Studio Suite" },
  };

  const theme = roomThemes[property.type] || roomThemes["pg"];

  return (
    <div className="group rounded-2xl border border-border bg-white overflow-hidden shadow-card transition-all hover:shadow-card-hover hover:border-border-strong flex flex-col justify-between">
      <div>
        {/* Photo Area */}
        <div className={`relative aspect-[16/10] w-full bg-gradient-to-tr ${theme.bg} overflow-hidden flex items-center justify-center p-4`}>
          {/* Authentic Room Outline Graphic */}
          <div className="text-center space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-foreground-secondary bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded shadow-xs">
              {PROPERTY_TYPE_LABELS[property.type]}
            </span>
            <p className="text-[10px] text-foreground-muted font-medium">{theme.label}</p>
          </div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.isVerified && (
              <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 text-[10px] font-bold text-success shadow-xs">
                <ShieldCheck className="h-3 w-3 text-success" />
                Verified Owner
              </span>
            )}
            <span className="inline-flex items-center rounded bg-primary/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
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
            className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground-secondary shadow-xs hover:text-secondary transition-colors"
            aria-label="Save stay"
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-secondary text-secondary" : ""}`} />
          </button>

          {/* Vacancy Banner */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 rounded bg-foreground/80 backdrop-blur-sm px-2 py-0.5 text-[11px] font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {property.availableBeds} beds vacant
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Locality & Rating */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-foreground-secondary truncate max-w-[70%]">
              <MapPin className="h-3.5 w-3.5 text-secondary shrink-0" />
              <span className="truncate font-medium">{property.locality}, {property.city}</span>
            </div>

            {property.averageRating ? (
              <div className="flex items-center gap-1 font-bold text-foreground">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span>{property.averageRating.toFixed(1)}</span>
                <span className="text-[11px] text-foreground-muted font-normal">({property.reviewCount})</span>
              </div>
            ) : (
              <span className="text-[11px] text-foreground-muted">Fresh Listing</span>
            )}
          </div>

          {/* Property Name */}
          <h3 className="font-extrabold text-base text-foreground leading-snug line-clamp-1 group-hover:text-secondary transition-colors">
            <Link href={`/properties/${property.slug}`}>
              {property.name}
            </Link>
          </h3>

          {/* Amenities Strip */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {property.hasFood && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary bg-secondary-50 px-2 py-0.5 rounded">
                <UtensilsCrossed className="h-3 w-3" />
                Food Included
              </span>
            )}
            {property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-[11px] font-medium text-foreground-secondary bg-surface px-2 py-0.5 rounded"
              >
                {amenity}
              </span>
            ))}
          </div>

          {/* Pricing Box */}
          <div className="pt-3 border-t border-border flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-foreground">
                  {formatINR(property.monthlyRentMin)}
                </span>
                {property.monthlyRentMax > property.monthlyRentMin && (
                  <span className="text-xs text-foreground-muted font-normal">
                    – {formatINR(property.monthlyRentMax)}
                  </span>
                )}
                <span className="text-xs text-foreground-secondary font-medium">/ mo</span>
              </div>
              <p className="text-[11px] text-foreground-muted">
                Deposit: {formatINR(property.securityDeposit)} • No Brokerage
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" asChild className="w-full text-xs font-bold border-border">
          <Link href={`/properties/${property.slug}`}>
            View Details
          </Link>
        </Button>
        <Button
          size="sm"
          asChild
          className="w-full text-xs font-extrabold bg-secondary hover:bg-secondary-dark text-white shadow-xs"
        >
          <Link href={`/properties/${property.slug}#contact`}>
            Contact Owner
          </Link>
        </Button>
      </div>
    </div>
  );
}
