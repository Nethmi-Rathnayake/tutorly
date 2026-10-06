import { Mail, MapPin } from "lucide-react";
import { Link } from "@/components/ui/link";
import { footerNav, footerTagline, legalNav, siteConfig } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";
import { Logo } from "./logo";

export async function SiteFooter() {
  const t = await getT();
  const { contact } = t.deep(siteConfig);
  return (
    <footer className="relative bg-night font-[family-name:var(--font-inter),var(--font-arabic)] text-white print:hidden">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand-400 via-gold to-brand-500" />
      <div className="mx-auto max-w-[90rem] px-4 pb-8 pt-12 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/65">{t(footerTagline)}</p>
            <ul className="mt-6 space-y-1 text-sm text-white/75">
              <li className="flex min-h-8 items-center gap-3">
                <MapPin aria-hidden className="size-4 shrink-0 text-gold" />
                {contact.address}
              </li>
              <li className="flex min-h-8 items-center gap-3">
                <Mail aria-hidden className="size-4 shrink-0 text-gold" />
                <a href={`mailto:${contact.email}`} className="inline-block py-1.5 transition-colors hover:text-gold">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {footerNav.map((group) => (
            <div key={t(group.title)}>
              <h2 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                <span aria-hidden className="h-px w-6 bg-gold" />
                {t(group.title)}
              </h2>
              <ul className="mt-6 space-y-3.5">
                {group.links.map((link) => (
                  <li key={t(link.label)}>
                    <Link href={link.href} className="-my-1.5 inline-block py-1.5 text-[15px] text-white/75 transition-colors hover:text-gold">
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t("© {year} {name} Academic Concierge. All rights reserved.", { year: new Date().getFullYear(), name: siteConfig.name })}
          </p>
          <nav aria-label={t("Legal")}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={t(link.label)}>
                  <Link href={link.href} className="inline-block py-2 transition-colors hover:text-gold">
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
