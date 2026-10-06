import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CalendarClock,
  Clock,
  Headset,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { NewsletterForm } from "@/components/blog/newsletter-form";
import { ButtonLink } from "@/components/ui/button-link";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/ui/reveal";
import { adviceCta, blogHero, editorialSlots, featuredCard, latestArticles, newsletter, trajectory } from "@/lib/constants/blog";
import { blogCategories, blogPosts, featuredPost, type BlogPost } from "@/lib/constants/blog-posts";
import { requestHref } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";
import { formatDate } from "@/lib/utils/format-date";
import type { BrowserItem } from "./blog-browser";

type ServerT = Awaited<ReturnType<typeof getT>>;

export const postHref = (post: BlogPost) => `/blog/${post.slug}`;

const pill =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]";

export function AuthorAvatar({ initials, size = "sm" }: { initials: string; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden
      className={
        size === "md"
          ? "grid size-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-700 to-violet-brand text-xs font-bold text-white"
          : "grid size-7 shrink-0 place-items-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700"
      }
    >
      {initials}
    </span>
  );
}

export async function BlogHero() {
  const t = await getT();
  const h = t.deep(blogHero);
  return (
    <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 font-[family-name:var(--font-inter),var(--font-arabic)]">
      <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
            {h.eyebrow}
            <span aria-hidden className="h-px w-8 shrink-0 bg-brand-500" />
          </p>
      <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
        {h.titleLead}{" "}
        <span className="block pb-1 text-brand-600">
          {h.titleAccent}
        </span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">{h.description}</p>
    </div>
  );
}

