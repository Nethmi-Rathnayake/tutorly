import type { Metadata } from "next";
import { Link } from "@/components/ui/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  HeartHandshake,
  Lock,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { FaqBrowser } from "@/components/faq/faq-browser";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { answerText, conciergeModel, faqCta, faqHero, faqSections, plainText } from "@/lib/constants/faq";
import { requestHref, siteConfig } from "@/lib/constants/site";
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

const phoneDigits = siteConfig.contact.phone.replace(/\D/g, "");
const outcomeIcons = [FileCheck2, BadgeCheck, HeartHandshake];

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
    <div className="space-y-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(t)).replace(/</g, "\\u003c") }}
      />

      <section className="relative overflow-x-clip pt-12 lg:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-[640px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">
            <BadgeCheck aria-hidden className="size-3.5" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            {hero.titleLead}{" "}
            <span className="bg-linear-to-r from-brand-700 to-violet-brand bg-clip-text text-transparent">
              {hero.titleAccent}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">{hero.description}</p>
        </div>

        <div className="relative">
          <FaqBrowser>
            <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
              <Reveal className="rounded-[2rem] bg-white/80 p-6 shadow-[0_40px_80px_-50px_rgba(44,37,115,0.45)] ring-1 ring-brand-100/80 backdrop-blur sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
                      <Lock aria-hidden className="size-3" />
                      {m.eyebrow}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">{m.title}</h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-[11px] font-semibold text-violet-brand">
                    <span aria-hidden className="size-1.5 rounded-full bg-violet-brand" />
                    {m.badge}
                  </span>
                </div>

                <ol className="mt-7 grid gap-4 md:grid-cols-3">
                  {m.steps.map((s, i) => {
                    const Icon = outcomeIcons[i];
                    const last = i === m.steps.length - 1;
                    return (
                      <li key={s.title} className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-brand-100">
                        <div className="flex items-start justify-between gap-3">
                          <span
                            className={
                              last
                                ? "grid size-9 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white"
                                : "grid size-9 place-items-center rounded-lg bg-brand-100 text-sm font-bold text-brand-700"
                            }
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-brand-700">
                            {s.tag}
                          </span>
                        </div>
                        <h3 className="mt-4 text-base font-bold text-ink">{s.title}</h3>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{s.body}</p>
                        <p className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                          <Icon aria-hidden className="size-3.5" />
                          {s.outcome}
                        </p>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-4 flex flex-col gap-2 rounded-2xl bg-lavender px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 font-medium text-ink">
                    <ShieldCheck aria-hidden className="size-4 shrink-0 text-brand-600" />
                    {m.covenant}
                  </p>
                  <p className="italic text-muted">{m.covenantNote}</p>
                </div>
              </Reveal>
            </div>
          </FaqBrowser>
        </div>
      </section>

      <section aria-labelledby="faq-cta-heading" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="grid items-center gap-8 rounded-[2rem] bg-linear-to-br from-brand-100 via-lavender to-violet-100 p-6 ring-1 ring-brand-200/70 sm:p-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-medium text-ink">
              <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
              {c.eyebrow}
            </span>
            <h2 id="faq-cta-heading" className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {c.title}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{c.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${phoneDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-xs font-medium text-ink ring-1 ring-brand-100 hover:ring-brand-300"
              >
                <MessageCircle aria-hidden className="size-3.5 text-emerald-600" />
                {c.whatsapp}
                <span className="sr-only"> {t("(opens WhatsApp)")}</span>
              </a>
              <a
                href={`tel:+${phoneDigits}`}
                className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-xs font-medium text-ink ring-1 ring-brand-100 hover:ring-brand-300"
              >
                <PhoneCall aria-hidden className="size-3.5 text-violet-brand" />
                {c.call}
              </a>
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              {c.contact}
              <ArrowRight aria-hidden className="rtl:-scale-x-100 size-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <ButtonLink href={requestHref} size="lg" className="w-full">
              <ClipboardCheck aria-hidden className="size-4" />
              {c.primary}
            </ButtonLink>
            <ButtonLink href="/tutor-registration" variant="ghost" size="lg" className="w-full bg-white">
              <UserPlus aria-hidden className="size-4 text-violet-brand" />
              {c.secondary}
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
