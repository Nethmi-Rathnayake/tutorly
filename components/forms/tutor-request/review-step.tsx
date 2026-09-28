"use client";

import {
  BookOpen,
  Building2,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  FileText,
  GraduationCap,
  Mail,
  Pencil,
  Phone,
  TrendingUp,
  UserCheck,
  Users,
  Video,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { FieldError } from "@/components/forms/fields";
import { curricula } from "@/lib/constants/taxonomy";
import {
  contactChannelOptions,
  relationshipOptions,
  dayOptions,
  durationOptions,
  examSessionOptions,
  GRADE_SCALE_MAX,
  lessonsPerWeekOptions,
  modeOptions,
  timeWindowOptions,
  urgencyOptions,
} from "@/lib/constants/tutor-request";
import { formatBytes } from "@/lib/utils/format";
import { OTHER_SUBJECT, type TutorRequestValues } from "@/lib/validations/tutor-request";

const labelOf = <T extends { value: string; label: string }>(opts: readonly T[], v?: string) =>
  opts.find((o) => o.value === v)?.label ?? "—";

function SummaryCard({
  title,
  icon: Icon,
  onEdit,
  children,
  className,
}: {
  title: string;
  icon: typeof Users;
  onEdit: () => void;
  children: React.ReactNode;
  className?: string;
}) {
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
          Edit<span className="sr-only"> {title}</span>
        </button>
      </div>
      {children}
    </section>
  );
}

const Tag = ({ children, tone = "indigo" }: { children: React.ReactNode; tone?: "indigo" | "violet" | "rose" }) => (
  <span
    className={
      tone === "violet"
        ? "rounded-md bg-violet-100 px-2 py-1 text-[11px] font-medium text-violet-800"
        : tone === "rose"
          ? "rounded-md bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-700"
          : "rounded-md bg-brand-100/80 px-2 py-1 text-[11px] font-medium text-brand-800"
    }
  >
    {children}
  </span>
);

export function ReviewStep({ onEdit, requestedTutorName }: { onEdit: (step: number) => void; requestedTutorName?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TutorRequestValues>();
  const v = useWatch({ control }) as Partial<TutorRequestValues>;

  const subject = v.subject === OTHER_SUBJECT ? v.customSubject : v.subject;
  const curriculum = curricula.find((c) => c.id === v.curriculum);
  const days = dayOptions.filter((d) => v.days?.includes(d.value)).map((d) => d.label);
  const windows = timeWindowOptions.filter((w) => v.timeWindows?.includes(w.value));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <SummaryCard title="Parent & Contact" icon={Users} onEdit={() => onEdit(0)}>
          <p className="text-base font-semibold text-ink">{v.parentName}</p>
          <p className="mt-2 flex items-center gap-2 text-xs text-muted">
            <Phone aria-hidden className="size-3.5 shrink-0" />
            {v.phoneCountry} {v.phone}
          </p>
          <p className="mt-1 flex items-center gap-2 text-xs text-muted">
            <Mail aria-hidden className="size-3.5 shrink-0" />
            <span className="truncate">{v.email}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>{labelOf(relationshipOptions, v.relationship)}</Tag>
            <Tag tone="violet">Preferred: {labelOf(contactChannelOptions, v.contactChannel)}</Tag>
          </div>
        </SummaryCard>

        <SummaryCard title="Student Profile & Ambition" icon={GraduationCap} onEdit={() => onEdit(1)}>
          <p className="flex items-center gap-2 text-base font-semibold text-ink">
            {v.studentName}
            {Number.isFinite(v.age) && <Tag>Age {v.age}</Tag>}
          </p>
          {v.school && (
            <p className="mt-2 flex items-center gap-2 text-xs text-muted">
              <Building2 aria-hidden className="size-3.5 shrink-0" />
              {v.school}
            </p>
          )}
          <p className="mt-1 flex items-center gap-2 text-xs text-muted">
            <BookOpen aria-hidden className="size-3.5 shrink-0" />
            {v.grade}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>
              Current: {v.currentGrade}/{GRADE_SCALE_MAX}
            </Tag>
            <Tag tone="violet">
              <TrendingUp aria-hidden className="mr-1 inline size-3" />
              Target: {v.targetGrade}/{GRADE_SCALE_MAX}
            </Tag>
          </div>
        </SummaryCard>

        <SummaryCard title="Subject & Delivery" icon={BookOpen} onEdit={() => onEdit(2)}>
          <p className="text-base font-semibold text-ink">{subject}</p>
          {!!v.additionalSubjects?.length && (
            <p className="mt-1 text-xs font-medium text-violet-brand">Also: {v.additionalSubjects.join(", ")}</p>
          )}
          <p className="mt-2 text-xs text-muted">{curriculum ? `${curriculum.name}${curriculum.detail ? ` — ${curriculum.detail}` : ""}` : ""}</p>
          <p className="mt-1 flex items-center gap-2 text-xs text-muted">
            <Video aria-hidden className="size-3.5 shrink-0" />
            {modeOptions.find((m) => m.value === v.mode)?.title}
            {v.mode === "in-person" && v.location ? ` • ${v.location}` : ""}
          </p>
        </SummaryCard>

        <SummaryCard title="Schedule & Frequency" icon={CalendarDays} onEdit={() => onEdit(3)}>
          <p className="text-base font-semibold text-ink">{days.join(", ") || "—"}</p>
          <p className="mt-2 text-xs text-muted">{windows.map((w) => `${w.label} (${w.hint})`).join(", ")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>{labelOf(lessonsPerWeekOptions, v.lessonsPerWeek)}</Tag>
            <Tag>{labelOf(durationOptions, v.duration)}</Tag>
          </div>
        </SummaryCard>

        <SummaryCard title="Notes & Milestones" icon={CalendarCheck} onEdit={() => onEdit(4)} className="md:col-span-2">
          <dl className="space-y-2 text-xs">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-muted">Exam Horizon:</dt>
              <dd className="text-right text-sm font-semibold text-ink">{labelOf(examSessionOptions(), v.examSession)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-muted">Start Urgency:</dt>
              <dd>
                <Tag tone="rose">{labelOf(urgencyOptions, v.urgency)}</Tag>
              </dd>
            </div>
          </dl>
          {v.challenges && <p className="mt-3 line-clamp-2 text-xs italic text-muted">“{v.challenges}”</p>}
          {v.attachment && (
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-white p-3">
              <FileText aria-hidden className="size-4 shrink-0 text-brand-600" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-ink">{v.attachment.name}</p>
                <p className="text-[10px] text-muted">{formatBytes(v.attachment.size)}</p>
              </div>
              <CheckCircle2 aria-hidden className="size-4 text-emerald-600" />
            </div>
          )}
        </SummaryCard>
      </div>

      {requestedTutorName && (
        <p className="flex items-center gap-2 rounded-2xl bg-brand-50 px-4 py-3 text-xs text-brand-800 ring-1 ring-brand-100">
          <UserCheck aria-hidden className="size-4 shrink-0" />
          You asked about <strong>{requestedTutorName}</strong>. Your academic director will check their availability first.
        </p>
      )}

      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-lavender/60 p-4 text-xs leading-relaxed text-muted has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-brand-700"
            aria-invalid={!!errors.consent || undefined}
            {...register("consent")}
          />
          <span>
            I confirm these details are accurate and agree to be contacted about this request. Contact details stay
            private and are only shared with a tutor after I confirm a trial match.
          </span>
        </label>
        <FieldError message={errors.consent?.message} />
      </div>
    </div>
  );
}
