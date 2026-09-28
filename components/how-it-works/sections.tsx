import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpenCheck,
  Brain,
  CircleCheck,
  EyeOff,
  FileBadge,
  GraduationCap,
  Handshake,
  Landmark,
  Lock,
  MessageCircleOff,
  Microscope,
  ShieldCheck,
  Sparkles,
  Star,
  UserPlus,
  UsersRound,
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
import { cn } from "@/lib/utils/cn";

const REGISTER_HREF = "/tutor-registration";

function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600", className)}>{children}</p>
  );
}

function CenteredHeading({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Kicker>{eyebrow}</Kicker>
      <h2 id={id} className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    </div>
  );
}

const heroBadgeIcons = [BadgeCheck, ShieldCheck, EyeOff, Sparkles];

export function HowItWorksHero() {
  const h = howItWorksHero;
  return (
    <section className="relative overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[640px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
      />
      <Reveal className="relative mx-auto max-w-4xl px-4 pt-12 text-center sm:px-6 lg:px-8 lg:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">
          <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
          {h.eyebrow}
        </span>
        <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">{h.title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{h.description}</p>
        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
          {h.badges.map((b, i) => {
            const Icon = heroBadgeIcons[i];
            return (
              <li
                key={b}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-ink shadow-[0_8px_20px_-14px_rgba(44,37,115,0.5)] ring-1 ring-brand-100"
              >
                <Icon aria-hidden className="size-3.5 text-brand-600" />
                {b}
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

function StreamCard({
  data,
  icon: Icon,
  tone,
}: {
  data: typeof conciergeNexus.parent;
  icon: typeof UsersRound;
  tone: "brand" | "violet";
}) {
  return (
    <div className="flex h-full flex-col">
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
        <span aria-hidden className={cn("size-1.5 rounded-full", tone === "brand" ? "bg-brand-600" : "bg-violet-brand")} />
        {data.stream}
      </p>
      <article className="mt-3 flex flex-1 flex-col rounded-3xl bg-lavender/70 p-6 ring-1 ring-brand-100">
        <span
          className={cn(
            "grid size-11 place-items-center rounded-xl",
            tone === "brand" ? "bg-brand-100 text-brand-700" : "bg-violet-100 text-violet-brand",
          )}
        >
          <Icon aria-hidden className="size-5" />
        </span>
        <Kicker className={cn("mt-5", tone === "violet" && "text-violet-brand")}>{data.role}</Kicker>
        <h3 className="mt-1.5 text-lg font-bold leading-snug text-ink">{data.title}</h3>
        <ul className="mt-4 space-y-2.5">
          {data.points.map((p) => (
            <li key={p} className="flex gap-2 text-xs leading-relaxed text-muted">
              <CircleCheck aria-hidden className="mt-0.5 size-3.5 shrink-0 text-brand-500" />
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-5 rounded-2xl bg-white/70 p-4 text-xs italic leading-relaxed text-muted">{data.note}</p>
      </article>
    </div>
  );
}

const deskIcons = [Brain, BookOpenCheck, Microscope];

export function ConciergeNexus() {
  const n = conciergeNexus;
  return (
    <section aria-labelledby="nexus-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal className="rounded-[2.5rem] bg-white px-5 py-12 shadow-[0_40px_80px_-50px_rgba(44,37,115,0.45)] ring-1 ring-brand-100/80 sm:px-10 lg:py-14">
        <CenteredHeading id="nexus-heading" eyebrow={n.eyebrow} title={n.title} description={n.description} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.55fr_1fr] lg:items-stretch">
          <StreamCard data={n.parent} icon={UsersRound} tone="brand" />

          <article className="order-last flex flex-col items-center rounded-[2rem] bg-white p-6 text-center shadow-[0_30px_60px_-30px_rgba(79,63,217,0.55)] ring-2 ring-brand-500/80 sm:p-8 lg:order-none lg:mt-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">
              <Landmark aria-hidden className="size-3.5" />
              {n.desk.badge}
            </span>
            <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
              {siteConfig.name} {n.desk.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{n.desk.description}</p>
            <ul className="mt-7 grid w-full gap-3 sm:grid-cols-3">
              {n.desk.checks.map((c, i) => {
                const Icon = deskIcons[i];
                return (
                  <li key={c.title} className="flex flex-col items-center rounded-2xl bg-lavender px-3 py-4">
                    <Icon aria-hidden className="size-4 text-brand-600" />
                    <p className="mt-2 text-xs font-bold text-ink">{c.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{c.body}</p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-xs font-medium text-brand-600">
              <Lock aria-hidden className="size-3.5" />
              {n.desk.footnote}
            </p>
          </article>

          <StreamCard data={n.tutor} icon={Award} tone="violet" />
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl bg-linear-to-r from-brand-100 via-lavender to-violet-100 px-6 py-7 text-center ring-1 ring-brand-200/70">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
            <Handshake aria-hidden className="size-3.5 text-brand-600" />
            {n.outcome.badge}
          </span>
          <h3 className="mt-4 text-lg font-bold text-ink sm:text-xl">{n.outcome.title}</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">{n.outcome.body}</p>
        </div>

        <p className="mt-8 flex items-start justify-center gap-2 rounded-2xl bg-brand-50 px-5 py-4 text-center text-xs leading-relaxed text-muted ring-1 ring-brand-100 sm:items-center">
          <ShieldCheck aria-hidden className="size-4 shrink-0 text-brand-600" />
          <span>
            <strong className="font-semibold text-brand-700">{n.privacy.label}</strong> {n.privacy.body}
          </span>
        </p>
      </Reveal>
    </section>
  );
}

function JourneyCard({
  journey,
  icon: Icon,
  tone,
  href,
  ctaIcon: CtaIcon,
}: {
  journey: { track: string; title: string; tag: string; cta: string; steps: JourneyStep[] };
  icon: typeof UsersRound;
  tone: "brand" | "violet";
  href: string;
  ctaIcon: typeof ArrowRight;
}) {
  const brand = tone === "brand";
  return (
    <article className="flex h-full flex-col rounded-[2rem] bg-white p-6 ring-1 ring-brand-100/80 sm:p-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-11 place-items-center rounded-xl",
              brand ? "bg-brand-100 text-brand-700" : "bg-violet-100 text-violet-brand",
            )}
          >
            <Icon aria-hidden className="size-5" />
          </span>
          <div>
            <Kicker className={cn(!brand && "text-violet-brand")}>{journey.track}</Kicker>
            <h3 className="text-lg font-bold text-ink">{journey.title}</h3>
          </div>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-semibold",
            brand ? "bg-brand-50 text-brand-700" : "bg-violet-100 text-violet-brand",
          )}
        >
          {journey.tag}
        </span>
      </header>

      <ol className="mt-8 flex-1">
        {journey.steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-4 pb-7 last:pb-0">
            {i < journey.steps.length - 1 && (
              <span aria-hidden className="absolute left-4 top-9 bottom-1 w-px -translate-x-1/2 bg-brand-100" />
            )}
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold text-white",
                brand ? "bg-brand-700" : "bg-violet-brand",
              )}
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <Kicker className={cn("tracking-[0.1em] normal-case", !brand && "text-violet-brand")}>{s.kicker}</Kicker>
              <h4 className="mt-0.5 text-base font-semibold text-ink">{s.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <a
        href={href}
        className={cn(
          "group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
          brand
            ? "bg-linear-to-r from-brand-700 to-brand-500 shadow-[0_14px_30px_-14px_rgba(67,49,190,0.8)]"
            : "bg-linear-to-r from-violet-brand to-violet-500 shadow-[0_14px_30px_-14px_rgba(109,40,217,0.8)]",
        )}
      >
        {journey.cta}
        <CtaIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </article>
  );
}

export function DualJourneys() {
  return (
    <section aria-labelledby="journeys-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <CenteredHeading id="journeys-heading" {...journeysIntro} />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <JourneyCard journey={parentJourney} icon={UsersRound} tone="brand" href={requestHref} ctaIcon={ArrowRight} />
        </Reveal>
        <Reveal delay={0.08} className="h-full">
          <JourneyCard journey={tutorJourney} icon={GraduationCap} tone="violet" href={REGISTER_HREF} ctaIcon={UserPlus} />
        </Reveal>
      </div>
    </section>
  );
}

const contrastStyles = [
  { icon: MessageCircleOff, tone: "bg-rose-100 text-rose-600" },
  { icon: FileBadge, tone: "bg-brand-100 text-brand-700" },
  { icon: Lock, tone: "bg-violet-100 text-violet-brand" },
];

export function DirectoryContrast() {
  const d = directoryContrast;
  return (
    <section aria-labelledby="contrast-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[2.5rem] bg-lavender/80 px-5 py-12 ring-1 ring-brand-100 sm:px-10 lg:py-14">
        <div className="max-w-2xl">
          <Kicker>{d.eyebrow}</Kicker>
          <h2 id="contrast-heading" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {d.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{d.description}</p>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {d.points.map((p, i) => {
            const { icon: Icon, tone } = contrastStyles[i];
            return (
              <li key={p.title}>
                <Reveal delay={i * 0.07} className="h-full">
                  <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
                    <span className={cn("grid size-11 place-items-center rounded-xl", tone)}>
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 className="mt-5 text-base font-bold text-ink">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
                    <p className="mt-5 flex items-center gap-2 rounded-xl bg-brand-50 px-3.5 py-2.5 text-xs font-semibold text-brand-700">
                      <ShieldCheck aria-hidden className="size-3.5 shrink-0" />
                      {p.tag}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ConnectionProof() {
  const p = connectionProof;
  return (
    <section aria-label="Parent testimonial and placement figures" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal className="grid gap-8 rounded-[2.5rem] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(44,37,115,0.45)] ring-1 ring-brand-100/80 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
        <figure>
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5 text-brand-500" role="img" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} aria-hidden className="size-4" />
              ))}
            </div>
            <Kicker className="text-muted">{p.eyebrow}</Kicker>
          </div>
          <blockquote className="mt-5 text-lg font-medium leading-relaxed text-ink sm:text-xl">“{p.quote}”</blockquote>
          <figcaption className="mt-7 flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-700 to-violet-brand text-base font-bold text-white shadow-lg shadow-brand-600/30">
              {p.initial}
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{p.name}</span>
              <span className="block text-xs text-muted">{p.context}</span>
            </span>
          </figcaption>
        </figure>

        <dl className="divide-y divide-brand-100 rounded-3xl bg-lavender px-6 py-2 ring-1 ring-brand-100">
          {p.stats.map((s, i) => (
            <div key={s.label} className="flex flex-col py-5">
              <dt className="text-sm font-semibold text-ink">{s.label}</dt>
              <dd className="mt-1 text-xs leading-relaxed text-muted">{s.body}</dd>
              <dd
                className={cn(
                  "order-first text-3xl font-extrabold tracking-tight",
                  i === 0 ? "text-brand-700" : i === 1 ? "text-violet-brand" : "text-ink",
                )}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

export function HowItWorksCta() {
  const c = howItWorksCta;
  return (
    <section aria-labelledby="hiw-cta-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-brand-600 via-brand-500 to-violet-brand px-6 py-16 text-center shadow-[0_40px_80px_-40px_rgba(79,63,217,0.8)] sm:px-10">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-white/15 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-white/20">
            {c.eyebrow}
          </span>
          <h2 id="hiw-cta-heading" className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            {c.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">{c.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={requestHref} variant="ghost" size="lg" arrow className="bg-white text-brand-700 ring-0 hover:bg-white">
              {parentJourney.cta}
            </ButtonLink>
            <ButtonLink
              href={REGISTER_HREF}
              size="lg"
              className="bg-white/15 bg-none text-white shadow-none ring-1 ring-white/25 hover:bg-white/25"
            >
              {tutorJourney.cta}
              <UserPlus aria-hidden className="size-4" />
            </ButtonLink>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-white/70">
            <Lock aria-hidden className="size-3.5" />
            {c.note}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
