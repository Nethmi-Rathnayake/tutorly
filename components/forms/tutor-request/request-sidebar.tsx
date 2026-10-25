"use client";

import { placementLifecycle } from "@/lib/constants/request-page";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";

export function RequestSidebar() {
  const t = useT();

  return (
    <aside aria-label={t("Placement support")} className="flex h-full flex-col gap-5">
      <section aria-labelledby="lifecycle-heading" className="flex-1 rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{t("How Concierge Works")}</p>
          <span className="rounded-full bg-brand-100/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-700">
            {t("Zero Spam")}
          </span>
        </div>
        <h2 id="lifecycle-heading" className="mt-3 text-sm font-bold text-ink">
          {t("The 4-Stage Placement Lifecycle")}
        </h2>
        <ol className="relative mt-4 space-y-4">
          <span aria-hidden className="absolute bottom-2 start-3 top-2 w-px bg-brand-100" />
          {t.deep(placementLifecycle).map((stage, i) => (
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
    </aside>
  );
}
