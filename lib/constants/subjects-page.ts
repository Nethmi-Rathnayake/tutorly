/**
 * Copy for the Subjects page (/subjects). Subject names and grouping come from
 * `subjectCategories` (lib/constants/taxonomy.ts); this file only adds display details.
 * PLACEHOLDER mentor counts and marketing claims from the design must be replaced with
 * approved figures before launch (SRS §11, §27).
 */

export const subjectsHero = {
  eyebrow: "Curated Academic Disciplines • Director-Matched Educators",
  titleLead: "Find Tutors by",
  titleAccent: "Subject",
  description:
    "Explore our catalogue of master curricula, specialized sciences, higher mathematics, and languages. Each discipline is overseen by accredited examiners and veteran subject specialists matched privately to your academic targets.",
  searchPlaceholder: "Search subjects, syllabi or exam codes (e.g. IB Physics HL, Further Maths, STEP)",
  boardsNote: "Exam Board Aligned (IB, AQA, Edexcel, CIE, AP)",
};

/** Display details for each taxonomy category, keyed by `SubjectCategory.id`. */
export const categoryDisplay: Record<string, { kicker: string; title: string; chip: string; countLabel: string }> = {
  maths: {
    kicker: "Specialized Track",
    title: "Mathematics & Statistics",
    chip: "Mathematics & Statistics",
    countLabel: "Accredited Modules",
  },
  sciences: { kicker: "Empirical & Experimental", title: "Sciences", chip: "Sciences", countLabel: "Laboratory Disciplines" },
  languages: {
    kicker: "Literary & Linguistic Mastery",
    title: "Languages & Literature",
    chip: "Languages & Literature",
    countLabel: "Language Specialisms",
  },
  humanities: {
    kicker: "Socio-Economic & Historic Systems",
    title: "Humanities & Social Sciences",
    chip: "Humanities & Social Sciences",
    countLabel: "Core Curricula",
  },
  technology: {
    kicker: "Algorithms & Systems",
    title: "Technology & Computer Science",
    chip: "Tech & CS",
    countLabel: "Technical Tracks",
  },
  university: {
    kicker: "Undergraduate & Postgraduate",
    title: "Higher Education",
    chip: "Higher Education",
    countLabel: "Advanced Disciplines",
  },
  general: {
    kicker: "Foundational & Tailored",
    title: "Primary & Other Programs",
    chip: "Primary & Other",
    countLabel: "Tailored Pathways",
  },
};

export type SubjectDetail = {
  /** Shown instead of the taxonomy name when set. */
  title?: string;
  tag: string;
  description: string;
  /** Extra search terms (exam codes, sub-topics). */
  keywords: string;
  mentors: string;
  cta?: string;
};

