/**
 * Options and copy for the parent tutoring-requirement wizard (SRS FR-05, §7).
 * Marketing copy for the surrounding page lives in `lib/constants/concierge.ts`.
 */

export const phoneCountryOptions = [
  { value: "+44", label: "+44 (UK)" },
  { value: "+971", label: "+971 (UAE)" },
  { value: "+1", label: "+1 (US / CA)" },
  { value: "+91", label: "+91 (IN)" },
  { value: "+966", label: "+966 (SA)" },
  { value: "+974", label: "+974 (QA)" },
  { value: "+965", label: "+965 (KW)" },
  { value: "+973", label: "+973 (BH)" },
  { value: "+968", label: "+968 (OM)" },
  { value: "+65", label: "+65 (SG)" },
  { value: "+61", label: "+61 (AU)" },
  { value: "+33", label: "+33 (FR)" },
  { value: "+49", label: "+49 (DE)" },
] as const;

export const relationshipOptions = [
  { value: "mother", label: "Mother" },
  { value: "father", label: "Father" },
  { value: "guardian", label: "Legal Guardian" },
  { value: "self", label: "I am the student" },
  { value: "other", label: "Other" },
] as const;

export const contactChannelOptions = [
  { value: "whatsapp", label: "WhatsApp Direct", hint: "Immediate mobile liaison" },
  { value: "phone", label: "Phone Call", hint: "Scheduled 10-min briefing" },
  { value: "email", label: "Email Briefing", hint: "Complete summary by email" },
] as const;

export const learningStyleOptions = [
  { value: "visual", label: "Visually Driven & Concept Maps" },
  { value: "exam-drills", label: "Rigorous Exam-Paper Drills" },
  { value: "step-by-step", label: "Step-by-step Mathematical Derivations" },
  { value: "confidence", label: "Needs Confidence Building" },
  { value: "independent", label: "Independent & High Paced" },
] as const;

export const GRADE_SCALE_MAX = 7;

export const modeOptions = [
  {
    value: "online",
    title: "Online 1-on-1 Interactive",
    description:
      "HD stylus whiteboard, automated session recordings, and direct access to global Ivy & Oxbridge mentors.",
    features: ["Live Collaborative Board", "Instant Notes PDF Export"],
    tag: "Recommended",
  },
  {
    value: "in-person",
    title: "In-Person Home Visits",
    description:
      "Face-to-face visits at residential home or library, subject to certified tutor proximity in your area.",
    features: ["Full Identity & Background Screened", "Verified Coverage in Greater Metro Zones"],
    tag: "Area dependent",
  },
] as const;

export const lessonsPerWeekOptions = [
  { value: "1", label: "1× / wk", hint: "Standard cadence" },
  { value: "2", label: "2× / wk", hint: "Recommended for exam years" },
  { value: "3", label: "3+ Intensive Drill", hint: "Accelerated exam prep" },
] as const;

export const durationOptions = [
  { value: "60", label: "60 Mins" },
  { value: "90", label: "90 Mins (Standard HL)" },
  { value: "120", label: "120 Mins (Double Session)" },
] as const;

export const dayOptions = [
  { value: "mon", short: "M", label: "Mon" },
  { value: "tue", short: "T", label: "Tue" },
  { value: "wed", short: "W", label: "Wed" },
  { value: "thu", short: "T", label: "Thu" },
  { value: "fri", short: "F", label: "Fri" },
  { value: "sat", short: "S", label: "Sat" },
  { value: "sun", short: "S", label: "Sun" },
] as const;

export const timeWindowOptions = [
  { value: "morning", label: "Morning", hint: "9:00 AM – 12:00 PM" },
  { value: "after-school", label: "After School", hint: "4:00 PM – 6:00 PM" },
  { value: "evening", label: "Evening", hint: "6:30 PM – 8:30 PM" },
  { value: "weekend", label: "Weekend Intensive", hint: "Flexible custom blocks" },
] as const;

/** Exam sessions are labelled with the next upcoming year so the options never go stale. */
export function examSessionOptions(now = new Date()) {
  // Labels are "{year}" templates so they can be translated before the year is filled in.
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based
  const nextMay = month >= 5 ? year + 1 : year;
  const nextNov = month >= 10 ? year + 1 : year;
  return [
    { value: "summer-finals", label: "May {year} Final Exams", year: nextMay, hint: "IB Diploma / CIE A-Levels / AP Series" },
    { value: "november-resits", label: "November {year} Resits", year: nextNov, hint: "Grade elevation & retake strategies" },
    { value: "school-mocks", label: "Internal School Mocks", hint: "Predicted grade stabilization" },
    { value: "coursework", label: "Coursework / IA Polish", hint: "Immediate submission review & proofing" },
    { value: "ongoing", label: "Ongoing Support", hint: "No specific exam – steady progress" },
  ];
}

