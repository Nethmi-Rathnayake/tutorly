"use server";

import { z } from "zod";
import type { SubmitResult } from "@/lib/hooks/use-multi-step-form";
import { createContactInquiry } from "@/lib/services/contact";
import { contactSchema } from "@/lib/validations/contact";

/** Server-side validation is authoritative; client validation is only for UX (SRS §22). */
export async function submitContactInquiry(input: unknown): Promise<SubmitResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Some details need attention. Please review the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const { reference } = await createContactInquiry(parsed.data);
    return { ok: true, reference };
  } catch {
    return { ok: false, message: "We couldn't send your message right now. Please try again in a moment." };
  }
}
