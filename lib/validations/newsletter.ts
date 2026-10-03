import { z } from "zod";
import { emailSchema } from "@/lib/validations/common";

/** Blog newsletter sign-up. Shared by the client form and the server action. */
export const newsletterSchema = z.object({
  email: z.string().trim().pipe(emailSchema),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
