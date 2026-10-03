"use server";

import { z } from "zod";
import type { SubmitResult } from "@/lib/hooks/use-multi-step-form";
import { createTutorApplication } from "@/lib/services/tutor-applications";
import { tutorRegistrationSchema } from "@/lib/validations/tutor-registration";

/** Server-side validation is authoritative; client validation is only for UX (SRS §22). */
export async function submitTutorRegistration(input: unknown): Promise<SubmitResult> {
  const parsed = tutorRegistrationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Some details need attention. Please review the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const { reference } = await createTutorApplication(parsed.data);
    return { ok: true, reference };
  } catch {
    return { ok: false, message: "We couldn't submit your registration right now. Please try again in a moment." };
  }
}
