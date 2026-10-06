"use client";

import { BookOpen, GraduationCap, Layers, Library, School, X } from "lucide-react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Field, FieldError, PillToggle, SectionTitle, TextInput } from "@/components/forms/fields";
import { SubjectCombobox } from "@/components/forms/subject-combobox";
import { curricula, educationLevels, subjectCategories } from "@/lib/constants/taxonomy";
import { experienceOptions, qualificationOptions } from "@/lib/constants/tutor-registration";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";
import { OTHER_SUBJECT } from "@/lib/validations/common";
import type { TutorRegistrationValues } from "@/lib/validations/tutor-registration";
import { Select } from "@/components/ui/select";

const selectClass =
  "h-12 w-full cursor-pointer appearance-none rounded-xl bg-lavender ps-4 pe-10 text-sm text-ink outline-none ring-1 transition focus:bg-white focus:ring-2 focus:ring-brand-300";

export function TeachingStep() {
  const t = useT();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TutorRegistrationValues>();
  const subjects = useWatch({ control, name: "subjects" }) ?? [];

  return (
    <div className="space-y-9">
      <section aria-labelledby="subjects-title">
        <SectionTitle id="subjects-title" icon={BookOpen} aside={`${subjects.length} / 8`}>
          {t("Subjects You Teach")}
        </SectionTitle>
        <Controller
          control={control}
          name="subjects"
          render={({ field }) => (
            <>
              <SubjectCombobox
                id="subjects"
                value=""
                invalid={!!errors.subjects}
                onBlur={field.onBlur}
                onChange={(s) => {
                  if (s && !field.value.includes(s) && field.value.length < 8) field.onChange([...field.value, s]);
                }}
              />
              {field.value.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2" aria-label={t("Selected subjects")}>
                  {field.value.map((s) => {
                    const category = subjectCategories.find((c) => c.subjects.includes(s));
                    return (
                      <li key={s}>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100/80 py-1 ps-3 pe-1 text-xs font-medium text-brand-800">
                          {t(s)}
                          {category && <span className="text-[10px] text-brand-600/80">· {t(category.name)}</span>}
                          <button
                            type="button"
                            onClick={() => field.onChange(field.value.filter((x) => x !== s))}
                            aria-label={t("Remove {name}", { name: t(s) })}
                            className="grid size-6 place-items-center rounded-full hover:bg-white"
                          >
                            <X aria-hidden className="size-3.5" />
                          </button>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        />
        <FieldError id="subjects-error" message={errors.subjects?.message} />
        {subjects.includes(OTHER_SUBJECT) && (
          <Field id="customSubject" label={t("Please specify the other subject")} required error={errors.customSubject?.message} className="mt-4">
            <TextInput id="customSubject" placeholder={t("e.g. Latin, Music Theory")} invalid={!!errors.customSubject} {...register("customSubject")} />
          </Field>
        )}
      </section>

      <fieldset>
        <legend className="w-full">
          <SectionTitle icon={Layers} aside={t("Select all that apply")}>
            {t("Education Levels")}
          </SectionTitle>
        </legend>
        <div className="flex flex-wrap gap-2">
          {educationLevels.map((l) => (
            <PillToggle key={l.id} value={l.id} label={t(l.name)} {...register("levels")} />
          ))}
        </div>
        <FieldError message={errors.levels?.message} />
      </fieldset>

      <fieldset>
        <legend className="w-full">
          <SectionTitle icon={Library} aside={t("Select all that apply")}>
            {t("Curricula & Exam Boards")}
          </SectionTitle>
        </legend>
        <div className="flex flex-wrap gap-2">
          {curricula.map((c) => (
            <PillToggle key={c.id} value={c.id} label={c.detail ? `${t(c.name)} (${t(c.detail)})` : t(c.name)} tone="violet" {...register("curricula")} />
          ))}
        </div>
        <FieldError message={errors.curricula?.message} />
      </fieldset>

      <section aria-labelledby="credentials-title">
        <SectionTitle id="credentials-title" icon={GraduationCap}>
          {t("Experience & Qualifications")}
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="experience" label={t("Teaching Experience")} required error={errors.experience?.message}>
            <div className="relative">
              <Select
                id="experience"
                defaultValue=""
                aria-invalid={!!errors.experience || undefined}
                aria-describedby={errors.experience ? "experience-error" : undefined}
                className={cn(selectClass, errors.experience ? "ring-rose-300" : "ring-transparent")}
                {...register("experience")}
              >
                <option value="" disabled>
                  {t("Select experience")}
                </option>
                {experienceOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {t(o.label)}
                  </option>
                ))}
              </Select>
            </div>
          </Field>
          <Field id="qualification" label={t("Highest Qualification Earned")} required error={errors.qualification?.message}>
            <div className="relative">
              <Select
                id="qualification"
                defaultValue=""
                aria-invalid={!!errors.qualification || undefined}
                aria-describedby={errors.qualification ? "qualification-error" : undefined}
                className={cn(selectClass, errors.qualification ? "ring-rose-300" : "ring-transparent")}
                {...register("qualification")}
              >
                <option value="" disabled>
                  {t("Select qualification")}
                </option>
                {qualificationOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {t(o.label)}
                  </option>
                ))}
              </Select>
            </div>
          </Field>
          <Field id="institution" label={t("Primary University / Alma Mater")} hint={t("Optional")} error={errors.institution?.message} className="sm:col-span-2">
            <TextInput id="institution" icon={School} placeholder={t("e.g. University of Cambridge")} invalid={!!errors.institution} {...register("institution")} />
          </Field>
          <Field
            id="additionalQualifications"
            label={t("Other Qualifications & Certifications")}
            hint={t("Optional")}
            error={errors.additionalQualifications?.message}
            className="sm:col-span-2"
          >
            <textarea
              id="additionalQualifications"
              rows={3}
              maxLength={400}
              placeholder={t("e.g. PGCE, IB examiner, Cambridge International moderator, published research…")}
              className="w-full resize-y rounded-xl bg-lavender p-4 text-sm leading-relaxed text-ink outline-none ring-1 ring-transparent transition placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-brand-300"
              {...register("additionalQualifications")}
            />
          </Field>
        </div>
      </section>
    </div>
  );
}
