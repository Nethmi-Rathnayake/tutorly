import type { Metadata } from "next";
import {
  AutismBenefits,
  AutismCurricula,
  AutismFaq,
  AutismFinalCta,
  AutismHero,
  AutismIntro,
  AutismParentGuide,
  AutismProcess,
  AutismRequestCta,
  AutismStages,
  AutismSupportAreas,
} from "@/components/autism-tutors/sections";
import { autismFaq, autismMeta } from "@/lib/constants/autism-tutors";
import { getT } from "@/lib/i18n/server";
import type { Translator } from "@/lib/i18n/translate";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  // The root layout's title template appends "| Tutorly".
  const title = t(autismMeta.title);
  const description = t(autismMeta.description);
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
  mainEntity: autismFaq.items.map((f) => ({
    "@type": "Question",
    name: t(f.question),
    acceptedAnswer: { "@type": "Answer", text: t(f.answer) },
  })),
});

export default async function AutismTutorsDubaiPage() {
  const t = await getT();
  return (
    <div className="space-y-14 pb-16 lg:space-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(t)).replace(/</g, "\\u003c") }}
      />
      <AutismHero />
      <AutismIntro />
      <AutismBenefits />
      <AutismSupportAreas />
      <AutismStages />
      <AutismCurricula />
      <AutismParentGuide />
      <AutismProcess />
      <AutismRequestCta />
      <AutismFaq />
      <AutismFinalCta />
    </div>
  );
}
