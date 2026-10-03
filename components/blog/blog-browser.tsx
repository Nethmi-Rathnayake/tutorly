"use client";

import { useId, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { blogHero, latestArticles } from "@/lib/constants/blog";
import { blog as blogDictionary } from "@/lib/i18n/ar/blog";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";

const ALL = "all";

export type BrowserItem = {
  slug: string;
  category: string;
  /** Lower-cased English + translated text the search box matches against. */
  search: string;
  card: React.ReactNode;
};

type BlogBrowserProps = {
  items: BrowserItem[];
  /** Translated category chips, "all" first. */
  categories: { id: string; label: string }[];
  featured: { slug: string; card: React.ReactNode };
};

/**
 * Search box, category chips, the featured guide and the article grid. Cards are rendered on the
 * server and passed in; this component only filters them.
 */
export function BlogBrowser({ items, categories, featured }: BlogBrowserProps) {
  const t = useT(blogDictionary);
  const hero = t.deep(blogHero);
  const copy = t.deep(latestArticles);
  const id = useId();
  const resultsRef = useRef<HTMLHeadingElement>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const filtering = terms.length > 0 || category !== ALL;
  const visible = items.filter(
    (item) => (category === ALL || item.category === category) && terms.every((term) => item.search.includes(term)),
  );
  // Unfiltered, the featured guide sits above the grid instead of repeating inside it.
  const grid = filtering ? visible : visible.filter((item) => item.slug !== featured.slug);

  const reset = () => {
    setQuery("");
    setCategory(ALL);
  };

  return (
    <>
      <div className="relative mx-auto mt-9 max-w-2xl px-4 sm:px-6">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex items-center gap-2 rounded-full bg-white p-1.5 shadow-[0_20px_50px_-30px_rgba(44,37,115,0.55)] ring-1 ring-brand-100"
        >
          <label htmlFor={`${id}-q`} className="sr-only">
            {hero.searchLabel}
          </label>
          <Search aria-hidden className="ms-3 size-4 shrink-0 text-muted" />
          <input
            id={`${id}-q`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={hero.searchPlaceholder}
            className="h-10 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
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
            className="h-10 shrink-0 rounded-full bg-linear-to-r from-brand-700 to-brand-600 px-5 text-xs font-semibold text-white shadow-md shadow-brand-600/25 transition hover:shadow-brand-600/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {hero.searchButton}
          </button>
        </form>

        <div role="group" aria-label={t("Filter by topic")} className="mt-5 flex flex-wrap justify-center gap-2">
          {categories.map((c) => {
            const active = c.id === category;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                  active
                    ? "bg-linear-to-r from-brand-700 to-brand-600 font-semibold text-white shadow-md shadow-brand-600/25"
                    : "bg-white text-muted ring-1 ring-brand-100 hover:text-ink hover:ring-brand-300",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {!filtering && <div className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">{featured.card}</div>}

      <section aria-labelledby={`${id}-latest`} className="mx-auto mt-20 max-w-6xl scroll-mt-28 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">{copy.eyebrow}</p>
            <h2 ref={resultsRef} id={`${id}-latest`} className="mt-1.5 scroll-mt-28 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {filtering ? copy.resultsTitle : copy.title}
            </h2>
          </div>
          <p aria-live="polite" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
              {t(visible.length === 1 ? "{n} guide" : "{n} guides", { n: visible.length })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-1.5 rounded-full bg-violet-brand" />
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
