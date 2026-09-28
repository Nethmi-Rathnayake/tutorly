 "use client";

import { useRef, useState } from "react";
import { CalendarCheck, FileText, GraduationCap, ListChecks, ShieldCheck, UploadCloud, X, Zap } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { ChoiceCard, FieldError, SectionTitle } from "@/components/forms/fields";
import { SegmentedControl } from "@/components/ui/segmented-control";
import {
  examSessionOptions,
  tutorGenderOptions,
  tutorPreferenceOptions,
  UPLOAD_ACCEPT,
  UPLOAD_MAX_BYTES,
  urgencyOptions,
} from "@/lib/constants/tutor-request";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format";
import type { TutorRequestValues } from "@/lib/validations/tutor-request";

export function GoalsStep() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TutorRequestValues>();
  const [challenges = "", attachment, tutorGender = "any"] = useWatch({
    control,
    name: ["challenges", "attachment", "tutorGender"],
  });
  const fileInput = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState<string>();
  const sessions = examSessionOptions();

  const acceptFile = (file: File | undefined) => {
    if (!file) return;
    if (!(file.type in UPLOAD_ACCEPT)) return setFileError("Upload a PDF, PNG, JPG or DOCX file.");
    if (file.size > UPLOAD_MAX_BYTES) return setFileError("Files must be 25MB or smaller.");
    setFileError(undefined);
    // Only metadata is kept for now; the file itself needs object storage (SRS §18) before it can be submitted.
    setValue("attachment", { name: file.name, size: file.size, type: file.type }, { shouldDirty: true });
  };

  return (
    <div className="space-y-9">
      <fieldset>
        <legend className="w-full">
          <SectionTitle icon={CalendarCheck} aside="Required">
            Upcoming Exam Session / Target Milestone
          </SectionTitle>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {sessions.map((o) => (
            <ChoiceCard key={o.value} value={o.value} title={o.label} hint={o.hint} {...register("examSession")} />
          ))}
        </div>
        <FieldError message={errors.examSession?.message} />
      </fieldset>

      <section>
        <SectionTitle icon={ListChecks} aside={<span className="text-brand-600">Examiner Guidance</span>}>
          <label htmlFor="challenges">Key Academic Challenges & Specific Focus Areas</label>
        </SectionTitle>
        <p id="challenges-help" className="-mt-1 mb-3 text-xs text-muted">
          Describe recent quiz trends, test anxieties, specific topic blind spots, or grading criteria requirements.
        </p>
        <textarea
          id="challenges"
          rows={5}
          maxLength={1000}
          aria-describedby="challenges-help challenges-count"
          aria-invalid={!!errors.challenges || undefined}
          placeholder="e.g. Aiming for a 7 in IB Physics HL. Strong in Mechanics but loses marks on Paper 2 Section B derivations…"
          className="w-full resize-y rounded-2xl bg-lavender p-4 text-sm leading-relaxed text-ink outline-none ring-1 ring-transparent transition placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-brand-300"
          {...register("challenges")}
        />
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted">
          <span className="flex items-center gap-1">
            <ShieldCheck aria-hidden className="size-3.5" />
            Shared only with shortlisted tutors
          </span>
          <span id="challenges-count" aria-live="polite">
            {challenges.length} / 1000 characters
          </span>
        </div>
        <FieldError message={errors.challenges?.message} />
      </section>

      <section>
        <SectionTitle icon={FileText}>
          Diagnostic Past Paper / School Report Upload <span className="font-normal text-muted">(Optional)</span>
        </SectionTitle>
        <p className="-mt-1 mb-3 text-xs text-muted">
          Attach recent marked scripts, diagnostic assessments, or learning reports to improve matching accuracy.
        </p>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            acceptFile(e.dataTransfer.files[0]);
          }}
          className={cn(
            "flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors",
            dragging ? "border-brand-400 bg-brand-50" : "border-transparent bg-lavender/70",
          )}
        >
          <span className="grid size-11 place-items-center rounded-full bg-brand-100 text-brand-700">
            <UploadCloud aria-hidden className="size-5" />
          </span>
          <p className="mt-3 text-sm text-ink">Drag & drop recent mock papers, test results, or teacher reports</p>
          <p className="mt-1 text-xs text-muted">PDF, PNG, JPG, or DOCX up to 25MB</p>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-brand-700 ring-1 ring-brand-100 hover:ring-brand-300"
          >
            Browse Files
          </button>
          <input
            ref={fileInput}
            type="file"
            accept={Object.values(UPLOAD_ACCEPT).join(",")}
            className="sr-only"
            tabIndex={-1}
            aria-label="Upload a past paper or school report"
            onChange={(e) => {
              acceptFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
        <FieldError message={fileError ?? errors.attachment?.message} />
        {attachment && (
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-brand-50 p-3 ring-1 ring-brand-100">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-700 to-brand-600 text-white">
              <FileText aria-hidden className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{attachment.name}</p>
              <p className="text-[11px] text-muted">{formatBytes(attachment.size)} • Ready to attach</p>
            </div>
            <button
              type="button"
              onClick={() => setValue("attachment", null, { shouldDirty: true })}
              aria-label={`Remove ${attachment.name}`}
              className="grid size-8 place-items-center rounded-full bg-white text-muted hover:text-ink"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>
        )}
      </section>

      <fieldset>
        <legend className="w-full">
          <SectionTitle icon={GraduationCap}>Tutor Specialty & Educator Background Preference</SectionTitle>
        </legend>
        <p className="-mt-1 mb-3 text-xs text-muted">Select key qualifications you&apos;d like your child&apos;s mentor to have.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {tutorPreferenceOptions.map((o) => (
            <ChoiceCard key={o.value} type="checkbox" indicator="checkbox" value={o.value} title={o.label} hint={o.hint} {...register("tutorPreferences")} />
          ))}
        </div>
        <div className="mt-4 max-w-sm">
          <p className="mb-2 text-xs font-medium text-ink">Preferred tutor gender (optional)</p>
          <SegmentedControl
            label="Preferred tutor gender"
            value={tutorGender}
            onChange={(v) => setValue("tutorGender", v, { shouldDirty: true })}
            options={tutorGenderOptions.map((o) => ({ value: o.value, label: o.label }))}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="w-full">
          <SectionTitle icon={Zap}>Trial Diagnostic Session Urgency</SectionTitle>
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {urgencyOptions.map((o) => (
            <ChoiceCard key={o.value} value={o.value} title={o.label} hint={o.hint} {...register("urgency")} />
          ))}
        </div>
        <FieldError message={errors.urgency?.message} />
      </fieldset>
    </div>
  );
}
