import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em]",
        variant === "default" && "bg-mint-100 text-teal-800",
        variant === "outline" && "border border-white/20 bg-white/10 text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
