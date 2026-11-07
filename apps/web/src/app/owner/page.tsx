"use client";

import * as React from "react";
import Link from "next/link";
import {
  Building2,
  PlusCircle,
  Users,
  Eye,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  PauseCircle,
  PlayCircle,
  Settings,
  Bed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatINR } from "@/lib/utils";

export default function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<"properties" | "enquiries" | "visits" | "add">("properties");

  // Sample owner listings
  const [ownerProperties, setOwnerProperties] = React.useState([
    {
      id: "op1",
      name: "Sunrise PG for Boys (Koramangala Branch)",
      type: "PG",
      locality: "Koramangala 4th Block, Bangalore",
      monthlyRent: 8500,
      totalBeds: 24,
      vacantBeds: 3,
      isPaused: false,
      verificationLevel: 3,
      enquiriesCount: 14,
      visitsPending: 2,
    },
    {
      id: "op2",
      name: "Green Valley Girls Hostel",
      type: "Hostel",
      locality: "HSR Layout Sector 2, Bangalore",
      monthlyRent: 9500,
      totalBeds: 30,
      vacantBeds: 0,
      isPaused: false,
      verificationLevel: 4,
      enquiriesCount: 22,
      visitsPending: 0,
    },
  ]);

  const togglePause = (id: string) => {
    setOwnerProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isPaused: !p.isPaused } : p))
    );
  };

  return (
    <div className="bg-background-alt min-h-screen py-8">
      <div className="container-app space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary-dark">
                Owner Portal
              </span>
              <Badge variant="success" className="text-[10px] py-0">
                KYC Verified (Level 3)
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Property Management Dashboard
            </h1>
            <p className="text-xs text-foreground-secondary">
              Managing properties directly • 100% Free Owner Connect • No Commission
            </p>
          </div>

          <Button
            onClick={() => setActiveTab("add")}
            className="bg-primary hover:bg-primary-light text-white text-xs font-bold"
          >
            <PlusCircle className="mr-1.5 h-4 w-4 text-secondary-light" />
            Add New Property
          </Button>
        </div>

        {/* Dashboard Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 rounded-xl border border-border bg-white shadow-card">
            <span className="text-xs text-foreground-secondary block">Total Managed Stays</span>
            <div className="text-2xl font-extrabold text-primary mt-1">2</div>
            <span className="text-[11px] text-secondary-dark font-medium">Both Active</span>
          </Card>

          <Card className="p-4 rounded-xl border border-border bg-white shadow-card">
            <span className="text-xs text-foreground-secondary block">Bed Occupancy Rate</span>
            <div className="text-2xl font-extrabold text-primary mt-1">94%</div>
            <span className="text-[11px] text-foreground-muted">51 / 54 Beds Filled</span>
          </Card>

          <Card className="p-4 rounded-xl border border-border bg-white shadow-card">
            <span className="text-xs text-foreground-secondary block">Direct Tenant Enquiries</span>
            <div className="text-2xl font-extrabold text-primary mt-1">36</div>
            <span className="text-[11px] text-secondary-dark font-medium">Zero Brokerage Leads</span>
          </Card>

          <Card className="p-4 rounded-xl border border-border bg-white shadow-card">
            <span className="text-xs text-foreground-secondary block">Pending Physical Visits</span>
            <div className="text-2xl font-extrabold text-secondary mt-1">2</div>
            <span className="text-[11px] text-foreground-secondary">Scheduled This Weekend</span>
          </Card>
        </div>

        {/* Dashboard Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("properties")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "properties"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            My Properties (2)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "enquiries"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            Direct Enquiries (36)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("visits")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "visits"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            Visit Requests (2)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "add"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            + Create New Listing
          </button>
        </div>

        {/* Tab 1: Properties List */}
        {activeTab === "properties" && (
          <div className="space-y-4">
            {ownerProperties.map((prop) => (
              <Card key={prop.id} className="p-5 rounded-xl border border-border bg-white shadow-card space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="subtle" className="text-xs">{prop.type}</Badge>
                      <Badge variant="success" className="text-xs">Level {prop.verificationLevel} Verified</Badge>
                      {prop.isPaused && (
                        <Badge variant="error" className="text-xs">Paused</Badge>
                      )}
                    </div>
                    <h3 className="font-extrabold text-lg text-primary">{prop.name}</h3>
                    <p className="text-xs text-foreground-secondary">{prop.locality}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePause(prop.id)}
                      className="text-xs font-semibold"
                    >
                      {prop.isPaused ? (
                        <>
                          <PlayCircle className="mr-1.5 h-3.5 w-3.5 text-secondary" />
                          Resume Listing
                        </>
                      ) : (
                        <>
                          <PauseCircle className="mr-1.5 h-3.5 w-3.5 text-foreground-secondary" />
                          Pause Listing
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="default" className="text-xs font-semibold">
                      Edit Rooms &amp; Rent
                    </Button>
                  </div>
                </div>

                {/* Sub-status metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-border text-xs">
                  <div className="p-2.5 bg-surface rounded-lg">
                    <span className="text-foreground-muted block text-[10px] uppercase font-semibold">Base Rent</span>
                    <span className="font-bold text-foreground">{formatINR(prop.monthlyRent)}/mo</span>
                  </div>
                  <div className="p-2.5 bg-surface rounded-lg">
                    <span className="text-foreground-muted block text-[10px] uppercase font-semibold">Bed Availability</span>
                    <span className="font-bold text-secondary-dark">{prop.vacantBeds} Vacant / {prop.totalBeds} Total</span>
                  </div>
                  <div className="p-2.5 bg-surface rounded-lg">
                    <span className="text-foreground-muted block text-[10px] uppercase font-semibold">Tenant Enquiries</span>
                    <span className="font-bold text-foreground">{prop.enquiriesCount} Inquiries</span>
                  </div>
                  <div className="p-2.5 bg-surface rounded-lg">
                    <span className="text-foreground-muted block text-[10px] uppercase font-semibold">Scheduled Visits</span>
                    <span className="font-bold text-primary">{prop.visitsPending} Visits</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Tab 2: Enquiries */}
        {activeTab === "enquiries" && (
          <Card className="p-6 rounded-xl border border-border bg-white shadow-card space-y-4">
            <h3 className="font-bold text-base text-foreground">Recent Inquiries from Prospective Tenants</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-surface text-xs space-y-2 border border-border">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">Aman Verma (Software Engineer)</span>
                  <span className="text-foreground-muted text-[11px]">Today, 2:15 PM</span>
                </div>
                <p className="text-foreground-secondary">
                  &quot;Hello, I work in Embassy TechVillage. Is 2-sharing room available from 1st of next month? Does rent include Wi-Fi and 3 times food?&quot;
                </p>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="text-xs h-7 px-3 bg-primary text-white">Call +91 98123 45678</Button>
                  <Button size="sm" variant="outline" className="text-xs h-7 px-3">Reply via Chat</Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 3: Visit Requests */}
        {activeTab === "visits" && (
          <Card className="p-6 rounded-xl border border-border bg-white shadow-card space-y-4">
            <h3 className="font-bold text-base text-foreground">Pending Physical Visit Appointments</h3>
            <div className="p-4 rounded-lg bg-surface text-xs space-y-2 border border-border">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Priya Sharma (Student, Christ Univ)</span>
                <Badge variant="warning" className="text-[10px]">Awaiting Confirmation</Badge>
              </div>
              <p className="text-foreground-secondary">
                Requested Date: <strong>Saturday, 11:30 AM</strong> for Double Sharing Room.
              </p>
              <div className="flex gap-2 pt-1">
                <Button size="sm" className="text-xs h-7 px-3 bg-secondary text-white">Confirm Visit Slot</Button>
                <Button size="sm" variant="outline" className="text-xs h-7 px-3">Reschedule</Button>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 4: Add New Property Form Shell */}
        {activeTab === "add" && (
          <Card className="p-6 rounded-xl border border-border bg-white shadow-card space-y-6">
            <div>
              <h2 className="text-lg font-bold text-primary">Publish New Accommodation Listing</h2>
              <p className="text-xs text-foreground-secondary">
                Fill in property details accurately. Direct phone contact will be visible for verified tenants without brokerage.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Listing draft saved successfully! Admin verification initiated.");
                setActiveTab("properties");
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Property Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Royal Comfort PG for Boys"
                    className="w-full h-10 px-3 rounded-md border border-border bg-background"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Accommodation Type</label>
                  <select className="w-full h-10 px-3 rounded-md border border-border bg-background">
                    <option value="pg">PG (Paying Guest)</option>
                    <option value="hostel">Hostel</option>
                    <option value="flat">Flat / Apartment</option>
                    <option value="coliving">Co-living Space</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">City</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Bangalore"
                    className="w-full h-10 px-3 rounded-md border border-border bg-background"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Locality / Landmark</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Koramangala 5th Block, Near Sony Signal"
                    className="w-full h-10 px-3 rounded-md border border-border bg-background"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Monthly Rent (₹/bed or flat)</label>
                  <input
                    required
                    type="number"
                    placeholder="7500"
                    className="w-full h-10 px-3 rounded-md border border-border bg-background"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Security Deposit (₹)</label>
                  <input
                    required
                    type="number"
                    placeholder="15000"
                    className="w-full h-10 px-3 rounded-md border border-border bg-background"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Description &amp; House Rules</label>
                <textarea
                  rows={3}
                  placeholder="Describe your accommodation, food menu, gate timings, and cleanliness standards..."
                  className="w-full p-3 rounded-md border border-border bg-background"
                />
              </div>

              <div className="p-4 bg-secondary-50 rounded-xl text-secondary-dark flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 shrink-0 text-secondary" />
                <span>
                  <strong>Zero Brokerage Commitment:</strong> By publishing, you confirm you are the verified owner or direct property manager and agree not to charge any brokerage fees to tenants.
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="bg-primary hover:bg-primary-light text-white font-bold">
                  Submit Listing for Free
                </Button>
                <Button type="button" variant="outline" onClick={() => setActiveTab("properties")}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
