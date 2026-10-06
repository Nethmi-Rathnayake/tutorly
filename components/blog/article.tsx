import Image from "next/image";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clock,
  Globe,
  GraduationCap,
  Info,
  Landmark,
  ListOrdered,
  Lock,
  Quote,
  ShieldCheck,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { ArticleToc } from "@/components/blog/article-toc";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ButtonLink } from "@/components/ui/button-link";
import { Link } from "@/components/ui/link";
import { Reveal } from "@/components/ui/reveal";
import { articlePage } from "@/lib/constants/blog";
import { blogPosts, type ArticleBlock, type BlogPost } from "@/lib/constants/blog-posts";
import { requestHref } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";
import { formatDate } from "@/lib/utils/format-date";
import { AuthorAvatar, PostCard } from "./sections";

const curriculumIcons: Record<string, LucideIcon> = { british: Landmark, ib: Globe, american: GraduationCap };

const pill =
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]";
const card = "rounded-3xl bg-white ring-1 ring-brand-100/80";

export async function ArticleHeader({ post }: { post: BlogPost }) {
  const t = await getT();
  const p = t.deep(post);
  const a = t.deep(articlePage);
  return (
    <header>
      <nav aria-label={a.breadcrumb}>
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          {[
            { href: "/", label: t("Home") },
            { href: "/blog", label: t("Blog") },
          ].map((crumb) => (
            <li key={crumb.href} className="inline-flex items-center gap-1.5">
              <Link href={crumb.href} className="hover:text-brand-700">
                {crumb.label}
              </Link>
              <ChevronRight aria-hidden className="size-3 rtl:-scale-x-100" />
            </li>
          ))}
          <li aria-current="page" className="line-clamp-1 max-w-[16rem] font-medium text-ink sm:max-w-md">
            {p.title}
          </li>
        </ol>
      </nav>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className={`${pill} bg-brand-100/70 text-brand-700`}>
          {p.kicker} <span aria-hidden>•</span> {t("{n} min read", { n: post.readMinutes })}
        </span>
        {p.badges?.map((b) => (
          <span key={b} className={`${pill} bg-brand-100 text-violet-brand`}>
            <ShieldCheck aria-hidden className="size-3" />
            {b}
          </span>
        ))}
      </div>

      <h1 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-[2.6rem]">{p.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">{p.excerpt}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-brand-100 py-4">
        <div className="flex items-center gap-3">
          <AuthorAvatar initials={post.author.initials} size="md" />
          <div>
            <p className="text-sm font-bold text-ink">{p.author.name}</p>
            <p className="text-[11px] text-muted">
              {p.author.role} <span aria-hidden>•</span>{" "}
              <time dateTime={post.updatedAt ?? post.publishedAt}>
                {post.updatedAt
                  ? t(articlePage.updated, { date: formatDate(post.updatedAt, t.locale) })
                  : t(articlePage.published, { date: formatDate(post.publishedAt, t.locale) })}
              </time>
            </p>
          </div>
        </div>
        <ShareButtons title={p.title} labels={a.share} />
      </div>
    </header>
  );
}

