import { z } from "zod";
import {
  contactChannelOptions,
  relationshipOptions,
} from "@/lib/constants/tutor-request";
import { curricula, educationLevels } from "@/lib/constants/taxonomy";
import {
  emailSchema,
  phoneCountrySchema,
  phoneSchema,
  text,
  values,
} from "@/lib/validations/common";

/**
 * Parent tutoring-requirement schema (SRS FR-05, §7, §12).
 * Shared by the client wizard (per-step validation) and the server action
 * (authoritative validation), so rules only live here.
 */

const levelOptionValues = educationLevels.flatMap((g) => g.options);

export const parentStepSchema = z.object({
  parentName: text("Full name", 2, 80),
  email: emailSchema,
  phoneCountry: phoneCountrySchema,
  phone: phoneSchema,
  relationship: z.enum(values(relationshipOptions), { error: "Select your role" }),
  contactChannel: z.enum(values(contactChannelOptions), { error: "Choose how we should contact you" }),
});

export const requestDetailsSchema = z.object({
  grade: z.string({ error: "Select the student's grade or year" }).refine((v) => levelOptionValues.includes(v), {
    error: "Select the student's grade or year",
  }),
  curriculum: z.enum(curricula.map((c) => c.id) as [string, ...string[]], { error: "Select a curriculum" }),
  consent: z.literal(true, { error: "Please confirm you agree to be contacted about this request" }),
  /** Pre-filled from `?subject=` / `?tutor=` links; never shown as a field. */
  subject: z.string().max(120).optional(),
  requestedTutorId: z.string().max(80).optional(),
});

/** The request is one step: parent contact details plus the student's grade and curriculum. */
export const tutorRequestSchema = parentStepSchema.extend(requestDetailsSchema.shape);

export type TutorRequestValues = z.infer<typeof tutorRequestSchema>;

/** One schema per wizard step (the request form has a single step). */
export const stepSchemas = [tutorRequestSchema] as const;

/** Field names owned by each wizard step (used to route server errors back to the right step). */
export const stepFields: string[][] = [Object.keys(tutorRequestSchema.shape)];

export const tutorRequestDefaults: Partial<TutorRequestValues> = {
  parentName: "",
  email: "",
  phoneCountry: "+44",
  phone: "",
  contactChannel: "whatsapp",
};
