import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { TutorRegistrationWizard } from "@/components/forms/tutor-registration/tutor-registration-wizard";
import { registrationIntro } from "@/lib/constants/tutor-registration";
import { getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/tutor-registration", t.locale, {
    title: t("Tutor Registration Form"),
    description: t(
      "Register as a tutor: share your subjects, qualifications, availability and teaching approach with our team.",
    ),
  });
}

export default async function TutorRegistrationPage() {
  const t = await getT();
  const r = t.deep(registrationIntro);
  return (
    <div className="mx-auto max-w-[90rem] px-4 pb-16 pt-8 sm:px-8 lg:px-10 lg:pt-12">
      <header className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-brand-100 via-lavender to-brand-100 p-7 ring-1 ring-brand-100 sm:p-10">
        <div aria-hidden className="pointer-events-none absolute -end-20 -top-20 size-72 rounded-full bg-white/50 blur-3xl" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100">
              <ShieldCheck aria-hidden className="size-3.5" />
              {r.eyebrow}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">{r.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {r.descriptionLead}
              <strong className="font-semibold text-brand-700">{r.descriptionHighlight}</strong>
              {r.descriptionTail}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-8">
        <TutorRegistrationWizard />
      </div>
    </div>
  );
}
