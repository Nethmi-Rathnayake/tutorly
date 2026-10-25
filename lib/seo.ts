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

type OgImages = NonNullable<NonNullable<Metadata["openGraph"]>["images"]>;

/** Twitter card image(s): the page's Open Graph image when it sets one, otherwise the site default. */
function twitterImages(images: OgImages | undefined, fallback: string): string[] {
  const first = Array.isArray(images) ? images[0] : images;
  if (!first) return [fallback];
  if (typeof first === "string") return [first];
  if (first instanceof URL) return [first.toString()];
  const url = first.url;
  return [typeof url === "string" ? url : url.toString()];
}

/**
 * Wraps a page's title/description with canonical, hreflang, Open Graph and Twitter metadata.
 * Open Graph is replaced (not merged) per segment, so the full set is declared here.
 */
export function pageMetadata(path: string, locale: Locale, meta: Metadata): Metadata {
  const title = meta.title ?? undefined;
  const plainTitle = typeof title === "string" ? title : title && "absolute" in title ? title.absolute : undefined;
  const ogTitle = plainTitle ? (plainTitle.includes(siteConfig.name) ? plainTitle : `${plainTitle} | ${siteConfig.name}`) : siteConfig.name;
  const image = { url: `${siteConfig.url}/og-image.jpg`, width: 1280, height: 675, alt: `${siteConfig.name} — Your Child’s Path to Excellence` };
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
      // Share the page's own Open Graph image (e.g. a blog post's cover) so both cards match.
      images: twitterImages(meta.openGraph?.images, image.url),
    },
  };
}

/** Serialises structured data for a <script type="application/ld+json"> (escapes "<"). */
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\u003c");
