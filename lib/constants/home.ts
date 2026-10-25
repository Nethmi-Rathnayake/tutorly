/**
 * PLACEHOLDER CONTENT for the home page prototype.
 * SRS §11 / §27: unverified statistics, ratings, tutor counts and testimonials were removed
 * from this page; add them back only with approved, stored production data.
 */

// Placeholder photography (Unsplash) stored in public/images; swap for approved assets.
export const homeImages = {
  nextGeneration: "/images/next-generation.jpg",
  inspiring: "/images/inspiring.jpg",
};

/**
 * Text shown in the curriculum selector for each curriculum id in taxonomy.ts.
 * PLACEHOLDER: the certification and syllabus-alignment claims must be confirmed by the business.
 */
export const curriculumIntro =
  "Tell us your curriculum and we will look for a tutor who knows its syllabus and examination requirements.";

export const curriculumDescriptions: Record<string, string> = {
  british:
    "Specialist IGCSE and A-Level tutors who know the Edexcel, Cambridge and AQA specifications and teach to the mark scheme, from past-paper technique to examiner-report insights.",
  ib: "Tutors experienced across the PYP, MYP and Diploma Programme, supporting Internal Assessments, Extended Essays and Theory of Knowledge alongside the core subject content.",
  american:
    "Guidance for US High School coursework, SAT and ACT preparation and Advanced Placement exams, with tutors who understand GPA targets and college applications.",
  indian:
    "CBSE and ICSE specialists who follow the board syllabus and NCERT approach, with focused revision plans for the board examinations.",
  "uae-moe":
    "Tutors familiar with the UAE Ministry of Education curriculum, including Arabic, Islamic Studies and Social Studies, aligned to the national assessment framework.",
  canadian:
    "Support for the Canadian provincial curricula, building strong foundations in core subjects and the skills required for school assessments and university pathways.",
  other:
    "Studying another syllabus? Tell us about it and we will match you with a tutor who has taught that curriculum and its examination requirements.",
};

export type LevelStage = {
  id: string;
  title: string;
  range: string;
  description: string;
  featured?: boolean;
};

export const levelStages: LevelStage[] = [
  {
    id: "early-years",
    title: "Early Years",
    range: "KG1/FS1 & KG2/FS2",
    description: "Foundational phonics, early numeracy, and play-based developmental learning.",
  },
  {
    id: "primary",
    title: "Primary School",
    range: "Grades 1–5 / Years 2–6",
    description: "Core numeracy, reading fluency, science discovery, and confident self-study habits.",
  },
  {
    id: "middle",
    title: "Middle School",
    range: "Grades 6–8 / Years 7–9",
    description: "Abstract problem solving, pre-algebra, STEM exploration, and essay structuring.",
  },
  {
    id: "high-school",
    title: "High School",
    range: "IGCSE • A-Levels • IBDP • AP",
    description: "Rigorous exam preparation, past-paper drills, SAT/ACT coaching, and top college admissions.",
    featured: true,
  },
  {
    id: "higher-education",
    title: "University Level",
    range: "Undergrad & Postgrad",
    description: "Advanced engineering, corporate finance, legal writing, thesis defense, and statistics.",
  },
];

export type SubjectCard = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

export const subjectCards: SubjectCard[] = [
  {
    id: "maths",
    slug: "mathematics-statistics",
    title: "Mathematics & Statistics",
    description: "Calculus AB/BC, Pure Mathematics, Linear Algebra, Probability, and Advanced Statistics.",
    tags: ["Calculus", "Algebra"],
  },
  {
    id: "sciences",
    slug: "sciences",
    title: "Sciences",
    description: "Physics HL/SL, Organic & Analytical Chemistry, Molecular Biology, and Environmental Science.",
    tags: ["Physics", "Biology"],
  },
  {
    id: "languages",
    slug: "languages-literature",
    title: "Languages & Literature",
    description:
      "English Literature, Academic Composition, French DELF, Arabic as a Foreign Language, and Spanish.",
    tags: ["English", "French"],
  },
  {
    id: "humanities",
    slug: "humanities-social-sciences",
    title: "Humanities & Social Sciences",
    description: "Micro/Macro Economics, World History, Human Geography, Political Theory, and Psychology.",
    tags: ["Economics", "History"],
  },
  {
    id: "technology",
    slug: "technology-computer-science",
    title: "Technology & Computer Science",
    description:
      "Python, AP Computer Science A, Full-stack Web Development, Data Science, and Machine Learning.",
    tags: ["Python", "Coding"],
  },
  {
    id: "university",
    slug: "university-higher-education",
    title: "University & Higher Education",
    description:
      "Undergraduate Engineering, Corporate Law, MBA Finance, Medical Physiology, and Research Methodology.",
    tags: ["Law", "Engineering"],
  },
];

export const howItWorksSteps = [
  {
    step: "01",
    title: "Tell Us What You Need",
    description:
      "Specify your student's grade level, curriculum, target goals, schedule preferences, and learning pace.",
  },
  {
    step: "02",
    title: "Our Team Reviews It",
    description: "Our team reviews your request and looks for a suitable tutor.",
  },
  {
    step: "03",
    title: "We Get in Touch",
    description: "We contact you through your preferred channel to discuss the next steps.",
  },
  {
    step: "04",
    title: "Start Learning",
    description: "Begin one-to-one sessions once the arrangements are agreed.",
  },
];
