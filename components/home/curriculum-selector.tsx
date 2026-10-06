"use client";

import { useState } from "react";
import { BookOpen, Building2, Check, Flag, Globe, Landmark, Leaf, Sparkles, type LucideIcon } from "lucide-react";
import { curriculumDescriptions, curriculumIntro } from "@/lib/constants/home";
import { curricula } from "@/lib/constants/taxonomy";
import { home } from "@/lib/i18n/ar/home";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";

const icons: Record<string, LucideIcon> = {
  british: Landmark,
  ib: Globe,
  american: Flag,
  indian: BookOpen,
  "uae-moe": Building2,
  canadian: Leaf,
  other: Sparkles,
};

export function CurriculumSelector() {
  const [selected, setSelected] = useState(curricula[0].id);
  const t = useT(home);

  return (
    <section aria-labelledby="curriculum-heading" className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-night via-brand-800 to-brand-900 px-6 py-12 font-[family-name:var(--font-inter),var(--font-arabic)] shadow-[0_30px_60px_-30px_rgba(20,23,29,0.7)] sm:px-10 sm:py-14">
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand-400 via-gold to-brand-500" />

        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            <span aria-hidden className="h-px w-8 bg-gold" />
            {t("Tailored Academic Syllabi")}
            <span aria-hidden className="h-px w-8 bg-gold" />
          </p>
          <h2 id="curriculum-heading" className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-[2.5rem] sm:leading-tight">
            {t("Select Your Academic Curriculum")}
          </h2>
          <p key={selected} aria-live="polite" className="mt-4 min-h-24 animate-[fade-in_0.5s_ease-out] text-sm leading-relaxed text-white/70 sm:min-h-16 sm:text-base">
            {t(curriculumDescriptions[selected] ?? curriculumIntro)}
          </p>
        </div>

        <div
          role="group"
          aria-label={t("Curriculum")}
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12"
        >
          {curricula.map((c, i) => {
            const active = c.id === selected;
            const Icon = icons[c.id] ?? Sparkles;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(c.id)}
                className={cn(
                  "group relative flex items-center gap-4 rounded-2xl p-4 text-start transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                  // Desktop: two rows, 4 cards then 3 wider cards.
                  i < 4 ? "lg:col-span-3" : "lg:col-span-4",
                  active
                    ? "bg-linear-to-b from-[#ecd28c] to-[#c9a24e] text-brand-900 shadow-[0_14px_30px_-12px_rgba(201,162,78,0.7)]"
                    : "bg-white/5 text-white ring-1 ring-white/15 hover:-translate-y-0.5 hover:bg-white/10 hover:ring-gold/60",
                )}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl",
                    active ? "bg-brand-900/10 text-brand-900" : "bg-gold/10 text-gold",
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-snug">{t(c.name)}</span>
                  {c.detail && (
                    <span className={cn("mt-0.5 block text-xs", active ? "text-brand-900/70" : "text-white/60")}>
                      {t(c.detail)}
                    </span>
                  )}
                </span>
                {active && <Check aria-hidden className="size-5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
