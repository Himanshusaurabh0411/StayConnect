import * as React from "react";
import Link from "next/link";
import {
  Building2,
  Hotel,
  Users,
  DoorOpen,
  Building,
  Home,
  Landmark,
  Key,
  ArrowRight,
} from "lucide-react";
import { ACCOMMODATION_CATEGORIES } from "@/data/demo-data";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Hotel,
  Users,
  DoorOpen,
  Building,
  Home,
  Landmark,
  Key,
};

export function CategoriesSection() {
  return (
    <section className="section bg-[#FAF9F6] border-b border-[#E2E8F0]">
      <div className="container-app">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA580C] uppercase tracking-wider mb-2">
              <span>EXPLORE LIVING FORMATS</span>
            </div>
            <h2 className="section-heading text-[#0F172A] tracking-[-0.03em]">Browse accommodation categories</h2>
            <p className="section-subheading text-[#475569]">
              Tailored living options for college students, relocating bachelors, professionals and families.
            </p>
          </div>
          <Link
            href="/properties"
            className="text-xs font-bold text-[#EA580C] hover:text-[#C2410C] flex items-center gap-1 transition-colors group"
          >
            <span>Explore all categories</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ACCOMMODATION_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Building2;
            return (
              <Link key={cat.key} href={`/properties?type=${cat.key}`} className="group">
                <div className="p-5 h-full rounded-2xl border border-[#E2E8F0] bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-md flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#EA580C] border border-orange-200/60 group-hover:bg-[#EA580C] group-hover:text-white transition-colors duration-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0F172A] tracking-[-0.02em] group-hover:text-[#EA580C] transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-bold text-[#EA580C]">
                    <span>View Stays</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
