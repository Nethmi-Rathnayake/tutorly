import type { Metadata } from "next";
import {
  EarlyYearsStage,
  HigherEducationStage,
  HighSchoolStage,
  LevelsHero,
  MatchingProcess,
  MiddleStage,
  PrimaryStage,
  UniqueCurriculumCta,
} from "@/components/education-levels/sections";
import { getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return pageMetadata("/education-levels", t.locale, {
    title: t("Private Tutors by Education Level & Curriculum"),
    description: t(
      "Private tutors for every stage, from early years phonics to IGCSE, A-Level, IB, AP and university modules, matched to your child’s curriculum and exam board.",
    ),
  });
}

export default function EducationLevelsPage() {
  return (
    <div>
      <LevelsHero />
      <EarlyYearsStage />
      <PrimaryStage />
      <MiddleStage />
      <HighSchoolStage />
      <HigherEducationStage />
      <MatchingProcess />
      <UniqueCurriculumCta />
    </div>
  );
}
