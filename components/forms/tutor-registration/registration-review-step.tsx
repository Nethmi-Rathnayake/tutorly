"use client";

import Image from "next/image";
import { BookOpen, CalendarDays, GraduationCap, Mail, MapPin, Pencil, Phone, PenLine, UserRound } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { FieldError } from "@/components/forms/fields";
import { curricula, educationLevels } from "@/lib/constants/taxonomy";
import {
  experienceOptions,
  qualificationOptions,
  teachingMethodOptions,
  tutorModeOptions,
} from "@/lib/constants/tutor-registration";
import { dayOptions, timeWindowOptions } from "@/lib/constants/tutor-request";
import { useT } from "@/lib/i18n/client";
import { OTHER_SUBJECT } from "@/lib/validations/common";
import type { TutorRegistrationValues } from "@/lib/validations/tutor-registration";

const labelOf = <T extends { value: string; label: string }>(opts: readonly T[], v?: string) =>
  opts.find((o) => o.value === v)?.label ?? "—";

function Card({
  title,
  icon: Icon,
  onEdit,
  className,
  children,
}: {
  title: string;
  icon: typeof UserRound;
  onEdit: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const t = useT();
  return (
    <section className={`rounded-2xl bg-lavender/70 p-5 ring-1 ring-brand-100/60 ${className ?? ""}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
          <span className="grid size-8 place-items-center rounded-lg bg-white text-brand-600">
            <Icon aria-hidden className="size-4" />
          </span>
          {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-brand-600 hover:bg-white"
        >
          <Pencil aria-hidden className="size-3" />
          {t("Edit")}
          <span className="sr-only"> {title}</span>
        </button>
      </div>
      {children}
    </section>
  );
}

const Tags = ({ items }: { items: string[] }) => (
  <ul className="mt-2 flex flex-wrap gap-1.5">
    {items.map((item) => (
      <li key={item} className="rounded-md bg-brand-100/80 px-2 py-1 text-[11px] font-medium text-brand-800">
        {item}
      </li>
    ))}
  </ul>
);

export function RegistrationReviewStep({ photoUrl, onEdit }: { photoUrl?: string; onEdit: (step: number) => void }) {
  const t = useT();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TutorRegistrationValues>();
  const v = useWatch({ control }) as Partial<TutorRegistrationValues>;

  const subjects = (v.subjects ?? []).map((s) => (s === OTHER_SUBJECT && v.customSubject ? v.customSubject : t(s)));
  const levels = educationLevels.filter((l) => v.levels?.includes(l.id)).map((l) => t(l.name));
  const curriculumNames = curricula.filter((c) => v.curricula?.includes(c.id)).map((c) => t(c.detail || c.name));
  const days = dayOptions.filter((d) => v.days?.includes(d.value)).map((d) => t(d.label));
  const windows = timeWindowOptions.filter((w) => v.timeWindows?.includes(w.value)).map((w) => t(w.label));
  const methods = teachingMethodOptions.filter((m) => v.teachingMethods?.includes(m.value)).map((m) => t(m.label));
  const label = <T extends { value: string; label: string }>(opts: readonly T[], value?: string) => t(labelOf(opts, value));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title={t("Personal Details")} icon={UserRound} onEdit={() => onEdit(0)}>
          <div className="flex items-center gap-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-brand-100">
              {photoUrl ? (
                <Image src={photoUrl} alt={t("Your headshot")} fill unoptimized sizes="64px" className="object-cover" />
              ) : (
                <span className="grid size-full place-items-center text-brand-300">
                  <UserRound aria-hidden className="size-7" />
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-ink">{v.fullName}</p>
              <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                <Mail aria-hidden className="size-3.5 shrink-0" />
                <span className="truncate">{v.email}</span>
              </p>
              <p className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                <Phone aria-hidden className="size-3.5 shrink-0" />
                <span dir="ltr">
                  {v.phoneCountry} {v.phone}
                </span>
              </p>
            </div>
          </div>
        </Card>

        <Card title={t("Qualifications")} icon={GraduationCap} onEdit={() => onEdit(1)}>
          <p className="text-base font-semibold text-ink">{label(qualificationOptions, v.qualification)}</p>
          <p className="mt-1 text-xs text-muted">{v.institution}</p>
          <p className="mt-1 text-xs text-muted">
            {t("Experience: {value}", { value: label(experienceOptions, v.experience) })}
          </p>
          {v.additionalQualifications && <p className="mt-2 line-clamp-2 text-xs italic text-muted">{v.additionalQualifications}</p>}
        </Card>

        <Card title={t("Subjects, Levels & Curricula")} icon={BookOpen} onEdit={() => onEdit(1)} className="md:col-span-2">
          <p className="text-xs font-semibold text-ink">{t("Subjects")}</p>
          <Tags items={subjects} />
          <p className="mt-3 text-xs font-semibold text-ink">{t("Education levels")}</p>
          <Tags items={levels} />
          <p className="mt-3 text-xs font-semibold text-ink">{t("Curricula")}</p>
          <Tags items={curriculumNames} />
        </Card>

        <Card title={t("Availability")} icon={CalendarDays} onEdit={() => onEdit(2)}>
          <p className="text-base font-semibold text-ink">{label(tutorModeOptions, v.mode)}</p>
          {v.mode !== "online" && v.locations && (
            <p className="mt-1 flex items-center gap-2 text-xs text-muted">
              <MapPin aria-hidden className="size-3.5 shrink-0" />
              {v.locations}
            </p>
          )}
          <p className="mt-2 text-xs text-muted">{days.join(t(", "))}</p>
          <p className="text-xs text-muted">{windows.join(t(", "))}</p>
        </Card>

        <Card title={t("Pedagogy")} icon={PenLine} onEdit={() => onEdit(3)}>
          <p className="line-clamp-3 text-xs leading-relaxed text-muted">{v.bio}</p>
          <Tags items={methods} />
        </Card>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-lavender/60 p-4 text-xs leading-relaxed text-muted has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-brand-700"
            aria-invalid={!!errors.consent || undefined}
            {...register("consent")}
          />
          <span>
            {t(
              "I confirm these details are accurate. I consent to Tutorly verifying my identity, qualifications and background, and to being contacted by the placement team about my application.",
            )}
          </span>
        </label>
        <FieldError message={errors.consent?.message} />
      </div>
    </div>
  );
}
