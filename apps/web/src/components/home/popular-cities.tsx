import * as React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Building } from "lucide-react";
import { DEMO_CITIES } from "@/data/demo-data";

export function PopularCities() {
  return (
    <section className="section bg-white border-b border-border">
      <div className="container-app">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary uppercase tracking-wider mb-2">
            <MapPin className="h-3.5 w-3.5 text-secondary" />
            <span>Pan-India Presence</span>
          </div>
          <h2 className="section-heading">Find stays in top Indian cities</h2>
          <p className="section-subheading">
            Hyperlocal accommodations across key education centers, employment corridors, and transit networks.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {DEMO_CITIES.map((city) => (
            <Link
              key={city.id}
              href={`/properties?city=${city.slug}`}
              className="group rounded-2xl border border-stone-200/90 bg-[#FAFAF8] p-4 text-center transition-all duration-200 hover:border-secondary/50 hover:bg-white hover:shadow-md"
            >
              <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-50 text-secondary border border-secondary-100 group-hover:bg-secondary group-hover:text-white transition-all duration-200">
                <Building className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm text-foreground group-hover:text-secondary transition-colors">
                {city.name}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium mt-0.5 truncate">
                {city.state}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-foreground-secondary">
          <span>Looking for accommodation in other Indian districts or towns? </span>
          <Link href="/properties" className="font-bold text-secondary hover:underline">
            Search by PIN code or locality →
          </Link>
        </div>
      </div>
    </section>
  );
}