/** Card in the article grid (also used for "More Insights" under an article). */
export function PostCard({ post, t }: { post: BlogPost; t: ServerT }) {
  const p = t.deep(post);
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-brand-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(20,23,29,0.6)] hover:ring-brand-200">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={p.image.src}
          alt={p.image.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`${pill} absolute start-3 top-3 bg-white/95 text-brand-700 shadow-sm`}>{p.kicker}</span>
        <span className="absolute bottom-3 end-3 rounded-full bg-night/75 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
          {t("{n} min read", { n: post.readMinutes })}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] text-muted">
          {p.levels} <span aria-hidden>•</span> {p.series}
        </p>
        <h3 className="mt-2 text-base font-bold leading-snug text-ink">
          <Link href={postHref(post)} className="after:absolute after:inset-0 focus-visible:outline-none">
            {p.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted">{p.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-brand-100/70 pt-4">
          <span className="flex min-w-0 items-center gap-2">
            <AuthorAvatar initials={post.author.initials} />
            <span className="truncate text-xs font-medium text-ink">{p.author.name}</span>
          </span>
          <span aria-hidden className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-700">
            {t(latestArticles.read)}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>
      </div>
      {/* Keyboard focus ring for the stretched link. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-brand-500 group-has-[:focus-visible]:ring-2" />
    </article>
  );
}

function FeaturedCard({ t }: { t: ServerT }) {
  const post = featuredPost;
  const p = t.deep(post);
  const f = t.deep(featuredCard);
  return (
    <Reveal>
      <article className="grid items-center gap-8 rounded-[2rem] bg-white p-4 shadow-[0_40px_80px_-50px_rgba(20,23,29,0.45)] ring-1 ring-brand-100/80 sm:p-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:p-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src={p.image.src}
            alt={p.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover"
          />
          <div className="absolute start-3 top-3 flex flex-wrap gap-2">
            <span className={`${pill} bg-white/95 text-brand-700 shadow-sm`}>
              {f.label} <span aria-hidden>•</span> {t("{n} min read", { n: post.readMinutes })}
            </span>
            <span className={`${pill} bg-brand-100/95 text-violet-brand shadow-sm`}>{f.focus}</span>
          </div>
          <div className="absolute bottom-3 end-3 flex items-center gap-2.5 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-lg ring-1 ring-brand-100 backdrop-blur">
            <span className="grid size-8 place-items-center rounded-lg bg-brand-100 text-brand-700">
              <BadgeCheck aria-hidden className="size-4" />
            </span>
            <span>
              <span className="block text-xs font-bold text-ink">{f.verified.title}</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{f.verified.note}</span>
            </span>
          </div>
        </div>

        <div className="px-1 pb-2 lg:px-0">
          <p className="flex flex-wrap items-center gap-3 text-[11px] text-muted">
            <span className={`${pill} bg-brand-50 text-brand-700`}>{p.kicker}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays aria-hidden className="size-3.5" />
              {t("Published {date}", { date: formatDate(post.publishedAt, t.locale) })}
            </span>
          </p>
          <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-[2rem]">
            <Link href={postHref(post)} className="transition-colors hover:text-brand-700">
              {p.title}
            </Link>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{p.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-lavender/70 px-4 py-3">
            <span className="flex items-center gap-3">
              <AuthorAvatar initials={post.author.initials} size="md" />
              <span>
                <span className="block text-xs font-bold text-ink">{p.author.name}</span>
                <span className="block text-[11px] text-muted">{f.authorRole}</span>
              </span>
            </span>
            {post.updatedAt && (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
                <Clock aria-hidden className="size-3.5" />
                {t("Updated {date}", { date: formatDate(post.updatedAt, t.locale) })}
              </span>
            )}
          </div>
          <ButtonLink href={postHref(post)} arrow className="mt-6">
            {f.cta}
          </ButtonLink>
        </div>
      </article>
    </Reveal>
  );
}

/** Data for the client-side browser: server-rendered cards plus their search text in both languages. */
export async function getBrowserProps() {
  const t = await getT();
  const items: BrowserItem[] = blogPosts.map((post) => {
    const fields = [post.title, post.excerpt, post.kicker, post.levels, post.series, post.author.name, ...post.tags];
    const category = blogCategories.find((c) => c.id === post.category)?.label ?? "";
    return {
      slug: post.slug,
      category: post.category,
      search: [...fields, category, ...fields.map((s) => t(s)), t(category)].join(" ").toLowerCase(),
      card: <PostCard post={post} t={t} />,
    };
  });
  return {
    items,
    categories: blogCategories.map((c) => ({ id: c.id, label: t(c.label) })),
    featured: { slug: featuredPost.slug, card: <FeaturedCard t={t} /> },
  };
}

export async function EditorialSlots() {
  const t = await getT();
  const e = t.deep(editorialSlots);
  return (
    <Reveal className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-brand-100/80 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <CalendarClock aria-hidden className="size-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">{e.title}</p>
            <p className="mt-0.5 text-xs text-muted">{e.body}</p>
          </div>
        </div>
        <span className={`${pill} shrink-0 self-start bg-brand-50 text-brand-700 sm:self-auto`}>{e.badge}</span>
      </div>
    </Reveal>
  );
}

// Chart geometry (viewBox units). Scores run 0–100 from the bottom of the plot area.
const W = 560;
const H = 220;
const PAD_X = 24;
const BOTTOM = 200;
const toX = (i: number, count: number) => PAD_X + (i * (W - PAD_X * 2)) / (count - 1);
const toY = (v: number) => BOTTOM - v * 1.8;
const linePath = (values: number[]) =>
  values.map((v, i) => `${i ? "L" : "M"}${toX(i, values.length).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");

export async function Trajectory() {
  const t = await getT();
  const tr = t.deep(trajectory);
  const { points } = trajectory.chart;
  const tutored = points.map((p) => p.tutored);
  const baseline = points.map((p) => p.baseline);
  const last = points.length - 1;
  const endX = toX(last, points.length);
  const endY = toY(tutored[last]);
  return (
    <section aria-labelledby="trajectory-heading" className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10">
      <Reveal className="grid items-center gap-10 rounded-[2rem] bg-white p-6 ring-1 ring-brand-100/80 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <span className={`${pill} bg-brand-100/70 text-brand-700`}>
            <TrendingUp aria-hidden className="size-3.5" />
            {tr.eyebrow}
          </span>
          <h2 id="trajectory-heading" className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {tr.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{tr.body}</p>
          <dl className="mt-7 grid grid-cols-2 gap-3">
            {tr.stats.map((s) => (
              <div key={s.label} className="flex flex-col rounded-2xl bg-lavender/70 p-4">
                <dt className="order-2 mt-1 text-xs font-semibold text-ink">{s.label}</dt>
                <dd className="order-1 text-3xl font-extrabold tracking-tight text-brand-700">{s.value}</dd>
                <dd className="order-3 mt-0.5 text-[11px] text-muted">{s.note}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="rounded-3xl bg-lavender/50 p-5 ring-1 ring-brand-100/80">
          <figcaption className="flex flex-wrap items-start justify-between gap-2">
            <span>
              <span className="block text-sm font-bold text-ink">{tr.chart.title}</span>
              <span className="block text-[11px] text-muted">{tr.chart.subtitle}</span>
            </span>
            <span className={`${pill} bg-white text-brand-700`}>{tr.chart.badge}</span>
          </figcaption>

          {/* Time runs left to right in both languages. */}
          <div dir="ltr" className="relative mt-5 aspect-[56/22]">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={tr.chart.description} className="absolute inset-0 size-full overflow-visible">
              <defs>
                <linearGradient id="trajectory-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 25, 50, 75, 100].map((v) => (
                <line key={v} x1={PAD_X} x2={W - PAD_X} y1={toY(v)} y2={toY(v)} stroke="var(--color-brand-200)" strokeDasharray="3 5" />
              ))}
              <path
                d={`${linePath(tutored)} L${endX} ${BOTTOM} L${PAD_X} ${BOTTOM} Z`}
                fill="url(#trajectory-fill)"
              />
              <path d={linePath(baseline)} fill="none" stroke="var(--color-muted)" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="6 6" />
              <path d={linePath(tutored)} fill="none" stroke="var(--color-brand-600)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {tutored.map((v, i) => (
                <circle key={i} cx={toX(i, points.length)} cy={toY(v)} r={i === last ? 7 : 5} fill="white" stroke="var(--color-brand-600)" strokeWidth="3" />
              ))}
            </svg>
            <span
              className="absolute -translate-x-full -translate-y-[160%] whitespace-nowrap rounded-lg bg-night px-2.5 py-1 text-[11px] font-bold text-white shadow-md"
              style={{ left: `${(endX / W) * 100}%`, top: `${(endY / H) * 100}%` }}
            >
              {tr.chart.endLabel}
            </span>
          </div>
          <ol dir="ltr" className="mt-3 grid grid-cols-4 gap-2 text-[10px] leading-snug text-muted">
            {tr.chart.points.map((p, i) => (
              <li key={i} dir="auto" className={i === last ? "text-right" : i === 0 ? "text-left" : "text-center"}>
                {p.label}
              </li>
            ))}
          </ol>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-muted">
            <li className="inline-flex items-center gap-2">
              <span aria-hidden className="h-0.5 w-5 rounded-full bg-brand-600" />
              {tr.chart.series.tutored}
            </li>
            <li className="inline-flex items-center gap-2">
              <span aria-hidden className="w-5 border-t-2 border-dashed border-muted/50" />
              {tr.chart.series.baseline}
            </li>
          </ul>
        </figure>
      </Reveal>
    </section>
  );
}

export async function NewsletterBand() {
  const t = await getT();
  const n = t.deep(newsletter);
  return (
    <section aria-labelledby="newsletter-heading" className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-brand-800 via-brand-700 to-brand-900 p-6 text-white shadow-[0_40px_80px_-40px_rgba(20,23,29,0.8)] sm:p-10">
        <div aria-hidden className="pointer-events-none absolute -end-20 -top-24 size-72 rounded-full bg-white/10 blur-2xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <span className={`${pill} bg-white/15 text-white ring-1 ring-white/25`}>{n.eyebrow}</span>
            <h2 id="newsletter-heading" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {n.title}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85">{n.body}</p>
          </div>
          <NewsletterForm />
        </div>
      </Reveal>
    </section>
  );
}

export async function AdviceCta() {
  const t = await getT();
  const c = t.deep(adviceCta);
  return (
    <section aria-labelledby="advice-heading" className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-10">
      <Reveal className="rounded-[2rem] bg-white px-6 py-12 text-center ring-1 ring-brand-100/80 sm:px-10">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
          <Headset aria-hidden className="size-6" />
        </span>
        <h2 id="advice-heading" className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {c.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{c.body}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink href={requestHref} size="lg" arrow>
            {c.primary}
          </ButtonLink>
          <ButtonLink href="/contact" variant="soft" size="lg">
            {c.secondary}
          </ButtonLink>
        </div>
        <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted">
          <li className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden className="size-3.5 text-brand-600" />
            {c.locations}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <BadgeCheck aria-hidden className="size-3.5 text-brand-600" />
            {c.consultation}
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
