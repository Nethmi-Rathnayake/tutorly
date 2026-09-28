"use client";

import { BadgeCheck, ChevronDown, IdCard, Mail, MessageSquare, Phone, PhoneCall } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ChoiceCard, Field, FieldError, TextInput } from "@/components/forms/fields";
import { contactChannelOptions, phoneCountryOptions, relationshipOptions } from "@/lib/constants/tutor-request";
import { cn } from "@/lib/utils/cn";
import type { TutorRequestValues } from "@/lib/validations/tutor-request";

const channelIcons = { whatsapp: MessageSquare, phone: PhoneCall, email: Mail } as const;
const channelTones = { whatsapp: "text-emerald-600", phone: "text-brand-600", email: "text-violet-brand" } as const;

const selectClass =
  "h-12 w-full cursor-pointer appearance-none rounded-xl bg-lavender pl-4 pr-9 text-sm text-ink outline-none ring-1 transition focus:bg-white focus:ring-2 focus:ring-brand-300";

export function ParentStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TutorRequestValues>();

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="parentName" label="Parent / Guardian Full Name" required error={errors.parentName?.message}>
          <TextInput
            id="parentName"
            icon={IdCard}
            autoComplete="name"
            placeholder="e.g. Eleanor Vance-Croft"
            invalid={!!errors.parentName}
            {...register("parentName")}
          />
        </Field>
        <Field id="relationship" label="Relationship to Student" required error={errors.relationship?.message}>
          <div className="relative">
            <select
              id="relationship"
              defaultValue=""
              aria-invalid={!!errors.relationship || undefined}
              aria-describedby={errors.relationship ? "relationship-error" : undefined}
              className={cn(selectClass, errors.relationship ? "ring-rose-300" : "ring-transparent")}
              {...register("relationship")}
            >
              <option value="" disabled>
                Select relationship
              </option>
              {relationshipOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </div>
        </Field>

        <Field
          id="email"
          label="Email Address"
          required
          hint={
            <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wide text-brand-600">
              <BadgeCheck aria-hidden className="size-3" />
              Verified Briefing
            </span>
          }
          error={errors.email?.message}
        >
          <TextInput
            id="email"
            type="email"
            icon={Mail}
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            invalid={!!errors.email}
            {...register("email")}
          />
        </Field>

        <div>
          <label htmlFor="phone" className="mb-2 block text-[13px] font-medium text-ink">
            Direct Phone Number<span aria-hidden className="ml-0.5 text-rose-500">*</span>
            <span className="sr-only"> (required)</span>
          </label>
          <div className="grid grid-cols-[7.5rem_1fr] gap-2">
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
              icon={Phone}
              autoComplete="tel-national"
              inputMode="tel"
              placeholder="7911 123456"
              invalid={!!errors.phone}
              {...register("phone")}
            />
          </div>
          <FieldError id="phone-error" message={errors.phoneCountry?.message ?? errors.phone?.message} />
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-[13px] font-medium text-ink">Preferred Direct Contact Method</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {contactChannelOptions.map((o) => {
            const Icon = channelIcons[o.value];
            return (
              <ChoiceCard
                key={o.value}
                value={o.value}
                title={
                  <span className="flex items-center gap-2">
                    <Icon aria-hidden className={cn("size-4 shrink-0", channelTones[o.value])} />
                    {o.label}
                  </span>
                }
                hint={<span className="pl-6">{o.hint}</span>}
                {...register("contactChannel")}
              />
            );
          })}
        </div>
        <FieldError message={errors.contactChannel?.message} />
      </fieldset>
    </div>
  );
}
