"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BadgeCheck, ChevronDown, EyeOff, IdCard, Mail, Phone, ShieldCheck, UserRound, X } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { Field, FieldError, TextInput } from "@/components/forms/fields";
import { PHOTO_MAX_BYTES, PHOTO_MIN_PX, PHOTO_TYPES } from "@/lib/constants/tutor-registration";
import { phoneCountryOptions } from "@/lib/constants/tutor-request";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format";
import type { TutorRegistrationValues } from "@/lib/validations/tutor-registration";

type PersonalStepProps = {
  photoUrl?: string;
  onPhotoUrlChange: (url: string | undefined) => void;
};

function readImageSize(url: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = url;
  });
}

export function PersonalStep({ photoUrl, onPhotoUrlChange }: PersonalStepProps) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TutorRegistrationValues>();
  const photo = useWatch({ control, name: "photo" });
  const fileInput = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [photoError, setPhotoError] = useState<string>();

  const acceptPhoto = async (file: File | undefined) => {
    if (!file) return;
    if (!(PHOTO_TYPES as readonly string[]).includes(file.type)) return setPhotoError("Upload a JPG, PNG or WebP image.");
    if (file.size > PHOTO_MAX_BYTES) return setPhotoError("Photo must be 10MB or smaller.");
    const url = URL.createObjectURL(file);
    try {
      const { width, height } = await readImageSize(url);
      if (width < PHOTO_MIN_PX || height < PHOTO_MIN_PX) {
        URL.revokeObjectURL(url);
        return setPhotoError(`Photo must be at least ${PHOTO_MIN_PX}×${PHOTO_MIN_PX}px (this one is ${width}×${height}px).`);
      }
      setPhotoError(undefined);
      if (photoUrl) URL.revokeObjectURL(photoUrl);
      onPhotoUrlChange(url);
      // Only metadata goes into the form; the file itself needs object storage (SRS §18) before upload.
      setValue(
        "photo",
        { name: file.name, size: file.size, type: file.type as (typeof PHOTO_TYPES)[number], width, height },
        { shouldDirty: true, shouldValidate: true },
      );
    } catch {
      URL.revokeObjectURL(url);
      setPhotoError("We couldn't read that image. Try a different file.");
    }
  };

  const removePhoto = () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    onPhotoUrlChange(undefined);
    setValue("photo", undefined as unknown as TutorRegistrationValues["photo"], { shouldDirty: true });
  };

  const selectClass =
    "h-12 w-full cursor-pointer appearance-none rounded-xl bg-lavender pl-3 pr-9 text-sm text-ink outline-none ring-1 transition focus:bg-white focus:ring-2 focus:ring-brand-300";

  return (
    <div className="space-y-6">
      <Field
        id="fullName"
        label="Full Legal Name"
        required
        hint="As shown on passport or government ID"
        error={errors.fullName?.message}
      >
        <TextInput id="fullName" icon={IdCard} autoComplete="name" placeholder="e.g. Dr. Evelyn Vance" invalid={!!errors.fullName} {...register("fullName")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="email"
          label="Professional Email"
          required
          hint={
            <span className="inline-flex items-center gap-1 font-semibold text-brand-600">
              <BadgeCheck aria-hidden className="size-3" />
              Verified
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
            placeholder="you@university.ac.uk"
            invalid={!!errors.email}
            {...register("email")}
          />
        </Field>

        <div>
          <label htmlFor="phone" className="mb-2 block text-[13px] font-medium text-ink">
            Direct Contact Phone<span aria-hidden className="ml-0.5 text-rose-500">*</span>
            <span className="sr-only"> (required)</span>
          </label>
          <div className="grid grid-cols-[7.5rem_1fr] gap-2">
            <div className="relative">
              <select aria-label="Country code" autoComplete="tel-country-code" className={cn(selectClass, "ring-transparent")} {...register("phoneCountry")}>
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
              placeholder="7911 204918"
              invalid={!!errors.phone}
              aria-describedby="phone-help"
              {...register("phone")}
            />
          </div>
          <p id="phone-help" className="mt-1.5 text-[11px] text-muted">
            Used only by placement directors to arrange your interview.
          </p>
          <FieldError id="phone-error" message={errors.phoneCountry?.message ?? errors.phone?.message} />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <p id="photo-label" className="text-[13px] font-medium text-ink">
            Official Educator Headshot<span aria-hidden className="ml-0.5 text-rose-500">*</span>
            <span className="sr-only"> (required)</span>
          </p>
          <span className="text-[11px] text-muted">
            Min. {PHOTO_MIN_PX}×{PHOTO_MIN_PX}px • Max 10MB
          </span>
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
            dragging ? "border-brand-400 bg-brand-50" : errors.photo ? "border-rose-300 bg-rose-50/40" : "border-transparent bg-lavender/70",
          )}
        >
          <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-brand-100">
            {photoUrl ? (
              <Image src={photoUrl} alt="Your headshot preview" fill unoptimized sizes="112px" className="object-cover" />
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
                aria-describedby="photo-label"
                onClick={() => fileInput.current?.click()}
                className="rounded-full bg-linear-to-r from-brand-700 to-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand-600/25 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                {photo ? "Replace Photo" : "Browse Local File"}
              </button>
              <span className="text-xs text-muted">or drag & drop headshot here</span>
              {photo && (
                <button
                  type="button"
                  onClick={removePhoto}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  <X aria-hidden className="size-3.5" />
                  Remove
                </button>
              )}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              {photo
                ? `${photo.name} • ${photo.width}×${photo.height}px • ${formatBytes(photo.size)}`
                : "Upload a high-resolution, front-facing formal portrait. It's used for administrative verification and shared only with families you're matched with."}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck aria-hidden className="size-3.5 text-brand-600" />
                Private storage
              </span>
              <span className="inline-flex items-center gap-1">
                <EyeOff aria-hidden className="size-3.5 text-violet-brand" />
                Never publicly indexed
              </span>
            </p>
          </div>
          <input
            ref={fileInput}
            type="file"
            accept={PHOTO_TYPES.join(",")}
            className="sr-only"
            tabIndex={-1}
            aria-label="Upload headshot"
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
