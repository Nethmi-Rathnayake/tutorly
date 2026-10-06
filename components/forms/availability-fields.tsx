"use client";

import { Check, CalendarRange, Clock, Moon, Sun } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { ChoiceCard, FieldError, SectionTitle } from "@/components/forms/fields";
import { dayOptions, timeWindowOptions } from "@/lib/constants/tutor-request";
import { useT } from "@/lib/i18n/client";

const windowIcons = { morning: Sun, "after-school": Clock, evening: Moon, weekend: CalendarRange } as const;

/** Shape shared by every form that asks for days and time windows. */
type AvailabilityShape = { days: string[]; timeWindows: string[] };

/** Day-of-week and time-window pickers shared by the parent request and tutor registration forms. */
export function AvailabilityFields({ startNumber = 1 }: { startNumber?: number }) {
  const t = useT();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AvailabilityShape>();
  const days = useWatch({ control, name: "days" }) ?? [];

  return (
    <>
      <fieldset>
        <legend className="w-full">
          <SectionTitle
            number={startNumber}
            aside={
              <span className="normal-case tracking-normal text-brand-600">
                {t(days.length === 1 ? "{count} Day Selected" : "{count} Days Selected", { count: days.length })}
              </span>
            }
          >
            {t("Available Days of the Week")}
          </SectionTitle>
        </legend>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 sm:gap-3">
          {dayOptions.map((d) => (
            <label key={d.value} className="group relative cursor-pointer">
              <input type="checkbox" value={d.value} className="peer sr-only" {...register("days")} />
              <span className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-lavender text-sm font-semibold text-ink ring-1 ring-transparent transition-all group-hover:bg-brand-100 peer-checked:bg-linear-to-br peer-checked:from-brand-700 peer-checked:to-violet-brand peer-checked:text-white peer-checked:shadow-md peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500">
                <Check aria-hidden className="hidden size-3.5 group-has-[:checked]:block" />
                {t(d.label)}
              </span>
            </label>
          ))}
        </div>
        <FieldError message={errors.days?.message} />
      </fieldset>

      <fieldset>
        <legend className="w-full">
          <SectionTitle number={startNumber + 1}>{t("Preferred Time Windows")}</SectionTitle>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {timeWindowOptions.map((o) => {
            const Icon = windowIcons[o.value];
            return (
              <ChoiceCard key={o.value} type="checkbox" value={o.value} title={t(o.label)} hint={t(o.hint)} indicator="none" {...register("timeWindows")}>
                <Icon aria-hidden className="size-5 shrink-0 text-muted group-has-[:checked]:text-brand-700" />
              </ChoiceCard>
            );
          })}
        </div>
        <FieldError message={errors.timeWindows?.message} />
      </fieldset>
    </>
  );
}
