"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { Link } from "@/components/ui/link";
import {
  ArrowRight,
  Atom,
  Baby,
  BookMarked,
  BookOpenText,
  BriefcaseBusiness,
  Brain,
  Calculator,
  ChartLine,
  ChartSpline,
  CircleHelp,
  CodeXml,
  Compass,
  Cpu,
  Earth,
  FlaskConical,
  GraduationCap,
  HardHat,
  Landmark,
  Languages,
  Library,
  Microscope,
  Monitor,
  Orbit,
  PenLine,
  Receipt,
  ScrollText,
  Search,
  Shapes,
  Sigma,
  Sparkles,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { requestSubjectHref } from "@/lib/constants/site";
import { categoryDisplay, subjectDetails, subjectsHero } from "@/lib/constants/subjects-page";
import { subjectCategories } from "@/lib/constants/taxonomy";
import { subjects as subjectsDictionary } from "@/lib/i18n/ar/subjects";
import { useT } from "@/lib/i18n/client";
import type { Translator } from "@/lib/i18n/translate";
import { cn } from "@/lib/utils/cn";

type Icon = typeof Search;

const categoryIcons: Record<string, Icon> = {
  maths: Sigma,
  sciences: FlaskConical,
  languages: Languages,
  humanities: Landmark,
  technology: Monitor,
  university: GraduationCap,
  general: Shapes,
};

const subjectIcons: Record<string, Icon> = {
  "Mathematics (General / Standard)": Calculator,
  "Additional / Further Mathematics": Sigma,
  "Statistics & Calculus": ChartSpline,
  Physics: Orbit,
  Chemistry: FlaskConical,
  Biology: Microscope,
  "Combined / Integrated Science": Atom,
  "English Language & Literature": BookOpenText,
  "Arabic (Language / Literature / Islamic Studies)": ScrollText,
  "French / German / Other Modern Languages": Languages,
  Economics: TrendingUp,
  "Business Studies / Commerce": BriefcaseBusiness,
  Accounting: Receipt,
  "History & Geography": Earth,
  "Psychology / Sociology": Brain,
  "Computer Science / Information Technology (IT)": Cpu,
  "Coding & ICT": CodeXml,
  "Undergraduate Engineering / Science Modules": HardHat,
  "Business Management & Finance Modules": ChartLine,
  "Advanced Academic Writing & Research": PenLine,
  "All Primary Subjects": Baby,
  "Other (Please specify)": Compass,
};

// Alternate the icon tint per card, as in the design.
const tints = ["bg-brand-100 text-brand-700", "bg-violet-100 text-violet-brand"];

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
      <div className="mx-auto mt-9 max-w-3xl px-4 sm:px-6">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("subject-results")?.scrollIntoView({ block: "start" });
          }}
          className="flex items-center gap-2 rounded-2xl bg-white p-2 ps-4 shadow-[0_18px_40px_-24px_rgba(44,37,115,0.45)] ring-1 ring-brand-100 focus-within:ring-2 focus-within:ring-brand-400"
        >
          <Search aria-hidden className="size-4 shrink-0 text-brand-600" />
          <label htmlFor={searchId} className="sr-only">
            {t("Search subjects")}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(subjectsHero.searchPlaceholder)}
            className="h-10 min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-muted/80 focus:outline-none"
          />
          <button
            type="submit"
            className="h-10 shrink-0 rounded-xl bg-brand-700 px-5 text-xs font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {t("Search")}
          </button>
        </form>

        <div role="group" aria-label={t("Filter by category")} className="mt-5 flex flex-wrap justify-center gap-2">
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
                    "rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                    active
                      ? "bg-brand-700 text-white shadow-[0_8px_18px_-10px_rgba(67,49,190,0.9)]"
                      : "bg-white text-ink ring-1 ring-brand-100 hover:ring-brand-300",
                  )}
                >
                  {c.chip} ({c.count})
                </button>
              );
            })}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
          <p aria-live="polite" className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
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

      <div id="subject-results" className="mx-auto mt-16 max-w-7xl scroll-mt-24 space-y-16 px-4 sm:px-6 lg:px-8">
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
          const CategoryIcon = categoryIcons[c.id] ?? Library;
          const headingId = `${c.slug}-heading`;
          return (
            <section key={c.id} id={c.slug} aria-labelledby={headingId} className="scroll-mt-24">
              <header className="flex flex-wrap items-end justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-100/80 text-brand-700">
                    <CategoryIcon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-600">{display?.kicker}</p>
                    <h2 id={headingId} className="text-2xl font-bold tracking-tight text-ink">
                      {display?.title ?? t(c.name)}
                    </h2>
                  </div>
                </div>
                <p className="text-xs text-muted">
                  {c.subjects.length} {display?.countLabel}
                </p>
              </header>

              <ul
                className={cn(
                  "mt-6 grid gap-5 sm:grid-cols-2",
                  c.subjects.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
                )}
              >
                {items.map((e, i) => (
                  <li key={e.name}>
                    <SubjectCard entry={e} categoryTitle={display?.title ?? t(c.name)} tint={tints[i % 2]} />
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

function SubjectCard({ entry, categoryTitle, tint }: { entry: Entry; categoryTitle: string; tint: string }) {
  const t = useT(subjectsDictionary);
  const d = t.deep(subjectDetails[entry.name]);
  const Icon = subjectIcons[entry.name] ?? Sparkles;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-brand-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(79,63,217,0.5)] hover:ring-brand-200">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className={cn("grid size-11 place-items-center rounded-xl", tint)}>
            <Icon aria-hidden className="size-5" />
          </span>
          {d?.tag && (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700">{d.tag}</span>
          )}
        </div>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{categoryTitle}</p>
        <h3 className="mt-1 text-base font-bold leading-snug text-ink">{entry.title}</h3>
        {d?.description && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{d.description}</p>}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-brand-50 bg-lavender/40 px-6 py-3.5">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted">
          <UsersRound aria-hidden className="size-3.5 text-brand-500" />
          {d?.mentors}
        </span>
        <Link
          href={requestSubjectHref(entry.name)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          {d?.cta ?? t("Request a Tutor")}
          <span className="sr-only"> {t("for {subject}", { subject: entry.title })}</span>
          <ArrowRight aria-hidden className="rtl:-scale-x-100 size-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
