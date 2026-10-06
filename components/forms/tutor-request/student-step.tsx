"use client";

import { Cake, CalendarDays, Eye, Heart, IdCard, Rocket, School, Sigma, Star, Timer, TrendingUp } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { ChoiceCard, Field, FieldError, PillToggle, TextInput } from "@/components/forms/fields";
import { educationLevels } from "@/lib/constants/taxonomy";
import { GRADE_SCALE_MAX, learningStyleOptions } from "@/lib/constants/tutor-request";
import { useT } from "@/lib/i18n/client";
import type { TutorRequestValues } from "@/lib/validations/tutor-request";

const styleIcons = {
  visual: Eye,
  "exam-drills": Timer,
  "step-by-step": Sigma,
  confidence: Heart,
  independent: Rocket,
} as const;

const levelHints: Record<string, string> = {
  "early-years": "KG1 / FS1 – KG2 / FS2",
  primary: "Grade 1–5 / Year 2–6",
  middle: "Grade 6–8 / Year 7–9",
  "high-school": "Grade 9–12 / Year 10–13",
  "higher-education": "University & Postgraduate",
};

/** A rough, clearly-labelled suggestion — not a promise of outcomes. */
function suggestedHours(delta: number) {
  if (delta <= 0) return 1;
  if (delta === 1) return 1.5;
  if (delta === 2) return 2.5;
  return 3.5;
}

