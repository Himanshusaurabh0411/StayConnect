import * as React from "react";
import Link from "next/link";
import { Building2, Shield, Heart, MapPin, PhoneCall, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-[#121826] text-white">
      <div className="container-app py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white font-black text-sm tracking-tighter shadow-md">
                SC
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  Stay<span className="text-secondary">Connect</span>
                </span>
                <span className="text-[10px] font-semibold text-stone-400 tracking-wider uppercase mt-1">
                  Zero Mandatory Brokerage
                </span>
              </div>
            </Link>
            <p className="text-sm text-stone-300 max-w-sm leading-relaxed">
              India&apos;s nationwide accommodation &amp; roommate discovery platform.
              Connecting verified property owners directly with students and professionals without middlemen or brokerage.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-stone-300">
              <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 border border-white/5">
                <Shield className="h-3.5 w-3.5 text-secondary" />
                <span>Zero Brokerage Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 border border-white/5">
                <MapPin className="h-3.5 w-3.5 text-secondary" />
                <span>Pan-India Coverage</span>
              </div>
            </div>
          </div>

          {/* Stays in Top Cities */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
              Top Cities
            </h3>
            <ul className="space-y-2 text-sm text-stone-300">
              <li><Link href="/properties?city=bangalore" className="hover:text-white transition-colors">Bangalore Stays</Link></li>
              <li><Link href="/properties?city=mumbai" className="hover:text-white transition-colors">Mumbai Stays</Link></li>
              <li><Link href="/properties?city=delhi" className="hover:text-white transition-colors">Delhi NCR Stays</Link></li>
              <li><Link href="/properties?city=pune" className="hover:text-white transition-colors">Pune Stays</Link></li>
              <li><Link href="/properties?city=hyderabad" className="hover:text-white transition-colors">Hyderabad Stays</Link></li>
              <li><Link href="/properties?city=chennai" className="hover:text-white transition-colors">Chennai Stays</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
              Accommodations
            </h3>
            <ul className="space-y-2 text-sm text-stone-300">
              <li><Link href="/properties?type=pg" className="hover:text-white transition-colors">Boys &amp; Girls PGs</Link></li>
              <li><Link href="/properties?type=hostel" className="hover:text-white transition-colors">Student Hostels</Link></li>
              <li><Link href="/properties?type=flat" className="hover:text-white transition-colors">1BHK &amp; 2BHK Flats</Link></li>
              <li><Link href="/properties?type=coliving" className="hover:text-white transition-colors">Co-living Spaces</Link></li>
              <li><Link href="/roommates" className="hover:text-white transition-colors">Find a Roommate</Link></li>
              <li><Link href="/owner" className="hover:text-white transition-colors">Property Owner Portal</Link></li>
            </ul>
          </div>

          {/* Trust & Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
              Trust &amp; Support
            </h3>
            <ul className="space-y-2 text-sm text-stone-300">
              <li><Link href="/safety" className="hover:text-white transition-colors">Verification Process</Link></li>
              <li><Link href="/pricing-transparency" className="hover:text-white transition-colors">True Cost Calculator</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li className="pt-2 flex items-center gap-2 text-xs text-stone-400">
                <Mail className="h-3.5 w-3.5 text-secondary" />
                <span>support@stayconnect.in</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 StayConnect Technologies India Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-stone-300">
            <span>Built for India with</span>
            <Heart className="h-3.5 w-3.5 text-secondary fill-secondary" />
            <span>for Students &amp; Renters</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
