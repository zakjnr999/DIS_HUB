import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "min-h-12 w-full rounded-2xl border border-[var(--soft-border)] bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-700/10 disabled:cursor-not-allowed disabled:bg-slate-50";

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
    <label className="grid gap-2 text-sm font-extrabold text-slate-800">
      <span>
        {label} {required ? <span className="text-red-700">*</span> : null}
      </span>
      {children}
      {hint ? <span className="text-xs font-semibold text-slate-500">{hint}</span> : null}
      {error ? (
        <span className="text-xs font-bold text-red-700">{error}</span>
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
      className={cn(fieldClass, "min-h-28 resize-y leading-6", props.className)}
      {...props}
    />
  );
}
