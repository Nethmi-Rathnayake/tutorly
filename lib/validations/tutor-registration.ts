import { z } from "zod";
import { curricula, educationLevels } from "@/lib/constants/taxonomy";
import { dayOptions, timeWindowOptions } from "@/lib/constants/tutor-request";
import {
  experienceOptions,
  PHOTO_MAX_BYTES,
  PHOTO_MIN_PX,
  PHOTO_TYPES,
  qualificationOptions,
  teachingMethodOptions,
  tutorModeOptions,
} from "@/lib/constants/tutor-registration";
import {
  emailSchema,
  OTHER_SUBJECT,
  optionalText,
  phoneCountrySchema,
  phoneSchema,
  subjectValues,
  text,
  values,
} from "@/lib/validations/common";

/**
 * Tutor registration schema (SRS FR-06, §8). Shared by the client wizard
 * (per-step validation) and the server action (authoritative validation).
 */

const photoSchema = z
  .object(
    {
      name: z.string().max(200),
      size: z.number().max(PHOTO_MAX_BYTES, { error: "Photo must be 10MB or smaller" }),
      type: z.enum(PHOTO_TYPES, { error: "Upload a JPG, PNG or WebP image" }),
      width: z.number().min(PHOTO_MIN_PX, { error: `Photo must be at least ${PHOTO_MIN_PX}×${PHOTO_MIN_PX}px` }),
      height: z.number().min(PHOTO_MIN_PX, { error: `Photo must be at least ${PHOTO_MIN_PX}×${PHOTO_MIN_PX}px` }),
    },
    { error: "Upload a professional headshot" },
  );

export const personalStepSchema = z.object({
  fullName: text("Full legal name", 2, 100),
  email: emailSchema,
  phoneCountry: phoneCountrySchema,
  phone: phoneSchema,
  photo: photoSchema,
});

export const teachingStepSchema = z.object({
  subjects: z
    .array(z.string().refine((v) => subjectValues.includes(v)))
    .min(1, { error: "Add at least one subject you teach" })
    .max(8, { error: "Choose up to 8 subjects" }),
  customSubject: optionalText("Subject", 80),
  levels: z
    .array(z.enum(educationLevels.map((l) => l.id) as [string, ...string[]]))
    .min(1, { error: "Select at least one education level" }),
  curricula: z
    .array(z.enum(curricula.map((c) => c.id) as [string, ...string[]]))
    .min(1, { error: "Select at least one curriculum" }),
  experience: z.enum(values(experienceOptions), { error: "Select your teaching experience" }),
  qualification: z.enum(values(qualificationOptions), { error: "Select your highest qualification" }),
  institution: text("University / institution", 2, 120),
  additionalQualifications: optionalText("Additional qualifications", 400),
});

export const availabilityStepSchema = z.object({
  mode: z.enum(values(tutorModeOptions), { error: "Choose how you'd like to teach" }),
  locations: optionalText("Preferred locations", 200),
  days: z.array(z.enum(values(dayOptions))).min(1, { error: "Select at least one day" }),
  timeWindows: z.array(z.enum(values(timeWindowOptions))).min(1, { error: "Select at least one time window" }),
});

export const pedagogyStepSchema = z.object({
  bio: text("Biography", 80, 800),
  teachingApproach: text("Teaching approach", 50, 1000),
  teachingMethods: z.array(z.enum(values(teachingMethodOptions))).min(1, { error: "Select at least one teaching method" }),
  additionalInfo: optionalText("Additional information", 500),
});

export const registrationReviewSchema = z.object({
  consent: z.literal(true, { error: "Please confirm your details are accurate and consent to verification" }),
});

type Ctx = z.RefinementCtx;

function refineTeaching(data: { subjects: string[]; customSubject: string }, ctx: Ctx) {
  if (data.subjects.includes(OTHER_SUBJECT) && data.customSubject.length < 2) {
    ctx.addIssue({ code: "custom", path: ["customSubject"], message: "Please specify the other subject" });
  }
}

function refineAvailability(data: { mode: string; locations: string }, ctx: Ctx) {
  if (data.mode !== "online" && data.locations.length < 2) {
    ctx.addIssue({ code: "custom", path: ["locations"], message: "Enter the areas you can travel to for in-person lessons" });
  }
}

export const tutorRegistrationSchema = personalStepSchema
  .extend(teachingStepSchema.shape)
  .extend(availabilityStepSchema.shape)
  .extend(pedagogyStepSchema.shape)
  .extend(registrationReviewSchema.shape)
  .superRefine((data, ctx) => {
    refineTeaching(data, ctx);
    refineAvailability(data, ctx);
  });

export type TutorRegistrationValues = z.infer<typeof tutorRegistrationSchema>;

export const registrationStepSchemas = [
  personalStepSchema,
  teachingStepSchema.superRefine(refineTeaching),
  availabilityStepSchema.superRefine(refineAvailability),
  pedagogyStepSchema,
  tutorRegistrationSchema,
] as const;

export const registrationStepFields: string[][] = [
  Object.keys(personalStepSchema.shape),
  Object.keys(teachingStepSchema.shape),
  Object.keys(availabilityStepSchema.shape),
  Object.keys(pedagogyStepSchema.shape),
  Object.keys(registrationReviewSchema.shape),
];

export const tutorRegistrationDefaults: Partial<TutorRegistrationValues> = {
  fullName: "",
  email: "",
  phoneCountry: "+44",
  phone: "",
  subjects: [],
  customSubject: "",
  levels: [],
  curricula: [],
  institution: "",
  additionalQualifications: "",
  mode: "online",
  locations: "",
  days: [],
  timeWindows: [],
  bio: "",
  teachingApproach: "",
  teachingMethods: [],
  additionalInfo: "",
};
