"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  Phone,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = React.useState<"student" | "owner">("student");
  const [step, setStep] = React.useState<"phone" | "otp">("phone");
  const [phone, setPhone] = React.useState("");
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = React.useState(30);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep("otp");
      setTimer(30);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      // Auto focus next input
      if (val && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "owner") {
      router.push("/owner");
    } else {
      router.push("/properties");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background-alt py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
              <Building2 className="h-5 w-5 text-secondary" />
            </div>
            <span className="text-2xl font-extrabold text-primary">
              Stay<span className="text-secondary">Connect</span>
            </span>
          </Link>
          <p className="text-xs text-foreground-secondary">
            Find your stay. Find your people. No mandatory brokerage.
          </p>
        </div>

        <Card className="rounded-2xl border border-border bg-white shadow-lg p-6 sm:p-8 space-y-6">
          {/* Role Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary block">
              I am logging in as:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  role === "student"
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface text-foreground border-transparent hover:border-slate-300"
                }`}
              >
                Student / Tenant
              </button>
              <button
                type="button"
                onClick={() => setRole("owner")}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  role === "owner"
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface text-foreground border-transparent hover:border-slate-300"
                }`}
              >
                Property Owner
              </button>
            </div>
          </div>

          {step === "phone" ? (
            /* Step 1: Phone Number Input */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Mobile Phone Number
                </label>
                <div className="flex items-center rounded-lg border border-border bg-surface px-3 py-2">
                  <span className="text-xs font-bold text-foreground-secondary mr-2">
                    🇮🇳 +91
                  </span>
                  <input
                    required
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="98765 43210"
                    className="w-full bg-transparent text-sm font-medium text-foreground focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-foreground-muted">
                  We will send a 6-digit verification code via SMS.
                </p>
              </div>

              <Button
                type="submit"
                disabled={phone.length < 10}
                className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs h-11"
              >
                <span>Send Verification OTP</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </form>
          ) : (
            /* Step 2: 6-Digit OTP Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-secondary-dark mb-1">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Enter 6-Digit Code</h3>
                <p className="text-xs text-foreground-secondary">
                  Sent to +91 {phone}{" "}
                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    className="text-primary font-bold underline"
                  >
                    Change
                  </button>
                </p>
              </div>

              {/* 6 Inputs */}
              <div className="flex justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="h-11 w-11 rounded-lg border border-border text-center text-lg font-bold text-primary focus:border-primary focus:outline-none bg-surface"
                  />
                ))}
              </div>

              <div className="text-center text-xs text-foreground-muted">
                Demo code: Enter any 6 numbers to verify
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold text-xs h-11"
              >
                Verify &amp; Continue
              </Button>
            </form>
          )}

          {/* Zero Brokerage Assurance */}
          <div className="pt-4 border-t border-border flex items-center justify-center gap-2 text-xs text-foreground-secondary">
            <ShieldCheck className="h-4 w-4 text-secondary shrink-0" />
            <span>Zero Brokerage • Free for Students &amp; Owners</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
