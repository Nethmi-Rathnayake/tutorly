import type { Metadata } from "next";
import { TutorRequestWizard } from "@/components/forms/tutor-request/tutor-request-wizard";
import { requestPageIntro } from "@/lib/constants/request-page";
import { getTutorById } from "@/lib/services/tutors";
import { subjectValues } from "@/lib/validations/common";
import { getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/request-a-tutor", t.locale, {
    title: t("Request a Private Tutor in Dubai"),
    description: t(
      "Tell us your child's subject, curriculum and schedule and our team will review your request and get in touch about a private tutor in the UAE.",
    ),
  });
}

export default async function RequestATutorPage(props: PageProps<"/[lang]/request-a-tutor">) {
  const t = await getT();
  const intro = t.deep(requestPageIntro);
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
      <div className="relative mx-auto max-w-[90rem] px-4 pb-20 pt-8 sm:px-8 lg:px-10 lg:pt-12">
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
    </div>
  );
}
