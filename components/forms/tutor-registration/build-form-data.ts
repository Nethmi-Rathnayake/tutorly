import type { TutorRegistrationValues } from "@/lib/validations/tutor-registration";

/**
 * Packs the registration for the Server Action: the form values as JSON plus the headshot as a real
 * file part. The in-browser photo metadata is left out; the server validates the file itself.
 */
export function buildRegistrationFormData(values: TutorRegistrationValues, photo: File): FormData {
  const { photo: metadata, ...rest } = values;
  void metadata;
  const body = new FormData();
  body.set("data", JSON.stringify(rest));
  body.set("photo", photo, "headshot.jpg");
  return body;
}
