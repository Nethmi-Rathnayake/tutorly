"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { curricula } from "@/lib/constants/taxonomy";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";

export function CurriculumSelector() {
  const [selected, setSelected] = useState(curricula[0].id);
  const t = useT();

  return (
    <section aria-labelledby="curriculum-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[1.75rem] bg-linear-to-br from-brand-50 to-lavender p-7 ring-1 ring-brand-100 sm:p-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>{t("Tailored Academic Syllabi")}</Eyebrow>
            <h2 id="curriculum-heading" className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">
              {t("Select Your Academic Curriculum")}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted lg:text-end">
            {t("Our tutors hold verified certifications across primary global examination bodies, ensuring syllabus alignment down to mark-scheme rubrics.")}
          </p>
        </div>

        <div role="group" aria-label={t("Curriculum")} className="mt-8 flex flex-wrap gap-3">
          {curricula.map((c) => {
            const active = c.id === selected;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(c.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 text-start py-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:text-[13px]",
                  active
                    ? "bg-linear-to-r from-brand-700 to-brand-600 text-white shadow-lg shadow-brand-600/30"
                    : "bg-white text-muted ring-1 ring-brand-100 hover:text-ink hover:ring-brand-300",
                )}
              >
                {active && <Check aria-hidden className="size-3.5" />}
                <span>
                  {t(c.name)}
                  {c.detail && (
                    <span className={cn("ms-1.5", active ? "text-white/80" : "text-muted/80")}>({t(c.detail)})</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
