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
import { Card } from "@/components/ui/card";
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
    <section className="section bg-white border-b border-border">
      <div className="container-app">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              <span>EXPLORE LIVING FORMATS</span>
            </div>
            <h2 className="section-heading">Browse accommodation categories</h2>
            <p className="section-subheading">
              Tailored living options for college students, relocating bachelors, professionals and families.
            </p>
          </div>
          <Link
            href="/properties"
            className="text-xs font-bold text-secondary hover:text-secondary-dark flex items-center gap-1 transition-colors group"
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
                <Card className="p-5 h-full rounded-2xl border border-stone-200/80 bg-white transition-all duration-200 hover:border-secondary/40 hover:shadow-lg hover:shadow-stone-200/50 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-50 text-secondary border border-secondary-100 group-hover:bg-secondary group-hover:text-white transition-colors duration-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-foreground group-hover:text-secondary transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-foreground-secondary mt-1.5 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-secondary">
                    <span>View Stays</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
