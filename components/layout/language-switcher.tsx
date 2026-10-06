"use client";

import { Fragment } from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref, stripLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";

const options: { value: Locale; label: string; name: string }[] = [
  { value: "en", label: "ENG", name: "English" },
  { value: "ar", label: "العربية", name: "العربية" },
];

/**
 * Inline ENG / العربية control for the header's right side. Each link goes to the current page
 * in that language.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const path = stripLocale(usePathname());
  const router = useRouter();

  return (
    <nav
      aria-label="Language / اللغة"
      className="flex shrink-0 items-center gap-0.5 self-center whitespace-nowrap text-xs font-semibold leading-none print:hidden"
    >
      {options.map((opt, i) => {
        const active = opt.value === locale;
        const href = localizeHref(path, opt.value);
        return (
          <Fragment key={opt.value}>
            {i > 0 && (
              <span aria-hidden className="text-white/30">
                /
              </span>
            )}
            <NextLink
              href={href}
              // Carry the query string (e.g. a pre-selected subject) over to the other language.
              onClick={(e) => {
                if (!window.location.search) return;
                e.preventDefault();
                router.push(href + window.location.search);
              }}
              hrefLang={opt.value}
              lang={opt.value}
              aria-label={opt.name}
              aria-current={active ? "true" : undefined}
              className={cn(
                "inline-flex min-h-11 min-w-8 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                active
                  ? "pointer-events-none text-white"
                  : "text-white/60 hover:text-gold",
              )}
            >
              {opt.label}
            </NextLink>
          </Fragment>
        );
      })}
    </nav>
  );
}
