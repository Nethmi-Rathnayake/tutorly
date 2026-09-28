import { z } from "zod";
import {
  contactChannelOptions,
  dayOptions,
  durationOptions,
  GRADE_SCALE_MAX,
  learningStyleOptions,
  lessonsPerWeekOptions,
  relationshipOptions,
  timeWindowOptions,
  tutorGenderOptions,
  tutorPreferenceOptions,
  UPLOAD_ACCEPT,
  UPLOAD_MAX_BYTES,
  urgencyOptions,
} from "@/lib/constants/tutor-request";
import { curricula, educationLevels } from "@/lib/constants/taxonomy";
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
 * Parent tutoring-requirement schema (SRS FR-05, §7, §12).
 * Shared by the client wizard (per-step validation) and the server action
 * (authoritative validation), so rules only live here.
 */

const levelOptionValues = educationLevels.flatMap((g) => g.options);
export { OTHER_SUBJECT };

export const parentStepSchema = z.object({
  parentName: text("Full name", 2, 80),
  email: emailSchema,
  phoneCountry: phoneCountrySchema,
  phone: phoneSchema,
  relationship: z.enum(values(relationshipOptions), { error: "Select your relationship to the student" }),
  contactChannel: z.enum(values(contactChannelOptions), { error: "Choose how we should contact you" }),
});

const gradeValue = z.number().int().min(1).max(GRADE_SCALE_MAX);

export const studentStepSchema = z.object({
  studentName: text("Student name", 2, 80),
  age: z
    .number({ error: "Enter the student's age" })
    .int({ error: "Age must be a whole number" })
    .min(3, { error: "Age must be 3 or older" })
    .max(99, { error: "Enter a valid age" }),
  dateOfBirth: z
    .string()
    .refine((v) => v === "" || (!Number.isNaN(Date.parse(v)) && new Date(v) <= new Date()), {
      error: "Date of birth can't be in the future",
    }),
  school: optionalText("School name", 120),
  levelGroup: z.enum(educationLevels.map((l) => l.id) as [string, ...string[]], {
    error: "Select the student's education level",
  }),
  grade: z.string({ error: "Select the student's grade or year" }).refine((v) => levelOptionValues.includes(v), {
    error: "Select the student's grade or year",
  }),
  learningStyles: z.array(z.enum(values(learningStyleOptions))),
  currentGrade: gradeValue,
  targetGrade: gradeValue,
});

export const subjectStepSchema = z.object({
  subject: z.string({ error: "Select a subject" }).refine((v) => subjectValues.includes(v), {
    error: "Select a subject from the list",
  }),
  customSubject: optionalText("Subject", 80),
  additionalSubjects: z.array(z.string().refine((v) => subjectValues.includes(v))).max(3),
  curriculum: z.enum(curricula.map((c) => c.id) as [string, ...string[]], { error: "Select a curriculum" }),
  mode: z.enum(["online", "in-person"], { error: "Choose online or in-person" }),
  location: optionalText("Location", 120),
});

export const scheduleStepSchema = z.object({
  lessonsPerWeek: z.enum(values(lessonsPerWeekOptions), { error: "Choose lessons per week" }),
  duration: z.enum(values(durationOptions), { error: "Choose a session length" }),
  days: z.array(z.enum(values(dayOptions))).min(1, { error: "Select at least one day" }),
  timeWindows: z.array(z.enum(values(timeWindowOptions))).min(1, { error: "Select at least one time window" }),
});

const uploadSchema = z
  .object({
    name: z.string().max(200),
    size: z.number().max(UPLOAD_MAX_BYTES, { error: "Files must be 25MB or smaller" }),
    type: z.string().refine((t) => t in UPLOAD_ACCEPT, { error: "Upload a PDF, PNG, JPG or DOCX file" }),
  })
  .nullable();

export const notesStepSchema = z.object({
  examSession: z.string({ error: "Select an exam session or milestone" }).min(1, {
    error: "Select an exam session or milestone",
  }),
  challenges: optionalText("Focus areas", 1000),
  attachment: uploadSchema,
  tutorPreferences: z.array(z.enum(values(tutorPreferenceOptions))),
  tutorGender: z.enum(values(tutorGenderOptions)),
  urgency: z.enum(values(urgencyOptions), { error: "Choose when you'd like the trial session" }),
});

export const reviewStepSchema = z.object({
  consent: z.literal(true, { error: "Please confirm you agree to be contacted about this request" }),
  requestedTutorId: z.string().max(80).optional(),
});

type Ctx = z.RefinementCtx;

function refineStudent(data: { currentGrade: number; targetGrade: number }, ctx: Ctx) {
  if (data.targetGrade < data.currentGrade) {
    ctx.addIssue({ code: "custom", path: ["targetGrade"], message: "Target should be at or above the current grade" });
  }
}

function refineSubject(data: { subject: string; customSubject: string; mode: string; location: string }, ctx: Ctx) {
  if (data.subject === OTHER_SUBJECT && data.customSubject.length < 2) {
    ctx.addIssue({ code: "custom", path: ["customSubject"], message: "Please specify the subject" });
  }
  if (data.mode === "in-person" && data.location.length < 2) {
    ctx.addIssue({ code: "custom", path: ["location"], message: "Enter the area for in-person lessons" });
  }
}

/** Complete request, validated on final submit (client) and in the server action. */
export const tutorRequestSchema = parentStepSchema
  .extend(studentStepSchema.shape)
  .extend(subjectStepSchema.shape)
  .extend(scheduleStepSchema.shape)
  .extend(notesStepSchema.shape)
  .extend(reviewStepSchema.shape)
  .superRefine((data, ctx) => {
    refineStudent(data, ctx);
    refineSubject(data, ctx);
  });

export type TutorRequestValues = z.infer<typeof tutorRequestSchema>;

/** Per-step schemas used while moving through the wizard (index = step). */
export const stepSchemas = [
  parentStepSchema,
  studentStepSchema.superRefine(refineStudent),
  subjectStepSchema.superRefine(refineSubject),
  scheduleStepSchema,
  notesStepSchema,
  tutorRequestSchema,
] as const;

/** Field names owned by each wizard step (used to route server errors back to the right step). */
export const stepFields: string[][] = [
  Object.keys(parentStepSchema.shape),
  Object.keys(studentStepSchema.shape),
  Object.keys(subjectStepSchema.shape),
  Object.keys(scheduleStepSchema.shape),
  Object.keys(notesStepSchema.shape),
  Object.keys(reviewStepSchema.shape),
];

export const tutorRequestDefaults: Partial<TutorRequestValues> = {
  parentName: "",
  email: "",
  phoneCountry: "+44",
  phone: "",
  contactChannel: "whatsapp",
  studentName: "",
  dateOfBirth: "",
  school: "",
  learningStyles: [],
  currentGrade: 4,
  targetGrade: 6,
  customSubject: "",
  additionalSubjects: [],
  mode: "online",
  location: "",
  lessonsPerWeek: "2",
  duration: "90",
  days: [],
  timeWindows: [],
  challenges: "",
  attachment: null,
  tutorPreferences: [],
  tutorGender: "any",
  urgency: "7days",
};
