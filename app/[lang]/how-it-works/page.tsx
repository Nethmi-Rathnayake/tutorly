import type { Metadata } from "next";
import {
  ConciergeNexus,
  DirectoryContrast,
  DualJourneys,
  HowItWorksCta,
  HowItWorksHero,
} from "@/components/how-it-works/sections";
import { getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/how-it-works", t.locale, {
    title: t("How Private Tutor Matching Works in Dubai"),
    description: t(
      "How requesting a tutor works with Tuteme: a private request form, no public directory, and our team getting in touch about the next steps.",
    ),
  });
}

export default function HowItWorksPage() {
  return (
    <div className="space-y-12 pb-16 lg:space-y-16">
      <HowItWorksHero />
      <ConciergeNexus />
      <DualJourneys />
      <DirectoryContrast />
      <HowItWorksCta />
    </div>
  );
}
