"use client";

import * as React from "react";
import {
  Calculator,
  ShieldCheck,
  Info,
  Zap,
  Utensils,
  Wrench,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="rounded-xl border border-primary/20 bg-white shadow-md overflow-hidden">
      <CardHeader className="bg-primary-50/50 p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
              <Calculator className="h-4 w-4 text-secondary" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-primary">
                True Cost Calculator™
              </CardTitle>
              <p className="text-xs text-foreground-secondary">
                100% Honest pricing forecast — No hidden shocks
              </p>
            </div>
          </div>
          <Badge variant="success" className="text-[11px] font-semibold py-0.5">
            Zero Brokerage
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* Interactive Toggles */}
        <div className="bg-surface p-3 rounded-lg space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <label htmlFor="food-toggle" className="flex items-center gap-2 font-medium cursor-pointer">
              <Utensils className="h-3.5 w-3.5 text-primary" />
              <span>Include 3-time daily mess food ({formatINR(foodOptionMonthly)}/mo)</span>
            </label>
            <input
              id="food-toggle"
              type="checkbox"
              checked={includeFood}
              onChange={(e) => setIncludeFood(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="ac-toggle" className="flex items-center gap-2 font-medium cursor-pointer">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span>Heavy AC usage season (+{formatINR(1200)} estimate)</span>
            </label>
            <input
              id="ac-toggle"
              type="checkbox"
              checked={includeACUsage}
              onChange={(e) => setIncludeACUsage(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
            />
          </div>
        </div>

        {/* Section 1: Monthly Recurring Breakdown */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary mb-3 flex items-center gap-1">
            <span>Monthly Recurring Charges</span>
          </h4>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Headline Room Rent</span>
              <span className="font-semibold text-foreground">{formatINR(baseRent)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-foreground-secondary">
              <span className="flex items-center gap-1">
                Electricity {includeACUsage ? "(With AC)" : "(Average meter)"}
                <span className="text-[10px] text-foreground-muted">(Metered estimate)</span>
              </span>
              <span className="font-medium text-foreground">{formatINR(calculatedElectricity)}</span>
            </div>

            {includeFood ? (
              <div className="flex items-center justify-between text-xs text-foreground-secondary">
                <span className="flex items-center gap-1">
                  Food &amp; Mess Meals
                  <span className="text-[10px] text-secondary font-medium">(Included)</span>
                </span>
                <span className="font-medium text-foreground">{formatINR(foodOptionMonthly)}</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-foreground-muted">
                <span>Food &amp; Mess Meals (Self Cook / Outside)</span>
                <span>Opted Out</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-foreground-secondary">
              <span className="flex items-center gap-1">
                Society &amp; Maintenance
                <span className="text-[10px] text-foreground-muted">(Fixed)</span>
              </span>
              <span className="font-medium text-foreground">{formatINR(maintenanceFee)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-foreground-secondary">
              <span>Water Charges</span>
              <span className="font-medium text-secondary-dark">Included (Free)</span>
            </div>

            <Separator className="my-2" />

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-sm font-bold text-primary">Total Real Monthly Outflow</span>
              <span className="text-xl font-extrabold text-primary">
                {formatINR(totalMonthlyRecurring)}
                <span className="text-xs font-normal text-foreground-secondary"> / month</span>
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: One-time Outflows */}
        <div className="pt-2 border-t border-border">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary mb-2">
            One-time Move-in Expenses
          </h4>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-foreground flex items-center gap-1">
                Security Deposit
                {isDepositRefundable && (
                  <span className="text-[10px] text-secondary-dark font-medium">(100% Refundable)</span>
                )}
              </span>
              <span className="font-semibold text-foreground">{formatINR(securityDeposit)}</span>
            </div>

            <div className="flex items-center justify-between text-foreground-secondary">
              <span>Mandatory Brokerage / Commission</span>
              <span className="font-bold text-secondary-dark">₹0 (Zero Brokerage)</span>
            </div>

            <div className="flex items-center justify-between text-foreground-secondary">
              <span>Agreement Registration / Move-in Fee</span>
              <span className="font-medium text-foreground">₹0</span>
            </div>
          </div>
        </div>

        {/* Trust Stamp */}
        <div className="rounded-lg bg-secondary-50 p-3 text-xs text-secondary-dark flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
          <p className="leading-snug">
            <strong>StayConnect Transparency Promise:</strong> No hidden water bills, non-refundable gate passes, or surprise maintenance fees.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
