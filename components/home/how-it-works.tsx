import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/constants/site";
import { howItWorksSteps } from "@/lib/constants/home";
import { getT } from "@/lib/i18n/server";

export async function HowItWorks() {
  const t = await getT();
  return (
    <section
      aria-labelledby="how-heading"
      className="mx-auto max-w-[90rem] px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10"
    >
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-night via-brand-800 to-brand-900 px-6 py-14 shadow-[0_30px_60px_-30px_rgba(20,23,29,0.7)] sm:px-10 lg:px-14 lg:py-16">
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand-400 via-gold to-brand-500" />

        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            <span aria-hidden className="h-px w-8 bg-gold" />
            {t("Efficient Selection Experience")}
            <span aria-hidden className="h-px w-8 bg-gold" />
          </p>
          <h2
            id="how-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-[2.5rem] sm:leading-tight"
          >
            {t("How {name} Works", { name: siteConfig.name })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
            {t("Four simple steps from first requirement to personalized academic breakthrough.")}
          </p>
        </div>

        <div className="relative mt-14">
          {/* path joining the four step numbers */}
          <span
            aria-hidden
            className="absolute inset-x-[12%] top-7 hidden h-px bg-linear-to-r from-transparent via-gold/60 to-transparent lg:block"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.deep(howItWorksSteps).map((step, i) => (
              <li key={step.step}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="group flex h-full flex-col items-center rounded-3xl bg-white/5 px-6 pb-7 pt-5 text-center ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:ring-brand-500">
                    <span className="relative z-10 grid size-14 place-items-center rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] text-lg font-bold text-brand-900 ring-4 ring-brand-900">
                      {step.step}
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-white transition-colors group-hover:text-brand-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70 transition-colors group-hover:text-brand-900/80">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/how-it-works" size="lg" arrow>
            {t("Read the Complete Parent Guide")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
