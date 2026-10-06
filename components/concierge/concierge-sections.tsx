import Image from "next/image";
import {
  ArrowRight,
  ArrowLeftRight,
  CalendarDays,
  ClipboardList,
  EyeOff,
  GraduationCap,
  HeartHandshake,
  Lock,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  UserRound,
  Target,
} from "lucide-react";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/ui/reveal";
import {
  assurances,
  conciergeHero,
  conciergeTestimonial,
  intakeIntro as intake,
  placementSteps,
} from "@/lib/constants/concierge";
import { requestHref, siteConfig } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";

function Pill({ icon: Icon, children }: { icon?: typeof Sparkles; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-brand-100/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">
      {Icon && <Icon aria-hidden className="size-3.5" />}
      {children}
    </span>
  );
}

export async function ConciergeHero() {
  const t = await getT();
  const h = t.deep(conciergeHero);
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[640px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div className="relative mx-auto max-w-[90rem] px-4 pb-16 pt-10 sm:px-8 lg:px-10 lg:pt-16">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Pill icon={Target}>{h.eyebrow}</Pill>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">{h.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{h.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={requestHref}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] px-7 text-sm font-semibold text-brand-900 shadow-[0_14px_30px_-12px_rgba(20,23,29,0.8)] transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              {h.cta}
              <ArrowRight aria-hidden className="rtl:-scale-x-100 size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
            <span className="inline-flex h-10 items-center gap-2 rounded-full bg-brand-50 px-4 text-xs text-muted ring-1 ring-brand-100">
              <Lock aria-hidden className="size-3.5 text-brand-600" />
              {h.assurance}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto mt-14 max-w-6xl pb-6 pt-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(20,23,29,0.55)] sm:aspect-[2/1]">
            <Image src={h.image} alt={h.imageAlt} fill preload sizes="(min-width: 1280px) 1152px, 100vw" className="object-cover" />
          </div>

          <div className="animate-float absolute -top-1 end-3 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(20,23,29,0.5)] ring-1 ring-brand-100 backdrop-blur sm:end-6">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <ShieldCheck aria-hidden className="size-4" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{h.reviewCard.title}</p>
              <p className="text-xs font-medium text-ink">{h.reviewCard.body}</p>
            </div>
          </div>

          <div className="animate-float-delayed absolute bottom-0 start-3 hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(20,23,29,0.5)] ring-1 ring-brand-100 backdrop-blur sm:start-0 sm:flex sm:-translate-x-4">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <Sparkles aria-hidden className="size-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-ink">{h.curatedCard.title}</p>
              <p className="text-[11px] text-muted">{h.curatedCard.body}</p>
            </div>
          </div>

          <dl className="absolute bottom-0 end-3 flex divide-x divide-brand-100 rounded-2xl bg-white/95 px-2 py-3 shadow-[0_20px_40px_-20px_rgba(20,23,29,0.5)] ring-1 ring-brand-100 backdrop-blur sm:end-6">
            {h.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse px-4">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">{s.label}</dt>
                <dd className="text-lg font-extrabold text-brand-700 sm:text-xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

const stepIcons = [UserRound, CalendarDays, ScanSearch, HeartHandshake];

export async function PlacementSteps() {
  const t = await getT();
  return (
    <section aria-labelledby="placement-heading" className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <Pill>{t("Concierge Blueprint")}</Pill>
        <h2 id="placement-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
          {t("How Concierge Placement Works")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {t("A tailored 4-step process designed to remove the guesswork of finding elite academic support.")}
        </p>
      </div>

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.deep(placementSteps).map((s, i) => {
          const Icon = stepIcons[i];
          return (
            <li key={s.step}>
              <Reveal delay={i * 0.07} className="h-full">
                <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(20,23,29,0.5)]">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl font-light text-brand-300">{s.step}</span>
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-100/80 text-brand-700">
                      <Icon aria-hidden className="size-4" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.body}</p>
                  <p className="mt-6 border-t border-brand-50 pt-4 text-xs font-semibold text-brand-600">{s.tag}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export async function IntakeHeading() {
  const t = await getT();
  const intakeIntro = t.deep(intake);
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Pill icon={ClipboardList}>{intakeIntro.eyebrow}</Pill>
      <h2 id="intake-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
        {intakeIntro.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{intakeIntro.description}</p>
    </div>
  );
}

const assuranceIcons = [EyeOff, GraduationCap, Timer, ArrowLeftRight];

export async function Assurances() {
  const t = await getT();
  return (
    <section aria-labelledby="assurance-heading" className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10">
      <div className="text-center">
        <h2 id="assurance-heading" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {t("The {name} Academic Assurance", { name: siteConfig.name })}
        </h2>
        <p className="mt-2 text-sm text-muted">{t("Peace of mind built into every stage of your child's educational guidance.")}</p>
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.deep(assurances).map((a, i) => {
          const Icon = assuranceIcons[i];
          return (
            <li key={a.title}>
              <Reveal delay={i * 0.07} className="h-full">
                <div className="flex h-full flex-col items-center rounded-3xl bg-white px-6 py-8 text-center ring-1 ring-brand-100/80">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-100/80 text-brand-700">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-ink">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export async function ConciergeTestimonial() {
  const tr = await getT();
  const t = tr.deep(conciergeTestimonial);
  return (
    <section aria-label={tr("Parent testimonial")} className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-10">
      <Reveal>
        <figure className="flex flex-col gap-5 rounded-[2rem] bg-linear-to-r from-brand-100/70 via-lavender to-white p-7 ring-1 ring-brand-100 sm:flex-row sm:items-center sm:p-9">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-700 to-violet-brand text-lg font-bold text-white shadow-lg shadow-brand-600/30">
            {t.initial}
          </span>
          <div>
            <div className="flex gap-0.5 text-brand-500" role="img" aria-label={tr("Rated 5 out of 5")}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} aria-hidden className="size-3.5" />
              ))}
            </div>
            <blockquote className="mt-3 text-sm italic leading-relaxed text-muted sm:text-base">“{t.quote}”</blockquote>
            <figcaption className="mt-3 text-xs font-semibold text-ink">
              — {tr("{name}, {context}", { name: t.name, context: t.context })}
            </figcaption>
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
