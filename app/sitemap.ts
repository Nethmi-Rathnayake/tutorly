import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/constants/blog-posts";
import { defaultLocale, locales } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo";

type Entry = { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly"; lastModified?: string };

// Indexable pages only: no success pages, and the redirect-only /tutors, /find-a-tutor.
const pages: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/request-a-tutor", priority: 0.9, changeFrequency: "monthly" },
  { path: "/sen-tutors-dubai", priority: 0.9, changeFrequency: "monthly" },
  { path: "/subjects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/education-levels", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tutor-request", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/become-a-tutor", priority: 0.6, changeFrequency: "monthly" },
  { path: "/tutor-registration", priority: 0.4, changeFrequency: "yearly" },
  ...blogPosts.map((post): Entry => ({
    path: `/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: post.updatedAt ?? post.publishedAt,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, changeFrequency, lastModified }) =>
    locales.map((locale) => ({
      url: absoluteUrl(path, locale),
      lastModified,
      changeFrequency,
      // Every URL lists all of its language versions (hreflang), including itself.
      priority: locale === defaultLocale ? priority : Math.max(priority - 0.1, 0.1),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(path, l)])),
      },
    })),
  );
}
