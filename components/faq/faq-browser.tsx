"use client";

import { Fragment, useId, useState } from "react";
import { Link } from "@/components/ui/link";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  Laptop,
  Route,
  Search,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  answerText,
  faqHero,
  faqSections,
  faqTopics,
  plainText,
  vettingStats,
  type Faq,
  type FaqTopic,
} from "@/lib/constants/faq";
import { requestSteps } from "@/lib/constants/tutor-request";
import { faq as faqDictionary } from "@/lib/i18n/ar/faq";
import { useT } from "@/lib/i18n/client";
import type { Translator } from "@/lib/i18n/translate";
import { cn } from "@/lib/utils/cn";

const sectionIcons: Record<string, LucideIcon> = {
  parents: UsersRound,
  delivery: Laptop,
  tutors: GraduationCap,
  curricula: CircleHelp,
};

const ALL = "all";
const defaultOpen = ["how-to-request", "tutor-registration"];

// Search covers the English copy as well as the visitor's language.
const searchText = (f: Faq, t: Translator) => {
  const paragraphs = [...f.answer, ...(f.after ?? [])];
  return [f.question, f.tag, t(f.question), t(f.tag), ...paragraphs, ...paragraphs.map((p) => answerText(p, f, t))]
    .map(plainText)
    .join(" ")
    .toLowerCase();
};

function matches(f: Faq, query: string, t: Translator) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const text = searchText(f, t);
  return terms.every((term) => text.includes(term));
}

