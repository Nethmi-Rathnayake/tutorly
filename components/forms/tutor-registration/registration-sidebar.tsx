"use client";

import { ListChecks, Star } from "lucide-react";
import { safetyCommitments, tutorLifecycle } from "@/lib/constants/tutor-registration";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";

export function RegistrationSidebar() {
  const t = useT();
  const review = t.deep(safetyCommitments.testimonial);

  return (
    <aside aria-label={t("Registration support")} className="flex h-full flex-col gap-5">
      <section aria-labelledby="tutor-lifecycle" className="flex-1 rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
        <h2 id="tutor-lifecycle" className="flex items-center gap-2 text-base font-bold text-ink">
          <ListChecks aria-hidden className="size-5 text-brand-600" />
          {t("The 4-Stage Placement Lifecycle")}
        </h2>
        <ol className="relative mt-5 space-y-4">
          <span aria-hidden className="absolute bottom-2 start-3 top-2 w-px bg-brand-100" />
          {t.deep(tutorLifecycle).map((stage, i) => (
            <li key={stage.title} className="relative flex gap-3">
              <span
                className={cn(
                  "relative grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                  i === 0 ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-700 ring-2 ring-white",
                )}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-semibold text-ink">{stage.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{stage.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <figure className="rounded-3xl bg-linear-to-br from-brand-700 to-brand-600 p-6 text-white shadow-[0_24px_50px_-24px_rgba(20,23,29,0.8)]">
        <div className="flex gap-0.5 text-amber-300" role="img" aria-label={t("Rated 5 out of 5")}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} aria-hidden className="size-3.5 fill-current" />
          ))}
        </div>
        <blockquote className="mt-3 text-xs italic leading-relaxed text-white/90">“{review.quote}”</blockquote>
        <figcaption className="mt-4 flex items-center justify-between gap-3 text-[11px]">
          <span className="font-semibold">{review.name}</span>
          <span className="text-white/75">{review.role}</span>
        </figcaption>
      </figure>
    </aside>
  );
}
