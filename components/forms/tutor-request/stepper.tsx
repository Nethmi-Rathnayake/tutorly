"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { requestSteps } from "@/lib/constants/tutor-request";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";

type StepperProps = {
  current: number;
  completed: number;
  onSelect: (step: number) => void;
};

/** Tabbed progress indicator (SRS FR-05). Steps already reached are clickable to go back and edit. */
export function Stepper({ current, completed, onSelect }: StepperProps) {
  const t = useT();
  const listRef = useRef<HTMLOListElement>(null);
  const progress = ((current + 1) / requestSteps.length) * 100;

  // On narrow screens the tabs scroll horizontally; keep the active one in view.
  // Measured from the rendered boxes so it works for both left-to-right and right-to-left layouts.
  useEffect(() => {
    const list = listRef.current;
    const active = list?.children[current] as HTMLElement | undefined;
    if (list && active && list.scrollWidth > list.clientWidth) {
      const listBox = list.getBoundingClientRect();
      const activeBox = active.getBoundingClientRect();
      const offset = activeBox.left + activeBox.width / 2 - (listBox.left + listBox.width / 2);
      list.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [current]);

  return (
    <nav aria-label={t("Request progress")} className="rounded-3xl bg-white p-3 ring-1 ring-brand-100/80 sm:p-4">
      <ol ref={listRef} className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {requestSteps.map((step, i) => {
          const active = i === current;
          const done = i < current;
          const reachable = i <= completed && !active;
          return (
            <li key={step.id} className="min-w-0">
              <button
                type="button"
                disabled={!reachable}
                onClick={() => onSelect(i)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 rounded-2xl px-1 py-2.5 text-center transition-colors focus-visible:outline-2 focus-visible:outline-brand-500 sm:px-2 sm:py-3",
                  active ? "bg-brand-100/80" : "bg-lavender/60",
                  reachable ? "hover:bg-brand-50" : "cursor-default",
                )}
              >
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-full text-[11px] font-bold",
                    active
                      ? "bg-linear-to-br from-brand-700 to-violet-brand text-white shadow-md shadow-brand-600/30"
                      : done
                        ? "bg-brand-600 text-white"
                        : "bg-white text-muted",
                  )}
                >
                  {done ? <Check aria-hidden className="size-3.5" /> : String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("hidden text-xs font-semibold sm:block", active ? "text-brand-800" : "text-ink")}>{t(step.label)}</span>
                <span className="sr-only sm:not-sr-only sm:-mt-1 sm:block sm:text-[10px] sm:text-muted">
                  {t(step.sublabel)}
                  {done && <span className="sr-only"> {t("(completed)")}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-center text-sm font-semibold text-ink sm:hidden">
        {t("Step {n} of {total}", { n: current + 1, total: requestSteps.length })}
        <span className="text-brand-600"> · {t(requestSteps[current].label)}</span>
      </p>
      <div
        role="progressbar"
        aria-label={t("Request progress")}
        aria-valuemin={1}
        aria-valuemax={requestSteps.length}
        aria-valuenow={current + 1}
        className="mt-3 h-1 overflow-hidden rounded-full bg-lavender"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-brand-700 to-violet-brand transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </nav>
  );
}
