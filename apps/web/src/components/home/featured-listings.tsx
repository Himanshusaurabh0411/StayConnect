import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { PropertyCard } from "@/components/property/property-card";
import { DEMO_PROPERTIES } from "@/data/demo-data";
import { Button } from "@/components/ui/button";

export function FeaturedListings() {
  return (
    <section className="section bg-background-alt border-b border-border">
      <div className="container-app">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-dark uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              <span>Verified Direct Listings</span>
            </div>
            <h2 className="section-heading">Featured &amp; recently added stays</h2>
            <p className="section-subheading">
              Inspected properties with direct owner contact details and zero brokerage charges.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex text-xs font-semibold">
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

        {/* Demo Data Notice */}
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white/60 p-3 text-center text-xs text-foreground-muted">
          <span>
            ✦ <strong>Development Notice:</strong> Displaying initial seed listings for UI demonstration. Live production listings will populate as owners onboard.
          </span>
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild className="w-full text-xs">
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
