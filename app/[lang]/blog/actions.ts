"use server";

import { z } from "zod";
import type { SubmitResult } from "@/lib/hooks/use-multi-step-form";
import { createNewsletterSubscription } from "@/lib/services/newsletter";
import { newsletterSchema } from "@/lib/validations/newsletter";

/** Server-side validation is authoritative; client validation is only for UX (SRS §22). */
export async function subscribeToInsights(input: unknown): Promise<SubmitResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const { reference } = await createNewsletterSubscription(parsed.data);
    return { ok: true, reference };
  } catch {
    return { ok: false, message: "We couldn't subscribe you right now. Please try again in a moment." };
  }
}
