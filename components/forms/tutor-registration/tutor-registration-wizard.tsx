"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormProvider } from "react-hook-form";
import { ArrowLeft, Lock, Save } from "lucide-react";
import { submitTutorRegistration } from "@/app/[lang]/tutor-registration/actions";
import { DraftNotice, ServerErrorAlert, StepSubmitButton, stepVariants } from "@/components/forms/wizard-parts";
import { registrationSteps } from "@/lib/constants/tutor-registration";
import { useMultiStepForm } from "@/lib/hooks/use-multi-step-form";
import { useT } from "@/lib/i18n/client";
import {
  registrationStepFields,
  registrationStepSchemas,
  tutorRegistrationDefaults,
  type TutorRegistrationValues,
} from "@/lib/validations/tutor-registration";
import { AvailabilityStep } from "./availability-step";
import { PedagogyStep } from "./pedagogy-step";
import { PersonalStep } from "./personal-step";
import { RegistrationReviewStep } from "./registration-review-step";
import { RegistrationSidebar } from "./registration-sidebar";
import { RegistrationStepper } from "./registration-stepper";
import { TeachingStep } from "./teaching-step";

export function TutorRegistrationWizard() {
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
  } = useMultiStepForm<TutorRegistrationValues>({
    schemas: registrationStepSchemas,
    stepFields: registrationStepFields,
    defaultValues: tutorRegistrationDefaults,
    draftKey: "tutorflow:tutor-registration-draft-v1",
    // The headshot lives in memory only, so it isn't kept in drafts.
    transientFields: ["consent", "photo"],
    submit: submitTutorRegistration,
    successHref: (ref) => `/tutor-registration/success?ref=${encodeURIComponent(ref)}`,
  });

  // Preview URL for the headshot, kept here so it survives moving between stages.
  const [photoUrl, setPhotoUrl] = useState<string>();
  useEffect(() => () => void (photoUrl && URL.revokeObjectURL(photoUrl)), [photoUrl]);

  const meta = t.deep(registrationSteps[step]);
  const variants = stepVariants(reduceMotion, t.locale === "ar");
  const stageNo = (n: number) => String(n).padStart(2, "0");

  return (
    <FormProvider {...form}>
      <div ref={topRef} className="scroll-mt-24">
        <RegistrationStepper current={step} completed={furthest} onSelect={goTo} />
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-5">
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
                <div className="flex flex-col gap-3 border-b border-brand-50 pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-md">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600" aria-live="polite">
                      {t("Stage {n} of {total}", { n: stageNo(step + 1), total: stageNo(registrationSteps.length) })}
                    </p>
                    <h2
                      id="step-heading"
                      ref={headingRef}
                      tabIndex={-1}
                      className="mt-1 text-xl font-bold tracking-tight text-ink outline-none sm:text-2xl"
                    >
                      {meta.title}
                    </h2>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{meta.description}</p>
                  </div>
                  <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100">
                    <Lock aria-hidden className="size-3.5" />
                    {t("Confidential Admin Record")}
                  </span>
                </div>

                <div className="mt-6">
                  {step === 0 && <PersonalStep photoUrl={photoUrl} onPhotoUrlChange={setPhotoUrl} />}
                  {step === 1 && <TeachingStep />}
                  {step === 2 && <AvailabilityStep />}
                  {step === 3 && <PedagogyStep />}
                  {step === 4 && <RegistrationReviewStep photoUrl={photoUrl} onEdit={goTo} />}
                </div>
              </motion.div>
            </AnimatePresence>

            <ServerErrorAlert message={serverError} />

            <div className="mt-8 flex flex-col-reverse gap-4 border-t border-brand-50 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    disabled={submitting}
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-lavender px-4 text-sm font-medium text-ink transition-colors hover:bg-brand-100 disabled:opacity-50"
                  >
                    <ArrowLeft aria-hidden className="size-4 rtl:-scale-x-100" />
                    {t("Back")}
                  </button>
                )}
                {!isLast && (
                  <button
                    type="button"
                    onClick={saveDraft}
                    className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink hover:bg-lavender"
                  >
                    <Save aria-hidden className="size-4" />
                    {t("Save Draft")}
                  </button>
                )}
              </div>
              <StepSubmitButton label={meta.next} isLast={isLast} submitting={submitting} />
            </div>
          </form>
        </div>

        <div className="lg:sticky lg:top-24">
          <RegistrationSidebar />
        </div>
      </div>
    </FormProvider>
  );
}
