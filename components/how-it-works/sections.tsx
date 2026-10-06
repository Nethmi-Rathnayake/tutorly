import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  EyeOff,
  Lock,
  ShieldCheck,
  Sparkles,
  Star,
  UserPlus,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import {
  conciergeNexus,
  connectionProof,
  directoryContrast,
  howItWorksCta,
  howItWorksHero,
  journeysIntro,
  parentJourney,
  tutorJourney,
  type JourneyStep,
} from "@/lib/constants/how-it-works";
import { requestHref, siteConfig } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";
import { cn } from "@/lib/utils/cn";

const REGISTER_HREF = "/tutor-registration";

function CenteredHeading({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center font-[family-name:var(--font-inter),var(--font-arabic)]">
      <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
        <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
        {eyebrow}
        <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
      </p>
      <h2 id={id} className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    </div>
  );
}

const heroBadgeIcons = [BadgeCheck, ShieldCheck, EyeOff, Sparkles];

export async function HowItWorksHero() {
  const t = await getT();
  const h = t.deep(howItWorksHero);
  return (
    <section className="relative overflow-x-clip font-[family-name:var(--font-inter),var(--font-arabic)]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
      />
      <Reveal className="mx-auto max-w-[90rem] px-4 pt-12 sm:px-8 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {h.eyebrow}
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {h.title} <span className="text-brand-600">{h.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{h.description}</p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {h.badges.map((b, i) => {
            const Icon = heroBadgeIcons[i];
            return (
              <li
                key={b}
                className="group flex flex-col items-center gap-4 rounded-2xl bg-brand-50 p-6 text-center ring-2 ring-brand-400 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-600"
              >
                <span className="grid size-11 place-items-center rounded-full bg-white text-brand-600 shadow-sm">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="text-sm font-semibold leading-snug text-ink">{b}</span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

function StreamCard({ data }: { data: typeof conciergeNexus.parent }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:ring-brand-500">
      <p className="inline-flex w-fit rounded-full bg-night px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
        {data.stream}
      </p>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600 transition-colors group-hover:text-brand-900">
        {data.role}
      </p>
      <h3 className="mt-1.5 text-xl font-bold leading-snug text-ink">{data.title}</h3>
      <ul className="mt-5 space-y-3">
        {data.points.map((p) => (
          <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted transition-colors group-hover:text-brand-900/85">
            <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-500 transition-colors group-hover:text-brand-900" />
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-auto border-s-2 border-brand-400 ps-4 pt-0 text-xs italic leading-relaxed text-muted transition-colors group-hover:border-brand-900/40 group-hover:text-brand-900/80">
        {data.note}
      </p>
    </article>
  );
}


export async function ConciergeNexus() {
  const t = await getT();
  const n = t.deep(conciergeNexus);
  return (
    <section
      aria-labelledby="nexus-heading"
      className="mx-auto max-w-[90rem] px-4 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10"
    >
      <Reveal>
        <CenteredHeading id="nexus-heading" eyebrow={n.eyebrow} title={n.title} description={n.description} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.45fr_1fr] lg:items-stretch">
          <StreamCard data={n.parent} />

          <article className="order-last flex flex-col items-center rounded-3xl bg-brand-50 p-7 text-center ring-2 ring-brand-500 sm:p-9 lg:order-none">
            <span className="inline-flex items-center gap-2 rounded-full bg-night px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
              {n.desk.badge}
            </span>
            <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
              {t("{name} {title}", { name: siteConfig.name, title: n.desk.title })}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{n.desk.description}</p>
            <ul className="mt-7 grid w-full gap-3 sm:grid-cols-3">
              {n.desk.checks.map((c) => (
                <li key={c.title} className="flex flex-col items-center rounded-2xl bg-white px-3 py-4 ring-1 ring-brand-200">
                  <p className="text-sm font-bold text-ink">{c.title}</p>
                  <p className="mt-1 text-xs text-muted">{c.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-auto flex items-center gap-2 pt-7 text-xs font-medium text-brand-600">
              <Lock aria-hidden className="size-3.5" />
              {n.desk.footnote}
            </p>
          </article>

          <StreamCard data={n.tutor} />
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl bg-brand-100 px-6 py-8 text-center ring-1 ring-brand-300">
          <span className="inline-flex items-center rounded-full bg-night px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
            {n.outcome.badge}
          </span>
          <h3 className="mt-4 text-xl font-bold text-ink sm:text-2xl">{n.outcome.title}</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{n.outcome.body}</p>
        </div>

        <p className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted sm:items-center">
          <ShieldCheck aria-hidden className="size-4 shrink-0 text-brand-600" />
          <span>
            <strong className="font-semibold text-brand-700">{n.privacy.label}</strong> {n.privacy.body}
          </span>
        </p>
      </Reveal>
    </section>
  );
}

const FONT = "font-[family-name:var(--font-inter),var(--font-arabic)]";

function JourneyCard({
  journey,
  href,
  primary,
  ctaIcon: CtaIcon,
}: {
  journey: { track: string; title: string; tag: string; cta: string; steps: JourneyStep[] };
  href: string;
  primary: boolean;
  ctaIcon: typeof ArrowRight;
}) {
  return (
    <article className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(143,106,29,0.5)] hover:ring-brand-500 sm:p-9">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">{journey.track}</p>
          <h3 className="mt-1.5 text-2xl font-bold text-ink">{journey.title}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-night px-3 py-1 text-[11px] font-semibold text-gold">{journey.tag}</span>
      </header>

      <ol className="mt-8 flex-1">
        {journey.steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-4 pb-7 last:pb-0">
            {i < journey.steps.length - 1 && (
              <span aria-hidden className="absolute start-4 top-9 bottom-1 w-px -translate-x-1/2 bg-brand-300 rtl:translate-x-1/2" />
            )}
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] text-xs font-bold text-brand-900">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-600">{s.kicker}</p>
              <h4 className="mt-0.5 text-base font-semibold text-ink">{s.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <ButtonLink
        href={href}
        size="lg"
        variant={primary ? "primary" : "soft"}
        className={cn("mt-9", !primary && "bg-night text-gold hover:bg-brand-800")}
      >
        {journey.cta}
        <CtaIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
      </ButtonLink>
    </article>
  );
}

export async function DualJourneys() {
  const t = await getT();
  return (
    <section aria-labelledby="journeys-heading" className={cn("mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10", FONT)}>
      <CenteredHeading id="journeys-heading" {...t.deep(journeysIntro)} />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <JourneyCard journey={t.deep(parentJourney)} href={requestHref} primary ctaIcon={ArrowRight} />
        </Reveal>
        <Reveal delay={0.08} className="h-full">
          <JourneyCard journey={t.deep(tutorJourney)} href={REGISTER_HREF} primary={false} ctaIcon={UserPlus} />
        </Reveal>
      </div>
    </section>
  );
}

export async function DirectoryContrast() {
  const t = await getT();
  const d = t.deep(directoryContrast);
  return (
    <section aria-labelledby="contrast-heading" className={cn("mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10", FONT)}>
      <CenteredHeading id="contrast-heading" eyebrow={d.eyebrow} title={d.title} description={d.description} />
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {d.points.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={i * 0.07} className="h-full">
              <article className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:ring-brand-500">
                <span className="text-4xl font-bold text-brand-500 transition-colors group-hover:text-brand-900">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted transition-colors group-hover:text-brand-900/85">
                  {p.body}
                </p>
                <p className="mt-6 flex items-center gap-2 border-t border-brand-200 pt-4 text-xs font-semibold text-brand-700 transition-colors group-hover:border-brand-900/20 group-hover:text-brand-900">
                  <ShieldCheck aria-hidden className="size-4 shrink-0" />
                  {p.tag}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function ConnectionProof() {
  const t = await getT();
  const p = t.deep(connectionProof);
  return (
    <section
      aria-label={t("Parent testimonial and placement figures")}
      className={cn("mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10", FONT)}
    >
      <Reveal className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
        <figure className="flex flex-col rounded-3xl bg-brand-50 p-8 ring-1 ring-brand-200 sm:p-10">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5 text-brand-500" role="img" aria-label={t("Rated 5 out of 5")}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} aria-hidden className="size-4 fill-current" />
              ))}
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">{p.eyebrow}</p>
          </div>
          <blockquote className="mt-6 flex-1 font-serif text-xl leading-relaxed text-ink sm:text-2xl">“{p.quote}”</blockquote>
          <figcaption className="mt-8 flex items-center gap-3 border-t border-brand-200 pt-5">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-night ring-2 ring-brand-400">
              {p.photo ? (
                <Image src={p.photo} alt="" fill sizes="56px" className="object-cover" />
              ) : (
                <span className="grid size-full place-items-center text-base font-bold text-gold">{p.initial}</span>
              )}
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{p.name}</span>
              <span className="block text-xs text-muted">{p.context}</span>
            </span>
          </figcaption>
        </figure>

        <dl className="grid gap-4">
          {p.stats.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col rounded-3xl bg-white px-7 py-5 ring-1 ring-brand-200 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500"
            >
              <dd className="order-first text-3xl font-bold tracking-tight text-brand-500 transition-colors group-hover:text-brand-900">
                {s.value}
              </dd>
              <dt className="mt-1 text-sm font-semibold text-ink">{s.label}</dt>
              <dd className="mt-1 text-xs leading-relaxed text-muted transition-colors group-hover:text-brand-900/80">
                {s.body}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

export async function HowItWorksCta() {
  const t = await getT();
  const c = t.deep(howItWorksCta);
  return (
    <section aria-labelledby="hiw-cta-heading" className={cn("mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10", FONT)}>
      <Reveal className="rounded-3xl bg-brand-100 px-6 py-16 text-center ring-1 ring-brand-300 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {c.eyebrow}
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
          </p>
          <h2
            id="hiw-cta-heading"
            className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.5rem]"
          >
            {c.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">{c.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={requestHref} size="lg" arrow>
              {t(parentJourney.cta)}
            </ButtonLink>
            <ButtonLink href={REGISTER_HREF} size="lg" variant="soft" className="bg-night text-gold hover:bg-brand-800">
              {t(tutorJourney.cta)}
              <UserPlus aria-hidden className="size-4" />
            </ButtonLink>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
            <Lock aria-hidden className="size-3.5 text-brand-600" />
            {c.note}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
