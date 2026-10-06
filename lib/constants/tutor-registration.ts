/**
 * Options and copy for tutor registration (SRS FR-06, §8) and the Become a Tutor page.
 * PLACEHOLDER: the placement lead profile, statistics, review timings and trust
 * badges come from the design and must be confirmed by the business before launch.
 * SRS §6/§11: this page must not promise students, income or placement.
 */

export const qualificationOptions = [
  { value: "doctorate", label: "Doctorate / Ph.D. / D.Phil" },
  { value: "masters", label: "Master's Degree" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "pgce", label: "PGCE / Teaching Qualification" },
  { value: "undergraduate", label: "Currently an Undergraduate" },
  { value: "other", label: "Other Qualification" },
] as const;

export const experienceOptions = [
  { value: "0-1", label: "Less than 1 year" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5-10", label: "5–10 years" },
  { value: "10+", label: "10+ years" },
] as const;

export const teachingMethodOptions = [
  { value: "concept-first", label: "Concept-first explanations" },
  { value: "exam-technique", label: "Exam technique & past papers" },
  { value: "socratic", label: "Socratic questioning" },
  { value: "visual", label: "Visual & diagram-led" },
  { value: "structured-practice", label: "Structured practice & homework" },
  { value: "project-based", label: "Project-based learning" },
] as const;

export const tutorModeOptions = [
  { value: "online", label: "Online Only", hint: "Live virtual sessions" },
  { value: "in-person", label: "In-Person Only", hint: "Home or library visits" },
  { value: "both", label: "Online & In-Person", hint: "Flexible for families" },
] as const;

export const PHOTO_MAX_BYTES = 10 * 1024 * 1024;
export const PHOTO_MIN_PX = 400;
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export const registrationSteps = [
  {
    id: "personal",
    label: "Personal Details",
    sublabel: "Legal identity & photo",
    title: "Personal Information & Administrative Record",
    description: "This record is stored in our private educator directory for identity compliance.",
    next: "Continue to Teaching Information",
  },
  {
    id: "teaching",
    label: "Teaching Info",
    sublabel: "Subjects & curricula",
    title: "Teaching Subjects, Levels & Qualifications",
    description: "The subjects, education levels and curricula you teach, plus your experience and qualifications.",
    next: "Continue to Availability",
  },
  {
    id: "availability",
    label: "Availability",
    sublabel: "Format & schedule",
    title: "Teaching Format & Weekly Availability",
    description: "How you prefer to teach, where you can travel for in-person sessions, and when you're available.",
    next: "Continue to Pedagogy",
  },
  {
    id: "pedagogy",
    label: "Pedagogy",
    sublabel: "Approach & credentials",
    title: "Biography & Teaching Approach",
    description: "A short professional biography and how you like to teach. Families read this when considering a match.",
    next: "Continue to Final Review",
  },
  {
    id: "review",
    label: "Final Review",
    sublabel: "Submit to Board",
    title: "Final Review & Submission",
    description: "Check your details before submitting them to the Academic Placement Board.",
    next: "Submit to Placement Board",
  },
] as const;

export const registrationIntro = {
  eyebrow: "Private Administrator Intake",
  title: "Elite Tutor Intake & Credential Dossier",
  descriptionLead: "Your credentials and teaching methodology are submitted ",
  descriptionHighlight: "strictly to the Academic Placement Board",
  descriptionTail:
    ". We do not maintain public teacher marketplace profiles. Students are curated and paired directly by our senior academic advisors.",
  stats: [
    { value: "100%", label: "Confidential" },
    { value: "24–48h", label: "Admin Audit" },
  ],
};

export const placementLead = {
  name: "Dr. Alistair Finch",
  role: "Director of Educator Standards",
  detail: "Former Dean of Admissions",
  image: "/images/placement-lead.jpg",
  quote:
    "Our placement team manually reviews every tutor profile to ensure our students receive bespoke, intellectually rigorous mentoring.",
};

export const tutorLifecycle = [
  { title: "Dossier Submission", body: "Immediate transmission into private admin queue." },
  { title: "Academic Audit & DBS Check", body: "Independent degree & safeguarding verification." },
  { title: "Syllabus Alignment", body: "Review of diagnostic framework & teaching rubrics." },
  { title: "Hand-Curated Student Connection", body: "Direct liaison dispatch to families based on fit." },
];

export const privatePlacementNote = {
  title: "Private Administrator Placement",
  body: "Tutorly does not sell contact lists or index tutor credentials on public search engines. Your qualifications remain strictly confidential to our academic intake board and are shared only with vetted client families upon tailored arrangement.",
};

/* ---------------------------- Become a Tutor page ---------------------------- */

export const becomeTutorHero = {
  eyebrow: "Vetted Educator Fellowship • Direct Admin Curation",
  titleLines: ["Share Your", "Knowledge."],
  titleAccent: "Inspire",
  titleRest: "the Next Generation.",
  description:
    "Register your teaching profile and let our team know about your subjects, qualifications, experience, and availability. We curate bespoke academic pairings entirely behind closed doors.",
  image: "/images/become-tutor-hero.jpg",
  imageAlt: "An experienced tutor guiding a student through a lesson",
  floatingCard: { title: "Director Coordinated", body: "1:1 Concierge" },
  stats: [
    { value: "1.8%", label: "Acceptance Ratio", caption: "Stringent credential standards" },
    { value: "100%", label: "Private Placement", caption: "Oxbridge, Ivy & Top Faculty" },
  ],
  trust: ["Director-Vetted", "100% Confidential Profiles", "Zero Public Directory Exposure"],
};

export const privateRoster = {
  title: "Why Our Roster is Strictly Private",
  body: "Unlike mass tutoring websites, we respect the institutional prestige and privacy of our faculty. We do not display public tutor bios, rates, or personal phone numbers. Our Senior Academic Directors interface between you and families with utmost discretion.",
  badge: "FERPA & GDPR Regulated",
};

export const educatorBenefits = [
  {
    title: "Showcase Your Expertise",
    body: "Present your specialized academic pedigree, university honors, examination board mastery, and unique instructional philosophy directly to our senior directors.",
    tag: "Pedagogical Dignity",
    tagBody: "Your accomplishments evaluated by peers who understand academic rigour.",
  },
  {
    title: "Share Your Subjects",
    body: "Define exactly which disciplines and advanced modules you excel at teaching—from STEP, MAT, and IB Higher Level to AP Capstone, A-Level Further Maths, or Oxford/Cambridge admissions tests.",
    tag: "Syllabus Precision",
    tagBody: "Teach only the exact exam boards and topics where your passion lies.",
  },
  {
    title: "Highlight Your Qualifications",
    body: "Upload your postgraduate degrees, published research, examiner accreditations, and enhanced background verifications for private, high-security credential validation.",
    tag: "Encrypted Records",
    tagBody: "Degrees and certifications verified privately with zero public leakage.",
  },
  {
    title: "Tell Us Your Availability",
    body: "Retain uncompromised autonomy over your weekly teaching cadence. Specify preferred evening slots, weekend intensives, vacation revision bootcamps, and virtual or in-person preferences.",
    tag: "Complete Sovereignty",
    tagBody: "You determine your calendar capacity and update your open windows anytime.",
  },
];

export const dedicatedTeam = {
  title: "Connect Through Our Dedicated Team",
  body: "No time wasted on aggressive bidding wars, algorithmic self-promotion, or unsolicited cold inquiries. Our Senior Placement Directors assess every incoming family inquiry, verifying scholastic readiness before proposing an introduction aligned with your profile.",
  protocolTitle: "Director Protocol",
  protocol: ["Pre-screened learners", "Curated expectations", "Handled onboarding logistics"],
};

export const engagementStages = [
  {
    title: "Register",
    body: "Complete our secure multi-step credential application outlining your academic institution, degree classifications, and professional teaching tenure.",
    meta: "~8 minutes to complete",
  },
  {
    title: "Add Teaching Information",
    body: "Specify your curriculum preferences, syllabus niches (e.g., Cambridge Pre-U, IB SL/HL), target grade bands, and calendar windows.",
    meta: "Tailored parameters",
  },
  {
    title: "Our Team Reviews Details",
    body: "Our Senior Academic Placement Committee evaluates your background, references, subject expertise, and verification documents.",
    meta: "Senior director interview",
  },
  {
    title: "Team Connects Suitable Requests",
    body: "When a student request corresponds to your exact subject mastery and open schedule, our directors facilitate a private introduction and chemistry trial.",
    meta: "1-on-1 private connection",
  },
];

export const safetyCommitments = {
  eyebrow: "Pedagogical Rigor",
  title: "Curated For Academic Excellence & Uncompromised Safety",
  body: "Because our tutors work with high-achieving applicants, international scholars, and top-tier candidates, every fellowship applicant undergoes thorough professional vetting before assignment.",
  items: [
    { title: "Enhanced DBS & Police Check", body: "Clearance or international background equivalent verified." },
    { title: "Accredited Degrees", body: "Direct transcript validation from recognized global universities." },
    { title: "Examiner Familiarity", body: "In-depth familiarity with mark schemes and assessment criteria." },
    { title: "Strict Discretion", body: "Zero public indexing, preserving your academic standing." },
  ],
  testimonial: {
    name: "Dr. Julian Croft",
    role: "Senior Educator Fellow • Natural Sciences",
    credentials: "BA, MSc, PhD (Cantab)",
    image: "/images/tutors/james-whitfield.jpg",
    quote:
      "Tutorly completely eliminates the noise of commercial tutoring marketplaces. There are no client bidding wars or public profile metrics to manage. Every student introduction made by the Academic Placement Team is thoughtfully aligned with my research syllabus and schedule.",
    tags: ["Cambridge Tripos Examiner", "STEP & MAA Mentor", "Fellow Since 2021"],
  },
};

export const registerCta = {
  eyebrow: "Academic Placement Committee",
  title: "Ready to Register?",
  body: "Join our fellowship of distinguished educators and let our academic placement team match your expertise with motivated learners.",
  note: "Submissions are reviewed within 48 hours by our Academic Placement Committee.",
};

export const credentialsPreview = {
  eyebrow: "Confidential Registration",
  title: "Submit Your Educator Credentials",
  body: "Your information is submitted directly and securely to our Senior Academic Placement Committee. It will never be indexed or displayed on the public web.",
};
