import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PropertyCard } from "@/components/property/property-card";
import { DEMO_PROPERTIES } from "@/data/demo-data";
import { Button } from "@/components/ui/button";

export function FeaturedListings() {
  return (
    <section className="section bg-[#FAF9F6] border-b border-[#E2E8F0]">
      <div className="container-app">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA580C] uppercase tracking-wider mb-2">
              <span>Verified Direct Listings</span>
            </div>
            <h2 className="section-heading text-[#0F172A] tracking-[-0.03em]">
              Featured &amp; recently added stays
            </h2>
            <p className="section-subheading text-[#475569]">
              Inspected properties with direct owner contact details and zero brokerage charges.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden sm:inline-flex text-xs font-bold border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#0F172A] shadow-xs"
          >
            <Link href="/properties">
              View All 100+ Stays
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_PROPERTIES.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button
            variant="outline"
            asChild
            className="w-full text-xs font-bold border-[#E2E8F0] bg-white text-[#0F172A]"
          >
            <Link href="/properties">
              View All Stays
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
