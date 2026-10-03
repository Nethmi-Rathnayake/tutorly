import type { Locale } from "@/lib/i18n/config";

/** "8 September 2026" / "8 سبتمبر 2026" (Western digits, matching the rest of the Arabic copy). */
export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-AE-u-nu-latn" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dubai",
  }).format(new Date(iso));
}
