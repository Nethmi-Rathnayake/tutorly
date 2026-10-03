"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/client";
import { localizeHref, stripLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";

const options: { value: Locale; label: string; name: string }[] = [
  { value: "en", label: "EN", name: "English" },
  { value: "ar", label: "AR", name: "العربية" },
];

/**
 * Floating EN/AR control, fixed to the viewport's top-right just below the sticky header
 * (h-18) so it never covers the header's buttons. z-40 keeps it above page content but
 * under the header and mobile menu (z-50). Each button links to the current page in that language.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const path = stripLocale(usePathname());
  const router = useRouter();

  return (
    <nav aria-label="Language / اللغة" className="fixed right-4 top-21 z-40 flex gap-1.5 sm:right-6 lg:right-8 print:hidden">
      {options.map((opt) => {
        const active = opt.value === locale;
        const href = localizeHref(path, opt.value);
        return (
          <NextLink
            key={opt.value}
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
              "grid size-9 place-items-center rounded-lg text-[11px] font-semibold tracking-wider shadow-sm backdrop-blur transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
              active
                ? "pointer-events-none bg-linear-to-br from-brand-700 to-brand-600 text-white shadow-md shadow-brand-600/25"
                : "bg-white/85 text-muted ring-1 ring-brand-100 hover:-translate-y-0.5 hover:text-brand-700 hover:ring-brand-200",
            )}
          >
            {opt.label}
          </NextLink>
        );
      })}
    </nav>
  );
}
