import { readdirSync } from "node:fs";
import path from "node:path";
import { Reveal } from "@/components/ui/reveal";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { JourneyCards } from "@/components/home/journey-cards";
import { getT } from "@/lib/i18n/server";

export async function Hero() {
  const t = await getT();
  // The home hero shows exactly the images in public/images/hero/, in natural filename order.
  const slides = readdirSync(path.join(process.cwd(), "public", "images", "hero"))
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/images/hero/${file}`);
  return (
    <section className="relative isolate flex min-h-[min(calc(100svh-4.5rem),46rem)] flex-col overflow-hidden bg-night">
      <HeroSlideshow images={slides} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-night/60"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-night/90 to-transparent" />

      <Reveal className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-start px-4 pb-12 pt-6 sm:px-8 lg:px-10 lg:pb-16 lg:pt-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <span aria-hidden className="h-px w-10 bg-gold" />
            {t("Private Tutors in Dubai & the UAE")}
            <span aria-hidden className="h-px w-10 bg-gold" />
          </p>
          <h1 className="mt-6 font-serif text-balance text-4xl font-bold uppercase leading-[1.08] tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:text-[2.6rem] lg:text-5xl xl:text-[3.4rem]">
            <span className="block xl:whitespace-nowrap">{t("Find the Perfect Teacher for")}</span>
            <span className="block text-gold xl:whitespace-nowrap">{t("Your Child's Success")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-inter),var(--font-arabic)] text-base leading-relaxed text-white/85 sm:text-lg">
            {t("Fill out our simple form and our team will get in touch about a tutor for your child.")}
          </p>
        </div>
        <div className="mx-auto mt-10 w-full max-w-4xl">
          <JourneyCards inHero />
        </div>
      </Reveal>
    </section>
  );
}
