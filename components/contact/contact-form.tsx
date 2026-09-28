"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type Path } from "react-hook-form";
import {
  AtSign,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  Inbox,
  Loader2,
  Lock,
  Presentation,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { submitContactInquiry } from "@/app/contact/actions";
import { Field, FieldError, TextInput } from "@/components/forms/fields";
import { ServerErrorAlert } from "@/components/forms/wizard-parts";
import { audienceOptions, contactFormCopy, MESSAGE_MAX, topicOptions } from "@/lib/constants/contact-page";
import { phoneCountryOptions } from "@/lib/constants/tutor-request";
import { cn } from "@/lib/utils/cn";
import { contactDefaults, contactSchema, type ContactValues } from "@/lib/validations/contact";

const audienceIcons = { parent: GraduationCap, educator: Presentation, general: CircleHelp } as const;

const selectClass =
  "h-12 w-full cursor-pointer appearance-none rounded-xl bg-lavender pr-9 text-sm text-ink outline-none ring-1 transition focus:bg-white focus:ring-2 focus:ring-brand-300";

export function ContactForm() {
  const [reference, setReference] = useState<string>();
  const [serverError, setServerError] = useState<string>();
  const [submitting, startSubmit] = useTransition();
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: contactDefaults,
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = form;
  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  const onSubmit = (values: ContactValues) => {
    setServerError(undefined);
    startSubmit(async () => {
      const result = await submitContactInquiry(values);
      if (result.ok) {
        setReference(result.reference);
        reset(contactDefaults);
        return;
      }
      setServerError(result.message);
      for (const [name, messages] of Object.entries(result.fieldErrors ?? {})) {
        setError(name as Path<ContactValues>, { message: messages?.[0] }, { shouldFocus: true });
      }
    });
  };

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(44,37,115,0.5)] ring-1 ring-brand-100/80 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 id="contact-form-heading" className="text-2xl font-bold tracking-tight text-ink">
          {contactFormCopy.title}
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender px-3 py-1 text-[10px] font-semibold text-muted">
          <Lock aria-hidden className="size-3" />
          {contactFormCopy.secureBadge}
        </span>
      </div>
      <p className="mt-1.5 text-sm text-muted">{contactFormCopy.description}</p>

      {reference ? (
        <div role="status" className="mt-8 rounded-3xl bg-emerald-50 px-6 py-10 text-center ring-1 ring-emerald-100">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 aria-hidden className="size-6" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-ink">Message sent</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Thank you. An academic advisor will reply to you shortly. Your reference is{" "}
            <strong className="font-semibold text-ink">{reference}</strong>.
          </p>
          <button
            type="button"
            onClick={() => setReference(undefined)}
            className="mt-6 text-sm font-semibold text-brand-700 underline-offset-2 hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form noValidate aria-labelledby="contact-form-heading" onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <fieldset>
            <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              I am reaching out as:
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {audienceOptions.map((o) => {
                const Icon = audienceIcons[o.value];
                return (
                  <label
                    key={o.value}
                    className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-lavender px-3 text-xs font-medium text-ink/80 transition-all hover:bg-brand-100 has-[:checked]:bg-linear-to-r has-[:checked]:from-brand-700 has-[:checked]:to-brand-600 has-[:checked]:font-semibold has-[:checked]:text-white has-[:checked]:shadow-md has-[:checked]:shadow-brand-600/25 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500"
                  >
                    <input type="radio" value={o.value} className="sr-only" {...register("audience")} />
                    <Icon aria-hidden className="size-3.5" />
                    {o.label}
                  </label>
                );
              })}
            </div>
            <FieldError message={errors.audience?.message} />
          </fieldset>

          <Field id="fullName" label="Full Name" required error={errors.fullName?.message}>
            <TextInput
              id="fullName"
              icon={UserRound}
              autoComplete="name"
              placeholder="Your full name"
              invalid={!!errors.fullName}
              {...register("fullName")}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="email" label="Email Address" required error={errors.email?.message}>
              <TextInput
                id="email"
                type="email"
                icon={AtSign}
                autoComplete="email"
                placeholder="you@example.com"
                invalid={!!errors.email}
                {...register("email")}
              />
            </Field>

            <div>
              <label htmlFor="phone" className="mb-2 block text-[13px] font-medium text-ink">
                Phone Number <span className="text-[11px] font-normal text-muted">(Optional)</span>
              </label>
              <div className="grid grid-cols-[6.5rem_1fr] gap-2">
                <div className="relative">
                  <select
                    aria-label="Country code"
                    autoComplete="tel-country-code"
                    className={cn(selectClass, "pl-3", errors.phoneCountry ? "ring-rose-300" : "ring-transparent")}
                    {...register("phoneCountry")}
                  >
                    {phoneCountryOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                </div>
                <TextInput
                  id="phone"
                  type="tel"
                  autoComplete="tel-national"
                  placeholder="7911 123456"
                  invalid={!!errors.phone}
                  {...register("phone")}
                />
              </div>
              <FieldError id="phone-error" message={errors.phoneCountry?.message ?? errors.phone?.message} />
            </div>
          </div>

          <Field id="topic" label="Subject" required error={errors.topic?.message}>
            <div className="relative">
              <Inbox aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <select
                id="topic"
                aria-invalid={!!errors.topic || undefined}
                aria-describedby={errors.topic ? "topic-error" : undefined}
                className={cn(selectClass, "pl-11", errors.topic ? "ring-rose-300" : "ring-transparent")}
                {...register("topic")}
              >
                {topicOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            </div>
          </Field>

          <Field
            id="message"
            label="Your Message"
            required
            hint={
              <span aria-live="polite" className={cn(messageLength > MESSAGE_MAX && "font-semibold text-rose-600")}>
                {messageLength} / {MESSAGE_MAX}
              </span>
            }
            error={errors.message?.message}
          >
            <textarea
              id="message"
              rows={5}
              maxLength={MESSAGE_MAX}
              placeholder="Tell us about the student, subject, or question you have in mind."
              aria-invalid={!!errors.message || undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={cn(
                "w-full resize-y rounded-xl bg-lavender px-4 py-3 text-sm leading-relaxed text-ink outline-none ring-1 transition placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-brand-300",
                errors.message ? "bg-rose-50/40 ring-rose-300" : "ring-transparent",
              )}
              {...register("message")}
            />
          </Field>

          <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted">
            <ShieldCheck aria-hidden className="mt-0.5 size-3.5 shrink-0 text-brand-600" />
            {contactFormCopy.privacy}
          </p>

          <ServerErrorAlert message={serverError} />

          <button
            type="submit"
            disabled={submitting}
            className="group flex h-13 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-700 via-brand-600 to-violet-brand text-sm font-semibold text-white shadow-[0_18px_36px_-16px_rgba(79,63,217,0.85)] transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:translate-y-0 disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                {contactFormCopy.submit}
                <Send aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
