"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

/** Article contents with the section currently being read highlighted. Titles arrive translated. */
export function ArticleToc({ label, items }: { label: string; items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    // A section counts as current once its top passes the upper third of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label}>
      <ol className="space-y-1">
        {items.map((item, i) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                onClick={() => setActive(item.id)}
                className={cn(
                  "flex gap-3 rounded-xl px-3 py-2 text-xs leading-snug transition-colors",
                  current ? "bg-brand-50 font-semibold text-brand-700" : "text-muted hover:bg-lavender hover:text-ink",
                )}
              >
                <span className={cn("font-bold tabular-nums", current ? "text-brand-600" : "text-brand-300")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
