"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Shared pieces of the multi-step intake forms. */

export function DraftNotice({
  notice,
  onDismiss,
  className,
}: {
  notice?: { kind: "restored" | "saved"; text: string };
  onDismiss: () => void;
  className?: string;
}) {
  if (!notice) return null;
  return (
    <div
      role="status"
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-xs text-emerald-800 ring-1 ring-emerald-100",
        className,
      )}
    >
      <span className="flex items-center gap-2">
        <CheckCircle2 aria-hidden className="size-4" />
        {notice.text}
      </span>
      <button type="button" onClick={onDismiss} className="font-semibold underline-offset-2 hover:underline">
        {notice.kind === "restored" ? "Start over" : "Dismiss"}
      </button>
    </div>
  );
}

export function ServerErrorAlert({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-6 flex items-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-100">
      <AlertCircle aria-hidden className="size-4 shrink-0" />
      {message}
    </p>
  );
}

export function StepSubmitButton({
  label,
  isLast,
  submitting,
  className,
}: {
  label: string;
  isLast: boolean;
  submitting: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-700 to-violet-brand px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(79,63,217,0.8)] transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:translate-y-0 disabled:opacity-70 print:hidden",
        className,
      )}
    >
      {submitting ? (
        <>
          <Loader2 aria-hidden className="size-4 animate-spin" />
          Submitting…
        </>
      ) : (
        <>
          {label}
          {isLast ? (
            <Send aria-hidden className="size-4" />
          ) : (
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </>
      )}
    </button>
  );
}

/** Slide-in transition for step content (disabled for reduced motion). */
export function stepVariants(reduceMotion: boolean) {
  return reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } };
}
