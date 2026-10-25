import type { Metadata } from "next";
import { BlogBrowser } from "@/components/blog/blog-browser";
import { AdviceCta, BlogHero, getBrowserProps, NewsletterBand } from "@/components/blog/sections";
import { isNewsletterConfigured } from "@/lib/services/newsletter";
import { getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/blog", t.locale, {
    title: t("Tutoring & Education Guides for UAE Parents"),
    description: t(
      "Practical guidance and curriculum analysis to help UAE parents make informed tutoring decisions across British, IB and American pathways.",
    ),
  });
}

export default async function BlogPage() {
  const browser = await getBrowserProps();
  return (
    <div className="pb-16">
      <section className="relative overflow-x-clip pt-8 lg:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-[640px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <BlogHero />
        <BlogBrowser {...browser} />
      </section>

      <div className="mt-6 space-y-12 lg:space-y-14">
        {isNewsletterConfigured() && <NewsletterBand />}
        <AdviceCta />
      </div>
    </div>
  );
}
