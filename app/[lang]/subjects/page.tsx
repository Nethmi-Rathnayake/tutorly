import type { Metadata } from "next";
import { CircleCheck, Clock3, Sparkles } from "lucide-react";
import { SubjectCatalog } from "@/components/subjects/subject-catalog";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { requestSubjectHref } from "@/lib/constants/site";
import { subjectsCta, subjectsHero } from "@/lib/constants/subjects-page";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("Subjects"),
    description: t(
      "Browse the subjects our vetted tutors teach, from IB and A-Level sciences to university modules, and request a privately matched specialist.",
    ),
  };
}

const ctaIcons = [CircleCheck, Clock3];

export default async function SubjectsPage() {
  const t = await getT();
  const h = t.deep(subjectsHero);
  const c = t.deep(subjectsCta);
  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-x-clip pt-12 lg:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-[640px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">
            <Sparkles aria-hidden className="size-3.5" />
            {h.eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            {h.titleLead}{" "}
            <span className="bg-linear-to-r from-brand-700 to-violet-brand bg-clip-text text-transparent">
              {h.titleAccent}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">{h.description}</p>
        </div>
        <div className="relative">
          <SubjectCatalog />
        </div>
      </section>

      <section aria-labelledby="subjects-cta-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-brand-600 via-brand-500 to-violet-brand px-6 py-12 shadow-[0_40px_80px_-40px_rgba(79,63,217,0.8)] sm:px-12 lg:py-14">
          <div aria-hidden className="pointer-events-none absolute -end-20 -top-24 size-80 rounded-full bg-white/15 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-white/20">
                {c.eyebrow}
              </span>
              <h2 id="subjects-cta-heading" className="mt-5 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                {c.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">{c.description}</p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {c.assurances.map((a, i) => {
                  const Icon = ctaIcons[i];
                  return (
                    <li key={a} className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                      <Icon aria-hidden className="size-3.5" />
                      {a}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3 lg:flex-nowrap">
              <ButtonLink
                href={requestSubjectHref("Other (Please specify)")}
                variant="ghost"
                size="lg"
                arrow
                className="bg-white text-brand-700 ring-0 hover:bg-white"
              >
                {c.primary}
              </ButtonLink>
              <ButtonLink
                href="/contact"
                size="lg"
                className="bg-white/15 bg-none text-white shadow-none ring-1 ring-white/25 hover:bg-white/25"
              >
                {c.secondary}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
