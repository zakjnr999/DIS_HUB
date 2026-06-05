import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "min-h-12 w-full rounded-2xl border border-[#E8D8C3] bg-[#FFFDF8]/92 px-4 py-3 text-sm text-[#1F1B18] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition placeholder:text-[#A49689] focus:border-[#C8A96A] focus:outline-none focus:ring-4 focus:ring-[#C8A96A]/18";

export function FieldShell({
  children,
  error,
  hint,
  label,
  required,
}: {
  children: ReactNode;
  error?: string;
  hint?: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[#3B2416]">
      <span>
        {label} {required ? <span className="text-[#9A4A3C]">*</span> : null}
      </span>
      {children}
      {hint ? <span className="text-xs font-semibold text-[#7B6F65]">{hint}</span> : null}
      {error ? (
        <span className="text-xs font-bold text-[#9A4A3C]">{error}</span>
      ) : null}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, props.className)} {...props} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(fieldClass, props.className)} {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldClass, "min-h-28 resize-y", props.className)}
      {...props}
    />
  );
}
