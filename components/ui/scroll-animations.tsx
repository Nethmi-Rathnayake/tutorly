"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll-in animation. After each navigation it finds the sections, footer and grid
 * cards that start below the fold, hides them (`.rv`, see globals.css) and fades them in as
 * they scroll into view. Elements already handled by `Reveal` (inline opacity), form fields and
 * reduced-motion users are left alone, and nothing above the fold is ever hidden, so there is
 * no flash on load.
 */
const SELECTOR = "main section, footer, main .grid > *";

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frame = requestAnimationFrame(() => {
      const fold = window.innerHeight * 0.92;
      const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter((el) => {
        if (el.dataset.rv) return false;
        if (el.closest("form, [data-no-rv]")) return false;
        if (el.closest('[style*="opacity"]') || el.querySelector('[style*="opacity"]')) return false;
        return el.getBoundingClientRect().top > fold;
      });
      if (!targets.length) return;

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).classList.add("rv-in");
            io.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );

      for (const el of targets) {
        el.dataset.rv = "1";
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const stagger = el.matches("main .grid > *") ? Math.min(siblings.indexOf(el), 5) * 80 : 0;
        el.style.setProperty("--rv-delay", `${stagger}ms`);
        el.classList.add("rv");
        io.observe(el);
      }
      cleanup = () => io.disconnect();
    });

    let cleanup = () => {};
    return () => {
      cancelAnimationFrame(frame);
      cleanup();
    };
  }, [pathname]);

  return null;
}
