import { featuredTutorIds, tutors } from "@/lib/data/tutors";
import type { Tutor } from "@/types/tutor";

/**
 * Tutor data access. Backed by in-memory placeholder records for now; swap the
 * implementation for a database query without changing callers.
 */

export async function getFeaturedTutors(): Promise<Tutor[]> {
  return featuredTutorIds
    .map((id) => tutors.find((t) => t.id === id))
    .filter((t): t is Tutor => Boolean(t && t.verified));
}

export async function getTutorById(id: string | undefined): Promise<Tutor | undefined> {
  return id ? tutors.find((t) => t.id === id && t.verified) : undefined;
}