export async function ArticleHeroImage({ post }: { post: BlogPost }) {
  const t = await getT();
  const p = t.deep(post);
  return (
    <div className="relative mt-8 pb-8 sm:pb-0">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] ring-1 ring-brand-100">
        <Image src={p.image.src} alt={p.image.alt} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
      </div>
      {p.heroStats && (
        <dl className="absolute bottom-0 end-4 flex gap-5 rounded-2xl bg-white/95 px-5 py-3.5 shadow-[0_20px_40px_-20px_rgba(20,23,29,0.5)] ring-1 ring-brand-100 backdrop-blur sm:bottom-5 sm:end-5">
          {p.heroStats.map((s, i) => (
            <div key={s.label} className={i ? "flex flex-col border-s border-brand-100 ps-5" : "flex flex-col"}>
              <dt className="order-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{s.label}</dt>
              <dd className="order-1 text-2xl font-extrabold tracking-tight text-brand-700">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

/** Contents disclosure shown above the article on small screens (the sidebar carries it on desktop). */
export async function MobileToc({ post }: { post: BlogPost }) {
  const t = await getT();
  return (
    <details className={`${card} group mt-8 p-4 lg:hidden`}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-ink [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          <ListOrdered aria-hidden className="size-4 text-brand-600" />
          {t(articlePage.toc.title)}
        </span>
        <ChevronRight aria-hidden className="size-4 text-muted transition-transform group-open:rotate-90 rtl:-scale-x-100 rtl:group-open:-rotate-90" />
      </summary>
      <ol className="mt-3 space-y-1">
        {post.sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="flex gap-3 rounded-xl px-3 py-2 text-xs text-muted hover:bg-lavender hover:text-ink">
              <span className="font-bold text-brand-300">{String(i + 1).padStart(2, "0")}</span>
              {t(s.title)}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-[15px] leading-[1.8] text-ink/80">{block.text}</p>;

    case "quote":
      return (
        <blockquote className="relative overflow-hidden rounded-3xl border-s-4 border-brand-500 bg-lavender px-6 py-6 sm:px-8">
          <Quote aria-hidden className="absolute -bottom-3 end-4 size-20 text-brand-200/70 rtl:-scale-x-100" />
          <p className="relative text-lg font-semibold italic leading-relaxed text-brand-900">“{block.text}”</p>
        </blockquote>
      );

    case "note":
      return (
        <aside className="flex gap-3 rounded-2xl bg-brand-50/80 p-5 ring-1 ring-brand-100">
          <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
          <div>
            <p className="text-sm font-bold text-ink">{block.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{block.body}</p>
          </div>
        </aside>
      );

    case "curricula":
      return (
        <ul className="grid gap-4 md:grid-cols-3">
          {block.cards.map((c) => {
            const Icon = curriculumIcons[c.icon];
            return (
              <li key={c.title} className={`${card} flex flex-col p-5`}>
                <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon aria-hidden className="size-5" />
                </span>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{c.tag}</p>
                <h3 className="mt-1 text-base font-bold text-ink">{c.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{c.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {c.chips.map((chip) => (
                    <li key={chip} className="rounded-full bg-lavender px-2.5 py-1 text-[10px] font-medium text-ink">
                      {chip}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      );

    case "compare":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-rose-50/60 p-5 ring-1 ring-rose-100">
            <h3 className="flex items-center gap-2 text-sm font-bold text-rose-700">
              <CircleX aria-hidden className="size-4" />
              {block.risk.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {block.risk.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-xs leading-relaxed text-ink/75">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-[0_24px_50px_-36px_rgba(20,23,29,0.7)] ring-2 ring-brand-200">
            <h3 className="flex items-center gap-2 text-sm font-bold text-brand-700">
              <CircleCheck aria-hidden className="size-4" />
              {block.ours.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {block.ours.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-xs leading-relaxed text-ink/80">
                  <CircleCheck aria-hidden className="mt-0.5 size-3.5 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "images":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {block.images.map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-brand-100">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      );

    case "steps":
      return (
        <ol className="grid gap-4 md:grid-cols-3">
          {block.steps.map((s, i) => (
            <li key={s.title} className={`${card} p-5`}>
              <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-brand-700 to-violet-brand text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-sm font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      );
  }
}

export async function ArticleBody({ post }: { post: BlogPost }) {
  const t = await getT();
  const p = t.deep(post);
  return (
    <div className="mt-12 space-y-14">
      {p.sections.map((section, i) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28">
          <h2 id={`${section.id}-heading`} className="flex items-center gap-3 text-2xl font-bold tracking-tight text-ink">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">
              {String(i + 1).padStart(2, "0")}
            </span>
            {section.title}
          </h2>
          <div className="mt-5 space-y-6">
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export async function ArticleSidebar({ post }: { post: BlogPost }) {
  const t = await getT();
  const a = t.deep(articlePage);
  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      <div className={`${card} hidden p-4 lg:block`}>
        <div className="flex items-center justify-between px-3 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{a.toc.title}</p>
          <p className="text-[10px] text-muted">{t(articlePage.toc.count, { n: post.sections.length })}</p>
        </div>
        <ArticleToc label={a.toc.title} items={post.sections.map((s) => ({ id: s.id, title: t(s.title) }))} />
      </div>

      <div className={`${card} p-5`}>
        <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-brand-700 to-violet-brand text-white">
          <BookOpen aria-hidden className="size-5" />
        </span>
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{a.placement.eyebrow}</p>
        <h2 className="mt-1 text-base font-bold leading-snug text-ink">{a.placement.title}</h2>
        <p className="mt-2 text-xs leading-relaxed text-muted">{a.placement.body}</p>
        <ButtonLink href={requestHref} size="sm" className="mt-5 w-full">
          {a.placement.primary}
        </ButtonLink>
        <ul className="mt-4 flex flex-wrap justify-between gap-2 text-[10px] text-muted">
          <li className="inline-flex items-center gap-1">
            <Clock aria-hidden className="size-3" />
            {a.placement.response}
          </li>
          <li className="inline-flex items-center gap-1">
            <Lock aria-hidden className="size-3" />
            {a.placement.confidential}
          </li>
        </ul>
      </div>

      <div className="rounded-3xl bg-lavender/70 p-5 ring-1 ring-brand-100/80">
        <p className="flex items-center gap-2 text-sm font-bold text-ink">
          <ShieldCheck aria-hidden className="size-4 text-brand-600" />
          {a.compliance.title}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted">{a.compliance.body}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {a.compliance.chips.map((chip) => (
            <li key={chip} className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-brand-700 ring-1 ring-brand-100">
              {chip}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export async function ArticleCta() {
  const t = await getT();
  const c = t.deep(articlePage.cta);
  return (
    <Reveal className="relative mt-16 overflow-hidden rounded-[2rem] bg-linear-to-br from-brand-800 via-brand-700 to-brand-900 p-7 text-white shadow-[0_40px_80px_-40px_rgba(20,23,29,0.8)] sm:p-10">
      <div aria-hidden className="pointer-events-none absolute -end-16 -top-20 size-64 rounded-full bg-white/10 blur-2xl" />
      <span className={`${pill} relative bg-white/15 text-white ring-1 ring-white/25`}>{c.eyebrow}</span>
      <h2 className="relative mt-4 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{c.title}</h2>
      <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-white/85">{c.body}</p>
      <div className="relative mt-7 flex flex-wrap gap-3">
        <Link
          href={requestHref}
          className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-semibold text-brand-700 transition hover:-translate-y-0.5 hover:bg-brand-50"
        >
          {c.primary}
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold text-white ring-1 ring-white/50 transition hover:-translate-y-0.5 hover:bg-white/10"
        >
          {c.secondary}
        </Link>
      </div>
    </Reveal>
  );
}

export async function ArticleFooter({ post }: { post: BlogPost }) {
  const t = await getT();
  const tags = post.tags.map((tag) => t(tag));
  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-brand-100 pt-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
          <Tag aria-hidden className="size-3.5" />
          {t(articlePage.tags)}
        </span>
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full bg-white px-3 py-1 text-[11px] text-ink ring-1 ring-brand-100">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
        <ArrowLeft aria-hidden className="size-4 rtl:-scale-x-100" />
        {t(articlePage.back)}
      </Link>
    </div>
  );
}

export async function MoreInsights({ post }: { post: BlogPost }) {
  const t = await getT();
  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <section aria-labelledby="more-insights-heading" className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-10">
      <h2 id="more-insights-heading" className="text-2xl font-bold tracking-tight text-ink">
        {t(articlePage.more)}
      </h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((p) => (
          <li key={p.slug} className="flex">
            <PostCard post={p} t={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}
