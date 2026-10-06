"use client";

import { BadgeCheck, IdCard, Mail, MessageSquare, Phone, PhoneCall } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ChoiceCard, Field, FieldError, TextInput } from "@/components/forms/fields";
import { contactChannelOptions, phoneCountryOptions, relationshipOptions } from "@/lib/constants/tutor-request";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";
import type { TutorRequestValues } from "@/lib/validations/tutor-request";
import { Select } from "@/components/ui/select";

const channelIcons = { whatsapp: MessageSquare, phone: PhoneCall, email: Mail } as const;
const channelTones = { whatsapp: "text-emerald-600", phone: "text-brand-600", email: "text-violet-brand" } as const;

const selectClass =
  "h-12 w-full cursor-pointer appearance-none rounded-xl bg-lavender ps-4 pe-9 text-sm text-ink outline-none ring-1 transition focus:bg-white focus:ring-2 focus:ring-brand-300";

export function ParentStep() {
  const t = useT();
  const {
    register,
    formState: { errors },
  } = useFormContext<TutorRequestValues>();

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="parentName" label={t("Parent / Guardian Full Name")} required error={errors.parentName?.message}>
          <TextInput
            id="parentName"
            icon={IdCard}
            autoComplete="name"
            placeholder={t("e.g. Eleanor Vance-Croft")}
            invalid={!!errors.parentName}
            {...register("parentName")}
          />
        </Field>
        <Field id="relationship" label={t("Relationship to Student")} required error={errors.relationship?.message}>
          <div className="relative">
            <Select
              id="relationship"
              defaultValue=""
              aria-invalid={!!errors.relationship || undefined}
              aria-describedby={errors.relationship ? "relationship-error" : undefined}
              className={cn(selectClass, errors.relationship ? "ring-rose-300" : "ring-transparent")}
              {...register("relationship")}
            >
              <option value="" disabled>
                {t("Select relationship")}
              </option>
              {relationshipOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {t(o.label)}
                </option>
              ))}
            </Select>
          </div>
        </Field>

        <Field
          id="email"
          label={t("Email Address")}
          required
          hint={
            <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wide text-brand-600">
              <BadgeCheck aria-hidden className="size-3" />
              {t("Verified Briefing")}
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
            {t("Direct Phone Number")}
            <span aria-hidden className="ms-0.5 text-rose-500">*</span>
            <span className="sr-only"> {t("(required)")}</span>
          </label>
          <div className="grid grid-cols-[7.5rem_1fr] gap-2">
            <div className="relative">
              <Select
                aria-label={t("Country code")}
                autoComplete="tel-country-code"
                className={cn(selectClass, "ps-3", errors.phoneCountry ? "ring-rose-300" : "ring-transparent")}
                {...register("phoneCountry")}
              >
                {phoneCountryOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
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
        <legend className="mb-2 text-[13px] font-medium text-ink">{t("Preferred Direct Contact Method")}</legend>
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
                    {t(o.label)}
                  </span>
                }
                hint={<span className="ps-6">{t(o.hint)}</span>}
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
