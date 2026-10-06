import { randomUUID } from "node:crypto";
import type { TutorRegistrationValues } from "@/lib/validations/tutor-registration";
import { notifyTeam, sendConfirmation } from "@/lib/services/notify";

export type CreatedApplication = { reference: string };

/**
 * Persist a tutor registration as a pending TutorProfile (SRS §20: status = pending review).
 *
 * TODO: no database or object storage is configured yet. Replace this stub with
 * inserts into TutorProfile / TutorSubject / TutorEducationLevel / TutorCurriculum /
 * Availability, upload the headshot to storage, and notify the admin team.
 */
export async function createTutorApplication(data: TutorRegistrationValues): Promise<CreatedApplication> {
  const { reference } = { reference: `TA-${randomUUID().slice(0, 8).toUpperCase()}` };
  await notifyTeam({ subject: "New tutor registration", reference, data, replyTo: data.email });
  await sendConfirmation({
    to: data.email,
    name: data.fullName,
    reference,
    subject: "We've received your tutor application",
    message: "Thank you for applying to teach with Tutorly. Our team will review your application and get back to you soon.",
  });
  return { reference };
}
