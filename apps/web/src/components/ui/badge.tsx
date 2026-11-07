import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#0F172A] text-white",
        secondary: "border-orange-200/80 bg-orange-50 text-[#EA580C]",
        outline: "border-[#E2E8F0] bg-white text-[#0F172A]",
        success: "border-emerald-200/80 bg-emerald-50 text-[#059669]",
        warning: "border-amber-200/80 bg-amber-50 text-amber-700",
        error: "border-red-200/80 bg-red-50 text-red-700",
        info: "border-sky-200/80 bg-sky-50 text-sky-700",
        subtle: "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
