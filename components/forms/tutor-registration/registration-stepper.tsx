"use client";

import { Check } from "lucide-react";
import { registrationSteps } from "@/lib/constants/tutor-registration";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";

type Props = { current: number; completed: number; onSelect: (step: number) => void };

/** Stage cards with status labels (Current / Upcoming / Review), as in the intake design. */
export function RegistrationStepper({ current, completed, onSelect }: Props) {
  const t = useT();
  const last = registrationSteps.length - 1;
  return (
    <nav aria-label={t("Registration progress")} className="rounded-3xl bg-white p-3 ring-1 ring-brand-100/80 sm:p-4">
      <ol className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
        {registrationSteps.map((s, i) => {
          const active = i === current;
          const done = i < current;
          const reachable = i <= completed && !active;
          const status = active ? "Current" : done ? "Done" : i === last ? "Review" : "Upcoming";
          return (
            <li key={s.id} className="min-w-[10rem] flex-1 sm:min-w-0">
              <button
                type="button"
                disabled={!reachable}
                onClick={() => onSelect(i)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex h-full w-full flex-col rounded-2xl px-3 py-3 text-start transition-colors focus-visible:outline-2 focus-visible:outline-brand-500",
                  active ? "bg-brand-100/80 ring-1 ring-brand-200" : "bg-lavender/60",
                  reachable ? "hover:bg-brand-50" : "cursor-default",
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "grid size-7 place-items-center rounded-full text-[11px] font-bold",
                      active
                        ? "bg-linear-to-br from-brand-700 to-violet-brand text-white"
                        : done
                          ? "bg-brand-600 text-white"
                          : "bg-white text-muted ring-1 ring-brand-100",
                    )}
                  >
                    {done ? <Check aria-hidden className="size-3.5" /> : String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      active ? "bg-white text-brand-700" : done ? "text-brand-600" : "text-muted",
                    )}
                  >
                    {t(status)}
                  </span>
                </span>
                <span className="mt-2 text-sm font-semibold text-ink">{t(s.label)}</span>
                <span className="text-[11px] text-muted">{t(s.sublabel)}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
