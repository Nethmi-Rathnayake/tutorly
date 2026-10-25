import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { homeImages } from "@/lib/constants/home";
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
            {t("Designed with smooth visual flow and modern pacing, for a learning experience that feels distinct from conventional coaching institutes.")}
          </p>
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
