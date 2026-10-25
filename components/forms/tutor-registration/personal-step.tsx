"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { EyeOff, IdCard, Mail, Phone, ShieldCheck, UserRound, X } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { Field, FieldError, TextInput } from "@/components/forms/fields";
import { PHOTO_MIN_PX, PHOTO_TYPES } from "@/lib/constants/tutor-registration";
import { phoneCountryOptions } from "@/lib/constants/tutor-request";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format";
import { PhotoError, prepareHeadshot } from "@/lib/utils/prepare-photo";
import type { TutorRegistrationValues } from "@/lib/validations/tutor-registration";
import { Select } from "@/components/ui/select";

type PersonalStepProps = {
  /** Object URL of the chosen photo, for the preview (owned by the wizard so it survives step changes). */
  photoUrl?: string;
  /** Hands the resized file (kept in memory by the wizard for submission) and its preview URL up. */
  onPhotoChange: (file: File | undefined, url: string | undefined) => void;
};

export function PersonalStep({ photoUrl, onPhotoChange }: PersonalStepProps) {
  const t = useT();
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TutorRegistrationValues>();
  const photo = useWatch({ control, name: "photo" });
  const fileInput = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [photoError, setPhotoError] = useState<string>();

  const acceptPhoto = async (picked: File | undefined) => {
    if (!picked) return;
    setBusy(true);
    try {
      // Identified from its bytes, then resized and re-encoded so it fits in a Server Action request.
      const { file, width, height } = await prepareHeadshot(picked);
      const url = URL.createObjectURL(file);
      if (photoUrl) URL.revokeObjectURL(photoUrl);
      setPhotoError(undefined);
      onPhotoChange(file, url);
      setValue(
        "photo",
        { name: file.name, size: file.size, type: "image/jpeg", width, height },
        { shouldDirty: true, shouldValidate: true },
      );
    } catch (error) {
      if (!(error instanceof PhotoError)) setPhotoError(t("We couldn't read that image. Try a different file."));
      else if (error.code === "type") setPhotoError(t("Upload a JPG, PNG or WebP image."));
      else if (error.code === "too-large") setPhotoError(t("Photo is too large. Please choose a smaller image."));
      else if (error.code === "too-small") {
        setPhotoError(
          t("Photo must be at least {min}×{min}px (this one is {width}×{height}px).", {
            min: PHOTO_MIN_PX,
            width: error.detail?.width ?? 0,
            height: error.detail?.height ?? 0,
          }),
        );
      } else setPhotoError(t("We couldn't read that image. Try a different file."));
    } finally {
      setBusy(false);
    }
  };

  const removePhoto = () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    onPhotoChange(undefined, undefined);
    setPhotoError(undefined);
    setValue("photo", undefined as unknown as TutorRegistrationValues["photo"], { shouldDirty: true });
  };

  const selectClass =
    "h-12 w-full cursor-pointer appearance-none rounded-xl bg-lavender ps-3 pe-9 text-sm text-ink outline-none ring-1 transition focus:bg-white focus:ring-2 focus:ring-brand-300";

  return (
    <div className="space-y-6">
      <Field
        id="fullName"
        label={t("Full Legal Name")}
        required
        hint={t("As shown on passport or government ID")}
        error={errors.fullName?.message}
      >
        <TextInput id="fullName" icon={IdCard} autoComplete="name" placeholder={t("e.g. Dr. Evelyn Vance")} invalid={!!errors.fullName} {...register("fullName")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="email"
          label={t("Professional Email")}
          required
          error={errors.email?.message}
        >
          <TextInput
            id="email"
            type="email"
            icon={Mail}
            autoComplete="email"
            inputMode="email"
            placeholder="you@university.ac.uk"
            invalid={!!errors.email}
            {...register("email")}
          />
        </Field>

        <div>
          <label htmlFor="phone" className="mb-2 block text-[13px] font-medium text-ink">
            {t("Direct Contact Phone")}
            <span aria-hidden className="ms-0.5 text-rose-500">*</span>
            <span className="sr-only"> {t("(required)")}</span>
          </label>
          <div className="grid grid-cols-[7.5rem_1fr] gap-2">
            <div className="relative">
              <Select aria-label={t("Country code")} autoComplete="tel-country-code" className={cn(selectClass, "ring-transparent")} {...register("phoneCountry")}>
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
              placeholder="7911 204918"
              invalid={!!errors.phone}
              aria-describedby="phone-help"
              {...register("phone")}
            />
          </div>
          <p id="phone-help" className="mt-1.5 text-[11px] text-muted">
            {t("Used by our team to contact you about your application.")}
          </p>
          <FieldError id="phone-error" message={errors.phoneCountry?.message ?? errors.phone?.message} />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <p id="photo-label" className="text-[13px] font-medium text-ink">
            {t("Official Educator Headshot")}
            <span aria-hidden className="ms-0.5 text-rose-500">*</span>
            <span className="sr-only"> {t("(required)")}</span>
          </p>
          <span className="text-[11px] text-muted">{t("Min. {min}×{min}px • JPG, PNG or WebP", { min: PHOTO_MIN_PX })}</span>
        </div>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            void acceptPhoto(e.dataTransfer.files[0]);
          }}
          className={cn(
            "flex flex-col gap-5 rounded-2xl border-2 border-dashed p-5 transition-colors sm:flex-row sm:items-center",
            dragging ? "border-brand-400 bg-brand-50" : errors.photo || photoError ? "border-rose-300 bg-rose-50/40" : "border-transparent bg-lavender/70",
          )}
        >
          <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-brand-100">
            {photoUrl ? (
              <Image src={photoUrl} alt={t("Your headshot preview")} fill unoptimized sizes="112px" className="object-cover" />
            ) : (
              <span className="grid size-full place-items-center text-brand-300">
                <UserRound aria-hidden className="size-10" />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={busy}
                aria-describedby="photo-label"
                onClick={() => fileInput.current?.click()}
                className="rounded-full bg-linear-to-r from-brand-700 to-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand-600/25 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-60"
              >
                {t(photo ? "Replace Photo" : "Browse Local File")}
              </button>
              <span className="text-xs text-muted">{t("or drag & drop headshot here")}</span>
              {photo && (
                <button
                  type="button"
                  onClick={removePhoto}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <X aria-hidden className="size-3.5" />
                  {t("Remove")}
                </button>
              )}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted" aria-live="polite">
              {photo
                ? `${photo.name} • ${photo.width}×${photo.height}px • ${formatBytes(photo.size)}`
                : t("Upload a front-facing formal portrait. Large photos are resized in your browser before they are sent.")}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck aria-hidden className="size-3.5 text-brand-600" />
                {t("Sent only to our team")}
              </span>
              <span className="inline-flex items-center gap-1">
                <EyeOff aria-hidden className="size-3.5 text-violet-brand" />
                {t("Never published")}
              </span>
            </p>
          </div>
          <input
            ref={fileInput}
            type="file"
            accept={PHOTO_TYPES.join(",")}
            className="sr-only"
            tabIndex={-1}
            aria-label={t("Upload headshot")}
            onChange={(e) => {
              void acceptPhoto(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
        <FieldError message={photoError ?? errors.photo?.message} />
      </div>
    </div>
  );
}
