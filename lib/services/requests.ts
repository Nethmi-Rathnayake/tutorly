import { randomUUID } from "node:crypto";
import type { TutorRequestValues } from "@/lib/validations/tutor-request";
import { notifyTeam, sendConfirmation } from "@/lib/services/notify";

export type CreatedRequest = { reference: string };

/**
 * Persist a parent tutoring requirement (SRS §20 ParentRequirement).
 *
 * TODO: no database is configured yet. Replace this stub with an insert into
 * the ParentRequirement table and trigger the admin notification email.
 */
export async function createParentRequirement(data: TutorRequestValues): Promise<CreatedRequest> {
  const { reference } = { reference: `TF-${randomUUID().slice(0, 8).toUpperCase()}` };
  await notifyTeam({ subject: "New tutor request", reference, data, replyTo: data.email });
  await sendConfirmation({
    to: data.email,
    name: data.parentName,
    reference,
    subject: "We've received your tutor request",
    message: "Thank you for your request. Our team will review it and contact you shortly with tutor matches.",
  });
  return { reference };
}
