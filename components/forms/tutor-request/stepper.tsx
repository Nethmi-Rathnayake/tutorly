"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { requestSteps } from "@/lib/constants/tutor-request";
import { cn } from "@/lib/utils/cn";

type StepperProps = {
  current: number;
  completed: number;
  onSelect: (step: number) => void;
};

/** Tabbed progress indicator (SRS FR-05). Steps already reached are clickable to go back and edit. */
export function Stepper({ current, completed, onSelect }: StepperProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const progress = ((current + 1) / requestSteps.length) * 100;

  // On narrow screens the tabs scroll horizontally; keep the active one in view.
  useEffect(() => {
    const list = listRef.current;
    const active = list?.children[current] as HTMLElement | undefined;
    if (list && active && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: active.offsetLeft - list.clientWidth / 2 + active.clientWidth / 2, behavior: "smooth" });
    }
  }, [current]);

  return (
    <nav aria-label="Request progress" className="rounded-3xl bg-white p-3 ring-1 ring-brand-100/80 sm:p-4">
      <ol ref={listRef} className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-6 sm:overflow-visible sm:pb-0">
        {requestSteps.map((step, i) => {
          const active = i === current;
          const done = i < current;
          const reachable = i <= completed && !active;
          return (
            <li key={step.id} className="min-w-[5.5rem] flex-1 sm:min-w-0">
              <button
                type="button"
                disabled={!reachable}
                onClick={() => onSelect(i)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-3 text-center transition-colors focus-visible:outline-2 focus-visible:outline-brand-500",
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
                <span className={cn("text-xs font-semibold", active ? "text-brand-800" : "text-ink")}>{step.label}</span>
                <span className="-mt-1 text-[10px] text-muted">
                  {step.sublabel}
                  {done && <span className="sr-only"> (completed)</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div
        role="progressbar"
        aria-label="Request progress"
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
