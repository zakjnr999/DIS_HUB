import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-teal-700 text-white hover:bg-teal-800",
  secondary:
    "border border-teal-700/20 bg-white text-teal-800 hover:border-teal-700/35 hover:bg-mint-50",
  ghost: "text-teal-800 hover:bg-teal-50",
  danger: "border border-red-200 bg-white text-red-700 hover:bg-red-50",
  light: "bg-white text-teal-900 hover:bg-mint-50",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 py-2 text-xs",
  md: "min-h-12 px-5 py-3 text-sm",
  lg: "min-h-14 px-7 py-3.5 text-base",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full font-extrabold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-55";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
}

export function Button({
  className,
  children,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = cn(baseClass, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link className={classes} href={href} rel={rel} target={target}>
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
