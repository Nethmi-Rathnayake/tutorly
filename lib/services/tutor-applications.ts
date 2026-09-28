import { randomUUID } from "node:crypto";
import type { TutorRegistrationValues } from "@/lib/validations/tutor-registration";

export type CreatedApplication = { reference: string };

/**
 * Persist a tutor registration as a pending TutorProfile (SRS §20: status = pending review).
 *
 * TODO: no database or object storage is configured yet. Replace this stub with
 * inserts into TutorProfile / TutorSubject / TutorEducationLevel / TutorCurriculum /
 * Availability, upload the headshot to storage, and notify the admin team.
 */
export async function createTutorApplication(data: TutorRegistrationValues): Promise<CreatedApplication> {
  void data;
  return { reference: `TA-${randomUUID().slice(0, 8).toUpperCase()}` };
}
