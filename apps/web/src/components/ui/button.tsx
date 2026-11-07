import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-2xs",
        secondary: "bg-[#EA580C] text-white hover:bg-[#C2410C] shadow-2xs",
        outline: "border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#0F172A] shadow-2xs",
        ghost: "hover:bg-slate-100 text-[#0F172A]",
        link: "text-[#EA580C] underline-offset-4 hover:underline",
        destructive: "bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-2xs",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-xl",
        sm: "h-8.5 rounded-lg px-3 text-xs font-bold",
        lg: "h-11 rounded-xl px-6 text-sm font-bold",
        xl: "h-12 rounded-xl px-8 text-base font-extrabold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
