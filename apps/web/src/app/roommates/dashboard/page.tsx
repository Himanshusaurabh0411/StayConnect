"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Clock,
  MessageSquare,
  Phone,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Send,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatINR } from "@/lib/utils";

function RoommateDashboardContent() {
  const [activeTab, setActiveTab] = React.useState<"connected" | "incoming" | "sent" | "profile">("connected");

  // State for incoming requests
  const [incomingRequests, setIncomingRequests] = React.useState([
    {
      id: "req_demo_1",
      senderId: "u4",
      displayName: "Sneha R.",
      occupation: "UI/UX Designer",
      city: "Bangalore",
      localities: ["Indiranagar", "Domlur"],
      budgetMax: 16000,
      diet: "Vegetarian",
      message: "Hi! Saw that you are looking for a flatmate in Bangalore. My office is in Domlur, would love to connect!",
      phone: "+91 97400 88990",
      status: "pending",
    },
  ]);

  // State for mutual connections with unlocked phone numbers
  const [connections, setConnections] = React.useState([
    {
      id: "conn_1",
      userId: "u1",
      displayName: "Arjun M.",
      occupation: "Software Engineer",
      city: "Bangalore",
      localities: ["Koramangala", "HSR Layout"],
      phone: "+91 98450 12345",
      isPhoneUnlocked: true,
      lastMessage: "Hey! Let us catch up at Starbucks Koramangala this Saturday?",
      connectedDate: "Yesterday",
    },
  ]);

  // Active chat session
  const [activeChatUser, setActiveChatUser] = React.useState<any | null>(null);
  const [chatMessages, setChatMessages] = React.useState<Array<{ sender: "me" | "them"; text: string; time: string }>>([
    { sender: "them", text: "Hey! Saw your profile. Are you still looking to rent a 2BHK?", time: "Yesterday, 6:00 PM" },
    { sender: "me", text: "Yes! Budget is around ₹10-12k per person. Koramangala or HSR works best.", time: "Yesterday, 6:15 PM" },
    { sender: "them", text: "Perfect. Let us meet tomorrow at Starbucks Koramangala to discuss flat options.", time: "Today, 10:30 AM" },
  ]);
  const [inputMsg, setInputMsg] = React.useState("");

  const handleAccept = (reqId: string) => {
    const target = incomingRequests.find((r) => r.id === reqId);
    if (target) {
      setConnections((prev) => [
        ...prev,
        {
          id: `conn_${Date.now()}`,
          userId: target.senderId,
          displayName: target.displayName,
          occupation: target.occupation,
          city: target.city,
          localities: target.localities,
          phone: target.phone,
          isPhoneUnlocked: true,
          lastMessage: "Mutual connection accepted. Say hi!",
          connectedDate: "Just now",
        },
      ]);
      setIncomingRequests((prev) => prev.filter((r) => r.id !== reqId));
    }
  };

  const handleDecline = (reqId: string) => {
    setIncomingRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: "me", text: inputMsg, time: "Just now" },
    ]);
    setInputMsg("");
  };

  return (
    <div className="bg-background-alt min-h-screen py-8">
      <div className="container-app space-y-6">
        {/* Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary-dark">
                Roommate Social Hub
              </span>
              <Badge variant="success" className="text-[10px] py-0">
                Encrypted &amp; Masked
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Roommate Dashboard
            </h1>
            <p className="text-xs text-foreground-secondary">
              Review connection requests, chat with mutual flatmates, and view verified contact details.
            </p>
          </div>

          <Button asChild className="bg-primary hover:bg-primary-light text-white text-xs font-bold">
            <Link href="/roommates">
              <Users className="mr-1.5 h-4 w-4 text-secondary-light" />
              Discover More Roommates
            </Link>
          </Button>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-2 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("connected")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "connected"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            <UserCheck className="h-4 w-4 text-secondary" />
            <span>Connected Roommates ({connections.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("incoming")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "incoming"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            <Clock className="h-4 w-4 text-secondary" />
            <span>Incoming Requests ({incomingRequests.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sent")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "sent"
                ? "bg-primary text-white"
                : "text-foreground-secondary hover:text-foreground hover:bg-surface"
            }`}
          >
            <span>Sent Requests (1)</span>
          </button>
        </div>

        {/* Tab 1: Connected Roommates with Unlocked Phone & Chat */}
        {activeTab === "connected" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
                Mutual Connections (Phone Unlocked)
              </h3>

              {connections.map((c) => (
                <Card key={c.id} className="p-5 rounded-xl border border-border bg-white shadow-card space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-base text-foreground">{c.displayName}</h4>
                        <Badge variant="success" className="text-[10px]">
                          Mutually Connected
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground-secondary mt-0.5">
                        {c.occupation} • {c.city}
                      </p>
                      <p className="text-[11px] text-foreground-muted">
                        Preferred: {c.localities.join(", ")}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-foreground-muted block">Connected</span>
                      <span className="text-xs font-semibold text-foreground">{c.connectedDate}</span>
                    </div>
                  </div>

                  {/* Unlocked Contact Details Banner */}
                  <div className="p-3 bg-secondary-50 border border-secondary/20 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-secondary-dark font-bold">
                      <Phone className="h-4 w-4 text-secondary" />
                      <span>{c.phone}</span>
                    </div>
                    <a
                      href={`tel:${c.phone}`}
                      className="text-xs font-bold text-secondary-dark hover:underline"
                    >
                      Call Now
                    </a>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-foreground-secondary italic truncate max-w-xs">
                      &quot;{c.lastMessage}&quot;
                    </span>
                    <Button
                      size="sm"
                      onClick={() => setActiveChatUser(c)}
                      className="bg-primary hover:bg-primary-light text-white text-xs h-8"
                    >
                      <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-secondary" />
                      Open Chat
                    </Button>
                  </div>
                </Card>
              ))}

              {connections.length === 0 && (
                <div className="p-8 text-center bg-white rounded-xl border border-dashed border-border text-xs text-foreground-secondary">
                  No mutual connections yet. Browse candidates and send requests!
                </div>
              )}
            </div>

            {/* Right: Embedded Chat Window */}
            <div className="lg:col-span-5 sticky top-24">
              <Card className="rounded-xl border border-border bg-white shadow-card overflow-hidden flex flex-col h-[480px]">
                <CardHeader className="p-4 bg-primary text-white flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white font-bold text-xs">
                      {activeChatUser ? activeChatUser.displayName.charAt(0) : "A"}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">
                        {activeChatUser ? activeChatUser.displayName : "Arjun M."}
                      </h4>
                      <span className="text-[10px] text-slate-300">Active now • Verified</span>
                    </div>
                  </div>
                  <Badge variant="success" className="text-[10px] py-0">
                    Direct Chat
                  </Badge>
                </CardHeader>

                {/* Message Stream */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`p-3 rounded-xl max-w-[80%] leading-relaxed ${
                          msg.sender === "me"
                            ? "bg-primary text-white rounded-br-none"
                            : "bg-white text-foreground border border-border rounded-bl-none shadow-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-foreground-muted mt-0.5 px-1">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-white flex gap-2">
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button type="submit" size="sm" className="bg-secondary hover:bg-secondary-dark text-white text-xs h-auto py-1.5">
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>
              </Card>

              {/* Safety Reminder */}
              <div className="mt-3 rounded-lg bg-surface p-3 text-[11px] text-foreground-secondary flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <span>
                  <strong>Safety Tip:</strong> Meet prospective roommates in a public cafe before finalizing flat deposits or co-signing rental agreements.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Incoming Requests */}
        {activeTab === "incoming" && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
              Requests Awaiting Your Acceptance
            </h3>

            {incomingRequests.map((req) => (
              <Card key={req.id} className="p-5 rounded-xl border border-border bg-white shadow-card space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-base text-foreground">{req.displayName}</h4>
                    <p className="text-xs text-foreground-secondary">{req.occupation} • {req.city}</p>
                    <p className="text-[11px] text-foreground-muted">Diet: {req.diet}</p>
                  </div>
                  <Badge variant="warning" className="text-[10px]">
                    Action Required
                  </Badge>
                </div>

                <div className="p-3 bg-surface rounded-lg text-xs text-foreground-secondary italic">
                  &ldquo;{req.message}&rdquo;
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <Button
                    size="sm"
                    onClick={() => handleAccept(req.id)}
                    className="bg-secondary hover:bg-secondary-dark text-white text-xs font-semibold"
                  >
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                    Accept &amp; Unlock Phone
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDecline(req.id)}
                    className="text-xs font-semibold"
                  >
                    <XCircle className="mr-1.5 h-3.5 w-3.5 text-error" />
                    Decline
                  </Button>
                </div>
              </Card>
            ))}

            {incomingRequests.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-dashed border-border text-xs text-foreground-secondary">
                No pending incoming requests.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Sent Requests */}
        {activeTab === "sent" && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
              Sent Requests Awaiting Response
            </h3>

            <Card className="p-5 rounded-xl border border-border bg-white shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-foreground">Rahul K.</h4>
                  <p className="text-xs text-foreground-secondary">Data Analyst • Hyderabad</p>
                </div>
                <Badge variant="subtle" className="text-[10px]">
                  Pending Response
                </Badge>
              </div>
              <p className="text-xs text-foreground-muted italic">
                &quot;Hey Rahul, I am moving to Hyderabad for work. Interested in the vacant room in your 3BHK.&quot;
              </p>
              <div className="text-[11px] text-foreground-secondary pt-2 border-t border-border flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-foreground-muted" />
                <span>Sent 2 days ago • Phone details will unlock once accepted</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RoommateDashboardPage() {
  return (
    <Suspense fallback={<div className="container-app py-12 text-center text-xs">Loading dashboard...</div>}>
      <RoommateDashboardContent />
    </Suspense>
  );
}
