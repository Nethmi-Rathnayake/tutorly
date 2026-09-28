import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { homeImages, nextGenerationStats } from "@/lib/constants/home";

export function NextGeneration() {
  return (
    <section aria-labelledby="next-gen-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative pb-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-24px_rgba(44,37,115,0.45)]">
            <Image
              src={homeImages.nextGeneration}
              alt="Students collaborating around a table with laptops"
              fill
              sizes="(min-width: 1024px) 45vw, 95vw"
              className="object-cover"
            />
          </div>
          <div className="animate-float absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white/90 px-5 py-3.5 shadow-[0_20px_40px_-18px_rgba(44,37,115,0.5)] ring-1 ring-brand-100 backdrop-blur-md sm:left-[42%]">
            <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-brand-700 to-brand-600 text-white">
              <BadgeCheck aria-hidden className="size-5" />
            </span>
            <div>
              <p className="text-base font-bold text-ink">100% Vetted</p>
              <p className="text-[11px] text-muted">Identity & background verified</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow>Modern Education</Eyebrow>
          <h2 id="next-gen-heading" className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Built For The
            <br />
            <span className="bg-linear-to-r from-brand-700 to-violet-brand bg-clip-text text-transparent">
              Next Generation.
            </span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            Designed with smooth visual flow, modern pacing, and elite educational methodology that feels
            completely distinct from conventional coaching institutes.
          </p>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-8">
            {nextGenerationStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-extrabold text-brand-800">{stat.value}</p>
                <p className="mt-1 text-sm font-bold text-ink">{stat.label}</p>
                <p className="text-xs text-muted">{stat.caption}</p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="group mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Learn more about our pedagogy & standards
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
