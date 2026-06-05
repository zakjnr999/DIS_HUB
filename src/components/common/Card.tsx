import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-[#E8D8C3]/75 bg-[#FFFDF8] shadow-[0_22px_60px_rgba(59,36,22,0.08)]",
        className,
      )}
      {...props}
    />
  );
}
