import { Link } from "@/components/ui/link";
import { ArrowRight, Calculator, FlaskConical, GraduationCap, Landmark, Languages, Monitor } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <section aria-labelledby="subjects-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="subjects-heading"
        eyebrow={t("Curated Disciplines")}
        title={t("Find Tutors by Subject")}
        action={{ label: t("Browse All 60+ Sub-Topics"), href: "/subjects" }}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.deep(subjectCards).map((subject, i) => {
          const Icon = icons[subject.id as keyof typeof icons] ?? GraduationCap;
          return (
            <Reveal key={subject.id} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(79,63,217,0.5)] hover:ring-brand-200">
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">
                    {subject.tutorCount}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-ink">{subject.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{subject.description}</p>
                <div className="mt-7 flex items-center justify-between gap-3">
                  <ul className="flex flex-wrap gap-2" aria-label={t("Popular topics")}>
                    {subject.tags.map((tag) => (
                      <li key={tag} className="rounded-lg bg-lavender px-2.5 py-1 text-[11px] font-medium text-muted">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={requestHref}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900"
                  >
                    {t("Request a Tutor")}
                    <span className="sr-only"> {t("for {subject}", { subject: subject.title })}</span>
                    <ArrowRight aria-hidden className="rtl:-scale-x-100 size-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
