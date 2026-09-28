import Link from "next/link";
import { ArrowRight, Backpack, Blocks, GraduationCap, Library, School } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { levelStages } from "@/lib/constants/home";
import { cn } from "@/lib/utils/cn";

const icons = {
  "early-years": Blocks,
  primary: Backpack,
  middle: School,
  "high-school": GraduationCap,
  "higher-education": Library,
} as const;

export function LevelStages() {
  return (
    <section aria-labelledby="levels-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="levels-heading"
        align="center"
        eyebrow="Targeted Pedagogy"
        title="Every Stage of Student Growth"
        description="Specialized subject methodologies tailored from foundational motor-cognitive skills to rigorous graduate dissertations."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {levelStages.map((stage, i) => {
          const Icon = icons[stage.id as keyof typeof icons] ?? GraduationCap;
          return (
            <Reveal key={stage.id} delay={i * 0.06}>
              <Link
                href={`/grades#${stage.id}`}
                className={cn(
                  "group relative flex h-full flex-col rounded-3xl p-6 ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(79,63,217,0.55)]",
                  stage.featured
                    ? "bg-linear-to-b from-brand-100/80 to-white ring-brand-300"
                    : "bg-white/70 ring-brand-100 hover:bg-white",
                )}
              >
                {stage.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-linear-to-r from-brand-700 to-brand-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                    Most Requested
                  </span>
                )}
                <span
                  className={cn(
                    "grid size-11 place-items-center rounded-2xl",
                    stage.featured ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-600",
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{stage.title}</h3>
                <p className="mt-1 text-[11px] font-semibold text-brand-600">{stage.range}</p>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-muted">{stage.description}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                  Explore level
                  <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