/** Keyed by the exact subject name in `subjectCategories`. */
export const subjectDetails: Record<string, SubjectDetail> = {
  "Mathematics (General / Standard)": {
    tag: "Pure & Applied",
    description:
      "Core algebra, geometry, trigonometry, and exam board mastery across GCSE, IGCSE, and high school diplomas.",
    keywords: "maths math algebra geometry trigonometry gcse igcse sat",
    mentors: "34 Vetted Mentors",
  },
  "Additional / Further Mathematics": {
    tag: "Elite Competitive",
    description:
      "Pure mathematics, complex numbers, matrices, mechanics, and advanced university entrance STEP / MAT prep.",
    keywords: "further maths add maths step mat complex numbers matrices mechanics olympiad",
    mentors: "19 Lead Examiners",
  },
  "Statistics & Calculus": {
    tag: "Quantitative Data",
    description:
      "Differential equations, probability distributions, hypothesis testing, AP Calculus BC, and university quantitative methods.",
    keywords: "calculus ab bc ap statistics probability differential equations",
    mentors: "22 Vetted Mentors",
  },
  Physics: {
    tag: "HL / A2",
    description: "Classical mechanics, electromagnetism, wave theory, quantum physics, and practical examination technique.",
    keywords: "ib physics hl sl a-level a2 mechanics electromagnetism quantum ap physics",
    mentors: "26 Mentors",
  },
  Chemistry: {
    tag: "Pre-Med",
    description: "Organic synthesis, thermodynamics, equilibrium, spectroscopy, and pre-medical entrance preparation.",
    keywords: "ib chemistry hl organic ap chem a-level thermodynamics pre-med",
    mentors: "31 Mentors",
  },
  Biology: {
    tag: "Biomedical",
    description: "Cellular biology, genetics, physiology, biochemistry, and environmental ecology for exam and admissions goals.",
    keywords: "ib biology hl genetics physiology biochemistry ecology a-level",
    mentors: "28 Mentors",
  },
  "Combined / Integrated Science": {
    tag: "Dual-Award",
    description: "Coordinated dual-award science curricula for middle school and GCSE / IGCSE combined examinations.",
    keywords: "combined science double award triple integrated middle school gcse igcse",
    mentors: "18 Mentors",
  },
  "English Language & Literature": {
    tag: "Analytical Essay",
    description:
      "Critical literary analysis, rhetorical commentary, comparative essay structure, and Cambridge / Edexcel coursework.",
    keywords: "english literature language essay ib english a hl gcse creative writing",
    mentors: "32 Native Mentors",
  },
  "Arabic (Language / Literature / Islamic Studies)": {
    tag: "Classical & MSA",
    description:
      "Classical and Modern Standard Arabic grammar, literature, and Islamic Studies aligned to UAE MoE and international syllabi.",
    keywords: "arabic msa islamic studies moe quran grammar",
    mentors: "16 Native Scholars",
  },
  "French / German / Other Modern Languages": {
    tag: "CEFR / Diplomas",
    description: "Fluency acceleration, listening comprehension, grammar mastery, and DELF / DELE / Goethe certification.",
    keywords: "french german spanish mandarin delf dele goethe cefr ib language b ab initio",
    mentors: "21 Lead Tutors",
  },
  Economics: {
    tag: "Policy & Modeling",
    description:
      "Micro and macroeconomic models, fiscal policy critique, international trade mechanisms, and quantitative data analysis.",
    keywords: "economics micro macro ib economics a-level ap econ",
    mentors: "24 Mentors",
  },
  "Business Studies / Commerce": {
    tag: "Case Method",
    description: "Strategic management, organizational marketing, operational finance, and corporate case study methodology.",
    keywords: "business studies commerce ib business management marketing",
    mentors: "20 Mentors",
  },
  Accounting: {
    tag: "Ledger & Audit",
    description: "Financial accounting principles, ledger balancing, cash flows, corporate auditing, and management accounting.",
    keywords: "accounting accounts bookkeeping acca ledger audit",
    mentors: "14 Mentors",
  },
  "History & Geography": {
    tag: "Historiography",
    description:
      "Historiographical source analysis, geopolitical systems, global conflicts, and physical and human geography.",
    keywords: "history geography ib history source analysis geopolitics",
    mentors: "19 Lead Examiners",
  },
  "Psychology / Sociology": {
    tag: "Empirical Behavioral",
    description:
      "Cognitive psychology, research methods, social stratification, behavioral case evaluations, and empirical studies for IB, AQA, OCR and AP.",
    keywords: "psychology sociology ib psych aqa ocr ap psychology research methods",
    mentors: "17 Mentors",
  },
  "Computer Science / Information Technology (IT)": {
    tag: "Theory & Architecture",
    description:
      "Data structures, algorithm complexity analysis, binary architecture, network protocols, cybersecurity principles, and rigorous IB / A-Level theory.",
    keywords: "computer science it ib cs a-level algorithms data structures networking ap csa",
    mentors: "22 Lead Engineers",
  },
  "Coding & ICT": {
    tag: "Applied Software",
    description:
      "Hands-on software development in Python, Java, C++, modern full-stack web scripts, and practical coursework execution and computational design.",
    keywords: "coding programming python java javascript c++ ict web development",
    mentors: "18 Senior Devs",
  },
  "Undergraduate Engineering / Science Modules": {
    title: "Undergraduate Engineering / Science",
    tag: "Collegiate STEM",
    description:
      "Fluid dynamics, structural analysis, circuit design, college thermodynamics, and bespoke preparation for degree examinations.",
    keywords: "university engineering physics chemistry undergraduate thermodynamics circuits",
    mentors: "14 PhD Fellows",
  },
  "Business Management & Finance Modules": {
    title: "Business Management & Finance",
    tag: "MBA & MSc",
    description:
      "Corporate valuation, portfolio theory, econometric regression, marketing strategy, and MBA coursework.",
    keywords: "university finance mba msc valuation econometrics corporate finance",
    mentors: "11 Industry Experts",
  },
  "Advanced Academic Writing & Research": {
    tag: "Thesis Advisory",
    description:
      "Undergraduate dissertations, literature reviews, postgraduate thesis architecture, and peer-reviewed research methodology.",
    keywords: "dissertation thesis research writing extended essay ee literature review",
    mentors: "12 Senior Scholars",
  },
  "All Primary Subjects": {
    tag: "KS1–2 / 11+",
    description:
      "Foundational numeracy, early literacy, phonics, reasoning, and Key Stage 1–2 / 11+ selective entrance exam coaching designed to foster confidence.",
    keywords: "primary ks1 ks2 11+ eleven plus phonics reading numeracy early years",
    mentors: "36 Primary Specialists",
  },
  "Other (Please specify)": {
    title: "Other / Specialized Inquiries",
    tag: "Custom Concierge",
    description:
      "Bespoke academic inquiries, international curricula such as Swiss Matu or French Bac, specialized Olympiad coaching, and niche vocational credentials coordinated personally.",
    keywords: "other specialist olympiad french bac matura vocational custom",
    mentors: "Director Coordinated",
    cta: "Inquire Now",
  },
};

export const subjectsCta = {
  eyebrow: "Private Academic Concierge",
  title: "Don’t see your specific curriculum or module?",
  description:
    "Our Academic Directors source specialized doctoral fellows and lead examiners for bespoke curricula, competitive entrance examinations, and university dissertations within 48 hours.",
  assurances: ["Guaranteed 1-on-1 Vetting", "48h Fast Track Match"],
  primary: "Request a Bespoke Tutor Match",
  secondary: "Talk to an Academic Advisor",
};
