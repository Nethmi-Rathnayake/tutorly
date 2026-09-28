/**
 * Copy for the "Request a Tutor" page (/request-a-tutor).
 * PLACEHOLDER: the concierge profile, metrics (98.4%, Top 1.8%), guarantees,
 * compliance badges and testimonial come from the design and must be confirmed
 * by the business before launch (SRS §11, §27).
 */

export const requestPageIntro = {
  eyebrow: "Concierge Intake Portal • Direct Admin Review • 100% Confidential",
  title: "Tell Us What You Need",
  description:
    "Submit your student's academic profile. Our Senior Academic Placement Committee evaluates every request individually to match your family with an accredited master educator.",
};

export const placementDirector = {
  name: "Sarah Jenkins, M.Ed.",
  role: "Director of Academic Placement",
  credentials: "Oxford (BA) • Columbia Teachers College",
  image: "/images/concierge.jpg",
  quote:
    "We don't maintain an open directory. When you submit this requirement, I convene with our faculty heads to identify the single educator who matches your student's exact cognitive style.",
};

export const placementLifecycle = [
  { title: "Requirement Submitted", body: "Syllabus, target grade, learning gaps captured." },
  { title: "Committee Alignment Review", body: "Faculty evaluates past papers and examiner fit within 24h." },
  { title: "Bespoke Tutor Dossier Delivered", body: "Detailed CV, examiner credentials & study plan preview." },
  { title: "Diagnostic Trial Session", body: "100% money-back satisfaction guarantee for parents." },
];

export const networkMetrics = {
  title: "Vetted Network Metrics",
  subtitle: "Arch-Standard Quality Baseline",
  stats: [
    { value: "98.4%", label: "Placement Success" },
    { value: "Top 1.8%", label: "Examiner Network" },
  ],
  guarantee: {
    title: "Confidentiality Guarantee",
    body: "Your email and telephone are never sold, auctioned, or broadcast to open tutor marketplaces.",
  },
};

export const requestTestimonial = {
  quote:
    "Finding someone who genuinely understood Cambridge Further Maths STEP papers was impossible until TutorFlow assigned Dr. Aris. It saved our daughter's Cambridge offer.",
  name: "Lady C. Montgomery",
  context: "Eton / Cambridge Placement",
};

export const academicAssurance = {
  title: "Concierge Academic Assurance",
  body: "Triple-vetted academic scholars, bespoke matching, and a 100% initial session guarantee for parents.",
  badges: ["FERPA Compliant", "Background Certified"],
};
