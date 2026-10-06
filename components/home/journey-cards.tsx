import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { requestHref } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";
import { cn } from "@/lib/utils/cn";

const journeys = [
  {
    eyebrow: "For Parents & Students",
    title: "I'm Looking for a Tutor",
    body: "Find vetted, elite tutors custom-matched to your child's curriculum, exam board, learning objectives, and flexible timing.",
    cta: { label: "I Need a Tutor", href: requestHref },
    primary: true,
  },
  {
    eyebrow: "For Academic Professionals",
    title: "I'm a Tutor",
    body: "Elevate your teaching career. Set your rates, publish verified academic credentials, and connect directly with dedicated learners globally.",
    cta: { label: "Join as a Tutor", href: "/become-a-tutor" },
    primary: false,
  },
];

export async function JourneyCards({ inHero = false }: { inHero?: boolean }) {
  const t = await getT();
  return (
    <section
      aria-label={t("Choose your journey")}
      className={cn(
        "font-[family-name:var(--font-inter),var(--font-arabic)]",
        !inHero && "mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10",
      )}
    >
      <div className={cn("grid md:grid-cols-2", inHero ? "gap-4 sm:gap-5" : "gap-6")}>
        {t.deep(journeys).map(({ eyebrow, title, body, cta, primary }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <article
              className={cn(
                "group flex h-full flex-col rounded-3xl ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:shadow-[0_24px_50px_-24px_rgba(143,106,29,0.6)] hover:ring-brand-500",
                inHero ? "bg-white/95 p-4 text-start backdrop-blur sm:p-5" : "bg-white p-8 sm:p-10",
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600 transition-colors duration-300 group-hover:text-brand-900">{eyebrow}</p>
              <h2 className={cn("font-bold tracking-tight text-ink", inHero ? "mt-2 text-lg sm:text-xl" : "mt-3 text-2xl sm:text-3xl")}>{title}</h2>
              <p className={cn("max-w-md text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-brand-900/80", inHero ? "mt-2" : "mt-4 sm:text-base")}>{body}</p>
              <div className={cn("mt-auto group-hover:[&_a]:bg-night group-hover:[&_a]:bg-none group-hover:[&_a]:text-gold", inHero ? "pt-4" : "pt-10")}>
                {primary ? (
                  <ButtonLink href={cta.href} size={inHero ? "md" : "lg"} arrow>
                    {cta.label}
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    href={cta.href}
                    size={inHero ? "md" : "lg"}
                    arrow
                    variant="soft"
                    className="bg-night text-gold hover:bg-brand-800"
                  >
                    {cta.label}
                  </ButtonLink>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
