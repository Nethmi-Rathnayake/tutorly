import { z } from "zod";
import { audienceOptions, MESSAGE_MAX, topicOptions } from "@/lib/constants/contact-page";
import { emailSchema, phoneCountrySchema, phoneSchema, text, values } from "@/lib/validations/common";

/**
 * Contact form schema. Shared by the client form (UX validation) and the
 * server action (authoritative validation).
 */
export const contactSchema = z.object({
  audience: z.enum(values(audienceOptions), { error: "Tell us who is reaching out" }),
  fullName: text("Full name", 2, 100),
  email: emailSchema,
  phoneCountry: phoneCountrySchema,
  // Optional: blank is fine, but anything entered must be a valid number.
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || phoneSchema.safeParse(v).success, { error: "Enter a valid phone number" }),
  topic: z.enum(values(topicOptions), { error: "Choose a subject for your message" }),
  message: text("Message", 20, MESSAGE_MAX),
});

export type ContactValues = z.infer<typeof contactSchema>;

export const contactDefaults: ContactValues = {
  audience: "parent",
  fullName: "",
  email: "",
  phoneCountry: "+44",
  phone: "",
  topic: "tutoring",
  message: "",
};
