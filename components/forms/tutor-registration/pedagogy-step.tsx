"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { FieldError, PillToggle } from "@/components/forms/fields";
import { teachingMethodOptions } from "@/lib/constants/tutor-registration";
import { cn } from "@/lib/utils/cn";
import type { TutorRegistrationValues } from "@/lib/validations/tutor-registration";

function LongText({
  id,
  label,
  hint,
  required,
  rows,
  min,
  max,
  placeholder,
}: {
  id: "bio" | "teachingApproach" | "additionalInfo";
  label: string;
  hint: string;
  required?: boolean;
  rows: number;
  min?: number;
  max: number;
  placeholder: string;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TutorRegistrationValues>();
  const value = useWatch({ control, name: id }) ?? "";
  const error = errors[id]?.message;

  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-ink">
        {label}
        {required && (
          <>
            <span aria-hidden className="ml-0.5 text-rose-500">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      <p id={`${id}-help`} className="mb-2 mt-0.5 text-xs text-muted">
        {hint}
      </p>
      <textarea
        id={id}
        rows={rows}
        maxLength={max}
        placeholder={placeholder}
        aria-invalid={!!error || undefined}
        aria-describedby={`${id}-help ${id}-count${error ? ` ${id}-error` : ""}`}
        className={cn(
          "w-full resize-y rounded-2xl bg-lavender p-4 text-sm leading-relaxed text-ink outline-none ring-1 transition placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-brand-300",
          error ? "ring-rose-300" : "ring-transparent",
        )}
        {...register(id)}
      />
      <p id={`${id}-count`} aria-live="polite" className="mt-1 text-right text-[11px] text-muted">
        {value.length} / {max}
        {min ? ` (min. ${min})` : ""}
      </p>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function PedagogyStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TutorRegistrationValues>();

  return (
    <div className="space-y-7">
      <LongText
        id="bio"
        label="Short Professional Biography"
        hint="Your academic background and teaching experience, written for parents."
        required
        rows={5}
        min={80}
        max={800}
        placeholder="e.g. I read Natural Sciences at Cambridge and have taught A-Level Physics for eight years…"
      />
      <LongText
        id="teachingApproach"
        label="Teaching Approach"
        hint="How you structure lessons, check understanding and adapt to different learners."
        required
        rows={5}
        min={50}
        max={1000}
        placeholder="e.g. I start each course with a diagnostic, then build from first principles before moving to exam-style questions…"
      />

      <fieldset>
        <legend className="mb-2 text-[13px] font-medium text-ink">
          Teaching Methods<span aria-hidden className="ml-0.5 text-rose-500">*</span>
          <span className="sr-only"> (required)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {teachingMethodOptions.map((o, i) => (
            <PillToggle key={o.value} value={o.value} label={o.label} tone={i % 2 ? "violet" : "indigo"} {...register("teachingMethods")} />
          ))}
        </div>
        <FieldError message={errors.teachingMethods?.message} />
      </fieldset>

      <LongText
        id="additionalInfo"
        label="Additional Information"
        hint="Optional: anything else our placement team should know (e.g. languages, SEN experience)."
        rows={3}
        max={500}
        placeholder="e.g. Fluent in French; experienced with dyslexic learners…"
      />
    </div>
  );
}
