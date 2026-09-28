import type { Metadata } from "next";
import {
  Assurances,
  ConciergeHero,
  ConciergeTestimonial,
  IntakeHeading,
  PlacementSteps,
} from "@/components/concierge/concierge-sections";
import { ButtonLink } from "@/components/ui/button-link";
import { requestHref } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Concierge Tutor Matching",
  description:
    "Tell us what your student needs and our academic advisors will hand-match a vetted tutor for their subject, curriculum and schedule.",
};

export default function ConciergeMatchingPage() {
  return (
    <div className="space-y-20 pb-24 lg:space-y-28">
      <ConciergeHero />
      <PlacementSteps />

      <section id="intake" aria-labelledby="intake-heading" className="scroll-mt-20 px-4 sm:px-6 lg:px-8">
        <IntakeHeading />
        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 text-center">
          <ButtonLink href={requestHref} size="lg" arrow>
            Start Your Request
          </ButtonLink>
          <p className="text-xs text-muted">Six short steps • Save a draft at any time</p>
        </div>
      </section>

      <Assurances />
      <ConciergeTestimonial />
    </div>
  );
}
