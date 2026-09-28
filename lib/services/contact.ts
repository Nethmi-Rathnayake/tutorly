import { randomUUID } from "node:crypto";
import type { ContactValues } from "@/lib/validations/contact";

export type CreatedInquiry = { reference: string };

/**
 * Record a contact-form inquiry.
 *
 * TODO: no database or email is configured yet. Replace this stub with an insert
 * into an inquiries table and notify the advisory team.
 */
export async function createContactInquiry(data: ContactValues): Promise<CreatedInquiry> {
  void data;
  return { reference: `CQ-${randomUUID().slice(0, 8).toUpperCase()}` };
}
