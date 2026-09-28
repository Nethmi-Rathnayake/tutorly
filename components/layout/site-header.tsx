"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav, requestHref } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isTutorPage = pathname.startsWith("/become-a-tutor") || pathname.startsWith("/tutor-registration");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 print:hidden",
        scrolled ? "bg-white/80 shadow-[0_1px_0_rgba(79,63,217,0.08)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1 rounded-full bg-white/70 p-1 ring-1 ring-brand-100/80 backdrop-blur">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-linear-to-r from-brand-700 to-brand-600 text-white shadow-md shadow-brand-600/25"
                      : "text-muted hover:bg-brand-50 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href="/become-a-tutor"
            aria-current={isTutorPage ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
              isTutorPage
                ? "bg-linear-to-r from-brand-700 to-brand-600 text-white shadow-md shadow-brand-600/25"
                : "text-ink hover:text-brand-600",
            )}
          >
            Become a Tutor
          </Link>
          <ButtonLink href={requestHref} size="sm" className="h-10 px-5">
            Request a Tutor
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid size-11 place-items-center rounded-full bg-white text-ink ring-1 ring-brand-100 xl:hidden"
        >
          <Menu aria-hidden className="size-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-night/40 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-white p-6 shadow-2xl xl:hidden"
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
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-full bg-brand-50 text-ink"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-8 flex-1 overflow-y-auto">
                <ul className="space-y-1">
                  {mainNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "block rounded-2xl px-4 py-3.5 text-base font-medium",
                          isActive(item.href) ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-brand-50",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 grid gap-3">
                <ButtonLink href={requestHref} size="lg" arrow>
                  Request a Tutor
                </ButtonLink>
                <ButtonLink href="/become-a-tutor" variant="ghost" size="lg">
                  Join as a Tutor
                </ButtonLink>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
