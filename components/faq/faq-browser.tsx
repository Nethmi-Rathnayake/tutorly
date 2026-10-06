"use client";

import { Fragment, useEffect, useId, useState } from "react";
import { AccentTitle } from "@/components/ui/accent-title";
import { Link } from "@/components/ui/link";
import { ArrowRight, CircleHelp, Minus, Plus, Search, X } from "lucide-react";
import {
  answerText,
  faqHero,
  faqSections,
  plainText,
  vettingStats,
  type Faq,
} from "@/lib/constants/faq";
import { requestSteps } from "@/lib/constants/tutor-request";
import { faq as faqDictionary } from "@/lib/i18n/ar/faq";
import { useT } from "@/lib/i18n/client";
import type { Translator } from "@/lib/i18n/translate";
import { cn } from "@/lib/utils/cn";

const defaultOpen = ["how-to-request"];

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
    <div className="rounded-2xl bg-white p-4 ring-1 ring-brand-300">
      <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
        <span aria-hidden className="h-px w-6 shrink-0 bg-brand-500" />
        {t("The {count}-Step Requirement Blueprint", { count: requestSteps.length })}
      </p>
      <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {requestSteps.map((s, i) => (
          <li key={s.id} className="rounded-xl bg-brand-50 px-3 py-3 text-center ring-1 ring-brand-200">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-600">
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
        <div key={s.label} className="flex flex-col rounded-2xl bg-white p-4 ring-1 ring-brand-300">
          <dt className="text-xs font-semibold text-ink">{s.label}</dt>
          <dd className={cn("order-first text-2xl font-bold", i === 0 ? "text-brand-500" : "text-brand-600")}>
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
        "scroll-mt-24 border-s-4 transition-colors duration-200",
        open ? "border-brand-500 bg-brand-50" : "border-transparent bg-white hover:bg-brand-50/60",
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center gap-4 px-5 py-5 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          <span
            className={cn(
              "flex-1 text-base font-semibold leading-snug transition-colors sm:text-[17px]",
              open ? "text-ink" : "text-ink/90 group-hover:text-brand-600",
            )}
          >
            {t(faq.question)}
          </span>
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full transition-colors",
              open ? "bg-night text-gold" : "bg-brand-100 text-brand-700 group-hover:bg-brand-200",
            )}
          >
            {open ? <Minus aria-hidden className="size-4" /> : <Plus aria-hidden className="size-4" />}
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="max-w-4xl space-y-4 px-5 pb-7 text-[15px] leading-relaxed text-muted">
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
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));
  const searchId = useId();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const visibleFor = (q: string) =>
    faqSections
      .map((s) => ({ ...s, faqs: s.faqs.filter((f) => matches(f, q, t)) }))
      .filter((s) => s.faqs.length > 0);

  const sections = visibleFor(query);
  const count = sections.reduce((n, s) => n + s.faqs.length, 0);

  // Highlight the menu entry for the section currently in view.
  const sectionKey = sections.map((s) => s.id).join(",");
  useEffect(() => {
    const els = sectionKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0 || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionKey]);

  // Searching expands every matching answer so the hit is visible; clearing restores the default.
  const onSearch = (q: string) => {
    setQuery(q);
    setOpen(
      q.trim() ? new Set(visibleFor(q).flatMap((s) => s.faqs.map((f) => f.id))) : new Set(defaultOpen),
    );
  };

  // One answer open at a time: opening a question closes every other one.
  const toggle = (id: string) => setOpen((prev) => (prev.has(id) ? new Set<string>() : new Set([id])));

  const reset = () => onSearch("");

  return (
    <>
      <div className="mx-auto mt-10 max-w-4xl px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-6">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("faq-results")?.scrollIntoView({ block: "start" });
          }}
          className="flex items-center gap-2 rounded-full bg-white p-2 ps-6 shadow-[0_18px_40px_-24px_rgba(143,106,29,0.5)] ring-2 ring-brand-300 transition-shadow focus-within:ring-brand-500"
        >
          <Search aria-hidden className="size-5 shrink-0 text-brand-600" />
          <label htmlFor={searchId} className="sr-only">
            {t("Search frequently asked questions")}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t(faqHero.searchPlaceholder)}
            className="h-12 min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-muted/80 focus:outline-none sm:text-base"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] px-7 text-sm font-semibold text-brand-900 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {t("Search")}
          </button>
        </form>

        <p aria-live="polite" className="sr-only">
          {t(count === 1 ? "{count} question shown" : "{count} questions shown", { count })}
        </p>
      </div>

      {children}

      <div
        id="faq-results"
        className="mx-auto mt-12 max-w-[90rem] scroll-mt-24 px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-14 lg:px-10"
      >
        {sections.length > 0 && (
          <nav aria-label={t("Jump to a section")} className="mb-8 lg:sticky lg:top-24 lg:mb-0">
            <div className="rounded-3xl bg-brand-50 p-3 ring-1 ring-brand-300">
              <p className="flex items-center gap-3 px-3 pb-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
                {t("Menu")}
              </p>
              <ul className="space-y-1.5">
                {sections.map((s, i) => {
                  const active = (activeSection ?? sections[0]?.id) === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        aria-current={active ? "true" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold leading-snug transition-colors",
                          active
                            ? "bg-white text-ink ring-1 ring-brand-500 shadow-sm"
                            : "text-ink/80 hover:bg-white/70 hover:text-ink",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                            active ? "bg-night text-gold" : "bg-brand-100 text-brand-700",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">{t(s.title)}</span>
                        <span className="shrink-0 text-xs font-medium text-muted">{s.faqs.length}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        )}
        <div className="space-y-10 lg:col-start-2">
        {sections.length === 0 && (
          <div className="rounded-3xl bg-white px-6 py-12 text-center ring-1 ring-brand-300">
            <CircleHelp aria-hidden className="mx-auto size-8 text-brand-500" />
            <h2 className="mt-4 text-lg font-bold text-ink">{t("No matching questions")}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              {t("Try a different keyword, or ask our advisory team directly and we'll get back to you promptly.")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-night px-5 text-sm font-semibold text-gold hover:bg-brand-800"
              >
                {t("Ask our advisors")}
                <ArrowRight aria-hidden className="rtl:-scale-x-100 size-4" />
              </Link>
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-brand-700 ring-1 ring-brand-300 hover:ring-brand-500"
              >
                <X aria-hidden className="size-4" />
                {t("Clear filters")}
              </button>
            </div>
          </div>
        )}

        {sections.map((s, sectionIndex) => {
          return (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="scroll-mt-24">
              <header className="pb-3">
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                  <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
                  {t("Section {n}", { n: String(sectionIndex + 1).padStart(2, "0") })}
                </p>
                <h2 id={`${s.id}-heading`} className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  <AccentTitle text={t(s.title)} />
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{t(s.description)}</p>
              </header>
              <div className="mt-3 divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10">
                {s.faqs.map((f) => (
                  <FaqItem key={f.id} faq={f} open={open.has(f.id)} onToggle={() => toggle(f.id)} />
                ))}
              </div>
            </section>
          );
        })}
        </div>
      </div>
    </>
  );
}
