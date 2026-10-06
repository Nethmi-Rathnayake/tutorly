import { Link } from "@/components/ui/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { levelStages } from "@/lib/constants/home";
import { getT } from "@/lib/i18n/server";
import { cn } from "@/lib/utils/cn";

export async function LevelStages() {
  const t = await getT();
  const stages = t.deep(levelStages);
  return (
    <section
      aria-labelledby="levels-heading"
      className="mx-auto max-w-[90rem] px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
          <span aria-hidden className="h-px w-8 bg-brand-500" />
          {t("Targeted Pedagogy")}
          <span aria-hidden className="h-px w-8 bg-brand-500" />
        </p>
        <h2 id="levels-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
          {t("Every Stage of")}{" "}
          <span className="text-brand-500">{t("Student Growth")}</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          {t("Specialized subject methodologies tailored from foundational motor-cognitive skills to rigorous graduate dissertations.")}
        </p>
      </div>

      <div className="relative mt-14">
        {/* growth path running behind the step numbers */}
        <span
          aria-hidden
          className="absolute inset-x-[10%] top-6 hidden h-px bg-linear-to-r from-transparent via-brand-400 to-transparent lg:block"
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage, i) => (
            <li key={stage.id} className="sm:max-lg:last:col-span-2 sm:max-lg:last:mx-auto sm:max-lg:last:w-full sm:max-lg:last:max-w-[calc(50%-0.625rem)]">
              <Reveal delay={i * 0.06} className="h-full">
                <Link
                  href={`/education-levels#${stage.id}`}
                  className={cn(
                    "group relative flex h-full flex-col items-center rounded-3xl px-5 pb-6 pt-5 text-center ring-1 transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                    stage.featured
                      ? "bg-linear-to-b from-night to-brand-800 text-white ring-brand-500 shadow-[0_24px_50px_-24px_rgba(20,23,29,0.7)]"
                      : "bg-white text-ink ring-brand-200 hover:bg-[#e6c97c] hover:shadow-[0_24px_50px_-24px_rgba(143,106,29,0.6)] hover:ring-brand-500",
                  )}
                >
                  {stage.featured && (
                    <span className="absolute -top-3 rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-900">
                      {t("Most Requested")}
                    </span>
                  )}
                  <span
                    className={cn(
                      "relative z-10 grid size-12 place-items-center rounded-full text-sm font-bold ring-4 ring-background",
                      stage.featured
                        ? "bg-linear-to-b from-[#ecd28c] to-[#c9a24e] text-brand-900"
                        : "bg-night text-gold transition-colors group-hover:bg-brand-900",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{stage.title}</h3>
                  <p
                    className={cn(
                      "mt-1 text-xs font-semibold transition-colors",
                      stage.featured ? "text-gold" : "text-brand-600 group-hover:text-brand-900",
                    )}
                  >
                    {stage.range}
                  </p>
                  <p
                    className={cn(
                      "mt-3 flex-1 text-sm leading-relaxed transition-colors",
                      stage.featured ? "text-white/75" : "text-muted group-hover:text-brand-900/80",
                    )}
                  >
                    {stage.description}
                  </p>
                  <span
                    className={cn(
                      "mt-6 inline-flex items-center gap-1.5 text-xs font-semibold",
                      stage.featured ? "text-gold" : "text-brand-700",
                    )}
                  >
                    {t("Explore level")}
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
