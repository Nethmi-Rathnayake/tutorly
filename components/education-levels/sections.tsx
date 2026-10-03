import Image from "next/image";
import {
  ArrowRight,
  Award,
  Baby,
  BookOpen,
  BookOpenCheck,
  Calculator,
  CalendarClock,
  CircleCheck,
  ClipboardList,
  EyeOff,
  FlaskConical,
  Globe,
  GraduationCap,
  Heart,
  Landmark,
  Layers,
  Library,
  Lightbulb,
  PencilLine,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Users,
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
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-brand-100/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

function Tags({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li key={tag} className="rounded-full bg-lavender px-2.5 py-1 text-[11px] font-medium text-brand-800">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function CheckList({ points, className }: { points: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2", className)}>
      {points.map((p) => (
        <li key={p} className="flex gap-2 text-xs leading-relaxed text-ink">
          <CircleCheck aria-hidden className="mt-0.5 size-3.5 shrink-0 text-brand-600" />
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
        "inline-flex rounded-md bg-brand-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-100",
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
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <Pill>{stage.eyebrow}</Pill>
        <h2 id={headingId} className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
          {stage.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{stage.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 lg:justify-end">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink ring-1 ring-brand-100">
          <CalendarClock aria-hidden className="size-3.5 text-brand-600" />
          {stage.ages}
        </span>
        <span className="inline-flex items-center rounded-full bg-brand-100/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-700">
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
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("scroll-mt-24 py-16 lg:py-20", tinted && "bg-lavender/60")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

const stageIcons: Record<string, typeof Baby> = {
  "early-years": Baby,
  primary: PencilLine,
  middle: School,
  "high-school": BookOpenCheck,
  "higher-education": GraduationCap,
};

export async function LevelsHero() {
  const t = await getT();
  const h = t.deep(levelsHero);
  return (
    <section className="relative overflow-x-clip pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[640px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
      />
      <Reveal className="relative mx-auto max-w-4xl px-4 pt-12 text-center sm:px-6 lg:px-8 lg:pt-20">
        <Pill>
          <span aria-hidden className="size-1.5 rounded-full bg-brand-600" />
          {h.eyebrow}
        </Pill>
        <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
          <span className="bg-linear-to-r from-brand-700 to-violet-brand bg-clip-text text-transparent">{h.title.highlight}</span>{" "}
          {h.title.tail} {siteConfig.name}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{h.description}</p>
        <nav aria-label={t("Jump to an education stage")} className="mt-8">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {educationLevels.map((l) => {
              const Icon = stageIcons[l.id] ?? BookOpen;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-ink shadow-[0_8px_20px_-14px_rgba(44,37,115,0.5)] ring-1 ring-brand-100 transition-colors hover:text-brand-700 hover:ring-brand-300"
                  >
                    <Icon aria-hidden className="size-3.5 text-brand-600" />
                    {t(l.name)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Reveal>

      <div className="relative mx-auto mt-14 grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.7fr_1fr] lg:px-8">
        <Reveal className="relative min-h-[340px] overflow-hidden rounded-[2rem] ring-1 ring-brand-100 sm:min-h-[400px]">
          <Image
            src={levelsImages.hero}
            alt={t("A tutor and student working through a lesson on a laptop")}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-night/90 via-night/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div className="max-w-md">
              <span className="inline-flex rounded-full bg-brand-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                {h.imageCard.kicker}
              </span>
              <p className="mt-3 text-xl font-bold leading-snug text-white sm:text-2xl">{h.imageCard.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/75">{h.imageCard.body}</p>
            </div>
            <ButtonLink href={requestHref} variant="ghost" size="sm" arrow className="shrink-0 bg-white text-brand-700 ring-0 hover:bg-white">
              {h.imageCard.cta}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-5">
          <div className="flex-1 rounded-[2rem] bg-white p-6 ring-1 ring-brand-100/80">
            <dl className="space-y-3">
              {h.stats.map((s, i) => {
                const Icon = i === 0 ? UserCheck : EyeOff;
                return (
                  <div key={s.label} className="flex items-center justify-between gap-3 rounded-2xl bg-lavender px-4 py-3">
                    <div className="flex flex-col">
                      <dt className="text-[11px] font-medium text-muted">{s.label}</dt>
                      <dd className="order-first text-2xl font-extrabold tracking-tight text-brand-700">{s.value}</dd>
                    </div>
                    <span className="grid size-9 place-items-center rounded-xl bg-white text-brand-600">
                      <Icon aria-hidden className="size-4" />
                    </span>
                  </div>
                );
              })}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted">{h.note}</p>
          </div>
          <div className="flex gap-3 rounded-[1.5rem] bg-brand-100/60 p-5 ring-1 ring-brand-200/70">
            <Globe aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-700" />
            <div>
              <p className="text-sm font-bold text-ink">{h.frameworks.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{h.frameworks.body}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <ul className="relative mx-auto mt-5 grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {h.highlights.map((item, i) => {
          const Icon = [Layers, Target, Award][i];
          return (
            <li key={item.title}>
              <Reveal delay={i * 0.05} className="flex h-full gap-3 rounded-2xl bg-white p-4 ring-1 ring-brand-100/80">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-lavender text-brand-700">
                  <Icon aria-hidden className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
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
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <ul className="space-y-5">
          {s.cards.map((c, i) => {
            const Icon = i === 0 ? Heart : Sparkles;
            return (
              <li key={c.title}>
                <Reveal delay={i * 0.06}>
                  <article className="rounded-3xl bg-white p-6 ring-1 ring-brand-100/80 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-10 place-items-center rounded-xl bg-lavender text-brand-700">
                        <Icon aria-hidden className="size-4" />
                      </span>
                      <Kicker>{c.kicker}</Kicker>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                    {c.tags && <Tags tags={c.tags} className="mt-5" />}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.1} className="flex flex-col rounded-3xl bg-lavender/80 p-5 ring-1 ring-brand-100">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src={levelsImages.earlyYears}
              alt={t("A young learner being guided through an early learning activity")}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 start-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-ink shadow-sm">
              {s.focus.imageCaption}
            </span>
          </div>
          <h3 className="mt-5 text-base font-bold text-ink">{s.focus.title}</h3>
          <CheckList points={s.focus.points} className="mt-3 flex-1" />
          <ButtonLink href={requestHref} arrow className="mt-6 w-full">
            {s.focus.cta}
          </ButtonLink>
          <p className="mt-3 text-center text-[11px] text-muted">{s.focus.note}</p>
        </Reveal>
      </div>
    </Stage>
  );
}

function GradeCard({ card, index }: { card: LevelCard; index: number }) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
      <div className="flex items-center justify-between gap-3">
        <Kicker>{card.kicker}</Kicker>
        <span aria-hidden className="text-xs font-bold text-brand-300">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-4 text-base font-bold text-ink">{card.title}</h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{card.body}</p>
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
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {s.cards.map((c, i) => (
          <li key={c.title}>
            <Reveal delay={(i % 3) * 0.05} className="h-full">
              <GradeCard card={c} index={i} />
            </Reveal>
          </li>
        ))}
        <li>
          <Reveal delay={0.1} className="h-full">
            <article className="flex h-full flex-col rounded-3xl bg-linear-to-br from-brand-700 to-violet-brand p-6 text-white shadow-[0_30px_60px_-30px_rgba(79,63,217,0.8)]">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ring-1 ring-white/20">
                <Award aria-hidden className="size-3" />
                {s.featured.badge}
              </span>
              <h3 className="mt-4 text-lg font-bold">{s.featured.title}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-white/80">{s.featured.body}</p>
              <ButtonLink href={requestHref} variant="ghost" size="sm" arrow className="mt-6 w-fit bg-white text-brand-700 ring-0 hover:bg-white">
                {s.featured.cta}
              </ButtonLink>
            </article>
          </Reveal>
        </li>
      </ul>
    </Stage>
  );
}

function DetailCard({ card, icon: Icon }: { card: LevelCard; icon: typeof Baby }) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
      <div className="flex items-center justify-between gap-3">
        <Kicker>{card.kicker}</Kicker>
        <Icon aria-hidden className="size-4 text-brand-500" />
      </div>
      <h3 className="mt-4 text-base font-bold text-ink">{card.title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-muted">{card.body}</p>
      {card.points && <CheckList points={card.points} className="mt-5 flex-1" />}
      {card.footer && (
        <p className="mt-6 border-t border-brand-50 pt-4 text-[11px] font-semibold text-muted">{card.footer}</p>
      )}
    </article>
  );
}

export async function MiddleStage() {
  const t = await getT();
  const s = t.deep(middle);
  const icons = [Calculator, Lightbulb, ClipboardList];
  return (
    <Stage id={s.id}>
      <StageHeader stage={s} headingId={`${s.id}-heading`} />
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {s.cards.map((c, i) => (
          <li key={c.title}>
            <Reveal delay={i * 0.06} className="h-full">
              <DetailCard card={c} icon={icons[i]} />
            </Reveal>
          </li>
        ))}
      </ul>
      <Reveal className="mt-6 flex flex-col gap-4 rounded-3xl bg-brand-100/60 p-5 ring-1 ring-brand-200/70 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand-700">
            <ShieldCheck aria-hidden className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">{s.banner.title}</p>
            <p className="mt-0.5 text-xs text-muted">{s.banner.body}</p>
          </div>
        </div>
        <ButtonLink href={requestHref} size="sm" arrow className="shrink-0">
          {s.banner.cta}
        </ButtonLink>
      </Reveal>
    </Stage>
  );
}

export async function HighSchoolStage() {
  const t = await getT();
  const s = t.deep(highSchool);
  const icons = [BookOpen, Target, FlaskConical, Landmark];
  return (
    <Stage id={s.id} tinted>
      <StageHeader stage={s} headingId={`${s.id}-heading`} />
      <div className="mt-8 flex flex-wrap items-center gap-2 rounded-2xl bg-white p-3 ring-1 ring-brand-100/80">
        <p className="px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{t("Accredited Boards:")}</p>
        <Tags tags={s.boards} />
      </div>
      <ul className="mt-6 grid gap-5 md:grid-cols-2">
        {s.cards.map((c, i) => {
          const Icon = icons[i];
          return (
            <li key={c.title}>
              <Reveal delay={(i % 2) * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <Kicker>{c.kicker}</Kicker>
                    <span className="text-[11px] font-medium text-muted">{c.meta}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{c.body}</p>
                  {c.tags && <Tags tags={c.tags} className="mt-5 flex-1 content-start" />}
                  <p className="mt-6 flex items-center justify-between gap-3 border-t border-brand-50 pt-4 text-[11px] font-semibold text-muted">
                    {c.footer}
                    <Icon aria-hidden className="size-4 shrink-0 text-brand-500" />
                  </p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
      <Reveal className="mt-6 flex flex-col gap-4 rounded-3xl bg-white p-5 ring-1 ring-brand-100/80 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-sm font-semibold text-ink">{s.banner.title}</p>
        <ButtonLink href={requestHref} size="sm" arrow className="shrink-0">
          {s.banner.cta}
        </ButtonLink>
      </Reveal>
    </Stage>
  );
}

export async function HigherEducationStage() {
  const t = await getT();
  const s = t.deep(higherEducation);
  const icons = [Library, GraduationCap, Users];
  return (
    <Stage id={s.id}>
      <StageHeader stage={s} headingId={`${s.id}-heading`} />
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {s.cards.map((c, i) => {
          const Icon = icons[i];
          return (
            <li key={c.title}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
                  <span className="grid size-11 place-items-center rounded-xl bg-lavender text-brand-700">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{c.kicker}</p>
                  <h3 className="mt-1 text-base font-bold text-ink">{c.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{c.body}</p>
                  <CheckList points={c.points} className="mt-5 flex-1" />
                  <p className="mt-6 border-t border-brand-50 pt-4 text-[11px] font-semibold text-brand-700">{c.footer}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
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
  const icons = [ClipboardList, UserCheck, Sparkles];
  return (
    <section aria-labelledby="matching-heading" className="bg-lavender/60 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Pill>{m.eyebrow}</Pill>
          <h2 id="matching-heading" className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
            {m.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{m.description}</p>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {m.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li key={step.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <article className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-brand-100/80">
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-100 text-sm font-bold text-brand-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-base font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{step.body}</p>
                    <p className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">
                      <Icon aria-hidden className="size-3.5" />
                      {step.link}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export async function UniqueCurriculumCta() {
  const t = await getT();
  const u = t.deep(uniqueCurriculum);
  return (
    <section aria-labelledby="unique-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-night via-brand-900 to-night px-6 py-14 shadow-[0_40px_80px_-40px_rgba(28,26,51,0.9)] sm:px-12">
        <div aria-hidden className="pointer-events-none absolute -end-24 -top-24 size-96 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-white/15">
            {u.eyebrow}
          </span>
          <h2 id="unique-heading" className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {u.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">{u.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {u.tracks.map((track) => (
              <li key={track} className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white ring-1 ring-white/15">
                {track}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={requestHref} variant="violet" size="lg" arrow>
              {u.primaryCta}
            </ButtonLink>
            <ButtonLink
              href={CONTACT_HREF}
              size="lg"
              className="bg-white/10 bg-none text-white shadow-none ring-1 ring-white/20 hover:bg-white/20"
            >
              {u.secondaryCta}
              <ArrowRight aria-hidden className="rtl:-scale-x-100 size-4" />
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
