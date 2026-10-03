"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues, type FieldValues, type Path, type Resolver } from "react-hook-form";
import type { ZodType } from "zod";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref } from "@/lib/i18n/config";

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[] | undefined> };

type Options<T extends FieldValues> = {
  /** One zod schema per step; the last should validate the whole form. */
  schemas: readonly ZodType[];
  /** Field names owned by each step, used to send server errors back to the right step. */
  stepFields: string[][];
  defaultValues: DefaultValues<T>;
  /** localStorage key for "Save Draft". Bump it when the step structure changes. */
  draftKey: string;
  /** Fields never written to drafts (e.g. consent, in-memory files). */
  transientFields?: (keyof T & string)[];
  /** Values that always win over a restored draft (e.g. from the URL). */
  overrides?: Partial<T>;
  submit: (values: T) => Promise<SubmitResult>;
  successHref: (reference: string) => string;
};

type Draft<T> = { values: Partial<T>; step: number; furthest: number };
type Notice = { kind: "restored" | "saved"; text: string };

function readDraft<T>(key: string): Draft<T> | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Draft<T>) : null;
  } catch {
    return null;
  }
}

function writeDraft<T>(key: string, draft: Draft<T> | null) {
  try {
    if (draft) localStorage.setItem(key, JSON.stringify(draft));
    else localStorage.removeItem(key);
  } catch {
    // Storage unavailable (private mode etc.) – drafts are a convenience only.
  }
}

/**
 * Shared behaviour for the multi-step intake forms: per-step validation,
 * draft save/restore, focus management, and server-side error routing.
 */
export function useMultiStepForm<T extends FieldValues>(opts: Options<T>) {
  const { schemas, stepFields, defaultValues, draftKey, transientFields = [], overrides, submit, successHref } = opts;
  const last = schemas.length - 1;

  const router = useRouter();
  const locale = useLocale();
  const reduceMotion = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [notice, setNotice] = useState<Notice>();
  const [serverError, setServerError] = useState<string>();
  const [submitting, startSubmit] = useTransition();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const attempted = useRef(false);
  const firstRender = useRef(true);

  // Validate only the active step while navigating; the last step validates everything.
  const resolver: Resolver<T> = (values, ctx, options) =>
    (zodResolver(schemas[stepRef.current] as never) as unknown as Resolver<T>)(values, ctx, options);

  const form = useForm<T>({ resolver, mode: "onTouched", defaultValues: { ...defaultValues, ...overrides } as DefaultValues<T> });

  // After a failed "Continue", re-check each field as it changes so fixed errors clear immediately.
  useEffect(() => {
    return form.subscribe({
      formState: { values: true },
      callback: ({ name }) => {
        if (!attempted.current || !name) return;
        const field = name.split(".")[0] as Path<T>;
        if (form.getFieldState(field).error) void form.trigger(field);
      },
    });
  }, [form]);

  // Restore a saved draft once on mount (browser-only convenience).
  useEffect(() => {
    const draft = readDraft<T>(draftKey);
    if (!draft) return;
    form.reset({ ...defaultValues, ...draft.values, ...overrides } as DefaultValues<T>);
    stepRef.current = draft.step;
    // Drafts live in browser storage, so they can only be read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(draft.step);
    setFurthest(draft.furthest);
    setNotice({ kind: "restored", text: "We restored your saved draft." });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Move focus to the step heading after navigation for keyboard & screen-reader users.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, reduceMotion]);

  const goTo = (next: number) => {
    attempted.current = false;
    stepRef.current = next;
    form.clearErrors();
    setServerError(undefined);
    setStep(next);
    setFurthest((f) => Math.max(f, next));
  };

  const saveDraft = () => {
    const values = { ...form.getValues() } as Partial<T>;
    for (const f of transientFields) delete values[f];
    writeDraft(draftKey, { values, step, furthest });
    setNotice({ kind: "saved", text: "Draft saved on this device." });
  };

  const dismissNotice = () => {
    if (notice?.kind === "restored") {
      writeDraft(draftKey, null);
      form.reset({ ...defaultValues, ...overrides } as DefaultValues<T>);
      goTo(0);
      setFurthest(0);
    }
    setNotice(undefined);
  };

  const submitValues = (values: T) => {
    setServerError(undefined);
    startSubmit(async () => {
      const result = await submit(values);
      if (result.ok) {
        writeDraft(draftKey, null);
        router.push(localizeHref(successHref(result.reference), locale));
        return;
      }
      setServerError(result.message);
      const fields = Object.entries(result.fieldErrors ?? {});
      for (const [name, messages] of fields) form.setError(name as Path<T>, { message: messages?.[0] });
      const firstStep = stepFields.findIndex((f) => fields.some(([n]) => f.includes(n)));
      if (firstStep >= 0 && firstStep !== step) {
        stepRef.current = firstStep;
        setStep(firstStep);
      }
    });
  };

  const next = async () => {
    if (step === last) {
      attempted.current = true;
      return form.handleSubmit(submitValues)();
    }
    const valid = await form.trigger(undefined, { shouldFocus: true });
    attempted.current = !valid;
    if (valid) goTo(step + 1);
  };

  return {
    form,
    step,
    furthest,
    isLast: step === last,
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
  };
}
