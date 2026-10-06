/**
 * Locale routing. English is served at unprefixed URLs (/subjects) and Arabic under /ar
 * (/ar/subjects); proxy.ts rewrites unprefixed requests to the internal /en segment.
 */

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: unknown): value is Locale => locales.includes(value as Locale);

/**
 * The page layout is the same in every language (columns, menus and buttons stay where they are);
 * only the text itself reads right-to-left in Arabic (see the [lang="ar"] rules in globals.css).
 */
export function localeDir(locale: Locale): "ltr" {
  void locale;
  return "ltr";
}

/** Prefixes an internal path for the given locale. External links, hashes and English paths pass through. */
export function localizeHref(href: string, locale: Locale) {
  if (locale === defaultLocale || !href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/?") || href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Removes a locale prefix from a browser pathname: "/ar/faq" → "/faq", "/ar" → "/". */
export function stripLocale(pathname: string) {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}
