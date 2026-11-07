import * as React from "react";
import { ShieldCheck, IndianRupee, MapPin, Users, HeartHandshake } from "lucide-react";

export function StatsBar() {
  const pillars = [
    {
      icon: IndianRupee,
      title: "Zero Brokerage",
      subtitle: "Direct contact with property owners",
    },
    {
      icon: ShieldCheck,
      title: "4-Level Verification",
      subtitle: "Phone, ID, Property docs & Ground check",
    },
    {
      icon: MapPin,
      title: "Pan-India Discovery",
      subtitle: "Covering cities, colleges & PIN codes",
    },
    {
      icon: HeartHandshake,
      title: "Verified Roommates",
      subtitle: "Lifestyle & habit compatibility scoring",
    },
  ];

  return (
    <div className="border-b border-stone-200/80 bg-white py-5">
      <div className="container-app">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3.5 p-2 rounded-xl">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-50 border border-secondary-100 text-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-medium line-clamp-1 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
