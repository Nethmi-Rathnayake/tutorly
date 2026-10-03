"use client";

import { AlertCircle, Check, type LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import { useT } from "@/lib/i18n/client";
import { translateError } from "@/lib/i18n/validation";
import { cn } from "@/lib/utils/cn";

export function FieldError({ id, message }: { id?: string; message?: string }) {
  const t = useT();
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
      <AlertCircle aria-hidden className="size-3.5 shrink-0" />
      {translateError(message, t)}
    </p>
  );
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: React.ReactNode;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  const t = useT();
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-medium text-ink">
          {label}
          {required && (
            <span aria-hidden className="ms-0.5 text-rose-500">
              *
            </span>
          )}
          {required && <span className="sr-only"> {t("(required)")}</span>}
        </label>
        {hint && <span className="text-[11px] text-muted">{hint}</span>}
      </div>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: LucideIcon;
  invalid?: boolean;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { icon: Icon, invalid, className, id, ...props },
  ref,
) {
  return (
    <div className="relative">
      {Icon && <Icon aria-hidden className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted" />}
      <input
        ref={ref}
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={cn(
          "h-12 w-full rounded-xl bg-lavender pe-4 text-sm text-ink outline-none ring-1 transition placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-brand-300",
          Icon ? "ps-11" : "ps-4",
          invalid ? "ring-rose-300 bg-rose-50/40" : "ring-transparent",
          className,
        )}
        {...props}
      />
    </div>
  );
});

export function SectionTitle({
  number,
  icon: Icon,
  children,
  aside,
  id,
}: {
  number?: number;
  icon?: LucideIcon;
  children: React.ReactNode;
  aside?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h3 id={id} className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
        {number !== undefined && (
          <span aria-hidden className="grid size-6 place-items-center rounded-md bg-brand-100 text-xs font-bold text-brand-700">
            {number}
          </span>
        )}
        {Icon && <Icon aria-hidden className="size-4 text-brand-600" />}
        {children}
      </h3>
      {aside && <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">{aside}</span>}
    </div>
  );
}

type ChoiceCardProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "title"> & {
  title: React.ReactNode;
  hint?: React.ReactNode;
  indicator?: "radio" | "checkbox" | "check" | "none";
  selectedTone?: "solid" | "soft";
  children?: React.ReactNode;
};

/** Native radio/checkbox rendered as a selectable card. Selection is shown by shape + text, not colour alone. */
export const ChoiceCard = forwardRef<HTMLInputElement, ChoiceCardProps>(function ChoiceCard(
  { title, hint, indicator = "radio", selectedTone = "soft", className, children, type = "radio", ...props },
  ref,
) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 ring-1 ring-transparent transition-all",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500",
        selectedTone === "solid"
          ? "bg-lavender hover:bg-brand-100 has-[:checked]:bg-linear-to-r has-[:checked]:from-brand-700 has-[:checked]:to-violet-brand has-[:checked]:text-white has-[:checked]:shadow-lg has-[:checked]:shadow-brand-600/25"
          : "bg-lavender hover:bg-brand-100/70 has-[:checked]:bg-brand-100 has-[:checked]:ring-brand-300",
        className,
      )}
    >
      <input ref={ref} type={type} className="peer sr-only" {...props} />
      {indicator === "radio" && (
        <span
          aria-hidden
          className="grid size-4 shrink-0 place-items-center rounded-full border border-ink/25 bg-white peer-checked:border-brand-600 peer-checked:[&>span]:scale-100"
        >
          <span className="size-2 scale-0 rounded-full bg-brand-600 transition-transform" />
        </span>
      )}
      {indicator === "checkbox" && (
        <span
          aria-hidden
          className="grid size-4 shrink-0 place-items-center rounded border border-ink/25 bg-white text-white peer-checked:border-brand-700 peer-checked:bg-brand-700"
        >
          <Check className="size-3" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold leading-snug">{title}</span>
        {hint && (
          <span
            className={cn(
              "mt-0.5 block truncate text-[11px]",
              selectedTone === "solid" ? "text-muted group-has-[:checked]:text-white/80" : "text-muted",
            )}
          >
            {hint}
          </span>
        )}
      </span>
      {indicator === "check" && (
        <span aria-hidden className="hidden size-5 shrink-0 place-items-center rounded-full border-2 border-white group-has-[:checked]:grid">
          <Check className="size-3" />
        </span>
      )}
      {children}
    </label>
  );
});

type PillProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  icon?: LucideIcon;
  tone?: "indigo" | "violet";
};

/** Pill-shaped checkbox/radio toggle. */
export const PillToggle = forwardRef<HTMLInputElement, PillProps>(function PillToggle(
  { label, icon: Icon, tone = "indigo", type = "checkbox", className, ...props },
  ref,
) {
  return (
    <label
      className={cn(
        "group inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full bg-lavender px-4 py-2 text-xs font-medium text-ink/80 transition-all hover:bg-brand-100",
        "has-[:checked]:text-white has-[:checked]:shadow-md has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500",
        tone === "violet"
          ? "has-[:checked]:bg-violet-brand has-[:checked]:shadow-violet-600/25"
          : "has-[:checked]:bg-brand-700 has-[:checked]:shadow-brand-600/25",
        className,
      )}
    >
      <input ref={ref} type={type} className="sr-only" {...props} />
      {Icon && <Icon aria-hidden className="size-3.5" />}
      {label}
      <Check aria-hidden className="hidden size-3.5 group-has-[:checked]:block" />
    </label>
  );
});
