import { ClipboardList, Rocket, UserCheck, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/constants/site";
import { howItWorksSteps } from "@/lib/constants/home";

const icons = [ClipboardList, Users, UserCheck, Rocket];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-linear-to-b from-lavender to-brand-50/60 px-6 py-14 ring-1 ring-brand-100 sm:px-10 lg:px-14 lg:py-16">
        <SectionHeading
          id="how-heading"
          align="center"
          eyebrow="Efficient Selection Experience"
          title={`How ${siteConfig.name} Works`}
          description="Four simple steps from first requirement to personalized academic breakthrough."
        />

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {howItWorksSteps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step.step}>
                <Reveal delay={i * 0.08}>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-light text-brand-300">{step.step}</span>
                    <span className="grid size-10 place-items-center rounded-full bg-white text-brand-600 ring-1 ring-brand-100">
                      <Icon aria-hidden className="size-4" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 flex justify-center">
          <ButtonLink href="/how-it-works" arrow>
            Read the Complete Parent Guide
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
