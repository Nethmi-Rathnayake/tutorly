"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormProvider } from "react-hook-form";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileDown,
  GraduationCap,
  Lock,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { submitTutorRequest } from "@/app/[lang]/request-a-tutor/actions";
import { DraftNotice, ServerErrorAlert, StepSubmitButton, stepVariants } from "@/components/forms/wizard-parts";
import { requestSteps } from "@/lib/constants/tutor-request";
import { useMultiStepForm } from "@/lib/hooks/use-multi-step-form";
import { useT } from "@/lib/i18n/client";
import {
  stepFields,
  stepSchemas,
  tutorRequestDefaults,
  type TutorRequestValues,
} from "@/lib/validations/tutor-request";
import { GoalsStep } from "./goals-step";
import { ParentStep } from "./parent-step";
import { RequestSidebar } from "./request-sidebar";
import { ReviewStep } from "./review-step";
import { Stepper } from "./stepper";
import { StudentStep } from "./student-step";
import { TutoringStep } from "./tutoring-step";

const stepIcons = [UserRound, GraduationCap, BookOpen, CalendarDays, ClipboardList, ShieldCheck];

type WizardProps = {
  requestedTutor?: { id: string; name: string };
  /** Pre-selected subject from the URL (already validated against the taxonomy). */
  requestedSubject?: string;
};

export function TutorRequestWizard({ requestedTutor, requestedSubject }: WizardProps) {
  const t = useT();
  const {
    form,
    step,
    furthest,
    isLast,
    goTo,
    next,
    saveDraft,
    notice,
    dismissNotice,
    serverError,
    submitting,
    headingRef,
    topRef,
    reduceMotion,
  } = useMultiStepForm<TutorRequestValues>({
    schemas: stepSchemas,
    stepFields,
    defaultValues: tutorRequestDefaults,
    draftKey: "tutorflow:tutor-request-draft-v2",
    transientFields: ["consent"],
    overrides: {
      ...(requestedTutor && { requestedTutorId: requestedTutor.id }),
      ...(requestedSubject && { subject: requestedSubject }),
    },
    submit: submitTutorRequest,
    successHref: (ref) => `/request-a-tutor/success?ref=${encodeURIComponent(ref)}`,
  });
  const meta = t.deep(requestSteps[step]);
  const variants = stepVariants(reduceMotion, t.locale === "ar");
  const stepNo = (n: number) => String(n).padStart(2, "0");
  const StepIcon = stepIcons[step];

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div ref={topRef} className="min-w-0 scroll-mt-24 space-y-5">
          <Stepper current={step} completed={furthest} onSelect={goTo} />
          <DraftNotice notice={notice} onDismiss={dismissNotice} />

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              void next();
            }}
            aria-labelledby="step-heading"
            className="rounded-3xl bg-white p-6 ring-1 ring-brand-100/80 sm:p-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600" aria-live="polite">
                      {t("Step {n} of {total}", { n: stepNo(step + 1), total: stepNo(requestSteps.length) })}
                    </p>
                    <h2
                      id="step-heading"
                      ref={headingRef}
                      tabIndex={-1}
                      className="mt-1 text-xl font-bold tracking-tight text-ink outline-none sm:text-2xl"
                    >
                      {meta.title}
                    </h2>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100/80 text-brand-700">
                    <StepIcon aria-hidden className="size-4" />
                  </span>
                </div>
                <p className="mt-3 max-w-2xl border-b border-brand-50 pb-6 text-sm leading-relaxed text-muted">
                  {meta.description}
                </p>

                <div className="mt-6">
                  {step === 0 && <ParentStep />}
                  {step === 1 && <StudentStep />}
                  {step === 2 && <TutoringStep part="subject" requestedTutorName={requestedTutor?.name} />}
                  {step === 3 && <TutoringStep part="schedule" />}
                  {step === 4 && <GoalsStep />}
                  {step === 5 && <ReviewStep onEdit={goTo} requestedTutorName={requestedTutor?.name} />}
                </div>
              </motion.div>
            </AnimatePresence>

            <ServerErrorAlert message={serverError} />

            <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
                  <Lock aria-hidden className="size-3.5 text-violet-brand" />
                  {t("Strictly confidential & encrypted")}
                </span>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    disabled={submitting}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:text-brand-700 disabled:opacity-50"
                  >
                    <ArrowLeft aria-hidden className="size-3.5 rtl:-scale-x-100" />
                    {t("Back")}
                  </button>
                )}
                {isLast ? (
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:text-brand-700 print:hidden"
                  >
                    <FileDown aria-hidden className="size-3.5" />
                    {t("Download Summary")}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:text-brand-700"
                  >
                    <Save aria-hidden className="size-3.5" />
                    {t("Save Draft")}
                  </button>
                )}
              </div>
              <StepSubmitButton label={meta.next} isLast={isLast} submitting={submitting} className="from-brand-700 to-brand-600" />
            </div>
          </form>
        </div>

        <div className="print:hidden lg:sticky lg:top-24">
          <RequestSidebar />
        </div>
      </div>
    </FormProvider>
  );
}
