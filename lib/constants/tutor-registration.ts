/**
 * Options and copy for tutor registration (SRS FR-06, §8) and the Become a Tutor page.
 * Unverified statistics, review timings, the placement lead profile, screening claims and the
 * educator testimonial were removed; add them back only with approved content.
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

/**
 * Tutor headshot limits. Server Actions cap the request body (1 MB by default; next.config.ts raises it
 * to 2 MB, well under Vercel's 4.5 MB request limit), so the browser resizes and re-encodes the chosen
 * photo to a JPEG before upload, and the server enforces PHOTO_MAX_BYTES again on the received bytes.
 */
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
/** Largest file a tutor may pick; it is shrunk in the browser before upload. */
export const PHOTO_MAX_PICK_BYTES = 20 * 1024 * 1024;
/** What the browser aims for after re-encoding. */
export const PHOTO_TARGET_BYTES = 850_000;
/** Hard limit on the uploaded (re-encoded) photo, checked again on the server. */
export const PHOTO_MAX_BYTES = 1_000_000;
export const PHOTO_MIN_PX = 400;
/** Longest edge after resizing in the browser. */
export const PHOTO_MAX_EDGE_PX = 1600;
/** Reject absurd dimensions (decompression bombs) before decoding in the browser. */
export const PHOTO_MAX_PX = 12_000;
/** The browser never sends more than PHOTO_MAX_EDGE_PX, so the server accepts only a little above that. */
export const PHOTO_MAX_SERVER_PX = 4000;

export const registrationSteps = [
  {
    id: "personal",
    label: "Personal Details",
    sublabel: "Legal identity & photo",
    title: "Personal Information",
    description: "Your details are submitted to our team for review.",
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
    sublabel: "Submit",
    title: "Final Review & Submission",
    description: "Check your details before submitting them to our team.",
    next: "Submit Application",
  },
] as const;

export const registrationIntro = {
  eyebrow: "Private Administrator Intake",
  title: "Tutor Intake & Credential Dossier",
  descriptionLead: "Your credentials and teaching methodology are submitted ",
  descriptionHighlight: "to our team",
  descriptionTail:
    ". We do not maintain public teacher marketplace profiles.",
};

export const tutorLifecycle = [
  { title: "Dossier Submission", body: "Sent to our team when you submit." },
  { title: "Profile review", body: "Our team reviews your subjects, qualifications and teaching approach." },
  { title: "Verification", body: "You consent to us verifying your identity, qualifications and background as part of the review." },
  { title: "Introductions", body: "If a family's request fits your profile and availability, we may contact you." },
];

export const privatePlacementNote = {
  title: "Private Administrator Placement",
  body: "Tutor profiles are held privately by our team and are never published in a searchable directory.",
};

/* ---------------------------- Become a Tutor page ---------------------------- */

export const becomeTutorHero = {
  eyebrow: "Educator Registration • Direct Admin Curation",
  titleLines: ["Share Your", "Knowledge."],
  titleAccent: "Inspire",
  titleRest: "the Next Generation.",
  description:
    "Register your teaching profile and let our team know about your subjects, qualifications, experience, and availability. We curate bespoke academic pairings entirely behind closed doors.",
  image: "/images/become-tutor-hero.jpg",
  imageAlt: "An experienced tutor guiding a student through a lesson",
  floatingCard: { title: "Team Coordinated", body: "1:1 Concierge" },
  trust: ["Team Review", "Private Profiles", "Zero Public Directory Exposure"],
};

export const privateRoster = {
  title: "Why Our Roster is Strictly Private",
  body: "Unlike mass tutoring websites, we respect the institutional prestige and privacy of our faculty. We do not display public tutor bios, rates, or personal phone numbers. Our team acts as the point of contact between you and families.",
};

export const educatorBenefits = [
  {
    title: "Showcase Your Expertise",
    body: "Present your specialized academic pedigree, university honors, examination board mastery, and unique instructional philosophy directly to our team.",
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
    body: "Share your degrees and qualifications for private credential review.",
    tag: "Private Records",
    tagBody: "Degrees and certifications are reviewed privately and are not published.",
  },
  {
    title: "Tell Us Your Availability",
    body: "Retain uncompromised autonomy over your weekly teaching cadence. Specify preferred evening slots, weekend intensives, vacation revision bootcamps, and virtual or in-person preferences.",
    tag: "Complete Sovereignty",
    tagBody: "You determine your calendar capacity and update your open windows anytime.",
  },
];

export const dedicatedTeam = {
  title: "Connect Through Our Team",
  body: "No time wasted on aggressive bidding wars, algorithmic self-promotion, or unsolicited cold inquiries. Our team reviews family requests and may contact you when one fits your profile.",
  protocolTitle: "Team Process",
  protocol: ["Family requests reviewed by our team", "Contact only when a request fits your profile", "No public tutor profiles"],
};

export const engagementStages = [
  {
    title: "Register",
    body: "Complete our multi-step credential application outlining your academic institution, degree classifications, and professional teaching tenure.",
    meta: "Online application",
  },
  {
    title: "Add Teaching Information",
    body: "Specify your curriculum preferences, syllabus niches (e.g., Cambridge Pre-U, IB SL/HL), target grade bands, and calendar windows.",
    meta: "Tailored parameters",
  },
  {
    title: "Our Team Reviews Details",
    body: "Our team reviews your background and subject expertise.",
    meta: "Team review",
  },
  {
    title: "Team Connects Suitable Requests",
    body: "If a student request fits your subjects and availability, our team may contact you.",
    meta: "Private contact",
  },
];

export const safetyCommitments = {
  eyebrow: "Pedagogical Rigor",
  title: "How Your Application Is Reviewed",
  body: "Applications are reviewed by our team.",
  items: [
    { title: "Identity Verification", body: "You consent to Tuteme verifying your identity when you submit your application." },
    { title: "Qualification Checks", body: "Your qualifications and background may be verified as part of the review." },
    { title: "Teaching Details", body: "Your subjects, curricula and teaching approach are reviewed." },
    { title: "Strict Discretion", body: "Zero public indexing, preserving your academic standing." },
  ],
};

export const registerCta = {
  eyebrow: "Our Team",
  title: "Ready to Register?",
  body: "Register your teaching profile and let our team review it.",
  note: "Submissions are reviewed by our team.",
};

export const credentialsPreview = {
  eyebrow: "Confidential Registration",
  title: "Submit Your Educator Credentials",
  body: "Your information is submitted directly to our team. Tutor profiles are not published for browsing.",
};
