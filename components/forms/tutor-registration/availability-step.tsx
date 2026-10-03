"use client";

import { MapPin } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { AvailabilityFields } from "@/components/forms/availability-fields";
import { ChoiceCard, Field, FieldError, SectionTitle, TextInput } from "@/components/forms/fields";
import { tutorModeOptions } from "@/lib/constants/tutor-registration";
import { useT } from "@/lib/i18n/client";
import type { TutorRegistrationValues } from "@/lib/validations/tutor-registration";

export function AvailabilityStep() {
  const t = useT();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TutorRegistrationValues>();
  const mode = useWatch({ control, name: "mode" });

  return (
    <div className="space-y-9">
      <fieldset>
        <legend className="w-full">
          <SectionTitle number={1}>{t("Teaching Format")}</SectionTitle>
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {tutorModeOptions.map((o) => (
            <ChoiceCard key={o.value} value={o.value} title={t(o.label)} hint={t(o.hint)} {...register("mode")} />
          ))}
        </div>
        <FieldError message={errors.mode?.message} />
        {mode && mode !== "online" && (
          <Field
            id="locations"
            label={t("Preferred locations for in-person lessons")}
            required
            hint={t("Areas or neighbourhoods")}
            error={errors.locations?.message}
            className="mt-4"
          >
            <TextInput
              id="locations"
              icon={MapPin}
              placeholder={t("e.g. Kensington, Chelsea, Hampstead (London)")}
              invalid={!!errors.locations}
              {...register("locations")}
            />
          </Field>
        )}
      </fieldset>

      <AvailabilityFields startNumber={2} />
    </div>
  );
}
