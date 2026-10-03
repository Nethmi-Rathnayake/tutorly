"use client";

import NextLink from "next/link";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref } from "@/lib/i18n/config";

/** `next/link` that keeps the visitor in their language (prefixes internal paths with /ar). */
export function Link({ href, ...props }: React.ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return <NextLink href={typeof href === "string" ? localizeHref(href, locale) : href} {...props} />;
}