export function StudentStep() {
  const t = useT();
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<TutorRequestValues>();

  const [levelGroup, currentGrade, targetGrade] = useWatch({
    control,
    name: ["levelGroup", "currentGrade", "targetGrade"],
  });
  const group = educationLevels.find((l) => l.id === levelGroup);
  const delta = (targetGrade ?? 0) - (currentGrade ?? 0);
  const today = new Date().toISOString().slice(0, 10);

  const pct = (v: number) => ((v - 1) / (GRADE_SCALE_MAX - 1)) * 100;
  const fillDirection = "right";

  return (
    <div className="space-y-7">
      <Field
        id="studentName"
        label={t("Student Full Legal Name")}
        required
        hint={t("Confidential intake only")}
        error={errors.studentName?.message}
      >
        <TextInput id="studentName" icon={IdCard} placeholder={t("e.g. Alexander Vance")} invalid={!!errors.studentName} {...register("studentName")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="age" label={t("Student Age")} required error={errors.age?.message}>
          <TextInput
            id="age"
            type="number"
            inputMode="numeric"
            min={3}
            max={99}
            icon={Cake}
            placeholder={t("e.g. 16")}
            invalid={!!errors.age}
            {...register("age", { valueAsNumber: true })}
          />
        </Field>
        <Field id="dateOfBirth" label={t("Date of Birth")} hint={t("Optional")} error={errors.dateOfBirth?.message}>
          <TextInput id="dateOfBirth" type="date" max={today} icon={CalendarDays} invalid={!!errors.dateOfBirth} {...register("dateOfBirth")} />
        </Field>
      </div>

      <Field id="school" label={t("Current School or College")} hint={t("Optional")} error={errors.school?.message}>
        <TextInput id="school" icon={School} placeholder={t("e.g. Westminster School, London")} invalid={!!errors.school} {...register("school")} />
      </Field>

      <fieldset>
        <div className="mb-2 flex items-baseline justify-between">
          <legend className="text-[13px] font-medium text-ink">
            {t("Current Education Level")} <span aria-hidden className="text-rose-500">*</span>
            <span className="sr-only"> {t("(required)")}</span>
          </legend>
          <span className="text-[11px] font-medium text-brand-600">{t("Then choose grade / year")}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {educationLevels.map((l) => (
            <ChoiceCard
              key={l.id}
              value={l.id}
              title={t(l.name)}
              hint={t(levelHints[l.id])}
              indicator="check"
              selectedTone="solid"
              {...register("levelGroup", {
                onChange: () => setValue("grade", "" as TutorRequestValues["grade"], { shouldValidate: false }),
              })}
            />
          ))}
        </div>
        <FieldError message={errors.levelGroup?.message} />

        {group && (
          <div className="mt-4 rounded-2xl bg-lavender/60 p-4">
            <p id="grade-label" className="mb-2 text-xs font-semibold text-ink">
              {t("{level}: select grade / year", { level: t(group.name) })}
            </p>
            <div role="radiogroup" aria-labelledby="grade-label" className="flex flex-wrap gap-2">
              {group.options.map((opt) => (
                <PillToggle key={opt} type="radio" value={opt} label={t(opt)} {...register("grade")} />
              ))}
            </div>
            <FieldError message={errors.grade?.message} />
          </div>
        )}
        {!group && errors.grade && !errors.levelGroup && <FieldError message={errors.grade.message} />}
      </fieldset>

      <fieldset>
        <div className="mb-2 flex items-baseline justify-between">
          <legend className="text-[13px] font-medium text-ink">{t("Learning Style & Personality Dynamics")}</legend>
          <span className="text-[11px] text-muted">{t("Pick all that apply")}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {learningStyleOptions.map((o, i) => (
            <PillToggle
              key={o.value}
              value={o.value}
              label={t(o.label)}
              icon={styleIcons[o.value]}
              tone={i === 1 ? "violet" : "indigo"}
              {...register("learningStyles")}
            />
          ))}
        </div>
      </fieldset>

      <div>
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-[13px] font-medium text-ink">{t("Current Predicted Grade vs. Target Ambition")}</p>
            <p className="text-[11px] text-muted">
              {t("Use a 1–{max} scale (IB-style); pick the nearest equivalent for other curricula.", { max: GRADE_SCALE_MAX })}
            </p>
          </div>
          {delta > 0 && (
            <span className="rounded-full bg-brand-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700">
              {t("+{delta} Grade Uplift Target", { delta })}
            </span>
          )}
        </div>

        <div className="grid gap-4 rounded-2xl bg-lavender/70 p-4 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-4">
            <div className="flex items-baseline justify-between">
              <label htmlFor="currentGrade" className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                {t("Current Predicted")}
              </label>
              <span className="text-lg font-bold text-ink">
                {t("Grade {grade} / {max}", { grade: currentGrade, max: GRADE_SCALE_MAX })}
              </span>
            </div>
            <input
              id="currentGrade"
              type="range"
              min={1}
              max={GRADE_SCALE_MAX}
              step={1}
              aria-valuetext={t("Grade {grade} of {max}", { grade: currentGrade, max: GRADE_SCALE_MAX })}
              style={{
                background: `linear-gradient(to ${fillDirection}, var(--color-brand-700) ${pct(currentGrade ?? 1)}%, var(--color-brand-100) ${pct(currentGrade ?? 1)}%)`,
              }}
              className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-brand-700 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-700"
              {...register("currentGrade", { valueAsNumber: true })}
            />
            <div aria-hidden className="mt-2 flex justify-between text-[10px] text-muted">
              <span>{t("Baseline (3)")}</span>
              <span>{t("Average (4–5)")}</span>
              <span>{t("Distinction (7)")}</span>
            </div>
          </div>

          <div className="rounded-xl bg-white p-4">
            <div className="flex items-baseline justify-between">
              <label htmlFor="targetGrade" className="text-[10px] font-bold uppercase tracking-[0.12em] text-violet-brand">
                {t("Target Ambition")}
              </label>
              <span className="flex items-center gap-1 text-lg font-bold text-violet-brand">
                {t("Grade {grade} / {max}", { grade: targetGrade, max: GRADE_SCALE_MAX })}
                <Star aria-hidden className="size-4" />
              </span>
            </div>
            <input
              id="targetGrade"
              type="range"
              min={1}
              max={GRADE_SCALE_MAX}
              step={1}
              aria-valuetext={t("Grade {grade} of {max}", { grade: targetGrade, max: GRADE_SCALE_MAX })}
              aria-invalid={!!errors.targetGrade || undefined}
              style={{
                background: `linear-gradient(to ${fillDirection}, var(--color-violet-brand) ${pct(targetGrade ?? 1)}%, var(--color-brand-100) ${pct(targetGrade ?? 1)}%)`,
              }}
              className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-violet-brand [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-brand"
              {...register("targetGrade", { valueAsNumber: true })}
            />
            <div aria-hidden className="mt-2 flex justify-between text-[10px] text-muted">
              <span>{t("Realistic (5)")}</span>
              <span>{t("Target (6)")}</span>
              <span className="font-semibold text-violet-brand">{t("Top Band (7)")}</span>
            </div>
          </div>
        </div>
        <FieldError message={errors.targetGrade?.message} />

        <div className="mt-4 flex items-center gap-4 rounded-2xl bg-linear-to-r from-brand-50 to-lavender p-4 ring-1 ring-brand-100">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-700 to-violet-brand text-white">
            <TrendingUp aria-hidden className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">{t("Target Velocity Calibration")}</p>
            <p className="text-xs text-muted">
              {t(
                "Suggested starting point: {hours} hours / week with a subject specialist. Your tutor will refine this after the first session.",
                { hours: suggestedHours(delta) },
              )}
            </p>
          </div>
          <svg aria-hidden viewBox="0 0 120 32" className="hidden h-8 w-28 shrink-0 text-violet-brand sm:block rtl:-scale-x-100">
            <path d="M2 28 C 40 28, 60 10, 116 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="116" cy="6" r="3" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}
