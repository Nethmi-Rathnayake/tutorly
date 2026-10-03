import { BookOpenCheck, Presentation } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { requestHref } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";

const journeys = [
  {
    eyebrow: "For Parents & Students",
    title: "I'm Looking for a Tutor",
    body: "Find vetted, elite tutors custom-matched to your child's curriculum, exam board, learning objectives, and flexible timing.",
    cta: { label: "I Need a Tutor", href: requestHref },
    variant: "primary" as const,
    Icon: BookOpenCheck,
  },
  {
    eyebrow: "For Academic Professionals",
    title: "I'm a Tutor",
    body: "Elevate your teaching career. Set your rates, publish verified academic credentials, and connect directly with dedicated learners globally.",
    cta: { label: "Join as a Tutor", href: "/become-a-tutor" },
    variant: "violet" as const,
    Icon: Presentation,
  },
];

export async function JourneyCards() {
  const t = await getT();
  return (
    <section aria-label={t("Choose your journey")} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2">
        {t.deep(journeys).map(({ eyebrow, title, body, cta, variant, Icon }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <article className="group relative h-full overflow-hidden rounded-[1.75rem] bg-linear-to-br from-white via-white to-brand-50 p-8 ring-1 ring-brand-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(79,63,217,0.45)] sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -end-16 -top-16 size-56 rounded-full bg-brand-200/50 blur-3xl transition-opacity group-hover:opacity-80"
              />
              <span className="relative grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                <Icon aria-hidden className="size-5" />
              </span>
              <Eyebrow className="relative mt-6">{eyebrow}</Eyebrow>
              <h2 className="relative mt-2 text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">{title}</h2>
              <p className="relative mt-3 max-w-md text-sm leading-relaxed text-muted">{body}</p>
              <ButtonLink href={cta.href} variant={variant} size="md" arrow className="relative mt-10">
                {cta.label}
              </ButtonLink>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
