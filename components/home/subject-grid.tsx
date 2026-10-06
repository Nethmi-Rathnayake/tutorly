import { Link } from "@/components/ui/link";
import { ArrowRight, Calculator, FlaskConical, GraduationCap, Landmark, Languages, Monitor } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { subjectCards } from "@/lib/constants/home";
import { requestHref } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";

const icons = {
  maths: Calculator,
  sciences: FlaskConical,
  languages: Languages,
  humanities: Landmark,
  technology: Monitor,
  university: GraduationCap,
} as const;

export async function SubjectGrid() {
  const t = await getT();
  return (
    <section
      aria-labelledby="subjects-heading"
      className="mx-auto max-w-[90rem] px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
          <span aria-hidden className="h-px w-8 bg-brand-500" />
          {t("Curated Disciplines")}
          <span aria-hidden className="h-px w-8 bg-brand-500" />
        </p>
        <h2
          id="subjects-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight"
        >
          {t("Find Tutors by")} <span className="text-brand-500">{t("Subject")}</span>
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.deep(subjectCards).map((subject, i) => {
          const Icon = icons[subject.id as keyof typeof icons] ?? GraduationCap;
          return (
            <Reveal key={subject.id} delay={(i % 3) * 0.08} className="h-full">
              <article className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:shadow-[0_24px_50px_-24px_rgba(143,106,29,0.6)] hover:ring-brand-500">
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-night text-gold">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="rounded-full bg-night px-3 py-1 text-[11px] font-semibold text-gold">
                    {subject.tutorCount}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink">{subject.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted transition-colors group-hover:text-brand-900/80">
                  {subject.description}
                </p>
                <ul className="mt-5 flex flex-1 flex-wrap content-start gap-2" aria-label={t("Popular topics")}>
                  {subject.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-lavender px-3 py-1 text-[11px] font-medium text-muted transition-colors group-hover:bg-white/60 group-hover:text-brand-900"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <Link
                  href={requestHref}
                  className="mt-6 flex items-center justify-between border-t border-brand-200 pt-4 text-sm font-semibold text-brand-700 transition-colors group-hover:border-brand-900/20 group-hover:text-brand-900"
                >
                  <span>
                    {t("Request a Tutor")}
                    <span className="sr-only"> {t("for {subject}", { subject: subject.title })}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                  />
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <ButtonLink href="/subjects" variant="soft" size="lg" arrow className="bg-night text-gold hover:bg-brand-800">
          {t("Browse All 60+ Sub-Topics")}
        </ButtonLink>
      </div>
    </section>
  );
}
