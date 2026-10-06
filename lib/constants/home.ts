/**
 * PLACEHOLDER CONTENT for the home page prototype.
 * SRS §11 / §27: statistics, ratings, tutor records and testimonials below are
 * sample values for UI purposes and must be replaced with approved,
 * stored production data before launch.
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
  "Our tutors hold verified certifications across primary global examination bodies, ensuring syllabus alignment down to mark-scheme rubrics.";

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

export const heroStats = [
  { value: "10k+", label: "Students Taught" },
  { value: "96%", label: "Target Grade Achieved" },
];

export const heroSocialProof = {
  initials: ["SK", "JM", "TL", "+2k"],
  rating: "4.9/5",
  caption: "Over 15,000 successful sessions completed",
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
  tutorCount: string;
  description: string;
  tags: string[];
};

export const subjectCards: SubjectCard[] = [
  {
    id: "maths",
    slug: "mathematics-statistics",
    title: "Mathematics & Statistics",
    tutorCount: "142 Tutors",
    description: "Calculus AB/BC, Pure Mathematics, Linear Algebra, Probability, and Advanced Statistics.",
    tags: ["Calculus", "Algebra"],
  },
  {
    id: "sciences",
    slug: "sciences",
    title: "Sciences",
    tutorCount: "118 Tutors",
    description: "Physics HL/SL, Organic & Analytical Chemistry, Molecular Biology, and Environmental Science.",
    tags: ["Physics", "Biology"],
  },
  {
    id: "languages",
    slug: "languages-literature",
    title: "Languages & Literature",
    tutorCount: "96 Tutors",
    description:
      "English Literature, Academic Composition, French DELF, Arabic as a Foreign Language, and Spanish.",
    tags: ["English", "French"],
  },
  {
    id: "humanities",
    slug: "humanities-social-sciences",
    title: "Humanities & Social Sciences",
    tutorCount: "74 Tutors",
    description: "Micro/Macro Economics, World History, Human Geography, Political Theory, and Psychology.",
    tags: ["Economics", "History"],
  },
  {
    id: "technology",
    slug: "technology-computer-science",
    title: "Technology & Computer Science",
    tutorCount: "88 Tutors",
    description:
      "Python, AP Computer Science A, Full-stack Web Development, Data Science, and Machine Learning.",
    tags: ["Python", "Coding"],
  },
  {
    id: "university",
    slug: "university-higher-education",
    title: "University & Higher Education",
    tutorCount: "61 Tutors",
    description:
      "Undergraduate Engineering, Corporate Law, MBA Finance, Medical Physiology, and Research Methodology.",
    tags: ["Law", "Engineering"],
  },
];

export const nextGenerationStats = [
  { value: "120+", label: "Expert Mentors", caption: "Distinguished subject specialists" },
  { value: "35+", label: "Advanced Programs", caption: "Comprehensive exam prep" },
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
    title: "Explore Suitable Tutors",
    description:
      "Review vetted tutor profiles, qualifications, verified student reviews, and introductory video pitches.",
  },
  {
    step: "03",
    title: "Choose Your Tutor",
    description:
      "Book an obligation-free trial session to evaluate rapport, teaching approach, and personalized study roadmaps.",
  },
  {
    step: "04",
    title: "Start Learning",
    description:
      "Launch customized one-on-one sessions with progress milestones, post-class feedback, and continuous support.",
  },
];

export const testimonials = [
  {
    id: "t1",
    quote:
      "We were struggling with our daughter's IB Chemistry SL marks. Tutorly matched us with Dr. Elena, and within two terms she went from a 4 to a solid 7. Incredible dedication!",
    name: "Nadia Mansour",
    context: "Mother of Year 12 IB Student",
    initials: "NM",
    photo: "/images/reviews/nadia-mansour.jpg",
  },
  {
    id: "t2",
    quote:
      "The platform's verification gives complete peace of mind. Both in-person and digital sessions are thoroughly documented with progress logs after every class.",
    name: "Anthony Lewis",
    context: "Father of IGCSE Student",
    initials: "AL",
    photo: "/images/reviews/anthony-lewis.jpg",
  },
  {
    id: "t3",
    quote:
      "As an A-Level student tackling Further Maths, having a tutor who graduated with first-class honors from Cambridge helped me conquer formidable problems and build lasting reasoning.",
    name: "Rohan Kapoor",
    context: "Year 13 Student • A-Level",
    initials: "RK",
    photo: "/images/reviews/rohan-kapoor.jpg",
  },
];

export const reviewsSummary = "Read All 450+ Verified Reviews";
