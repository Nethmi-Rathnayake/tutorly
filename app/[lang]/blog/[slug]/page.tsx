import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArticleBody,
  ArticleCta,
  ArticleFooter,
  ArticleHeader,
  ArticleHeroImage,
  ArticleSidebar,
  MobileToc,
  MoreInsights,
} from "@/components/blog/article";
import { blogPosts, getPostBySlug, type BlogPost } from "@/lib/constants/blog-posts";
import { siteConfig } from "@/lib/constants/site";
import { getT } from "@/lib/i18n/server";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};
  const t = await getT();
  return {
    title: t(post.title),
    description: t(post.excerpt),
    openGraph: { type: "article", publishedTime: post.publishedAt, images: [post.image.src] },
  };
}

// BlogPosting structured data (see node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
const jsonLd = (post: BlogPost, t: Awaited<ReturnType<typeof getT>>) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: t(post.title),
  description: t(post.excerpt),
  image: post.image.src,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt ?? post.publishedAt,
  inLanguage: t.locale,
  author: { "@type": "Person", name: t(post.author.name) },
  publisher: { "@type": "Organization", name: siteConfig.name },
  keywords: post.tags.map((tag) => t(tag)).join(", "),
});

export default async function ArticlePage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  const t = await getT();
  return (
    <div className="space-y-20 pb-24 pt-8 lg:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(post, t)).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 lg:px-8">
        <article className="min-w-0">
          <ArticleHeader post={post} />
          <ArticleHeroImage post={post} />
          <MobileToc post={post} />
          <ArticleBody post={post} />
          <ArticleCta />
          <ArticleFooter post={post} />
        </article>
        <div className="lg:pt-10">
          <ArticleSidebar post={post} />
        </div>
      </div>
      <MoreInsights post={post} />
    </div>
  );
}
