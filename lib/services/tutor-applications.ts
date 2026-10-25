import { randomUUID } from "node:crypto";
import type { TutorRegistrationData } from "@/lib/validations/tutor-registration";
import type { ValidatedHeadshot } from "@/lib/validations/headshot";
import { notifyTeam, sendConfirmation } from "@/lib/services/notify";

export type CreatedApplication = { reference: string };

/**
 * Persist a tutor registration as a pending TutorProfile (SRS §20: status = pending review).
 *
 * TODO: no database or object storage is configured yet. Replace this stub with
 * inserts into TutorProfile / TutorSubject / TutorEducationLevel / TutorCurriculum /
 * Availability, and store the headshot in private storage.
 *
 * Until then the headshot is delivered only as an attachment on the team notification email. It is
 * never written to disk or a public location, and no URL is created for it. If the email (and so
 * the attachment) cannot be delivered, this throws and the submission fails.
 */
export async function createTutorApplication(
  data: TutorRegistrationData,
  photo: ValidatedHeadshot,
): Promise<CreatedApplication> {
  const reference = `TA-${randomUUID().slice(0, 8).toUpperCase()}`;
  // The file name is generated here (the reference is ours); the client's name is never used.
  const filename = `headshot-${reference}.${photo.extension}`;
  await notifyTeam({
    subject: "New tutor registration",
    reference,
    data: { ...data, photo: `Attached to this email as ${filename} (${Math.round(photo.bytes.length / 1024)} KB, ${photo.width}×${photo.height}px)` },
    replyTo: data.email,
    attachments: [{ filename, content: Buffer.from(photo.bytes), contentType: photo.type }],
  });
  await sendConfirmation({
    to: data.email,
    name: data.fullName,
    reference,
    subject: "We've received your tutor application",
    message: "Thank you for applying to teach with Tuteme. Our team will review your application and get back to you soon.",
  });
  return { reference };
}
