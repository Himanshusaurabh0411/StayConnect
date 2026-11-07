"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  FileText,
  AlertTriangle,
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  TrendingUp,
  Search,
  Filter,
  Check,
  X,
  FileCheck,
  UserCheck,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatINR, formatIndianNumber } from "@/lib/utils";

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = React.useState<"verifications" | "reports" | "reviews" | "audit">("verifications");

  // Verification review queue
  const [verificationQueue, setVerificationQueue] = React.useState([
    {
      id: "ver_1",
      propertyId: "p1",
      propertyName: "Sunrise PG for Boys (Koramangala 4th Block)",
      ownerName: "Ramesh Sundaram (+91 98450 12345)",
      levelRequested: 3,
      levelLabel: "Level 3: Property Documents",
      documentType: "BESCOM Electricity Bill & Municipal Property Tax Receipt (2025-26)",
      submittedTime: "Today, 9:30 AM",
      status: "pending",
      docSnippet: "BESCOM Consumer ID: 04918237 | Billing Address matches Koramangala 4th Block parcel.",
    },
    {
      id: "ver_2",
      propertyId: "p2",
      propertyName: "Green Valley Ladies Hostel (Andheri West)",
      ownerName: "Sunita Mehra (+91 98200 67890)",
      levelRequested: 4,
      levelLabel: "Level 4: Physical Ground Inspection",
      documentType: "Field Executive Ground Audit Form & Geotagged Kitchen Photos",
      submittedTime: "Today, 11:15 AM",
      status: "pending",
      docSnippet: "Field auditor confirmed 40 functional beds, clean mess hygiene, operational CCTV.",
    },
    {
      id: "ver_3",
      propertyId: "p3",
      propertyName: "Metro Heights 2BHK Flat (Hauz Khas)",
      ownerName: "Vikram Malhotra (+91 98110 54321)",
      levelRequested: 2,
      levelLabel: "Level 2: Owner Identity Check",
      documentType: "Government Aadhaar (Masked UID) & Registered Sale Deed",
      submittedTime: "Today, 2:45 PM",
      status: "pending",
      docSnippet: "Aadhaar verified via DigiLocker token. Name matches electricity meter connection.",
    },
  ]);

  // Fraud & safety reports queue
  const [reportsQueue, setReportsQueue] = React.useState([
    {
      id: "rep_1",
      targetType: "Property Listing",
      targetTitle: "Cozy PG Indiranagar (Unverified Listing)",
      reporterName: "Rahul Verma (Student, Christ Univ)",
      category: "Fraud / Viewing Fee",
      description: "Owner demanded ₹2000 advance viewing deposit before sharing the physical gate location.",
      status: "pending",
      time: "2 hours ago",
    },
    {
      id: "rep_2",
      targetType: "Roommate Profile",
      targetTitle: "Profile: Aman_K24",
      reporterName: "Divya N. (UX Designer)",
      category: "Unsolicited Spam",
      description: "Sending commercial broker links inside roommate connection chat messages.",
      status: "pending",
      time: "4 hours ago",
    },
  ]);

  const handleVerificationDecision = (id: string, action: "approved" | "rejected") => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action } : item)),
    );
  };

  const handleResolveReport = (id: string) => {
    setReportsQueue((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="bg-background-alt min-h-screen py-8">
      <div className="container-app space-y-6">
        {/* Admin Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Internal Trust &amp; Safety Control
              </span>
              <Badge variant="default" className="text-[10px] py-0 bg-primary">
                Platform Administrator
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              StayConnect Administration Center
            </h1>
            <p className="text-xs text-foreground-secondary">
              Reviewing multi-tier property verifications, KYC identity documents, resident reviews, and fraud alerts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-semibold text-secondary-dark">Live Moderation Active</span>
          </div>
        </div>

        {/* Platform Health Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 rounded-xl border border-border bg-white shadow-card">
            <span className="text-xs text-foreground-secondary block">Total Accommodations</span>
            <div className="text-2xl font-extrabold text-primary mt-1">128</div>
            <span className="text-[11px] text-secondary-dark font-medium">114 Verified (89%)</span>
          </Card>

          <Card className="p-4 rounded-xl border border-border bg-white shadow-card">
            <span className="text-xs text-foreground-secondary block">Pending KYC Audits</span>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">
              {verificationQueue.filter((v) => v.status === "pending").length}
            </div>
            <span className="text-[11px] text-foreground-muted">Level 2, 3 &amp; 4 Submissions</span>
          </Card>

          <Card className="p-4 rounded-xl border border-border bg-white shadow-card">
            <span className="text-xs text-foreground-secondary block">Tenant Savings Generated</span>
            <div className="text-2xl font-extrabold text-secondary mt-1">
              ₹42.8 L
            </div>
            <span className="text-[11px] text-foreground-secondary">In Saved Brokerage</span>
          </Card>

          <Card className="p-4 rounded-xl border border-border bg-white shadow-card">
            <span className="text-xs text-foreground-secondary block">Fraud Alerts Queue</span>
            <div className="text-2xl font-extrabold text-error mt-1">
              {reportsQueue.length}
            </div>
            <span className="text-[11px] text-foreground-muted">Immediate Action Needed</span>
          </Card>
        </div>

        {/* 4-Tier Verification Hierarchy Info Banner */}
        <div className="rounded-xl border border-secondary/20 bg-secondary-50/60 p-4 text-xs text-secondary-dark">
          <div className="flex items-center gap-2 font-bold mb-1">
            <ShieldCheck className="h-4 w-4 text-secondary" />
            <span>StayConnect 4-Tier Verification Standard:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px] mt-2">
            <div className="bg-white/80 p-2 rounded border border-secondary/20">
              <strong>Level 1 (Phone):</strong> Automatic OTP confirmation on registered SIM.
            </div>
            <div className="bg-white/80 p-2 rounded border border-secondary/20">
              <strong>Level 2 (Identity):</strong> Government Aadhaar/PAN authenticated via DigiLocker.
            </div>
            <div className="bg-white/80 p-2 rounded border border-secondary/20">
              <strong>Level 3 (Property Docs):</strong> Electricity bills &amp; property tax matches owner name.
            </div>
            <div className="bg-white/80 p-2 rounded border border-secondary/20">
              <strong>Level 4 (Physical Audit):</strong> Field executive in-person hygiene &amp; bed inspection.
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-2 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("verifications")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "verifications"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            <FileCheck className="h-4 w-4 text-secondary" />
            <span>Document Verification Queue ({verificationQueue.filter((v) => v.status === "pending").length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "reports"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            <AlertTriangle className="h-4 w-4 text-error" />
            <span>Fraud &amp; User Complaints ({reportsQueue.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "reviews"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            <Star className="h-4 w-4 text-amber-500" />
            <span>Resident Review Moderation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "audit"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            <Clock className="h-4 w-4 text-foreground-secondary" />
            <span>System Audit Logs</span>
          </button>
        </div>

        {/* Tab 1: Verification Queue */}
        {activeTab === "verifications" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
              Pending Document Audits
            </h3>

            {verificationQueue.map((item) => {
              const isPending = item.status === "pending";

              return (
                <Card key={item.id} className="p-5 rounded-xl border border-border bg-white shadow-card space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={
                            item.levelRequested === 4
                              ? "success"
                              : item.levelRequested === 3
                              ? "info"
                              : "subtle"
                          }
                          className="text-[11px]"
                        >
                          {item.levelLabel}
                        </Badge>
                        <span className="text-[11px] text-foreground-muted">{item.submittedTime}</span>
                        {item.status === "approved" && (
                          <Badge variant="success" className="text-[10px]">
                            Approved
                          </Badge>
                        )}
                        {item.status === "rejected" && (
                          <Badge variant="error" className="text-[10px]">
                            Rejected
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-extrabold text-base text-foreground">{item.propertyName}</h4>
                      <p className="text-xs text-foreground-secondary">Owner: {item.ownerName}</p>
                    </div>

                    {isPending && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleVerificationDecision(item.id, "approved")}
                          className="bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold"
                        >
                          <Check className="mr-1.5 h-3.5 w-3.5" />
                          Approve Level {item.levelRequested}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerificationDecision(item.id, "rejected")}
                          className="text-xs font-semibold text-error hover:bg-error-light"
                        >
                          <X className="mr-1.5 h-3.5 w-3.5" />
                          Reject Document
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Document Content Box */}
                  <div className="p-3.5 bg-surface rounded-xl border border-border text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary flex items-center gap-1.5">
                        <FileText className="h-4 w-4" />
                        {item.documentType}
                      </span>
                      <span className="text-[11px] text-secondary-dark font-medium underline cursor-pointer">
                        View Encrypted Document Preview (S3 Presigned URL)
                      </span>
                    </div>
                    <p className="text-foreground-secondary text-[11px] italic">
                      Audit Notes: {item.docSnippet}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Tab 2: Fraud & Complaints Queue */}
        {activeTab === "reports" && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
              Community Fraud &amp; Safety Tickets
            </h3>

            {reportsQueue.map((rep) => (
              <Card key={rep.id} className="p-5 rounded-xl border border-error/30 bg-white shadow-card space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="error" className="text-[10px]">
                        {rep.category}
                      </Badge>
                      <span className="text-[11px] text-foreground-muted">{rep.time}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-foreground">{rep.targetTitle}</h4>
                    <p className="text-xs text-foreground-secondary">
                      Reported by: <strong>{rep.reporterName}</strong>
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleResolveReport(rep.id)}
                    className="bg-primary hover:bg-primary-light text-white text-xs"
                  >
                    Take Down &amp; Resolve
                  </Button>
                </div>

                <div className="p-3 bg-red-50/60 rounded-lg text-xs text-error leading-relaxed border border-red-100">
                  &ldquo;{rep.description}&rdquo;
                </div>
              </Card>
            ))}

            {reportsQueue.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-dashed border-border text-xs text-foreground-secondary">
                All fraud tickets resolved. Zero active complaints.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Review Moderation */}
        {activeTab === "reviews" && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
              Resident Reviews with Multi-Category Sub-ratings
            </h3>

            <Card className="p-5 rounded-xl border border-border bg-white shadow-card space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="success" className="text-[10px]">
                      Verified Resident (8 months)
                    </Badge>
                    <span className="text-xs font-bold text-foreground">Karthik Rao</span>
                  </div>
                  <h4 className="font-bold text-sm text-primary">Sunrise PG for Boys (Koramangala)</h4>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-xs">5.0</span>
                </div>
              </div>

              {/* Sub-ratings grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-surface p-2.5 rounded-lg">
                <div>Cleanliness: <strong>5/5</strong></div>
                <div>Food Quality: <strong>4/5</strong></div>
                <div>Owner Behavior: <strong>5/5</strong></div>
                <div>Water Supply: <strong>5/5</strong></div>
                <div>Electricity: <strong>5/5</strong></div>
                <div>Security: <strong>4/5</strong></div>
                <div>Maintenance: <strong>5/5</strong></div>
                <div>Gate Freedom: <strong>5/5</strong></div>
              </div>

              <p className="text-xs text-foreground-secondary italic">
                &quot;Lived here for 8 months. High speed Wi-Fi never went down during placement interviews. Food is hygienic.&quot;
              </p>

              <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                <span className="text-secondary-dark font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                  Approved &amp; Live on Property Page
                </span>
                <button
                  type="button"
                  onClick={() => alert("Review flagged for re-inspection")}
                  className="text-[11px] text-foreground-muted hover:text-error"
                >
                  Flag for Re-audit
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 4: System Audit Logs */}
        {activeTab === "audit" && (
          <Card className="p-5 rounded-xl border border-border bg-white shadow-card space-y-3 max-w-3xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
              Immutable Administrator Audit Trail
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-surface rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">PROPERTY_VERIFIED_LEVEL_3</span>
                  <p className="text-[11px] text-foreground-secondary">
                    Admin approved BESCOM electricity bill for Sunrise PG (p1)
                  </p>
                </div>
                <span className="text-[10px] text-foreground-muted">10 mins ago</span>
              </div>

              <div className="p-3 bg-surface rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">FRAUD_LISTING_TAKEN_DOWN</span>
                  <p className="text-[11px] text-foreground-secondary">
                    Deactivated unverified listing demanding viewing deposits (p_unverified_9)
                  </p>
                </div>
                <span className="text-[10px] text-foreground-muted">2 hours ago</span>
              </div>

              <div className="p-3 bg-surface rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">ROOMMATE_REPORT_RESOLVED</span>
                  <p className="text-[11px] text-foreground-secondary">
                    Issued warning to user profile for spam promotion links
                  </p>
                </div>
                <span className="text-[10px] text-foreground-muted">3 hours ago</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="container-app py-12 text-center text-xs">Loading Admin Panel...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