export const tutorPreferenceOptions = [
  { value: "senior-examiner", label: "Senior / Chief Examiner Experience", hint: "Official IB / Cambridge / Edexcel marker" },
  { value: "oxbridge-ivy", label: "Oxbridge / Ivy League Graduate", hint: "First-Class Honours in relevant subject" },
  { value: "neurodiverse", label: "Neurodiverse / ADHD Pacing Skills", hint: "Executive function & structured recall" },
  { value: "bilingual", label: "Bilingual Instruction", hint: "Explains concepts in a second language" },
] as const;

export const tutorGenderOptions = [
  { value: "any", label: "No preference" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
] as const;

export const urgencyOptions = [
  { value: "48h", label: "Within 24–48 Hrs", hint: "Urgent Placement" },
  { value: "weekend", label: "This Weekend", hint: "Saturday or Sunday slot" },
  { value: "7days", label: "Within 7 Days", hint: "Standard Diagnostic" },
] as const;

export const UPLOAD_MAX_BYTES = 25 * 1024 * 1024;
export const UPLOAD_ACCEPT = {
  "application/pdf": ".pdf",
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
} as const;

export const requestSteps = [
  {
    id: "parent",
    label: "Parent",
    sublabel: "Details",
    title: "Parent & Guardian Details",
    description: "Primary family contact for intake consultation, schedule verification, and academic liaison updates.",
    next: "Continue to Student Profile",
  },
  {
    id: "student",
    label: "Student",
    sublabel: "Profile",
    title: "Student Profile & Academic Standing",
    description: "Your student's current level, curriculum, learning style and target grade.",
    next: "Continue to Subject Requirement",
  },
  {
    id: "subject",
    label: "Subject",
    sublabel: "Requirement",
    title: "Subject & Curriculum Requirement",
    description: "The subject your student needs help with, the exam board, and how they'd like to learn.",
    next: "Continue to Schedule",
  },
  {
    id: "schedule",
    label: "Schedule",
    sublabel: "Frequency",
    title: "Schedule & Session Frequency",
    description: "Weekly frequency, session length, and the days and times that work for your family.",
    next: "Continue to Notes",
  },
  {
    id: "notes",
    label: "Notes",
    sublabel: "Diagnostic",
    title: "Diagnostic Notes & Preferences",
    description: "Exam deadlines, learning challenges, supporting documents and tutor preferences.",
    next: "Continue to Review",
  },
  {
    id: "review",
    label: "Review",
    sublabel: "Placement",
    title: "Review & Submit for Placement",
    description:
      "Please confirm your details. Once submitted, our placement committee reviews your requirement and contacts you directly.",
    next: "Submit Requirement",
  },
] as const;

/** The seven emirates of the UAE (values are stored as the English name). */
export const emirateOptions = [
  { value: "Abu Dhabi", label: "Abu Dhabi" },
  { value: "Dubai", label: "Dubai" },
  { value: "Sharjah", label: "Sharjah" },
  { value: "Ajman", label: "Ajman" },
  { value: "Umm Al Quwain", label: "Umm Al Quwain" },
  { value: "Ras Al Khaimah", label: "Ras Al Khaimah" },
  { value: "Fujairah", label: "Fujairah" },
] as const;

/** The request form is a single step; the six-step `requestSteps` above only feeds the FAQ blueprint. */
export const requestFormStep = {
  title: "Parent & Guardian Details",
  description: "Primary family contact for intake consultation, schedule verification, and academic liaison updates.",
  next: "Submit Requirement",
} as const;

/** Curriculum choices for the request form; `value` is the taxonomy curriculum id. */
export const requestCurriculumOptions = [
  { value: "british", label: "British Curriculum (IGCSE / A-Levels)" },
  { value: "american", label: "American Curriculum (US High School / AP)" },
  { value: "ib", label: "International Baccalaureate (IB - PYP / MYP / DP)" },
  { value: "uae-moe", label: "UAE Ministry of Education (MoE Curriculum)" },
  { value: "indian", label: "Indian Curriculum (CBSE / ICSE)" },
  { value: "canadian", label: "Canadian Curriculum" },
  { value: "other", label: "Other International Curriculums" },
] as const;
