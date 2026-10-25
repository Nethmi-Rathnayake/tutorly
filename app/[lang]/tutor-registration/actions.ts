"use server";

import { z } from "zod";
import type { SubmitResult } from "@/lib/hooks/use-multi-step-form";
import { createTutorApplication } from "@/lib/services/tutor-applications";
import { validateHeadshot } from "@/lib/validations/headshot";
import { tutorRegistrationServerSchema } from "@/lib/validations/tutor-registration";

/** The form values travel as JSON in one part; keep it far below the request-body limit. */
const MAX_DATA_CHARS = 100_000;

/**
 * Server-side validation is authoritative; client validation is only for UX (SRS §22).
 * Receives multipart form data: `data` (JSON form values) and `photo` (the resized headshot).
 * The photo is checked again from its bytes; the client's file name and MIME type are ignored.
 */
export async function submitTutorRegistration(formData: FormData): Promise<SubmitResult> {
  const invalid = (fieldErrors: Record<string, string[] | undefined>): SubmitResult => ({
    ok: false,
    message: "Some details need attention. Please review the highlighted fields.",
    fieldErrors,
  });

  const raw = formData.get("data");
  let json: unknown;
  try {
    if (typeof raw !== "string" || raw.length > MAX_DATA_CHARS) throw new Error("bad data part");
    json = JSON.parse(raw);
  } catch {
    return invalid({});
  }

  const parsed = tutorRegistrationServerSchema.safeParse(json);
  const photo = await validateHeadshot(formData.get("photo"));
  if (!parsed.success || !photo.ok) {
    return invalid({
      ...(parsed.success ? {} : z.flattenError(parsed.error).fieldErrors),
      ...(photo.ok ? {} : { photo: [photo.message] }),
    });
  }

  try {
    const { reference } = await createTutorApplication(parsed.data, photo.photo);
    return { ok: true, reference };
  } catch (error) {
    // Never log the photo; the error alone is enough to diagnose delivery problems.
    console.error("[form submit] failed:", error instanceof Error ? error.message : "unknown error");
    return { ok: false, message: "We couldn't submit your registration right now. Please try again in a moment." };
  }
}
