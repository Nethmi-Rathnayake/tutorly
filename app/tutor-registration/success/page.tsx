import type { Metadata } from "next";
import { CheckCircle2, ClipboardCheck, MessageSquare, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Registration Received",
  robots: { index: false },
};

const nextSteps = [
  { Icon: ClipboardCheck, title: "Profile review", body: "Our placement team reviews your subjects, qualifications and teaching approach." },
  { Icon: ShieldCheck, title: "Verification", body: "We verify your identity, qualifications and background before your profile is approved." },
  { Icon: MessageSquare, title: "Introductions", body: "When a family's request fits your profile and availability, we'll contact you." },
];

export default async function TutorRegistrationSuccessPage(props: PageProps<"/tutor-registration/success">) {
  const { ref } = await props.searchParams;
  const raw = Array.isArray(ref) ? ref[0] : ref;
  const reference = raw && /^TA-[A-Z0-9]{8}$/.test(raw) ? raw : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6 lg:pt-20">
      <div className="rounded-[2rem] bg-white p-8 text-center ring-1 ring-brand-100/80 sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
          <CheckCircle2 aria-hidden className="size-8" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Registration received</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          Thank you for applying. Your profile has been submitted to our Academic Placement Board, and we&apos;ll contact
          you by email once it has been reviewed.
        </p>
        {reference && (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm text-ink ring-1 ring-brand-100">
            Application reference <strong className="font-mono font-semibold text-brand-700">{reference}</strong>
          </p>
        )}

        <ol className="mt-10 grid gap-4 text-left sm:grid-cols-3">
          {nextSteps.map(({ Icon, title, body }, i) => (
            <li key={title} className="rounded-2xl bg-lavender/70 p-5">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
                <Icon aria-hidden className="size-4" />
                Step {i + 1}
              </span>
              <p className="mt-2 text-sm font-semibold text-ink">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" arrow>
            Back to Home
          </ButtonLink>
          <ButtonLink href="/become-a-tutor" variant="ghost">
            About Tutoring With Us
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
