"use client";

import {
  BadgeCheck,
  FileDown,
  MapPin,
  PenTool,
  Plus,
  ShieldCheck,
  Video,
  X,
} from "lucide-react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ChoiceCard, Field, FieldError, SectionTitle, TextInput } from "@/components/forms/fields";
import { AvailabilityFields } from "@/components/forms/availability-fields";
import { SubjectCombobox } from "@/components/forms/subject-combobox";
import { curricula, subjectCategories } from "@/lib/constants/taxonomy";
import {
  durationOptions,
  lessonsPerWeekOptions,
  modeOptions,
} from "@/lib/constants/tutor-request";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";
import { OTHER_SUBJECT, type TutorRequestValues } from "@/lib/validations/tutor-request";

const modeIcons = { online: Video, "in-person": MapPin } as const;
const featureIcons = [
  [PenTool, FileDown],
  [ShieldCheck, BadgeCheck],
] as const;

/** Renders either the subject/curriculum/format fields or the schedule fields of the request. */
export function TutoringStep({ part, requestedTutorName }: { part: "subject" | "schedule"; requestedTutorName?: string }) {
  const t = useT();
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TutorRequestValues>();
  const [subject, additional = [], mode] = useWatch({
    control,
    name: ["subject", "additionalSubjects", "mode"],
  });

  const category = subjectCategories.find((c) => c.subjects.includes(subject));
  // Related subjects: siblings from the same category first, then popular cross-category picks.
  const bundle = [...(category?.subjects ?? []), "Physics", "Chemistry", "Computer Science / Information Technology (IT)"]
    .filter((s, i, arr) => s !== subject && s !== OTHER_SUBJECT && s !== "All Primary Subjects" && arr.indexOf(s) === i)
    .slice(0, 3);

  const toggleAdditional = (s: string) =>
    setValue(
      "additionalSubjects",
      additional.includes(s) ? additional.filter((x) => x !== s) : [...additional, s].slice(0, 3),
      { shouldDirty: true },
    );

  if (part === "schedule") return <ScheduleFields />;

  return (
    <div className="space-y-9">
      {requestedTutorName && (
        <p className="rounded-2xl bg-brand-50 px-4 py-3 text-xs text-brand-800 ring-1 ring-brand-100">
          {t("You asked about")} <strong>{requestedTutorName}</strong>
          {t(". Your academic director will check their availability first.")}
        </p>
      )}

      <section aria-labelledby="subject-title">
        <SectionTitle id="subject-title" number={1} aside={t("Required")}>
          {t("Primary Academic Subject Needed")}
        </SectionTitle>
        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <SubjectCombobox
              id="subject"
              value={field.value ?? ""}
              onChange={(v) => field.onChange(v)}
              onBlur={field.onBlur}
              invalid={!!errors.subject}
            />
          )}
        />
        <FieldError id="subject-error" message={errors.subject?.message} />

        {subject === OTHER_SUBJECT && (
          <Field id="customSubject" label={t("Please specify the subject")} required error={errors.customSubject?.message} className="mt-4">
            <TextInput id="customSubject" placeholder={t("e.g. Latin, Music Theory")} invalid={!!errors.customSubject} {...register("customSubject")} />
          </Field>
        )}

        {subject && subject !== OTHER_SUBJECT && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-muted">{t("Add related subjects (optional):")}</span>
            {bundle.map((s) => {
              const on = additional.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleAdditional(s)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors",
                    on ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100",
                  )}
                >
                  {on ? <X aria-hidden className="size-3" /> : <Plus aria-hidden className="size-3" />}
                  {t(s)}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <fieldset>
        <legend className="w-full">
          <SectionTitle number={2}>{t("Target Curriculum & Exam Board")}</SectionTitle>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {curricula.map((c) => (
            <ChoiceCard key={c.id} value={c.id} title={t(c.name)} hint={t(c.detail || "Syllabus-aligned tutors")} {...register("curriculum")} />
          ))}
        </div>
        <FieldError message={errors.curriculum?.message} />
      </fieldset>

      <fieldset>
        <legend className="w-full">
          <SectionTitle number={3}>{t("Preferred Delivery Format")}</SectionTitle>
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {modeOptions.map((m, idx) => {
            const Icon = modeIcons[m.value];
            return (
              <label
                key={m.value}
                className="group relative flex cursor-pointer flex-col rounded-2xl bg-lavender/70 p-5 ring-1 ring-transparent transition-all hover:bg-lavender has-[:checked]:bg-white has-[:checked]:shadow-[0_24px_50px_-28px_rgba(79,63,217,0.6)] has-[:checked]:ring-brand-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500"
              >
                <input type="radio" value={m.value} className="sr-only" {...register("mode")} />
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-100 text-brand-700 group-has-[:checked]:bg-linear-to-br group-has-[:checked]:from-brand-700 group-has-[:checked]:to-violet-brand group-has-[:checked]:text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted group-has-[:checked]:bg-brand-700 group-has-[:checked]:text-white">
                    {t(m.tag)}
                  </span>
                </div>
                <span className="mt-4 text-base font-bold text-ink">{t(m.title)}</span>
                <span className="mt-1 text-xs leading-relaxed text-muted">{t(m.description)}</span>
                <ul className="mt-4 space-y-1.5 rounded-xl bg-white/70 p-3">
                  {m.features.map((f, fi) => {
                    const FIcon = featureIcons[idx][fi];
                    return (
                      <li key={f} className="flex items-center gap-2 text-[11px] text-ink/80">
                        <FIcon aria-hidden className="size-3.5 text-brand-600" />
                        {t(f)}
                      </li>
                    );
                  })}
                </ul>
              </label>
            );
          })}
        </div>
        <FieldError message={errors.mode?.message} />
        {mode === "in-person" && (
          <Field id="location" label={t("Preferred location for in-person lessons")} required error={errors.location?.message} className="mt-4">
            <TextInput id="location" icon={MapPin} placeholder={t("e.g. Jumeirah, Dubai or Kensington, London")} invalid={!!errors.location} {...register("location")} />
          </Field>
        )}
      </fieldset>

    </div>
  );
}

function ScheduleFields() {
  const t = useT();
  const { register } = useFormContext<TutorRequestValues>();

  return (
    <div className="space-y-9">
      <section aria-labelledby="frequency-title">
        <SectionTitle id="frequency-title" number={1}>
          {t("Weekly Frequency & Session Duration")}
        </SectionTitle>
        <fieldset>
          <legend className="mb-2 text-xs text-muted">{t("Lessons per week")}</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {lessonsPerWeekOptions.map((o) => (
              <ChoiceCard key={o.value} value={o.value} title={t(o.label)} hint={t(o.hint)} indicator="none" selectedTone="solid" {...register("lessonsPerWeek")} />
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-5">
          <legend className="mb-2 text-xs text-muted">{t("Session duration")}</legend>
          <div className="flex flex-wrap gap-2">
            {durationOptions.map((o) => (
              <label
                key={o.value}
                className="inline-flex h-10 cursor-pointer items-center rounded-full bg-lavender px-4 text-xs font-medium text-ink/80 transition-all hover:bg-brand-100 has-[:checked]:bg-violet-brand has-[:checked]:font-semibold has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500"
              >
                <input type="radio" value={o.value} className="sr-only" {...register("duration")} />
                {t(o.label)}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <AvailabilityFields startNumber={2} />
    </div>
  );
}
