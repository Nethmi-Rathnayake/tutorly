"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/components/ui/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav, requestHref } from "@/lib/constants/site";
import { useT } from "@/lib/i18n/client";
import { stripLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";
import { ButtonLink } from "@/components/ui/button-link";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";

const noopSubscribe = () => () => {};

export function SiteHeader() {
  const pathname = stripLocale(usePathname());
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // The drawer is portalled to <body>: the header's backdrop-filter would otherwise become the
  // containing block for its fixed children and shrink the menu to the header's height.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isTutorPage =
    pathname.startsWith("/become-a-tutor") ||
    pathname.startsWith("/tutor-registration");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 print:hidden",
        scrolled
          ? "bg-night/95 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-night",
      )}
    >
      <div className="mx-auto flex h-18 max-w-[90rem] items-center justify-between gap-2 sm:gap-4 px-4 sm:px-8 lg:px-10">
        <Logo tone="light" />

        <nav aria-label={t("Main")} className="hidden xl:block">
          <ul className="flex items-center gap-0">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "group relative block whitespace-nowrap px-2 py-2 text-[13px] font-medium uppercase tracking-[0.04em] transition-colors",
                    isActive(item.href)
                      ? "text-gold"
                      : "text-white/75 hover:text-white",
                  )}
                >
                  {t(item.label)}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-2 -bottom-px h-px origin-center bg-gold transition-transform duration-300",
                      isActive(item.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <Link
            href="/become-a-tutor"
            aria-current={isTutorPage ? "page" : undefined}
            className={cn(
              "hidden whitespace-nowrap rounded-lg border border-brand-400/50 px-3.5 py-2 text-[13px] font-semibold uppercase tracking-[0.04em] transition-colors 2xl:block",
              isTutorPage
                ? "bg-white/10 text-gold"
                : "text-gold hover:bg-white/10",
            )}
          >
            {t("Become a Tutor")}
          </Link>
          <ButtonLink
            href={requestHref}
            size="sm"
            className="h-10 px-5 text-[13px] uppercase tracking-[0.04em]"
          >
            {t("Request a Tutor")}
          </ButtonLink>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("Open menu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 xl:hidden"
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
        <AnimatePresence>
          {open && (
            <>
              <m.div
                className="fixed inset-0 z-[60] bg-night/40 backdrop-blur-sm xl:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <m.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label={t("Menu")}
                className="fixed inset-y-0 end-0 z-[70] flex w-[86%] max-w-sm flex-col bg-white p-6 shadow-2xl xl:hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                <div className="flex items-center justify-between">
                  <Logo />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t("Close menu")}
                    className="grid size-11 place-items-center rounded-full bg-brand-50 text-ink"
                  >
                    <X aria-hidden className="size-5" />
                  </button>
                </div>
                <nav
                  aria-label={t("Mobile")}
                  className="mt-8 flex-1 overflow-y-auto"
                >
                  <ul className="space-y-1">
                    {mainNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={cn(
                            "block rounded-2xl px-4 py-3.5 text-base font-medium",
                            isActive(item.href)
                              ? "bg-brand-50 text-brand-700"
                              : "text-ink hover:bg-brand-50",
                          )}
                        >
                          {t(item.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-6 grid gap-3">
                  <ButtonLink href={requestHref} size="lg" arrow>
                    {t("Request a Tutor")}
                  </ButtonLink>
                  <ButtonLink href="/become-a-tutor" variant="ghost" size="lg">
                    {t("Join as a Tutor")}
                  </ButtonLink>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
