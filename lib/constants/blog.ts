/**
 * Copy for the Blog listing (/blog) and the shared parts of each article page (/blog/[slug]).
 * Articles themselves live in ./blog-posts.ts.
 * PLACEHOLDER: the outcome figures (+1.8 grade bands, 94.6% exam targets, the progression chart),
 * the release schedule, response times, the "zero lock-in / 100% satisfaction" promise and the
 * KHDA/ADEK compliance wording must be confirmed by the business before launch (SRS §11, §27).
 */

export const blogHero = {
  eyebrow: "Insights for Parents & Educators",
  titleLead: "Guidance for Your Child’s",
  titleAccent: "Learning Journey",
  description:
    "Practical guidance, curriculum analysis and regional benchmarks to help UAE parents make informed tutoring and education decisions across British, IB and American pathways.",
  searchLabel: "Search articles",
  searchPlaceholder: "Search articles (e.g. IB Diploma, GCSE Physics, KHDA, Dubai tutors)…",
  searchButton: "Find Insights",
};

export const featuredCard = {
  label: "Featured Guide",
  focus: "KHDA & ADEK Focus",
  verified: { title: "100% Verified", note: "Curriculum Specialists" },
  authorRole: "Senior Directors of Pedagogy & Inspection",
  cta: "Read Full Article",
};

export const latestArticles = {
  eyebrow: "Curated Intelligence",
  title: "Latest Academic Articles",
  resultsTitle: "Matching Articles",
  updated: "Updated Weekly",
  read: "Read",
  empty: { title: "No articles match your search", body: "Try a different keyword or browse all articles.", reset: "Clear filters" },
};

export const editorialSlots = {
  title: "Upcoming Editorial Slots • Curated by Senior Academic Directors",
  body: "Scheduled for release: “KHDA School Ratings Explained” & “Calculus AB/BC Scoring Guide”",
  badge: "Bi-Weekly Release Schedule",
};

export const trajectory = {
  eyebrow: "Data-Driven Learning",
  title: "Measurable Academic Trajectory",
  body: "Our curriculum-focused approach pairs personalised one-to-one tutoring with diagnostic question banks, producing measurable grade improvements for students at international schools across the Emirates.",
  stats: [
    { value: "+1.8", label: "Average Grade Band Jump", note: "Within 14 Mentorship Weeks" },
    { value: "94.6%", label: "Exam Target Realised", note: "GCSE, IBDP & AP Cohorts" },
  ],
  chart: {
    title: "Diagnostic Mastery Progression Model",
    subtitle: "Baseline vs. post-tutoring mentorship",
    badge: "Cohort 2025–2026",
    endLabel: "Level 9 / A*",
    series: { tutored: "With 1-on-1 mentorship", baseline: "Baseline without support" },
    description:
      "Line chart: students with one-to-one mentorship rise steadily from a diagnostic baseline to top-band mastery by week 14, while the unsupported baseline improves only slightly.",
    points: [
      { label: "Week 0: Diagnostic Audit", tutored: 22, baseline: 22 },
      { label: "Week 4: Gap Remediation", tutored: 41, baseline: 26 },
      { label: "Week 8: Exam Technique", tutored: 63, baseline: 30 },
      { label: "Week 14: Mock Mastery", tutored: 90, baseline: 35 },
    ],
  },
};

export const newsletter = {
  eyebrow: "Weekly Briefing for Parents",
  title: "Stay Informed with Academic Insights",
  body: "Receive termly UAE revision timelines, exam registration reminders, scholarship alerts and concise teaching insights straight to your inbox.",
  label: "Email address",
  placeholder: "Enter your personal or family email…",
  button: "Subscribe Free",
  pending: "Subscribing…",
  privacy: "Strict privacy. No commercial spam. Unsubscribe at any time.",
  success: "You’re subscribed. Look out for our next briefing in your inbox.",
};

export const adviceCta = {
  title: "Need personalised advice for your child?",
  body: "Speak directly with an Academic Director in Dubai or Abu Dhabi. We assess target grades and syllabus hurdles, then curate the right one-to-one mentor match.",
  primary: "Request a Tutor",
  secondary: "Speak with an Academic Director",
  locations: "Downtown Dubai • DIFC • Abu Dhabi Al Maryah Island",
  consultation: "No-Obligation 30-Minute Consultation",
};

/** Shared by every article page. */
export const articlePage = {
  breadcrumb: "Breadcrumb",
  minRead: "{n} min read",
  published: "Published {date}",
  updated: "Updated {date}",
  share: {
    label: "Share",
    native: "Share this article",
    whatsapp: "Share on WhatsApp",
    copy: "Copy link",
    copied: "Link copied",
  },
  toc: { title: "Table of Contents", count: "{n} Sections" },
  placement: {
    eyebrow: "Direct Placement",
    title: "Need a Tutor for Your Child in Dubai or Abu Dhabi?",
    body: "Hand-picked tutors for IB, A-Level, American & CBSE, with our seamless match guarantee.",
    primary: "Submit Your Requirement",
    whatsapp: "WhatsApp an Advisor",
    response: "Avg. response: 2 hours",
    confidential: "100% confidential",
  },
  compliance: {
    title: "Curriculum Compliance",
    body: "All registered mentors follow strict academic conduct standards and are vetted against current KHDA and ADEK requirements.",
    chips: ["Dubai • KHDA", "Abu Dhabi • ADEK"],
  },
  cta: {
    eyebrow: "Zero lock-in contracts • 100% satisfaction guarantee",
    title: "Ready to help your child excel? Submit your tutoring request today and get matched with the ideal expert tutor.",
    body: "Hear from our academic directors within 3 hours. Hand-picked educators are available across Downtown Dubai, Dubai Marina, Palm Jumeirah, Arabian Ranches, Al Reem Island and Saadiyat.",
    primary: "Request a Tutor",
    secondary: "Contact Academic Advisory",
  },
  tags: "Tags",
  back: "Back to Insights",
  more: "More Insights",
};
