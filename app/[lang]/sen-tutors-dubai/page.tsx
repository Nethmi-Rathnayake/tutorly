import type { Metadata } from "next";
import {
  SenBenefits,
  SenCurricula,
  SenFaq,
  SenFinalCta,
  SenHero,
  SenIntro,
  SenParentGuide,
  SenProcess,
  SenRequestCta,
  SenStages,
  SenSupportAreas,
} from "@/components/sen-tutors/sections";
import { senFaq, senMeta } from "@/lib/constants/sen-tutors";
import { getT } from "@/lib/i18n/server";
import type { Translator } from "@/lib/i18n/translate";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  // The root layout's title template appends "| Tutorly".
  const title = t(senMeta.title);
  const description = t(senMeta.description);
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

// FAQPage structured data (see node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
const jsonLd = (t: Translator) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: senFaq.items.map((f) => ({
    "@type": "Question",
    name: t(f.question),
    acceptedAnswer: { "@type": "Answer", text: t(f.answer) },
  })),
});

export default async function SenTutorsDubaiPage() {
  const t = await getT();
  return (
    <div className="space-y-14 pb-16 lg:space-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(t)).replace(/</g, "\\u003c") }}
      />
      <SenHero />
      <SenIntro />
      <SenBenefits />
      <SenSupportAreas />
      <SenStages />
      <SenCurricula />
      <SenParentGuide />
      <SenProcess />
      <SenRequestCta />
      <SenFaq />
      <SenFinalCta />
    </div>
  );
}
