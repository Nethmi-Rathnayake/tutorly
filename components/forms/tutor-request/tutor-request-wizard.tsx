"use client";

import { AnimatePresence, m } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { Lock, Save, UserRound } from "lucide-react";
import { submitTutorRequest } from "@/app/[lang]/request-a-tutor/actions";
import { DraftNotice, ServerErrorAlert, StepSubmitButton, stepVariants } from "@/components/forms/wizard-parts";
import { requestFormStep } from "@/lib/constants/tutor-request";
import { useMultiStepForm } from "@/lib/hooks/use-multi-step-form";
import { useT } from "@/lib/i18n/client";
import {
  stepFields,
  stepSchemas,
  tutorRequestDefaults,
  type TutorRequestValues,
} from "@/lib/validations/tutor-request";
import { RequestStep } from "./request-step";
import { RequestSidebar } from "./request-sidebar";

type WizardProps = {
  requestedTutor?: { id: string; name: string };
  /** Pre-selected subject from the URL (already validated against the taxonomy). */
  requestedSubject?: string;
};

export function TutorRequestWizard({ requestedTutor, requestedSubject }: WizardProps) {
  const t = useT();
  const {
    form,
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
    draftKey: "tutorly:tutor-request-draft-v3",
    transientFields: ["consent"],
    overrides: {
      ...(requestedTutor && { requestedTutorId: requestedTutor.id }),
      ...(requestedSubject && { subject: requestedSubject }),
    },
    submit: submitTutorRequest,
    successHref: (ref) => `/request-a-tutor/success?ref=${encodeURIComponent(ref)}`,
  });
  const meta = t.deep(requestFormStep);
  const variants = stepVariants(reduceMotion);

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div ref={topRef} className="min-w-0 scroll-mt-24 space-y-5">
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
              <m.div
                key="request"
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      id="step-heading"
                      ref={headingRef}
                      tabIndex={-1}
                      className="text-xl font-bold tracking-tight text-ink outline-none sm:text-2xl"
                    >
                      {meta.title}
                    </h2>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100/80 text-brand-700">
                    <UserRound aria-hidden className="size-4" />
                  </span>
                </div>
                <p className="mt-3 max-w-2xl border-b border-brand-50 pb-6 text-sm leading-relaxed text-muted">
                  {meta.description}
                </p>

                <div className="mt-6">
                  <RequestStep />
                </div>
              </m.div>
            </AnimatePresence>

            <ServerErrorAlert message={serverError} />

            <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
                  <Lock aria-hidden className="size-3.5 text-violet-brand" />
                  {t("Strictly confidential & encrypted")}
                </span>
                <button
                  type="button"
                  onClick={saveDraft}
                  className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-ink hover:text-brand-700"
                >
                  <Save aria-hidden className="size-3.5" />
                  {t("Save Draft")}
                </button>
              </div>
              <StepSubmitButton label={meta.next} isLast submitting={submitting} className="from-brand-700 to-brand-600" />
            </div>
          </form>
        </div>

        <div className="print:hidden">
          <RequestSidebar />
        </div>
      </div>
    </FormProvider>
  );
}
