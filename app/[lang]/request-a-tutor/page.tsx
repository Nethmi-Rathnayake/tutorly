import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { TutorRequestWizard } from "@/components/forms/tutor-request/tutor-request-wizard";
import { academicAssurance, requestPageIntro } from "@/lib/constants/request-page";
import { getTutorById } from "@/lib/services/tutors";
import { subjectValues } from "@/lib/validations/common";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("Request a Tutor"),
    description: t(
      "Submit your student's academic profile and our placement committee will match your family with a vetted tutor.",
    ),
  };
}

export default async function RequestATutorPage(props: PageProps<"/[lang]/request-a-tutor">) {
  const t = await getT();
  const intro = t.deep(requestPageIntro);
  const assurance = t.deep(academicAssurance);
  const { tutor: tutorParam, subject: subjectParam } = await props.searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const requested = await getTutorById(first(tutorParam));
  // Only accept subjects from the taxonomy (links from /subjects use requestSubjectHref).
  const subject = first(subjectParam);
  const requestedSubject = subject && subjectValues.includes(subject) ? subject : undefined;

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -end-40 -top-48 size-[560px] rounded-full bg-brand-200/40 blur-3xl print:hidden"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <header className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-700">
            <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
            {intro.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{intro.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{intro.description}</p>
        </header>

        <div className="mt-8">
          <TutorRequestWizard
            requestedTutor={requested ? { id: requested.id, name: t(requested.name) } : undefined}
            requestedSubject={requestedSubject}
          />
        </div>
      </div>

      <section aria-labelledby="assurance-heading" className="border-t border-brand-100/70 bg-lavender/40 py-14 print:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 rounded-3xl bg-white p-6 ring-1 ring-brand-100/80 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-brand">
                <ShieldCheck aria-hidden className="size-5" />
              </span>
              <div>
                <h2 id="assurance-heading" className="text-lg font-bold text-ink">
                  {assurance.title}
                </h2>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{assurance.body}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2">
              {assurance.badges.map((b) => (
                <li
                  key={b}
                  className="rounded-full bg-brand-100/80 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-brand-800"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
