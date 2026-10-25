/**
 * Copy for the Education Levels page (/education-levels).
 * Stage ids match `educationLevels` in lib/constants/taxonomy.ts and double as section anchors.
 * Unverified figures and credential claims were removed; add them back only with approved content (SRS §11, §27).
 */

export const levelsImages = {
  hero: "/images/hero-main.jpg",
  earlyYears: "/images/inspiring.jpg",
  cta: "/images/levels-cta.jpg",
};

export const levelsHero = {
  eyebrow: "Academic Pathways • Comprehensive Curricula Support",
  title: { highlight: "Education Levels", tail: "& Curricula Supported by" },
  description:
    "From foundational early phonics and numeracy through specialised IGCSEs, IB Diplomas, AP courses and university degree modules, we help families find educators matched to your child’s syllabus and developmental stage.",
  imageCard: {
    kicker: "Request-Based Matching",
    title: "Individualised 1-on-1 Curricular Trajectories",
    body: "Every request is reviewed by our team so that each learner’s syllabus and goals can be considered.",
    cta: "Start Your Request",
  },
  stats: [
    { value: "Private", label: "Request-Based Matching" },
    { value: "Zero", label: "Public Tutor Directory" },
  ],
  note: "Every parent enquiry is reviewed in private, then matched to a mentor whose expertise fits your child’s curriculum and learning style.",
  frameworks: {
    title: "Entire UAE Framework Scope",
    body: "Calibrated for British, IB, American, CBSE, UAE MOE and bilingual syllabi taught across the Emirates.",
  },
  highlights: [
    { title: "Multi-Curriculum Authority", body: "British, IB, American, CBSE, UAE MOE and international syllabi." },
    { title: "Strict Exam-Stage Curation", body: "Mentors matched to the exact board, paper and examination series." },
    { title: "Board-Specific Specialists", body: "Educators familiar with your child’s specific exam board." },
  ],
};

export type LevelCard = {
  kicker: string;
  title: string;
  body: string;
  tags?: string[];
  points?: string[];
  footer?: string;
  badge?: string;
};

type Stage = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ages: string;
  frameworks: string;
};

export const earlyYears: Stage & {
  cards: LevelCard[];
  focus: { imageCaption: string; title: string; points: string[]; cta: string; note: string };
} = {
  id: "early-years",
  eyebrow: "Stage 01 • Early Foundations",
  title: "Early Years & Kindergarten",
  description:
    "Building joyful foundational inquiry, early phonics, vocabulary and basic mathematical understanding in a nurturing 1-on-1 environment.",
  ages: "Ages 3 – 5 Years",
  frameworks: "EYFS Framework",
  cards: [
    {
      kicker: "KG1 / FS1",
      title: "KG1 / Foundation Stage 1 (FS1)",
      body: "Early speech and language development, gross and fine motor development, social confidence and structured, tactile play-based learning.",
      tags: ["Phonemic Awareness", "Fine Motor Coordination", "Play-Based Learning"],
    },
    {
      kicker: "KG2 / FS2",
      title: "KG2 / Foundation Stage 2 (FS2)",
      body: "Structured early reading, beginner phonics blending, number sense (1–20) and school-readiness skills ahead of Year 1 transition assessments.",
      tags: ["CVC Word Blending", "Basic Number Bonds", "Primary Readiness"],
    },
  ],
  focus: {
    imageCaption: "1-on-1 Nurtured Guidance",
    title: "Core Early Stage Focus Areas",
    points: [
      "Jolly Phonics, Read Write Inc. & Oxford Reading Tree",
      "Concrete, pictorial, abstract (CPA) maths foundations",
      "Bilingual English & Arabic foundational support",
      "Gentle sensory-paced learning adapted to each child’s attention span",
    ],
    cta: "Request a Tutor for Early Years",
    note: "Parent-guided early learning plans shared after every session.",
  },
};

