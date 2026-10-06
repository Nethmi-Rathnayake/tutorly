import type { Metadata } from "next";
import { Link } from "@/components/ui/link";
import {
  ArrowRight,
} from "lucide-react";
import { FaqBrowser } from "@/components/faq/faq-browser";
import { AccentTitle } from "@/components/ui/accent-title";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { answerText, conciergeModel, faqCta, faqHero, faqSections, plainText } from "@/lib/constants/faq";
import { requestHref } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";
import type { Translator } from "@/lib/i18n/translate";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("FAQ"),
    description: t(
      "Answers about requesting a tutor, online and in-person lessons, tutor registration and vetting, and the subjects and curricula we cover.",
    ),
  };
}


// FAQPage structured data (see node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
const jsonLd = (t: Translator) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqSections.flatMap((s) =>
    s.faqs.map((f) => ({
      "@type": "Question",
      name: t(f.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: [...f.answer, ...(f.after ?? [])].map((p) => plainText(answerText(p, f, t))).join(" "),
      },
    })),
  ),
});

export default async function FaqPage() {
  const t = await getT();
  const hero = t.deep(faqHero);
  const m = t.deep(conciergeModel);
  const c = t.deep(faqCta);
  return (
    <div className="space-y-14 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(t)).replace(/</g, "\\u003c") }}
      />

      <section className="relative overflow-x-clip pt-8 lg:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-[640px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 font-[family-name:var(--font-inter),var(--font-arabic)]">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {hero.eyebrow}
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {hero.titleLead}{" "}
            <span className="text-brand-600">
              {hero.titleAccent}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">{hero.description}</p>
        </div>

        <div className="relative">
          <FaqBrowser>
            <div className="mx-auto mt-10 max-w-[90rem] px-4 sm:px-8 lg:px-10">
              <Reveal className="rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-300 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3 font-[family-name:var(--font-inter),var(--font-arabic)]">
                  <div>
                    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                      <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
                      {m.eyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                      <AccentTitle text={m.title} />
                    </h2>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-night px-4 py-1.5 text-[11px] font-semibold text-gold">
                    {m.badge}
                  </span>
                </div>

                <ol className="mt-7 grid gap-4 font-[family-name:var(--font-inter),var(--font-arabic)] md:grid-cols-3">
                  {m.steps.map((s, i) => (
                    <li
                      key={s.title}
                      className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-brand-200 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-4xl font-bold text-brand-500 transition-colors group-hover:text-brand-900">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full bg-night px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold">
                          {s.tag}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted transition-colors group-hover:text-brand-900/85">
                        {s.body}
                      </p>
                      <p className="mt-5 border-t border-brand-200 pt-4 text-xs font-semibold text-brand-700 transition-colors group-hover:border-brand-900/20 group-hover:text-brand-900">
                        {s.outcome}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-white px-5 py-4 text-sm ring-1 ring-brand-200 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-semibold text-ink">{m.covenant}</p>
                  <p className="italic text-muted">{m.covenantNote}</p>
                </div>
              </Reveal>
            </div>
          </FaqBrowser>
        </div>
      </section>

      <section
        aria-labelledby="faq-cta-heading"
        className="mx-auto max-w-[90rem] px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10"
      >
        <Reveal className="rounded-3xl bg-brand-100 px-6 py-14 text-center ring-1 ring-brand-300 sm:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
              <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
              {c.eyebrow}
              <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            </p>
            <h2 id="faq-cta-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
              <AccentTitle text={c.title} />
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">{c.description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={requestHref} size="lg" arrow>
                {c.primary}
              </ButtonLink>
              <ButtonLink href="/tutor-registration" variant="soft" size="lg" className="bg-night text-gold hover:bg-brand-800">
                {c.secondary}
              </ButtonLink>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <Link href="/contact" className="inline-flex min-h-10 items-center gap-1 px-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                {c.contact}
                <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
