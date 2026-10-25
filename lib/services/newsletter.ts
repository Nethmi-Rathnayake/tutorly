import type { NewsletterValues } from "@/lib/validations/newsletter";

export type CreatedSubscription = { reference: string };

/**
 * Whether a real mailing-list provider is configured. Until one is, the sign-up form stays hidden
 * (see app/[lang]/blog/page.tsx) and no code path may report a successful subscription.
 *
 * TODO: choose a provider (double opt-in plus a working unsubscribe link), implement
 * `createNewsletterSubscription` against it and return true here once it is configured.
 */
export const isNewsletterConfigured = () => false;

/** Subscribe an email address to the parent briefing. Throws while no provider is configured. */
export async function createNewsletterSubscription(data: NewsletterValues): Promise<CreatedSubscription> {
  void data;
  throw new Error("Newsletter provider is not configured");
}
