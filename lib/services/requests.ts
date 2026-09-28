import { randomUUID } from "node:crypto";
import type { TutorRequestValues } from "@/lib/validations/tutor-request";

export type CreatedRequest = { reference: string };

/**
 * Persist a parent tutoring requirement (SRS §20 ParentRequirement).
 *
 * TODO: no database is configured yet. Replace this stub with an insert into
 * the ParentRequirement table and trigger the admin notification email.
 */
export async function createParentRequirement(data: TutorRequestValues): Promise<CreatedRequest> {
  void data;
  const reference = `TF-${randomUUID().slice(0, 8).toUpperCase()}`;
  return { reference };
}
