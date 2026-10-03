import { Link } from "@/components/ui/link";
import { footerNav, footerTagline, legalNav, siteConfig } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";
import { Logo } from "./logo";

export async function SiteFooter() {
  const t = await getT();
  return (
    <footer className="border-t border-brand-100/70 bg-lavender/60 print:hidden">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.8fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">{t(footerTagline)}</p>
          </div>

          {footerNav.map((group) => (
            <div key={t(group.title)}>
              <h2 className="text-sm font-semibold text-ink">{t(group.title)}</h2>
              <ul className="mt-5 space-y-3.5">
                {group.links.map((link) => (
                  <li key={t(link.label)}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-brand-700">
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-brand-100 pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t("© {year} {name} Academic Concierge. All rights reserved.", { year: new Date().getFullYear(), name: siteConfig.name })}
          </p>
          <nav aria-label={t("Legal")}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={t(link.label)}>
                  <Link href={link.href} className="transition-colors hover:text-brand-700">
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
