import * as React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { StatsBar } from "@/components/home/stats-bar";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedListings } from "@/components/home/featured-listings";
import { RoommateCta } from "@/components/home/roommate-cta";
import { PopularCities } from "@/components/home/popular-cities";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsBar />
      <CategoriesSection />
      <FeaturedListings />
      <RoommateCta />
      <PopularCities />
    </div>
  );
}