export const primary: Stage & { cards: LevelCard[]; featured: { badge: string; title: string; body: string; cta: string } } = {
  id: "primary",
  eyebrow: "Grades 1 – 5 • Core Mastery",
  title: "Primary / Elementary School",
  description:
    "Cultivating unshakeable core literacy, mathematical reasoning and critical thinking habits that set the baseline for lifelong academic confidence.",
  ages: "Ages 6 – 11 Years",
  frameworks: "KS1 & KS2 • US K-5 • IB PYP • UAE MOE",
  cards: [
    {
      kicker: "Grade 1 / Year 2",
      title: "Foundational Literacy",
      body: "Structured reading comprehension, sentence formation, early spelling patterns and confident, fluent reading aloud.",
      tags: ["Sentence Structure", "Phonics Mastery"],
    },
    {
      kicker: "Grade 2 / Year 3",
      title: "Fluency & Multiplication",
      body: "Reading fluency with expression, introductory times tables (2, 5, 10), basic paragraph organisation and creative journaling.",
      tags: ["Reading Fluency", "Times Tables"],
    },
    {
      kicker: "Grade 3 / Year 4",
      title: "Multi-Step Arithmetic",
      body: "Multi-step word problems, formal written methods for all four operations and more complex descriptive writing.",
      tags: ["Multi-Step Maths", "Descriptive Writing"],
    },
    {
      kicker: "Grade 4 / Year 5",
      title: "Fractions & Analytical Writing",
      body: "Fractions, decimals and percentages, analytical reading comprehension, persuasive writing and early STEM project foundations.",
      tags: ["Fractions & Decimals", "Inferential Comprehension"],
    },
    {
      kicker: "Grade 5 / Year 6",
      title: "Primary Graduation Readiness",
      body: "Secondary transition preparation, algebra basics, ratios, comprehensive literacy checkpoints and pre-secondary reasoning readiness.",
      tags: ["Pre-Algebra", "Checkpoint Prep"],
    },
  ],
  featured: {
    badge: "Selective Admissions",
    title: "11+ & School Entrance Prep",
    body: "Targeted coaching for Dubai College, JESS, Aldenham, Harrow, Brighton College and Cranleigh entrance assessments, including CAT4, GL and ISEB.",
    cta: "Request a Primary Tutor",
  },
};

export const middle: Stage & { cards: LevelCard[]; banner: { title: string; body: string; cta: string } } = {
  id: "middle",
  eyebrow: "Grades 6 – 8 • Subject Specialisation",
  title: "Middle School / Lower Secondary",
  description:
    "Navigating curriculum transitions, developing independent study skills and mastering rigorous foundational subject specialisation before formal exam tracks.",
  ages: "Ages 11 – 14 Years",
  frameworks: "KS3 • IB MYP 1–3 • US Middle School",
  cards: [
    {
      kicker: "Year 7 / Grade 6",
      title: "Secondary Timetable Transition",
      body: "Bridging the gap from single-teacher classrooms to multiple specialised subject teachers. Focus on algebraic equations, structured PEEL essay writing and scientific inquiry.",
      points: ["Introductory Algebra & Coordinates", "Structured Essay Paragraphs (PEEL / TEEL)", "Separated Biology, Chemistry & Physics"],
      footer: "Focus: Executive Function & Organisation",
    },
    {
      kicker: "Year 8 / Grade 7",
      title: "Pre-Algebra & Geometry",
      body: "Consolidation of geometric proofs, simultaneous linear equations, comparative literary texts and laboratory analysis reports for STEM foundations.",
      points: ["Graphing Linear & Inequality Functions", "Comparative Analysis of Thematic Literature", "Periodic Table & Energy Dynamics"],
      footer: "Focus: Analytical Depth & Application",
    },
    {
      kicker: "Year 9 / Grade 8",
      title: "Pre-IGCSE & MYP Checkpoint",
      body: "High-stakes checkpoint year where students select pathways for GCSE/IGCSE. Mastery of quadratic expressions, formal argumentative writing and practical exam technique.",
      points: ["Advanced Quadratics & Trigonometry", "Cambridge Checkpoint / CAT4 Assessments", "IB MYP Year 3 Rubric Excellence"],
      footer: "Focus: Examination Readiness",
    },
  ],
  banner: {
    title: "Preventing Middle School Learning Slumps",
    body: "Tutors can help identify specific conceptual gaps in Year 7–9 before formal assessment cycles begin.",
    cta: "Request a Middle School Tutor",
  },
};

