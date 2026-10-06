"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { Link } from "@/components/ui/link";
import { ArrowRight, BookMarked, CircleHelp, Search, UsersRound, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { requestSubjectHref } from "@/lib/constants/site";
import { categoryDisplay, subjectDetails, subjectsHero } from "@/lib/constants/subjects-page";
import { subjectCategories } from "@/lib/constants/taxonomy";
import { subjects as subjectsDictionary } from "@/lib/i18n/ar/subjects";
import { useT } from "@/lib/i18n/client";
import type { Translator } from "@/lib/i18n/translate";
import { cn } from "@/lib/utils/cn";

type Entry = {
  name: string;
  title: string;
  categoryId: string;
  haystack: string;
};

function buildEntries(t: Translator): Entry[] {
  return subjectCategories.flatMap((c) =>
    c.subjects.map((name) => {
      const d = subjectDetails[name];
      const title = d?.title ?? name;
      const copy = [name, title, c.name, categoryDisplay[c.id]?.title, d?.tag, d?.description];
      return {
        name,
        title: t(title),
        categoryId: c.id,
        // Search matches the English copy (and exam-code keywords) as well as the visitor's language.
        haystack: [...copy, ...copy.map((s) => s && t(s)), d?.keywords].join(" ").toLowerCase(),
      };
    }),
  );
}

const ALL = "all";

function matches(entry: Entry, query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return terms.every((t) => entry.haystack.includes(t));
}

export function SubjectCatalog() {
  const t = useT(subjectsDictionary);
  const entries = useMemo(() => buildEntries(t), [t]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const deferredQuery = useDeferredValue(query);
  const searchId = useId();

  const visible = entries.filter(
    (e) => (category === ALL || e.categoryId === category) && matches(e, deferredQuery),
  );
  const groups = subjectCategories
    .map((c) => ({ category: c, items: visible.filter((e) => e.categoryId === c.id) }))
    .filter((g) => g.items.length > 0);

  const reset = () => {
    setQuery("");
    setCategory(ALL);
  };

  return (
    <>
      <div className="mx-auto mt-10 max-w-[90rem] px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("subject-results")?.scrollIntoView({ block: "start" });
          }}
          className="mx-auto flex max-w-4xl items-center gap-2 rounded-full bg-white p-2 ps-6 shadow-[0_18px_40px_-24px_rgba(143,106,29,0.5)] ring-2 ring-brand-300 transition-shadow focus-within:ring-brand-500"
        >
          <Search aria-hidden className="size-5 shrink-0 text-brand-600" />
          <label htmlFor={searchId} className="sr-only">
            {t("Search subjects")}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(subjectsHero.searchPlaceholder)}
            className="h-12 min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-muted/80 focus:outline-none sm:text-base"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] px-7 text-sm font-semibold text-brand-900 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {t("Search")}
          </button>
        </form>

        <div role="group" aria-label={t("Filter by category")} className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[{ id: ALL, chip: t("All Categories"), count: entries.length }]
            .concat(
              subjectCategories.map((c) => ({ id: c.id, chip: t(categoryDisplay[c.id]?.chip ?? c.name), count: c.subjects.length })),
            )
            .map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "rounded-full px-3 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                    active
                      ? "bg-night text-gold shadow-[0_8px_18px_-10px_rgba(20,23,29,0.9)]"
                      : "bg-white text-ink ring-1 ring-brand-300 hover:bg-[#e6c97c] hover:ring-brand-500",
                  )}
                >
                  {c.chip} ({c.count})
                </button>
              );
            })}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-brand-200 pt-5 text-xs text-muted sm:flex-row">
          <p aria-live="polite" className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
            {t(visible.length === 1 ? "Showing {count} Accredited Subject Discipline" : "Showing {count} Accredited Subject Disciplines", {
              count: visible.length,
            })}
          </p>
          <p className="flex items-center gap-2">
            <BookMarked aria-hidden className="size-3.5 text-brand-600" />
            {t(subjectsHero.boardsNote)}
          </p>
        </div>
      </div>

      <div id="subject-results" className="mx-auto mt-10 max-w-[90rem] scroll-mt-24 space-y-10 px-4 sm:px-8 lg:px-10">
        {groups.length === 0 && (
          <div className="mx-auto max-w-lg rounded-3xl bg-white px-6 py-12 text-center ring-1 ring-brand-100">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
              <CircleHelp aria-hidden className="size-5" />
            </span>
            <h2 className="mt-4 text-lg font-bold text-ink">{t("No matching subjects")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t("Our directors can still source a specialist for you. Tell us what you need and we'll handle the search.")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href={requestSubjectHref("Other (Please specify)")} arrow>
                {t("Request a Bespoke Match")}
              </ButtonLink>
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-brand-700 ring-1 ring-brand-100 hover:ring-brand-300"
              >
                <X aria-hidden className="size-4" />
                {t("Clear filters")}
              </button>
            </div>
          </div>
        )}

        {groups.map(({ category: c, items }) => {
          const display = t.deep(categoryDisplay[c.id]);
                    const headingId = `${c.slug}-heading`;
          return (
            <section key={c.id} id={c.slug} aria-labelledby={headingId} className="scroll-mt-24">
              <header className="flex flex-wrap items-end justify-between gap-3 border-b border-brand-200 pb-4">
                <div>
                  <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                    <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
                    {display?.kicker}
                  </p>
                  <h2 id={headingId} className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {display?.title ?? t(c.name)}
                  </h2>
                </div>
                <p className="rounded-full bg-night px-3.5 py-1.5 text-xs font-semibold text-gold">
                  {c.subjects.length} {display?.countLabel}
                </p>
              </header>

              <ul
                className={cn(
                  "mt-6 grid gap-5 sm:grid-cols-2",
                  c.subjects.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
                )}
              >
                {items.map((e) => (
                  <li key={e.name}>
                    <SubjectCard entry={e} categoryTitle={display?.title ?? t(c.name)} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}

function SubjectCard({ entry, categoryTitle }: { entry: Entry; categoryTitle: string }) {
  const t = useT(subjectsDictionary);
  const d = t.deep(subjectDetails[entry.name]);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:shadow-[0_24px_50px_-24px_rgba(143,106,29,0.6)] hover:ring-brand-500">
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600 transition-colors group-hover:text-brand-900">
            {categoryTitle}
          </p>
          {d?.tag && (
            <span className="shrink-0 rounded-full bg-night px-3 py-1 text-[10px] font-semibold text-gold">{d.tag}</span>
          )}
        </div>
        <h3 className="mt-4 text-xl font-bold leading-snug text-ink">{entry.title}</h3>
        {d?.description && (
          <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted transition-colors group-hover:text-brand-900/85">
            {d.description}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-brand-200 px-7 py-4 transition-colors group-hover:border-brand-900/20">
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted transition-colors group-hover:text-brand-900/80">
          <UsersRound aria-hidden className="size-4 text-brand-500 transition-colors group-hover:text-brand-900" />
          {d?.mentors}
        </span>
        <Link
          href={requestSubjectHref(entry.name)}
          className="-my-2 inline-flex min-h-11 items-center gap-1.5 py-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900 group-hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          {d?.cta ?? t("Request a Tutor")}
          <span className="sr-only"> {t("for {subject}", { subject: entry.title })}</span>
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
