"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { common } from "./ar/common";
import { forms } from "./ar/forms";
import { defaultLocale, isLocale, type Locale } from "./config";
import { createTranslator, translateDeep, type Dictionary } from "./translate";

export function useLocale(): Locale {
  const { lang } = useParams<{ lang?: string }>();
  return isLocale(lang) ? lang : defaultLocale;
}

/**
 * Translator for Client Components. Only the shared and form dictionaries ship to the browser;
 * pass a page's dictionary (e.g. `faq`) when a client component renders that page's copy.
 */
export function useT(...extra: Dictionary[]) {
  const locale = useLocale();
  return useMemo(() => {
    const t = createTranslator(locale, Object.assign({}, common, forms, ...extra));
    return Object.assign(t, { locale, deep: <T,>(value: T) => translateDeep(value, t) });
    // `extra` holds module-level dictionaries, so its identity is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);
}
