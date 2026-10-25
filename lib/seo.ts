import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants/site";
import { defaultLocale, locales, localizeHref, type Locale } from "@/lib/i18n/config";

/** Open Graph locale codes. */
const ogLocale: Record<Locale, string> = { en: "en_AE", ar: "ar_AE" };

/** Absolute URL of an English-path (e.g. "/faq") in the given locale. English stays unprefixed. */
export function absoluteUrl(path: string, locale: Locale = defaultLocale) {
  const localized = localizeHref(path, locale);
  return `${siteConfig.url}${localized === "/" ? "" : localized}`;
}

/** Canonical + hreflang alternates for a page (path is the English, unprefixed path). */
export function pageAlternates(path: string, locale: Locale): NonNullable<Metadata["alternates"]> {
  return {
    canonical: absoluteUrl(path, locale),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(path, l)])),
      "x-default": absoluteUrl(path, defaultLocale),
    },
  };
}

/**
 * Wraps a page's title/description with canonical, hreflang, Open Graph and Twitter metadata.
 * Open Graph is replaced (not merged) per segment, so the full set is declared here.
 */
export function pageMetadata(path: string, locale: Locale, meta: Metadata): Metadata {
  const title = meta.title ?? undefined;
  const plainTitle = typeof title === "string" ? title : title && "absolute" in title ? title.absolute : undefined;
  const ogTitle = plainTitle ? (plainTitle.includes(siteConfig.name) ? plainTitle : `${plainTitle} | ${siteConfig.name}`) : siteConfig.name;
  const image = { url: absoluteUrl("/opengraph-image", locale), width: 1200, height: 630, alt: siteConfig.name };
  const description = typeof meta.description === "string" ? meta.description : undefined;
  return {
    ...meta,
    alternates: pageAlternates(path, locale),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: absoluteUrl(path, locale),
      title: ogTitle,
      description,
      images: [image],
      ...meta.openGraph,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [meta.openGraph?.images ? undefined : image.url].filter((u): u is string => !!u),
    },
  };
}

/** Serialises structured data for a <script type="application/ld+json"> (escapes "<"). */
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\u003c");
