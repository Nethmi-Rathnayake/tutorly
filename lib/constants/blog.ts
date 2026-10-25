/**
 * Copy for the Blog listing (/blog) and the shared parts of each article page (/blog/[slug]).
 * Articles themselves live in ./blog-posts.ts.
 * Unverified outcome figures, response times, guarantees, release schedules and KHDA/ADEK compliance
 * wording were removed; add them back only with approved content (SRS §11, §27).
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
  cta: "Read Full Article",
};

export const latestArticles = {
  eyebrow: "Curated Intelligence",
  title: "Latest Academic Articles",
  resultsTitle: "Matching Articles",
  read: "Read",
  empty: { title: "No articles match your search", body: "Try a different keyword or browse all articles.", reset: "Clear filters" },
};

export const newsletter = {
  eyebrow: "Briefings for Parents",
  title: "Stay Informed with Academic Insights",
  body: "Receive UAE revision timelines, exam registration reminders and concise teaching insights straight to your inbox.",
  label: "Email address",
  placeholder: "Enter your personal or family email…",
  button: "Subscribe Free",
  pending: "Subscribing…",
  privacy: "Strict privacy. No commercial spam. Unsubscribe at any time.",
  success: "You’re subscribed. Look out for our next briefing in your inbox.",
};

export const adviceCta = {
  title: "Need personalised advice for your child?",
  body: "Tell us about your child’s target grades and syllabus needs and our team will get in touch about a one-to-one tutor.",
  primary: "Request a Tutor",
  secondary: "Contact Our Team",
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
    body: "Private tutor requests for IB, A-Level, American & CBSE students.",
    primary: "Submit Your Requirement",
    whatsapp: "WhatsApp Our Team",
  },
  cta: {
    eyebrow: "Request a Tutor",
    title: "Ready to get started? Submit your tutoring request today and our team will get in touch.",
    body: "Tell us your child’s subject, curriculum and schedule and our team will look for a suitable tutor.",
    primary: "Request a Tutor",
    secondary: "Contact Our Team",
  },
  tags: "Tags",
  back: "Back to Insights",
  more: "More Insights",
};
