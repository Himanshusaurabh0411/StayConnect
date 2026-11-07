"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  ShieldCheck,
  Star,
  Phone,
  MessageSquare,
  Calendar,
  UtensilsCrossed,
  Check,
  X,
  Share2,
  Heart,
  Video,
  Clock,
  Building,
  User,
  Info,
} from "lucide-react";
import { DEMO_PROPERTIES } from "@/data/demo-data";
import { TrueCostCalculator } from "@/components/property/cost-calculator";
import { ResidentReviewForm } from "@/components/property/review-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatINR, PROPERTY_TYPE_LABELS, GENDER_LABELS } from "@/lib/utils";

function PropertyDetailContent() {
  const params = useParams();
  const slug = params?.id as string;

  // Find demo property or fallback to first
  const property =
    DEMO_PROPERTIES.find((p) => p.slug === slug || p.id === slug) ||
    DEMO_PROPERTIES[0];

  const [contactModalOpen, setContactModalOpen] = React.useState(false);
  const [enquirySent, setEnquirySent] = React.useState(false);
  const [visitBooked, setVisitBooked] = React.useState(false);

  return (
    <div className="bg-background-alt min-h-screen py-8">
      <div className="container-app space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-foreground-secondary">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-primary">Stays</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs">{property.name}</span>
        </nav>

        {/* Title & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-border">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="success" className="flex items-center gap-1 text-xs">
                <ShieldCheck className="h-3.5 w-3.5" />
                Level {property.verificationLevel} Verified
              </Badge>
              <Badge variant="subtle" className="text-xs">
                {PROPERTY_TYPE_LABELS[property.type]}
              </Badge>
              <Badge variant="subtle" className="text-xs">
                {GENDER_LABELS[property.genderPreference]}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              {property.name}
            </h1>
            <div className="flex items-center gap-2 text-xs text-foreground-secondary mt-1">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{property.locality}, {property.city} • PIN 560034</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="text-xs">
              <Share2 className="mr-1.5 h-3.5 w-3.5" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Heart className="mr-1.5 h-3.5 w-3.5" />
              Save
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary-light text-white text-xs font-semibold"
              onClick={() => setContactModalOpen(true)}
            >
              <Phone className="mr-1.5 h-3.5 w-3.5 text-secondary" />
              Contact Owner
            </Button>
          </div>
        </div>

        {/* Media Walkthrough Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl overflow-hidden border border-border">
          <div className="md:col-span-2 relative aspect-[16/10] bg-slate-200 flex items-center justify-center">
            <div className="text-center p-6 space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-primary shadow">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm text-foreground">Verified Room Photographs</h3>
              <p className="text-xs text-foreground-secondary">
                High-resolution photos captured during ground verification.
              </p>
            </div>
            <div className="absolute top-4 left-4">
              <span className="bg-black/70 text-white text-[11px] px-2.5 py-1 rounded font-medium backdrop-blur-sm">
                Primary Room View
              </span>
            </div>
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div className="h-1/2 bg-slate-100 rounded-xl p-4 flex flex-col justify-center items-center text-center border border-border">
              <Video className="h-6 w-6 text-primary mb-1" />
              <span className="text-xs font-semibold text-foreground">360° Walkthrough Video</span>
              <span className="text-[10px] text-foreground-secondary">Available upon request</span>
            </div>
            <div className="h-1/2 bg-secondary-50 rounded-xl p-4 flex flex-col justify-center items-center text-center border border-secondary/20">
              <ShieldCheck className="h-6 w-6 text-secondary mb-1" />
              <span className="text-xs font-bold text-secondary-dark">Ownership Documents Audited</span>
              <span className="text-[10px] text-secondary-dark/80">Electricity bill &amp; tax receipt checked</span>
            </div>
          </div>
        </div>

        {/* 2-Column Content Layout: Details vs Calculator & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Rooms & Availability */}
            <Card className="p-6 rounded-xl border border-border bg-white space-y-4">
              <h2 className="text-base font-bold text-primary">Room Configuration &amp; Availability</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-surface rounded-lg">
                  <span className="text-xs text-foreground-secondary block">Room Type</span>
                  <span className="font-bold text-sm text-foreground">Double Sharing</span>
                </div>
                <div className="p-3 bg-surface rounded-lg">
                  <span className="text-xs text-foreground-secondary block">Total Beds</span>
                  <span className="font-bold text-sm text-foreground">{property.totalBeds} Beds</span>
                </div>
                <div className="p-3 bg-surface rounded-lg">
                  <span className="text-xs text-foreground-secondary block">Vacant Now</span>
                  <span className="font-bold text-sm text-secondary-dark">{property.availableBeds} Vacant</span>
                </div>
                <div className="p-3 bg-surface rounded-lg">
                  <span className="text-xs text-foreground-secondary block">Move-in From</span>
                  <span className="font-bold text-sm text-foreground">Immediate</span>
                </div>
              </div>
            </Card>

            {/* Food Transparency Module (Core Feature) */}
            <Card className="p-6 rounded-xl border border-secondary/30 bg-white space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-100 text-secondary-dark">
                    <UtensilsCrossed className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-primary">Food &amp; Mess Transparency Module</h2>
                    <p className="text-xs text-foreground-secondary">
                      Clean kitchen inspection completed • Vegetarian &amp; Non-veg provisions
                    </p>
                  </div>
                </div>
                <Badge variant="success" className="text-xs">
                  Food Included in Rent
                </Badge>
              </div>

              {/* Mess Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-surface rounded-lg space-y-1">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> Breakfast
                  </span>
                  <p className="text-foreground-secondary">7:30 AM – 10:00 AM</p>
                  <p className="text-[11px] text-foreground-muted">Poha, Idli-Sambar, Paratha, Tea/Coffee</p>
                </div>

                <div className="p-3 bg-surface rounded-lg space-y-1">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> Lunch (Packed Box)
                  </span>
                  <p className="text-foreground-secondary">12:30 PM – 2:30 PM</p>
                  <p className="text-[11px] text-foreground-muted">Dal, Roti, Rice, Seasonal Sabzi, Curd</p>
                </div>

                <div className="p-3 bg-surface rounded-lg space-y-1">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> Dinner
                  </span>
                  <p className="text-foreground-secondary">7:45 PM – 10:15 PM</p>
                  <p className="text-[11px] text-foreground-muted">Full hot meal • Special dinner on Sundays</p>
                </div>
              </div>
            </Card>

            {/* Amenities Included */}
            <Card className="p-6 rounded-xl border border-border bg-white space-y-4">
              <h2 className="text-base font-bold text-primary">Facilities &amp; Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {property.amenities.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-foreground font-medium p-2 bg-surface rounded-lg">
                    <Check className="h-4 w-4 text-secondary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-foreground font-medium p-2 bg-surface rounded-lg">
                  <Check className="h-4 w-4 text-secondary shrink-0" />
                  <span>Geyser / Hot Water</span>
                </div>
                <div className="flex items-center gap-2 text-foreground font-medium p-2 bg-surface rounded-lg">
                  <Check className="h-4 w-4 text-secondary shrink-0" />
                  <span>24/7 RO Purified Water</span>
                </div>
              </div>
            </Card>

            {/* House Rules */}
            <Card className="p-6 rounded-xl border border-border bg-white space-y-4">
              <h2 className="text-base font-bold text-primary">House Rules &amp; Gate Timings</h2>
              <ul className="space-y-2 text-xs text-foreground-secondary">
                <li className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>Gate closing timing: 11:00 PM (Late entries permitted with digital register notice)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-secondary" />
                  <span>Guests &amp; family visits allowed in common lounge during daytime</span>
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-3.5 w-3.5 text-error" />
                  <span>Smoking and alcohol prohibited inside sleeping quarters</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-secondary" />
                  <span>30-day notice period required before vacation for full security deposit refund</span>
                </li>
              </ul>
            </Card>

            {/* Resident Reviews */}
            <Card className="p-6 rounded-xl border border-border bg-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-primary">Verified Resident Reviews</h2>
                  <p className="text-xs text-foreground-secondary">
                    Authentic feedback from students and professionals who lived here.
                  </p>
                </div>
                {property.averageRating && (
                  <div className="flex items-center gap-1.5 bg-primary-50 px-2.5 py-1 rounded-lg">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-sm text-foreground">{property.averageRating.toFixed(1)}</span>
                    <span className="text-xs text-foreground-muted">/ 5.0</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <ResidentReviewForm propertyId={property.id} propertyName={property.name} />

                <div className="p-4 rounded-lg bg-surface text-xs space-y-2 border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">Vikram K.</span>
                      <Badge variant="success" className="text-[10px] py-0">
                        Verified Resident (6 months)
                      </Badge>
                    </div>
                    <span className="text-foreground-muted text-[11px]">2 weeks ago</span>
                  </div>
                  <p className="text-foreground-secondary leading-relaxed">
                    &quot;Owner is very responsive. The Wi-Fi speed is good for remote work (around 80 Mbps). Food is genuinely better than most typical PGs in this area. Cleaned every morning.&quot;
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: True Cost Calculator & Contact Widget (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* The True Cost Calculator Component */}
            <TrueCostCalculator
              baseRent={property.monthlyRentMin}
              electricityEstimate={600}
              foodOptionMonthly={property.hasFood ? 2200 : 0}
              maintenanceFee={300}
              securityDeposit={property.securityDeposit}
              isDepositRefundable={true}
            />

            {/* Direct Owner Contact Card */}
            <Card id="contact" className="p-5 rounded-xl border border-border bg-white shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">Property Owner</h3>
                  <div className="flex items-center gap-1 text-[11px] text-secondary-dark font-medium">
                    <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                    <span>KYC &amp; Phone Verified</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-50 p-3 rounded-lg text-xs text-secondary-dark flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                <span>
                  <strong>Zero Brokerage:</strong> You are contacting the verified owner directly. Never pay cash for booking without visiting.
                </span>
              </div>

              {contactModalOpen ? (
                <div className="p-3 bg-surface rounded-lg space-y-2 text-xs border border-border animate-in fade-in">
                  <div className="font-semibold text-foreground">Owner Contact Number:</div>
                  <div className="text-base font-extrabold text-primary flex items-center gap-2">
                    <Phone className="h-4 w-4 text-secondary" />
                    <span>+91 98765 43210</span>
                  </div>
                  <p className="text-[11px] text-foreground-secondary">
                    Call between 9:00 AM – 8:00 PM. Please mention you found this on StayConnect.
                  </p>
                </div>
              ) : (
                <Button
                  onClick={() => setContactModalOpen(true)}
                  className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs"
                >
                  <Phone className="mr-2 h-4 w-4 text-secondary" />
                  View Owner Phone Number (Free)
                </Button>
              )}

              {/* Schedule Visit Button */}
              {visitBooked ? (
                <div className="p-3 bg-success-light rounded-lg text-xs text-secondary-dark font-medium text-center">
                  Visit request scheduled! Owner will confirm shortly.
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setVisitBooked(true)}
                  className="w-full text-xs font-semibold"
                >
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  Request Free Property Visit
                </Button>
              )}

              {/* Send Enquiry */}
              {enquirySent ? (
                <div className="p-2 text-center text-xs text-secondary-dark font-medium">
                  Enquiry sent directly to owner!
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t border-border">
                  <textarea
                    rows={2}
                    placeholder="Ask about sharing options, food, or deposit..."
                    className="w-full text-xs p-2 rounded-md border border-border focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEnquirySent(true)}
                    className="w-full text-xs font-medium border border-border"
                  >
                    <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                    Send Quick Message
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetailPage() {
  return (
    <Suspense fallback={<div className="container-app py-12 text-center text-xs">Loading property details...</div>}>
      <PropertyDetailContent />
    </Suspense>
  );
}
