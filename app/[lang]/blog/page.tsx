import type { Metadata } from "next";
import { BlogBrowser } from "@/components/blog/blog-browser";
import { AdviceCta, BlogHero, EditorialSlots, getBrowserProps, NewsletterBand, Trajectory } from "@/components/blog/sections";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("Blog"),
    description: t(
      "Practical guidance, curriculum analysis and regional benchmarks to help UAE parents make informed tutoring and education decisions across British, IB and American pathways.",
    ),
  };
}

export default async function BlogPage() {
  const browser = await getBrowserProps();
  return (
    <div className="pb-24">
      <section className="relative overflow-x-clip pt-12 lg:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-[640px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        />
        <BlogHero />
        <BlogBrowser {...browser} />
      </section>

      <div className="mt-8 space-y-20 lg:space-y-24">
        <EditorialSlots />
        <Trajectory />
        <NewsletterBand />
        <AdviceCta />
      </div>
    </div>
  );
}
