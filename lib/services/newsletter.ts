import { randomUUID } from "node:crypto";
import type { NewsletterValues } from "@/lib/validations/newsletter";

export type CreatedSubscription = { reference: string };

/**
 * Subscribe an email address to the parent briefing.
 *
 * TODO: no database or email provider is configured yet. Replace this stub with a call to the
 * mailing-list provider (double opt-in) once one is chosen.
 */
export async function createNewsletterSubscription(data: NewsletterValues): Promise<CreatedSubscription> {
  void data;
  return { reference: `NL-${randomUUID().slice(0, 8).toUpperCase()}` };
}
