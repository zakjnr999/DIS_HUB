import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "light";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#3B2416] text-[#FBF6ED] shadow-[0_16px_36px_rgba(59,36,22,0.20)] hover:-translate-y-0.5 hover:bg-[#7A5636] hover:shadow-[0_18px_42px_rgba(59,36,22,0.24)]",
  secondary:
    "border border-[#C8A96A]/42 bg-[#FFFDF8]/74 text-[#3B2416] hover:-translate-y-0.5 hover:border-[#C8A96A] hover:bg-[#F7EFE3]",
  ghost: "text-[#7A5636] hover:bg-[#E8D8C3]/42",
  danger:
    "border border-[#9A4A3C]/30 bg-[#FFFDF8] text-[#9A4A3C] hover:bg-[#f8e8e2]",
  light:
    "bg-[#FFFDF8] text-[#3B2416] shadow-[0_14px_30px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 hover:bg-[#F7EFE3] hover:shadow-[0_16px_36px_rgba(0,0,0,0.20)]",
};

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-5 py-2 text-xs",
  md: "min-h-12 px-6 py-3 text-sm",
  lg: "min-h-14 px-8 py-3.5 text-base sm:text-lg",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}

export function Button({
  className,
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const classes = cn(baseClass, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
