export type TeachingMode = "online" | "in-person";
export type AvailabilityWindow = "weekdays" | "weekends" | "mornings";
export type TutorGender = "female" | "male";
export type Currency = "GBP" | "USD" | "AED";

export type Tutor = {
  id: string;
  name: string;
  /** Degree / role line shown under the name. */
  headline: string;
  /** Short credential badge, e.g. "Certified Master Tutor". */
  badge: string;
  image: string;
  gender: TutorGender;
  verified: boolean;
  /** Green dot when currently taking new sessions, amber when limited. */
  availabilityStatus: "open" | "limited";
  rating: number;
  reviewCount: number;
  /** Exam/curriculum tags; the last one is visually highlighted. */
  programTags: string[];
  focusTopics: string[];
  bio: string;
  locationLabel: string;
  modes: TeachingMode[];
  availability: AvailabilityWindow[];
  experienceYears: number;
  rate: { amount: number; currency: Currency };
  /** Taxonomy references (ids from lib/constants/taxonomy.ts). */
  levels: string[];
  curricula: string[];
  subjectCategories: string[];
};
