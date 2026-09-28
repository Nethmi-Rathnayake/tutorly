import Image from "next/image";
import { BadgeCheck, MapPin, Monitor, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedTutors } from "@/lib/services/tutors";
import { formatRate } from "@/lib/utils/format";
import { requestHref } from "@/lib/constants/site";

export async function FeaturedTutors() {
  const featuredTutors = await getFeaturedTutors();

  return (
    <section aria-labelledby="featured-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="featured-heading"
        eyebrow="Top-Tier Mentorship"
        title="Meet Our Featured Tutors"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredTutors.map((tutor, i) => {
          const inPerson = tutor.modes.includes("in-person");
          const ModeIcon = inPerson ? MapPin : Monitor;
          const modeLabel = inPerson ? (tutor.modes.includes("online") ? "Online & In-Person" : "In-Person") : "Online Only";
          return (
            <Reveal key={tutor.id} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(79,63,217,0.5)]">
                <div className="flex items-center gap-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-brand-50 ring-2 ring-brand-100">
                    <Image src={tutor.image} alt={`Portrait of ${tutor.name}`} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-1.5 text-lg font-bold text-ink">
                      <span className="truncate">{tutor.name}</span>
                      {tutor.verified && (
                        <BadgeCheck aria-label="Verified profile" className="size-4 shrink-0 text-brand-500" />
                      )}
                    </h3>
                    <p className="truncate text-xs text-muted">{tutor.headline}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs">
                      <Star aria-hidden className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-ink">{tutor.rating.toFixed(2)}</span>
                      <span className="text-muted">({tutor.reviewCount} reviews)</span>
                    </p>
                  </div>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Specialisms">
                  {tutor.programTags.map((tag) => (
                    <li key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">
                      {tag}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{tutor.bio}</p>

                <div className="mt-6 flex items-center justify-between border-t border-brand-50 pt-4 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-muted">
                    <ModeIcon aria-hidden className="size-3.5" />
                    {modeLabel}
                  </span>
                  <span className="text-base font-bold text-ink">
                    {formatRate(tutor.rate)}
                    <span className="text-xs font-medium text-muted">/hr</span>
                  </span>
                </div>

                <ButtonLink
                  href={`${requestHref}?tutor=${tutor.id}`}
                  variant={i === 1 ? "violet" : "primary"}
                  className="mt-5 w-full"
                >
                  Request This Tutor
                </ButtonLink>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
