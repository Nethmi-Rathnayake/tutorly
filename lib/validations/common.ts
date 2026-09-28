import { z } from "zod";
import { phoneCountryOptions } from "@/lib/constants/tutor-request";
import { subjectCategories } from "@/lib/constants/taxonomy";

/** Validation building blocks shared by the intake forms. */

export const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

export const subjectValues = subjectCategories.flatMap((c) => c.subjects);
export const OTHER_SUBJECT = "Other (Please specify)";

export const text = (label: string, min: number, max: number) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(1, { error: `${label} is required` })
    .min(min, { error: `${label} must be at least ${min} characters` })
    .max(max, { error: `${label} must be ${max} characters or fewer` });

export const optionalText = (label: string, max: number) =>
  z.string().trim().max(max, { error: `${label} must be ${max} characters or fewer` });

// Local number (country code chosen separately): digits with optional spaces, dashes and brackets.
const PHONE_RE = /^[0-9\s\-()]{6,20}$/;

export const phoneCountrySchema = z.enum(values(phoneCountryOptions), { error: "Select a country code" });

export const phoneSchema = z
  .string()
  .trim()
  .min(1, { error: "Phone number is required" })
  .regex(PHONE_RE, { error: "Enter a valid phone number" })
  .refine((v) => v.replace(/\D/g, "").length >= 6 && v.replace(/\D/g, "").length <= 14, {
    error: "Phone number should contain 6–14 digits",
  });

export const emailSchema = z.email({ error: "Enter a valid email address" }).max(120);
