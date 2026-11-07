"use client";

import * as React from "react";
import {
  Calculator,
  ShieldCheck,
  Zap,
  Utensils,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatINR } from "@/lib/utils";

interface CostCalculatorProps {
  baseRent: number;
  electricityEstimate?: number;
  foodOptionMonthly?: number;
  maintenanceFee?: number;
  securityDeposit?: number;
  isDepositRefundable?: boolean;
  waterCharges?: number;
}

export function TrueCostCalculator({
  baseRent = 7000,
  electricityEstimate = 600,
  foodOptionMonthly = 2500,
  maintenanceFee = 350,
  securityDeposit = 15000,
  isDepositRefundable = true,
  waterCharges = 0,
}: CostCalculatorProps) {
  const [includeFood, setIncludeFood] = React.useState(true);
  const [includeACUsage, setIncludeACUsage] = React.useState(false);

  const calculatedElectricity = includeACUsage
    ? electricityEstimate + 1200
    : electricityEstimate;

  const currentFood = includeFood ? foodOptionMonthly : 0;

  const totalMonthlyRecurring =
    baseRent + calculatedElectricity + currentFood + maintenanceFee + waterCharges;

  return (
    <Card className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
      <CardHeader className="bg-[#F8FAFC] p-5 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F172A] text-white">
              <Calculator className="h-4 w-4 text-[#EA580C]" />
            </div>
            <div>
              <CardTitle className="text-base font-extrabold text-[#0F172A] tracking-[-0.02em]">
                True Cost Calculator™
              </CardTitle>
              <p className="text-xs text-[#64748B]">
                100% Transparent monthly forecast — Zero hidden charges
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#059669] border border-emerald-200/80">
            <ShieldCheck className="h-3 w-3 text-[#059669]" />
            Zero Brokerage
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* Interactive Toggles */}
        <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-[#E2E8F0] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <label htmlFor="food-toggle" className="flex items-center gap-2 font-medium text-[#334155] cursor-pointer">
              <Utensils className="h-3.5 w-3.5 text-[#EA580C]" />
              <span>Include 3-time daily mess food (<span className="font-mono-numbers font-semibold tabular-nums">{formatINR(foodOptionMonthly)}</span>/mo)</span>
            </label>
            <input
              id="food-toggle"
              type="checkbox"
              checked={includeFood}
              onChange={(e) => setIncludeFood(e.target.checked)}
              className="h-4 w-4 rounded border-[#E2E8F0] text-[#EA580C] focus:ring-[#EA580C] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="ac-toggle" className="flex items-center gap-2 font-medium text-[#334155] cursor-pointer">
              <Zap className="h-3.5 w-3.5 text-[#EA580C]" />
              <span>Heavy AC usage season (+<span className="font-mono-numbers font-semibold tabular-nums">{formatINR(1200)}</span> estimate)</span>
            </label>
            <input
              id="ac-toggle"
              type="checkbox"
              checked={includeACUsage}
              onChange={(e) => setIncludeACUsage(e.target.checked)}
              className="h-4 w-4 rounded border-[#E2E8F0] text-[#EA580C] focus:ring-[#EA580C] cursor-pointer"
            />
          </div>
        </div>

        {/* Section 1: Monthly Recurring Breakdown */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">
            Monthly Recurring Charges
          </h4>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#334155]">Headline Room Rent</span>
              <span className="font-bold text-[#0F172A] tabular-nums font-mono-numbers">{formatINR(baseRent)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#475569]">
              <span className="flex items-center gap-1">
                Electricity {includeACUsage ? "(With AC)" : "(Average meter)"}
                <span className="text-[10px] text-[#94A3B8]">(Metered estimate)</span>
              </span>
              <span className="font-medium text-[#0F172A] tabular-nums font-mono-numbers">{formatINR(calculatedElectricity)}</span>
            </div>

            {includeFood ? (
              <div className="flex items-center justify-between text-xs text-[#475569]">
                <span className="flex items-center gap-1">
                  Food &amp; Mess Meals
                  <span className="text-[10px] text-[#059669] font-medium bg-emerald-50 px-1 rounded">(Included)</span>
                </span>
                <span className="font-medium text-[#0F172A] tabular-nums font-mono-numbers">{formatINR(foodOptionMonthly)}</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span>Food &amp; Mess Meals (Self Cook / Outside)</span>
                <span className="italic">Opted Out</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-[#475569]">
              <span className="flex items-center gap-1">
                Society &amp; Maintenance
                <span className="text-[10px] text-[#94A3B8]">(Fixed)</span>
              </span>
              <span className="font-medium text-[#0F172A] tabular-nums font-mono-numbers">{formatINR(maintenanceFee)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#475569]">
              <span>Water Charges</span>
              <span className="font-bold text-[#059669]">Included (Free)</span>
            </div>

            <Separator className="my-2 bg-[#E2E8F0]" />

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-sm font-bold text-[#0F172A]">Total Real Monthly Outflow</span>
              <span className="text-xl font-black text-[#0F172A] tabular-nums font-mono-numbers">
                {formatINR(totalMonthlyRecurring)}
                <span className="text-xs font-normal text-[#64748B]"> / mo</span>
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: One-time Outflows */}
        <div className="pt-2 border-t border-[#E2E8F0]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
            One-time Move-in Expenses
          </h4>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#334155] flex items-center gap-1">
                Security Deposit
                {isDepositRefundable && (
                  <span className="text-[10px] text-[#059669] font-bold bg-emerald-50 px-1 rounded">(100% Refundable)</span>
                )}
              </span>
              <span className="font-bold text-[#0F172A] tabular-nums font-mono-numbers">{formatINR(securityDeposit)}</span>
            </div>

            <div className="flex items-center justify-between text-[#475569]">
              <span>Mandatory Brokerage / Commission</span>
              <span className="font-bold text-[#059669] tabular-nums font-mono-numbers">₹0 (Zero Brokerage)</span>
            </div>

            <div className="flex items-center justify-between text-[#475569]">
              <span>Agreement Registration / Move-in Fee</span>
              <span className="font-medium text-[#0F172A] tabular-nums font-mono-numbers">₹0</span>
            </div>
          </div>
        </div>

        {/* Trust Stamp */}
        <div className="rounded-xl bg-emerald-50/80 border border-emerald-200/80 p-3 text-xs text-emerald-800 flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-[#059669]" />
          <p className="leading-snug">
            <strong className="text-emerald-900">StayConnect Transparency Promise:</strong> No hidden water bills, non-refundable gate passes, or surprise maintenance fees.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
