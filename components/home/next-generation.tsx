import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { homeImages, nextGenerationStats } from "@/lib/constants/home";
import { getT } from "@/lib/i18n/server";

export async function NextGeneration() {
  const t = await getT();
  return (
    <section
      aria-labelledby="next-gen-heading"
      className="mx-auto max-w-[90rem] px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          {/* offset gold frame behind the photo */}
          <span
            aria-hidden
            className="absolute -bottom-4 -end-4 size-full rounded-3xl border-2 border-brand-400 sm:-bottom-5 sm:-end-5"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-24px_rgba(20,23,29,0.45)]">
            <Image
              src={homeImages.nextGeneration}
              alt={t("Students collaborating around a table with laptops")}
              fill
              sizes="(min-width: 1024px) 45vw, 95vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
            <span aria-hidden className="h-px w-8 bg-brand-500" />
            {t("Modern Education")}
          </p>
          <h2
            id="next-gen-heading"
            className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.5rem]"
          >
            {t("Built For The")}
            <br />
            <span className="text-brand-500">{t("Next Generation.")}</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            {t("Designed with smooth visual flow, modern pacing, and elite educational methodology that feels completely distinct from conventional coaching institutes.")}
          </p>

          <div className="mt-9 grid max-w-lg gap-4 sm:grid-cols-2">
            {t.deep(nextGenerationStats).map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-5 ring-1 ring-brand-200 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500"
              >
                <p className="text-4xl font-bold text-brand-500">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{stat.label}</p>
                <p className="mt-0.5 text-xs text-muted">{stat.caption}</p>
              </div>
            ))}
          </div>

          <ButtonLink
            href="/about"
            variant="soft"
            size="lg"
            arrow
            className="mt-10 bg-night text-gold hover:bg-brand-800"
          >
            {t("Learn more about our pedagogy & standards")}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
