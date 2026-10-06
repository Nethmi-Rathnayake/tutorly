import type { Metadata } from "next";
import { CircleCheck, Clock3 } from "lucide-react";
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
    <div className="space-y-14 pb-16">
      <section className="relative overflow-x-clip pt-8 lg:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-[640px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 font-[family-name:var(--font-inter),var(--font-arabic)]">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {h.eyebrow}
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {h.titleLead}{" "}
            <span className="text-brand-600">
              {h.titleAccent}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">{h.description}</p>
        </div>
        <div className="relative">
          <SubjectCatalog />
        </div>
      </section>

      <section
        aria-labelledby="subjects-cta-heading"
        className="mx-auto max-w-[90rem] px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10"
      >
        <Reveal className="rounded-3xl bg-brand-100 px-6 py-12 ring-1 ring-brand-300 sm:px-12 lg:py-14">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
                {c.eyebrow}
                <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
              </p>
              <h2
                id="subjects-cta-heading"
                className="mt-4 text-3xl font-bold capitalize leading-tight tracking-tight text-ink sm:text-4xl lg:whitespace-nowrap"
              >
                {c.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{c.description}</p>
              <ul className="mt-6 flex flex-wrap justify-center gap-3">
                {c.assurances.map((a, i) => {
                  const Icon = ctaIcons[i];
                  return (
                    <li
                      key={a}
                      className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink ring-1 ring-brand-300"
                    >
                      <Icon aria-hidden className="size-4 text-brand-600" />
                      {a}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={requestSubjectHref("Other (Please specify)")} size="lg" arrow>
                {c.primary}
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="soft" className="bg-night text-gold hover:bg-brand-800">
                {c.secondary}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
