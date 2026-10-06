import Image from "next/image";
import {
  ArrowRight,
  CircleCheck,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import {
  earlyYears,
  higherEducation,
  highSchool,
  levelsHero,
  levelsImages,
  matchingProcess,
  middle,
  primary,
  uniqueCurriculum,
  type LevelCard,
} from "@/lib/constants/education-levels-page";
import { requestHref, siteConfig } from "@/lib/constants/site";
import { educationLevels } from "@/lib/constants/taxonomy";
import { getT } from "@/lib/i18n/server";
import { cn } from "@/lib/utils/cn";

const CONTACT_HREF = "/contact";

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600",
        "justify-center",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
      {children}
      <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
    </p>
  );
}

function Tags({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink ring-1 ring-brand-300 transition-colors group-hover:bg-white/60 group-hover:ring-brand-900/20"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function CheckList({ points, className }: { points: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {points.map((p) => (
        <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-ink">
          <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-500" />
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Kicker badge shown on every level card (grade / year label). */
function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full bg-night px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}

type StageMeta = { eyebrow: string; title: string; description: string; ages: string; frameworks: string };

function StageHeader({ stage, headingId }: { stage: StageMeta; headingId: string }) {
  return (
    <div className="flex flex-col gap-6 font-[family-name:var(--font-inter),var(--font-arabic)] lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
          <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
          {stage.eyebrow}
        </p>
        <h2 id={headingId} className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
          {stage.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{stage.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 lg:justify-end">
        <span className="inline-flex items-center rounded-full bg-night px-4 py-2 text-xs font-semibold text-gold">
          {stage.ages}
        </span>
        <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-700 ring-1 ring-brand-300">
          {stage.frameworks}
        </span>
      </div>
    </div>
  );
}

function Stage({
  id,
  tinted,
  children,
}: {
  id: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-24 py-10 font-[family-name:var(--font-inter),var(--font-arabic)] lg:py-14", tinted && "bg-brand-50/70")}
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10">{children}</div>
    </section>
  );
}

export async function LevelsHero() {
  const t = await getT();
  const h = t.deep(levelsHero);
  return (
    <section className="relative overflow-x-clip pb-16 font-[family-name:var(--font-inter),var(--font-arabic)]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[560px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
      />
      <Reveal className="relative mx-auto max-w-4xl px-4 pt-12 text-center sm:px-8 lg:px-10 lg:pt-20">
        <Pill>{h.eyebrow}</Pill>
        <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
          <span className="text-brand-600">{h.title.highlight}</span> {h.title.tail} {siteConfig.name}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{h.description}</p>
      </Reveal>

      <nav aria-label={t("Jump to an education stage")} className="mx-auto mt-10 max-w-[90rem] px-4 sm:px-8 lg:px-10">
        <ol className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {educationLevels.map((l, i) => (
            <li key={l.id} className={cn(i === educationLevels.length - 1 && "col-span-2 md:col-span-1")}>
              <a
                href={`#${l.id}`}
                className="group flex h-full items-center gap-3 rounded-2xl bg-white px-4 py-3.5 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e6c97c] hover:ring-brand-500"
              >
                <span className="text-xl font-bold text-brand-500 transition-colors group-hover:text-brand-900">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold leading-snug text-ink">{t(l.name)}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="relative mx-auto mt-10 grid max-w-[90rem] gap-5 px-4 sm:px-6 lg:grid-cols-[1.7fr_1fr] lg:px-6">
        <Reveal className="relative min-h-[340px] overflow-hidden rounded-3xl sm:min-h-[400px]">
          <Image
            src={levelsImages.hero}
            alt={t("A tutor and student working through a lesson on a laptop")}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-night/90 via-night/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div className="max-w-md">
              <span className="inline-flex rounded-full bg-night px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                {h.imageCard.kicker}
              </span>
              <p className="mt-3 text-xl font-bold leading-snug text-white sm:text-2xl">{h.imageCard.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/80">{h.imageCard.body}</p>
            </div>
            <ButtonLink href={requestHref} size="md" arrow className="shrink-0">
              {h.imageCard.cta}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-5">
          <dl className="grid flex-1 grid-cols-2 gap-5">
            {h.stats.map((s) => (
              <div
                key={s.label}
                className="group flex flex-col justify-center rounded-3xl bg-white p-6 text-center ring-1 ring-brand-200 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500"
              >
                <dd className="order-first text-4xl font-bold tracking-tight text-brand-500 transition-colors group-hover:text-brand-900">
                  {s.value}
                </dd>
                <dt className="mt-2 text-xs font-semibold leading-snug text-ink">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="px-1 text-xs leading-relaxed text-muted">{h.note}</p>
          <div className="rounded-3xl bg-brand-100 p-6 ring-1 ring-brand-300">
            <p className="text-sm font-bold text-ink">{h.frameworks.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{h.frameworks.body}</p>
          </div>
        </Reveal>
      </div>

      <ul className="relative mx-auto mt-5 grid max-w-[90rem] gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-6">
        {h.highlights.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 0.05} className="h-full">
              <div className="group h-full rounded-2xl bg-white p-5 ring-1 ring-brand-200 transition-colors duration-300 hover:bg-[#e6c97c] hover:ring-brand-500">
                <p className="text-sm font-bold text-ink">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted transition-colors group-hover:text-brand-900/80">
                  {item.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function EarlyYearsStage() {
  const t = await getT();
  const s = t.deep(earlyYears);
  return (
    <Stage id={s.id}>
      <StageHeader stage={s} headingId={`${s.id}-heading`} />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <ul className="grid gap-6">
          {s.cards.map((c, i) => (
            <li key={c.title}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="group h-full rounded-3xl bg-white p-7 ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:ring-brand-500 sm:p-8">
                  <Kicker>{c.kicker}</Kicker>
                  <h3 className="mt-5 text-xl font-bold text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted transition-colors group-hover:text-brand-900/85 sm:text-base">
                    {c.body}
                  </p>
                  {c.tags && <Tags tags={c.tags} className="mt-6" />}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.1} className="flex flex-col rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-300">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src={levelsImages.earlyYears}
              alt={t("A young learner being guided through an early learning activity")}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 start-3 rounded-full bg-night px-3.5 py-1 text-[10px] font-semibold text-gold shadow-sm">
              {s.focus.imageCaption}
            </span>
          </div>
          <h3 className="mt-6 text-lg font-bold text-ink">{s.focus.title}</h3>
          <CheckList points={s.focus.points} className="mt-4 flex-1" />
          <ButtonLink href={requestHref} size="lg" arrow className="mt-7 w-full">
            {s.focus.cta}
          </ButtonLink>
          <p className="mt-3 text-center text-xs text-muted">{s.focus.note}</p>
        </Reveal>
      </div>
    </Stage>
  );
}

const CARD =
  "group flex h-full flex-col rounded-3xl bg-white ring-1 ring-brand-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e6c97c] hover:shadow-[0_24px_50px_-24px_rgba(143,106,29,0.6)] hover:ring-brand-500";
const BODY = "text-sm leading-relaxed text-muted transition-colors group-hover:text-brand-900/85";
const FOOT =
  "mt-6 border-t border-brand-200 pt-4 text-xs font-semibold text-brand-700 transition-colors group-hover:border-brand-900/20 group-hover:text-brand-900";

function GradeCard({ card, index }: { card: LevelCard; index: number }) {
  return (
    <article className={cn(CARD, "p-7")}>
      <div className="flex items-center justify-between gap-3">
        <Kicker>{card.kicker}</Kicker>
        <span aria-hidden className="text-3xl font-bold text-brand-500 transition-colors group-hover:text-brand-900">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-ink">{card.title}</h3>
      <p className={cn("mt-2 flex-1", BODY)}>{card.body}</p>
      {card.tags && <Tags tags={card.tags} className="mt-5" />}
    </article>
  );
}

export async function PrimaryStage() {
  const t = await getT();
  const s = t.deep(primary);
  return (
    <Stage id={s.id} tinted>
      <StageHeader stage={s} headingId={`${s.id}-heading`} />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {s.cards.map((c, i) => (
          <li key={c.title}>
            <Reveal delay={(i % 3) * 0.05} className="h-full">
              <GradeCard card={c} index={i} />
            </Reveal>
          </li>
        ))}
        <li>
          <Reveal delay={0.1} className="h-full">
            <article className="flex h-full flex-col rounded-3xl bg-linear-to-br from-night via-brand-800 to-brand-900 p-7 text-white shadow-[0_30px_60px_-30px_rgba(20,23,29,0.7)]">
              <span className="inline-flex w-fit rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-900">
                {s.featured.badge}
              </span>
              <h3 className="mt-5 text-xl font-bold">{s.featured.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75">{s.featured.body}</p>
              <ButtonLink href={requestHref} size="md" arrow className="mt-7 w-fit">
                {s.featured.cta}
              </ButtonLink>
            </article>
          </Reveal>
        </li>
      </ul>
    </Stage>
  );
}

function DetailCard({ card }: { card: LevelCard }) {
  return (
    <article className={cn(CARD, "p-7")}>
      <Kicker className="w-fit">{card.kicker}</Kicker>
      <h3 className="mt-5 text-lg font-bold text-ink">{card.title}</h3>
      <p className={cn("mt-2", BODY)}>{card.body}</p>
      {card.points && <CheckList points={card.points} className="mt-5 flex-1" />}
      {card.footer && <p className={FOOT}>{card.footer}</p>}
    </article>
  );
}

export async function MiddleStage() {
  const t = await getT();
  const s = t.deep(middle);
  return (
    <Stage id={s.id}>
      <StageHeader stage={s} headingId={`${s.id}-heading`} />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {s.cards.map((c, i) => (
          <li key={c.title}>
            <Reveal delay={i * 0.06} className="h-full">
              <DetailCard card={c} />
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal className="mt-8 flex flex-col gap-4 rounded-3xl bg-brand-100 p-6 ring-1 ring-brand-300 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-lg font-bold text-ink">{s.banner.title}</p>
          <p className="mt-1 text-sm text-muted">{s.banner.body}</p>
        </div>
        <ButtonLink href={requestHref} size="lg" arrow className="shrink-0">
          {s.banner.cta}
        </ButtonLink>
      </Reveal>
    </Stage>
  );
}

export async function HighSchoolStage() {
  const t = await getT();
  const s = t.deep(highSchool);
  return (
    <Stage id={s.id} tinted>
      <StageHeader stage={s} headingId={`${s.id}-heading`} />
      <div className="mt-10 flex flex-col gap-3 rounded-3xl bg-white p-5 ring-1 ring-brand-200 sm:flex-row sm:items-center">
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          {t("Accredited Boards:")}
        </p>
        <Tags tags={s.boards} />
      </div>
      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {s.cards.map((c, i) => (
          <li key={c.title}>
            <Reveal delay={(i % 2) * 0.06} className="h-full">
              <article className={cn(CARD, "p-7 sm:p-8")}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Kicker>{c.kicker}</Kicker>
                  <span className="text-xs font-semibold text-brand-600 transition-colors group-hover:text-brand-900">
                    {c.meta}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">{c.title}</h3>
                <p className={cn("mt-3", BODY)}>{c.body}</p>
                {c.tags && <Tags tags={c.tags} className="mt-5 flex-1 content-start" />}
                <p className={FOOT}>{c.footer}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal className="mt-8 flex flex-col gap-4 rounded-3xl bg-night p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="text-lg font-semibold text-white">{s.banner.title}</p>
        <ButtonLink href={requestHref} size="lg" arrow className="shrink-0">
          {s.banner.cta}
        </ButtonLink>
      </Reveal>
    </Stage>
  );
}

export async function HigherEducationStage() {
  const t = await getT();
  const s = t.deep(higherEducation);
  return (
    <Stage id={s.id}>
      <StageHeader stage={s} headingId={`${s.id}-heading`} />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {s.cards.map((c, i) => (
          <li key={c.title}>
            <Reveal delay={i * 0.06} className="h-full">
              <article className={cn(CARD, "p-7")}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600 transition-colors group-hover:text-brand-900">
                  {c.kicker}
                </p>
                <h3 className="mt-2 text-xl font-bold text-ink">{c.title}</h3>
                <p className={cn("mt-3", BODY)}>{c.body}</p>
                <CheckList points={c.points} className="mt-5 flex-1" />
                <p className={FOOT}>{c.footer}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex justify-center">
        <ButtonLink href={requestHref} size="lg" arrow>
          {s.cta}
        </ButtonLink>
      </div>
    </Stage>
  );
}

export async function MatchingProcess() {
  const t = await getT();
  const m = t.deep(matchingProcess);
  return (
    <section
      aria-labelledby="matching-heading"
      className="bg-brand-50/70 py-10 font-[family-name:var(--font-inter),var(--font-arabic)] lg:py-14"
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Pill>{m.eyebrow}</Pill>
          <h2 id="matching-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
            {m.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{m.description}</p>
        </div>
        <div className="relative mt-14">
          <span
            aria-hidden
            className="absolute inset-x-[16%] top-7 hidden h-px bg-linear-to-r from-transparent via-brand-400 to-transparent md:block"
          />
          <ol className="grid gap-6 md:grid-cols-3">
            {m.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <article className={cn(CARD, "items-center px-7 pb-7 pt-5 text-center")}>
                    <span className="relative z-10 grid size-14 place-items-center rounded-full bg-linear-to-b from-[#ecd28c] to-[#c9a24e] text-lg font-bold text-brand-900 ring-4 ring-brand-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
                    <p className={cn("mt-3 flex-1", BODY)}>{step.body}</p>
                    <p className="mt-6 rounded-full bg-night px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                      {step.link}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export async function UniqueCurriculumCta() {
  const t = await getT();
  const u = t.deep(uniqueCurriculum);
  return (
    <section
      aria-labelledby="unique-heading"
      className="mx-auto max-w-[90rem] px-4 py-10 font-[family-name:var(--font-inter),var(--font-arabic)] sm:px-8 lg:px-10 lg:py-14"
    >
      <Reveal className="relative isolate overflow-hidden rounded-3xl bg-night px-6 py-10 text-center sm:px-12 lg:py-14">
        <Image src={levelsImages.cta} alt="" fill sizes="100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-night/80" />
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand-400 via-gold to-brand-500" />
        <div className="mx-auto max-w-3xl">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            <span aria-hidden className="h-px w-8 shrink-0 bg-gold" />
            {u.eyebrow}
            <span aria-hidden className="h-px w-8 shrink-0 bg-gold" />
          </p>
          <h2 id="unique-heading" className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-[2.5rem]">
            {u.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{u.body}</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
            {u.tracks.map((track) => (
              <li
                key={track}
                className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white ring-1 ring-gold/50 backdrop-blur-sm"
              >
                {track}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={requestHref} size="lg" arrow>
              {u.primaryCta}
            </ButtonLink>
            <ButtonLink
              href={CONTACT_HREF}
              variant="ghost"
              size="lg"
              className="bg-transparent text-white ring-white/40 hover:bg-white/10 hover:ring-gold"
            >
              {u.secondaryCta}
              <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