/** Renders **bold** spans inside an answer paragraph. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function RequestBlueprint() {
  const t = useT(faqDictionary);
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-brand-100">
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
        <Route aria-hidden className="size-3.5" />
        {t("The {count}-Step Requirement Blueprint", { count: requestSteps.length })}
      </p>
      <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {requestSteps.map((s, i) => (
          <li key={s.id} className="rounded-xl bg-lavender px-3 py-2.5 text-center">
            <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-brand-600">
              {t("Step {n}", { n: String(i + 1).padStart(2, "0") })}
            </span>
            <span className="mt-0.5 block text-xs font-medium text-ink">{t(s.title)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function VettingStats() {
  const t = useT(faqDictionary);
  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {t.deep(vettingStats).map((s, i) => (
        <div key={s.label} className="flex flex-col rounded-2xl bg-white p-4 ring-1 ring-brand-100">
          <dt className="text-xs font-semibold text-ink">{s.label}</dt>
          <dd className={cn("order-first text-lg font-bold", i === 0 ? "text-brand-700" : i === 1 ? "text-violet-brand" : "text-ink")}>
            {s.value}
          </dd>
          <dd className="mt-1 text-[11px] leading-relaxed text-muted">{s.body}</dd>
        </div>
      ))}
    </dl>
  );
}

function FaqItem({ faq, open, onToggle }: { faq: Faq; open: boolean; onToggle: () => void }) {
  const t = useT(faqDictionary);
  const panelId = `faq-${faq.id}-panel`;
  const buttonId = `faq-${faq.id}-button`;
  return (
    <div
      id={`faq-${faq.id}`}
      className={cn(
        "scroll-mt-24 rounded-2xl ring-1 transition-colors",
        open ? "bg-lavender/60 ring-brand-100" : "bg-white ring-brand-100/80 hover:ring-brand-200",
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center gap-3 rounded-2xl px-5 py-4 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          <span className="flex flex-1 flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <span className="shrink-0 rounded-full bg-brand-100/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-brand-700">
              {t(faq.tag)}
            </span>
            <span className="text-sm font-semibold text-ink sm:text-[15px]">{t(faq.question)}</span>
          </span>
          <ChevronDown
            aria-hidden
            className={cn("size-4 shrink-0 text-muted transition-transform duration-200", open && "rotate-180")}
          />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="space-y-4 px-5 pb-5 text-sm leading-relaxed text-muted">
        {faq.answer.map((p) => (
          <p key={p}>
            <Rich text={answerText(p, faq, t)} />
          </p>
        ))}
        {faq.extra === "requestBlueprint" && <RequestBlueprint />}
        {faq.extra === "vettingStats" && <VettingStats />}
        {faq.extra === "subjectsLink" && (
          <Link href="/subjects" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900">
            {t("Browse all subjects")}
            <ArrowRight aria-hidden className="rtl:-scale-x-100 size-3.5" />
          </Link>
        )}
        {faq.after?.map((p) => (
          <p key={p}>
            <Rich text={answerText(p, faq, t)} />
          </p>
        ))}
      </div>
    </div>
  );
}

/** `children` renders between the search controls and the results (the concierge model card). */
export function FaqBrowser({ children }: { children?: React.ReactNode }) {
  const t = useT(faqDictionary);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<FaqTopic | typeof ALL>(ALL);
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));
  const searchId = useId();

  const visibleFor = (q: string, selected: typeof topic) =>
    faqSections
      .map((s) => ({ ...s, faqs: s.faqs.filter((f) => (selected === ALL || f.topics.includes(selected)) && matches(f, q, t)) }))
      .filter((s) => s.faqs.length > 0);

  const sections = visibleFor(query, topic);
  const count = sections.reduce((n, s) => n + s.faqs.length, 0);

  // Searching expands every matching answer so the hit is visible; clearing restores the default.
  const onSearch = (q: string) => {
    setQuery(q);
    setOpen(
      q.trim() ? new Set(visibleFor(q, topic).flatMap((s) => s.faqs.map((f) => f.id))) : new Set(defaultOpen),
    );
  };

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const reset = () => {
    setTopic(ALL);
    onSearch("");
  };

  const chips: { id: FaqTopic | typeof ALL; label: string }[] = [{ id: ALL, label: "All FAQs" }, ...faqTopics].map((c) => ({
    id: c.id as FaqTopic | typeof ALL,
    label: t(c.label),
  }));

  return (
    <>
      <div className="mx-auto mt-9 max-w-3xl px-4 sm:px-6">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("faq-results")?.scrollIntoView({ block: "start" });
          }}
          className="flex items-center gap-2 rounded-full bg-white p-1.5 ps-5 shadow-[0_18px_40px_-24px_rgba(44,37,115,0.45)] ring-1 ring-brand-100 focus-within:ring-2 focus-within:ring-brand-400"
        >
          <Search aria-hidden className="size-4 shrink-0 text-brand-600" />
          <label htmlFor={searchId} className="sr-only">
            {t("Search frequently asked questions")}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t(faqHero.searchPlaceholder)}
            className="h-10 min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-muted/80 focus:outline-none"
          />
          <button
            type="submit"
            className="h-10 shrink-0 rounded-full bg-brand-700 px-5 text-xs font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {t("Search")}
          </button>
        </form>

        <div role="group" aria-label={t("Filter by topic")} className="mt-5 flex flex-wrap justify-center gap-2">
          {chips.map((c) => {
            const active = topic === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setTopic(c.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                  active
                    ? "bg-brand-700 font-semibold text-white shadow-[0_8px_18px_-10px_rgba(67,49,190,0.9)]"
                    : "bg-white/80 text-ink ring-1 ring-brand-100 hover:ring-brand-300",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="sr-only">
          {t(count === 1 ? "{count} question shown" : "{count} questions shown", { count })}
        </p>
      </div>

      {children}

      <div id="faq-results" className="mx-auto mt-20 max-w-5xl scroll-mt-24 space-y-16 px-4 sm:px-6 lg:px-8">
        {sections.length === 0 && (
          <div className="rounded-3xl bg-white px-6 py-12 text-center ring-1 ring-brand-100">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
              <CircleHelp aria-hidden className="size-5" />
            </span>
            <h2 className="mt-4 text-lg font-bold text-ink">{t("No matching questions")}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              {t("Try a different keyword, or ask our advisory team directly and we'll get back to you promptly.")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-700 px-5 text-sm font-semibold text-white hover:bg-brand-800"
              >
                {t("Ask our advisors")}
                <ArrowRight aria-hidden className="rtl:-scale-x-100 size-4" />
              </Link>
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

        {sections.map((s) => {
          const Icon = sectionIcons[s.id] ?? CircleHelp;
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="scroll-mt-24">
              <header className="flex items-start gap-3 border-b border-brand-100/80 pb-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100/80 text-brand-700">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div>
                  <h2 id={`${s.id}-heading`} className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    {t(s.title)}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted">{t(s.description)}</p>
                </div>
              </header>
              <div className="mt-5 space-y-3">
                {s.faqs.map((f) => (
                  <FaqItem key={f.id} faq={f} open={open.has(f.id)} onToggle={() => toggle(f.id)} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
