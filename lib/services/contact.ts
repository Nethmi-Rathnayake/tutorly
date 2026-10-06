import { randomUUID } from "node:crypto";
import type { ContactValues } from "@/lib/validations/contact";
import { notifyTeam, sendConfirmation } from "@/lib/services/notify";

export type CreatedInquiry = { reference: string };

/**
 * Record a contact-form inquiry.
 *
 * TODO: no database or email is configured yet. Replace this stub with an insert
 * into an inquiries table and notify the advisory team.
 */
export async function createContactInquiry(data: ContactValues): Promise<CreatedInquiry> {
  const { reference } = { reference: `CQ-${randomUUID().slice(0, 8).toUpperCase()}` };
  await notifyTeam({ subject: "New contact inquiry", reference, data, replyTo: data.email });
  await sendConfirmation({
    to: data.email,
    name: data.fullName,
    reference,
    subject: "We've received your message",
    message: "Thank you for contacting us. A member of our team will reply to you shortly.",
  });
  return { reference };
}
