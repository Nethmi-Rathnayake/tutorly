"use client";

import { useId, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { blogHero, latestArticles } from "@/lib/constants/blog";
import { blog as blogDictionary } from "@/lib/i18n/ar/blog";
import { useT } from "@/lib/i18n/client";

export type BrowserItem = {
  slug: string;
  category: string;
  /** Lower-cased English + translated text the search box matches against. */
  search: string;
  card: React.ReactNode;
};

type BlogBrowserProps = {
  items: BrowserItem[];
  /** Kept for callers; the topic buttons were removed, so every guide shows on the page. */
  categories?: { id: string; label: string }[];
  featured: { slug: string; card: React.ReactNode };
};

/**
 * Search box, category chips, the featured guide and the article grid. Cards are rendered on the
 * server and passed in; this component only filters them.
 */
export function BlogBrowser({ items, featured }: BlogBrowserProps) {
  const t = useT(blogDictionary);
  const hero = t.deep(blogHero);
  const copy = t.deep(latestArticles);
  const id = useId();
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const [query, setQuery] = useState("");

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const filtering = terms.length > 0;
  const visible = items.filter(
    (item) => terms.every((term) => item.search.includes(term)),
  );
  // Unfiltered, the featured guide sits above the grid instead of repeating inside it.
  const grid = filtering ? visible : visible.filter((item) => item.slug !== featured.slug);

  const reset = () => setQuery("");


  return (
    <>
      <div className="relative mx-auto mt-10 max-w-4xl px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-6">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex items-center gap-2 rounded-full bg-white p-2 shadow-[0_18px_40px_-24px_rgba(143,106,29,0.5)] ring-2 ring-brand-300 transition-shadow focus-within:ring-brand-500"
        >
          <label htmlFor={`${id}-q`} className="sr-only">
            {hero.searchLabel}
          </label>
          <Search aria-hidden className="ms-4 size-5 shrink-0 text-brand-600" />
          <input
            id={`${id}-q`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={hero.searchPlaceholder}
            className="h-12 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted sm:text-base [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("Clear search")}
              className="grid size-8 shrink-0 place-items-center rounded-full text-muted hover:bg-lavender hover:text-ink"
            >
              <X aria-hidden className="size-4" />
            </button>
          )}
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] px-7 text-sm font-semibold text-brand-900 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {hero.searchButton}
          </button>
        </form>

      </div>

      {!filtering && <div className="mx-auto mt-14 max-w-[90rem] px-4 sm:px-8 lg:px-10">{featured.card}</div>}

      <section
        aria-labelledby={`${id}-latest`}
        className="mx-auto mt-12 max-w-[90rem] scroll-mt-28 px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
              <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
              {copy.eyebrow}
            </p>
            <h2 ref={resultsRef} id={`${id}-latest`} className="mt-2 scroll-mt-28 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {filtering ? copy.resultsTitle : copy.title}
            </h2>
          </div>
          <p aria-live="polite" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
              {t(visible.length === 1 ? "{n} guide" : "{n} guides", { n: visible.length })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
              {copy.updated}
            </span>
          </p>
        </div>

        {grid.length > 0 ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((item) => (
              <li key={item.slug} className="flex">
                {item.card}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-3xl bg-white px-6 py-12 text-center ring-1 ring-brand-100">
            <p className="text-base font-bold text-ink">{copy.empty.title}</p>
            <p className="mt-1.5 text-sm text-muted">{copy.empty.body}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 inline-flex h-9 items-center rounded-full bg-brand-50 px-4 text-xs font-semibold text-brand-700 hover:bg-brand-100"
            >
              {copy.empty.reset}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