export const highSchool: Stage & {
  boards: string[];
  cards: (LevelCard & { meta: string })[];
  banner: { title: string; cta: string };
} = {
  id: "high-school",
  eyebrow: "Grades 9 – 12 • High-Stakes Examinations",
  title: "High School & Upper Secondary",
  description:
    "Targeted exam board preparation focused on your child’s target grades, with support through university applications.",
  ages: "Ages 14 – 18 Years",
  frameworks: "IGCSE • A-Level • IB DP • AP • CBSE",
  boards: ["Cambridge CIE", "Pearson Edexcel", "Oxford AQA", "IB International Baccalaureate", "College Board AP", "CBSE / CISCE India"],
  cards: [
    {
      kicker: "Grade 9 / Year 10",
      meta: "Year 1 Syllabus Build",
      title: "IGCSE & MYP Foundational Mastery",
      body: "Complete theoretical syllabus coverage for British IGCSE / GCSE and the IB Middle Years Programme. Establishing precise mark-scheme vocabulary, core formulas and analytical frameworks.",
      tags: ["Exam Content Structure", "Internal Assessment Prep", "Exam Timing Exercises"],
      footer: "Core: Math, Triple Science, English Language, Economics",
    },
    {
      kicker: "Grade 10 / Year 11",
      meta: "Final Board Year",
      title: "Board Exam Drill & Past Paper Mastery",
      body: "Intensive, timed past-paper simulations under examination constraints, examiner report deconstructions, grade boundary evaluation and targeted intervention on commonly difficult Paper 4 / Paper 6 components.",
      tags: ["Paper 2, 4 & 6 Drills", "Grade 9 / A* Targeting", "Mock Exam Correction"],
      footer: "Focus: Exam technique and past-paper practice",
    },
    {
      kicker: "Grade 11 / Year 12",
      meta: "Advanced Tier",
      title: "AS-Level, IB DP Year 1 & AP Calculus",
      body: "Managing the substantial conceptual leap to advanced subjects, university-oriented research essays and the IB Extended Essay (EE), Theory of Knowledge (ToK) and college-level AP syllabi.",
      tags: ["IB HL Math", "Internal Assessment Scrutiny", "AP Chemistry & Physics"],
      footer: "Focus: High-order conceptual growth and analysis capacity",
    },
    {
      kicker: "Grade 12 / Year 13",
      meta: "University Gateway",
      title: "A-Level, IB DP Year 2 & Predictive Optimisation",
      body: "Final result optimisation, maximising predicted grades for Oxbridge, Ivy League and Russell Group applications, and comprehensive revision of examined content.",
      tags: ["UCAS Prediction Target", "A* & 7/7 Grade Prep", "UKCAT / SAT / ACT Prep"],
      footer: "Focus: Final result preparation and university applications",
    },
  ],
  banner: {
    title: "Need urgent exam preparation for upcoming May/June or Oct/Nov series?",
    cta: "Request a High School Tutor",
  },
};

export const higherEducation: Stage & { cards: (LevelCard & { points: string[]; footer: string })[]; cta: string } = {
  id: "higher-education",
  eyebrow: "Stage 05 • Advanced Mentorship",
  title: "University & Higher Education",
  description:
    "Bespoke academic mentorship for undergraduate and postgraduate modules.",
  ages: "Undergrad & Postgrad",
  frameworks: "Undergraduate & Postgraduate Modules",
  cards: [
    {
      kicker: "Pre-University",
      title: "Foundation & Pre-Degree",
      body: "Academic bridging for students entering competitive UK, European or North American universities. Strengthening critical academic English, college-level maths and foundational sciences.",
      points: ["Academic Writing & Citations", "Foundational Calculus & Linear Algebra", "Introductory Economics & Finance"],
      footer: "Pathway Bridge Programs",
    },
    {
      kicker: "Undergraduate",
      title: "Bachelor’s Degree Modules",
      body: "Highly specialised technical support across challenging collegiate courses. Mentors matched specifically to your university syllabus, from thermodynamics to financial modelling and case law.",
      points: [
        "Engineering: Thermodynamics, Fluid Mechanics",
        "Finance: Econometrics, Corporate Valuations",
        "Computer Science: Data Structures & AI",
        "Law: Contract, Tort & International Jurisprudence",
      ],
      footer: "Technical Subject Specialisation",
    },
    {
      kicker: "Postgraduate",
      title: "Postgraduate & Master’s",
      body: "Advanced methodology structuring, quantitative statistical analysis (SPSS, R, Python), literature reviews and rigorous dissertation mentorship for Master’s and senior academic research projects.",
      points: ["Quantitative & Qualitative Methodologies", "Thesis Architecture & Review Logic", "Academic Journal Manuscript Editing"],
      footer: "Postgraduate Academic Support",
    },
  ],
  cta: "Request a University Academic Mentor",
};

export const matchingProcess = {
  eyebrow: "Concierge Matching Process",
  title: "How We Match Your Child’s Exact Education Level",
  description:
    "We do not leave critical curriculum milestones to chance or public reviews. Our team reviews every request individually.",
  steps: [
    {
      title: "Specify Grade & Exam Board",
      body: "Share your child’s current school year, specific syllabus (e.g. Cambridge IGCSE 0580 Mathematics or IB HL Chemistry), target milestones and preferred scheduling.",
      link: "Submit Your Needs",
    },
    {
      title: "Team Review",
      body: "Our team reviews your student’s level, curriculum and learning needs from the details you share.",
      link: "Request Review",
    },
    {
      title: "We Get in Touch",
      body: "We contact you through your preferred channel to discuss the next steps.",
      link: "Next Steps",
    },
  ],
};

export const uniqueCurriculum = {
  eyebrow: "Bespoke International Pathways",
  title: "Enrolled in a Unique Curriculum or International Track?",
  body: "Studying another international syllabus? Tell us about it and we will look for a tutor who knows that curriculum and its examination requirements.",
  tracks: ["Other International Syllabi"],
  primaryCta: "Launch Parent Requirement Wizard",
  secondaryCta: "Contact Our Team",
};
