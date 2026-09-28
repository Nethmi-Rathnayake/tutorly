/**
 * Structured taxonomy from SRS §9. Shared by forms, filters and discovery UI,
 * so keep values here rather than duplicating lists in components.
 */

export type Curriculum = { id: string; name: string; detail: string };

export const curricula: Curriculum[] = [
  { id: "british", name: "British Curriculum", detail: "IGCSE / A-Levels" },
  { id: "ib", name: "International Baccalaureate", detail: "IB: PYP / MYP / DP" },
  { id: "american", name: "American Curriculum", detail: "US High School / AP" },
  { id: "indian", name: "Indian Curriculum", detail: "CBSE / ICSE" },
  { id: "uae-moe", name: "UAE Ministry of Education", detail: "MoE" },
  { id: "canadian", name: "Canadian Curriculum", detail: "" },
  { id: "other", name: "Other International Syllabi", detail: "" },
];

export type EducationLevelGroup = {
  id: string;
  name: string;
  options: string[];
};

export const educationLevels: EducationLevelGroup[] = [
  { id: "early-years", name: "Early Years / Kindergarten", options: ["KG1 / FS1", "KG2 / FS2"] },
  {
    id: "primary",
    name: "Primary / Elementary",
    options: ["Grade 1 / Year 2", "Grade 2 / Year 3", "Grade 3 / Year 4", "Grade 4 / Year 5", "Grade 5 / Year 6"],
  },
  { id: "middle", name: "Middle School", options: ["Grade 6 / Year 7", "Grade 7 / Year 8", "Grade 8 / Year 9"] },
  {
    id: "high-school",
    name: "High School / Secondary",
    options: ["Grade 9 / Year 10", "Grade 10 / Year 11", "Grade 11 / Year 12", "Grade 12 / Year 13"],
  },
  {
    id: "higher-education",
    name: "Higher Education",
    options: ["University / Undergraduate", "Foundation", "Bachelor's Degree modules", "Postgraduate / Master's"],
  },
];

export type SubjectCategory = {
  id: string;
  slug: string;
  name: string;
  subjects: string[];
};

export const subjectCategories: SubjectCategory[] = [
  {
    id: "maths",
    slug: "mathematics-statistics",
    name: "Mathematics & Statistics",
    subjects: ["Mathematics (General / Standard)", "Additional / Further Mathematics", "Statistics & Calculus"],
  },
  {
    id: "sciences",
    slug: "sciences",
    name: "Sciences",
    subjects: ["Physics", "Chemistry", "Biology", "Combined / Integrated Science"],
  },
  {
    id: "languages",
    slug: "languages-literature",
    name: "Languages & Literature",
    subjects: [
      "English Language & Literature",
      "Arabic (Language / Literature / Islamic Studies)",
      "French / German / Other Modern Languages",
    ],
  },
  {
    id: "humanities",
    slug: "humanities-social-sciences",
    name: "Humanities & Social Sciences",
    subjects: ["Economics", "Business Studies / Commerce", "Accounting", "History & Geography", "Psychology / Sociology"],
  },
  {
    id: "technology",
    slug: "technology-computer-science",
    name: "Technology & Computer Science",
    subjects: ["Computer Science / Information Technology (IT)", "Coding & ICT"],
  },
  {
    id: "university",
    slug: "university-higher-education",
    name: "University & Higher Education",
    subjects: [
      "Undergraduate Engineering / Science Modules",
      "Business Management & Finance Modules",
      "Advanced Academic Writing & Research",
    ],
  },
  {
    id: "general",
    slug: "other-general",
    name: "Other / General",
    subjects: ["All Primary Subjects", "Other (Please specify)"],
  },
];
