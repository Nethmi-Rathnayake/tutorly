"use client";

import { CalendarRange, Clock, Moon, Sun } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { ChoiceCard, FieldError, SectionTitle } from "@/components/forms/fields";
import { dayOptions, timeWindowOptions } from "@/lib/constants/tutor-request";

const windowIcons = { morning: Sun, "after-school": Clock, evening: Moon, weekend: CalendarRange } as const;

/** Shape shared by every form that asks for days and time windows. */
type AvailabilityShape = { days: string[]; timeWindows: string[] };

/** Day-of-week and time-window pickers shared by the parent request and tutor registration forms. */
export function AvailabilityFields({ startNumber = 1 }: { startNumber?: number }) {
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
                {days.length} {days.length === 1 ? "Day" : "Days"} Selected
              </span>
            }
          >
            Available Days of the Week
          </SectionTitle>
        </legend>
        <div className="grid grid-cols-7 gap-2">
          {dayOptions.map((d) => (
            <label key={d.value} className="group flex cursor-pointer flex-col items-center gap-1.5">
              <input type="checkbox" value={d.value} className="peer sr-only" {...register("days")} />
              <span className="grid size-10 place-items-center rounded-full bg-lavender text-sm font-semibold text-ink transition-all group-hover:bg-brand-100 peer-checked:bg-linear-to-br peer-checked:from-brand-700 peer-checked:to-violet-brand peer-checked:text-white peer-checked:shadow-md peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500 sm:size-11">
                {d.short}
              </span>
              <span className="text-[10px] text-muted peer-checked:font-semibold peer-checked:text-brand-700">{d.label}</span>
            </label>
          ))}
        </div>
        <FieldError message={errors.days?.message} />
      </fieldset>

      <fieldset>
        <legend className="w-full">
          <SectionTitle number={startNumber + 1}>Preferred Time Windows</SectionTitle>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {timeWindowOptions.map((o) => {
            const Icon = windowIcons[o.value];
            return (
              <ChoiceCard key={o.value} type="checkbox" value={o.value} title={o.label} hint={o.hint} indicator="none" {...register("timeWindows")}>
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
