import Image from "next/image";
import { Sparkles, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { requestHref, siteConfig } from "@/lib/constants/site";
import { heroSocialProof, heroStats, homeImages } from "@/lib/constants/home";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-40 size-[420px] rounded-full bg-violet-200/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:pb-28 lg:pt-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600 ring-1 ring-brand-100">
            <Sparkles aria-hidden className="size-3.5" />
            Future-Focused Learning
          </span>

          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]">
            Find the Right Tutor for Your{" "}
            <span className="bg-linear-to-r from-brand-700 to-violet-brand bg-clip-text text-transparent">
              Learning Journey.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={requestHref} size="lg" arrow>
              I Need a Tutor
            </ButtonLink>
            <ButtonLink href="/become-a-tutor" variant="ghost" size="lg">
              Become a Tutor
            </ButtonLink>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {heroSocialProof.initials.map((initials, i) => (
                <span
                  key={initials}
                  className="grid size-10 place-items-center rounded-full border-2 border-white text-[11px] font-bold text-brand-700"
                  style={{ backgroundColor: ["#e8e6fd", "#dcd8fb", "#ede3fd", "#f3f2fe"][i % 4] }}
                >
                  {initials}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="flex text-amber-400" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                <span className="text-sm font-bold text-ink">{heroSocialProof.rating}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted">{heroSocialProof.caption}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative pb-16 pr-4 pt-8 sm:pr-10">
      {/* Main photo */}
      <div className="relative aspect-[4/4.2] w-[88%] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(44,37,115,0.45)] ring-1 ring-white/60">
        <Image
          src={homeImages.heroMain}
          alt="A tutor smiling while working through lessons with students"
          fill
          preload
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      </div>

      {/* Secondary photo + stats */}
      <div className="animate-float absolute right-0 top-0 w-[46%] overflow-hidden rounded-3xl bg-white shadow-[0_24px_50px_-18px_rgba(44,37,115,0.45)] ring-4 ring-white">
        <div className="relative aspect-[4/3]">
          <Image
            src={homeImages.heroSecondary}
            alt="Students studying together in a library"
            fill
            sizes="(min-width: 1024px) 20vw, 45vw"
            className="object-cover"
          />
        </div>
        <dl className="grid grid-cols-2 divide-x divide-brand-100 px-2 py-3 text-center sm:py-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="px-1">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-xl font-extrabold text-brand-800 sm:text-3xl">{stat.value}</dd>
              <dd className="mt-0.5 text-[10px] font-medium text-muted sm:text-[11px]">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Live network bar */}
      <div className="absolute bottom-6 left-[18%] right-[4%] hidden items-center sm:flex justify-between rounded-2xl bg-white/90 px-5 py-4 shadow-[0_20px_40px_-20px_rgba(44,37,115,0.5)] ring-1 ring-brand-100 backdrop-blur-md">
        <div className="pl-[38%]">
          <p className="text-sm font-bold text-ink">Live Tutoring Network</p>
          <p className="text-[11px] text-muted">1-on-1 sessions happening now</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden />
          Active
        </span>
      </div>

      {/* Parent review glass card */}
      <figure className="animate-float-delayed absolute bottom-0 left-0 w-[52%] rounded-2xl bg-white/75 p-4 shadow-[0_24px_50px_-20px_rgba(44,37,115,0.55)] ring-1 ring-white backdrop-blur-xl sm:w-[46%]">
        <div className="flex items-center gap-2">
          <span className="flex text-amber-400" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3 fill-current" />
            ))}
          </span>
          <span className="text-[11px] font-bold text-ink">Parent Review</span>
        </div>
        <blockquote className="mt-2 text-[11px] italic leading-relaxed text-muted sm:text-xs">
          “An exceptional tutor who rebuilt my son&apos;s confidence in Calculus in just 4 weeks.”
        </blockquote>
        <figcaption className="mt-2 text-[10px] font-semibold text-brand-700">Sarah M. • IGCSE Parent</figcaption>
      </figure>
    </div>
  );
}
