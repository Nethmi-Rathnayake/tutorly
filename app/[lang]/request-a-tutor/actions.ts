"use server";

import { z } from "zod";
import { createParentRequirement } from "@/lib/services/requests";
import { tutorRequestSchema } from "@/lib/validations/tutor-request";

export type SubmitTutorRequestResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[] | undefined> };

/** Server-side validation is authoritative; client validation is only for UX (SRS §22). */
export async function submitTutorRequest(input: unknown): Promise<SubmitTutorRequestResult> {
  const parsed = tutorRequestSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Some details need attention. Please review the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const { reference } = await createParentRequirement(parsed.data);
    return { ok: true, reference };
  } catch {
    return { ok: false, message: "We couldn't submit your request right now. Please try again in a moment." };
  }
}
