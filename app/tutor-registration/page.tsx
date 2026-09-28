import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { TutorRegistrationWizard } from "@/components/forms/tutor-registration/tutor-registration-wizard";
import { registrationIntro } from "@/lib/constants/tutor-registration";

export const metadata: Metadata = {
  title: "Tutor Registration",
  description:
    "Register as a tutor: share your subjects, qualifications, availability and teaching approach with our academic placement team.",
};

export default function TutorRegistrationPage() {
  const r = registrationIntro;
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <header className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-brand-100 via-lavender to-violet-100 p-7 ring-1 ring-brand-100 sm:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/50 blur-3xl" />
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
          <dl className="flex w-fit shrink-0 divide-x divide-brand-100 rounded-2xl bg-white px-2 py-4 shadow-sm ring-1 ring-brand-100">
            {r.stats.map((s, i) => (
              <div key={s.label} className="flex flex-col-reverse px-5">
                <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">{s.label}</dt>
                <dd className={`text-3xl font-extrabold sm:text-4xl ${i === 0 ? "text-brand-700" : "text-violet-brand"}`}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mt-8">
        <TutorRegistrationWizard />
      </div>
    </div>
  );
}
