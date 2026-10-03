import type { Translator } from "./translate";

/**
 * Validation messages come from the shared zod schemas (and the server action) in English.
 * Fixed messages translate directly; the templated ones from `text()` / `optionalText()` in
 * lib/validations/common.ts are matched here so their field label is translated too.
 */
const patterns: [RegExp, string][] = [
  [/^(.+) is required$/, "{field} is required"],
  [/^(.+) must be at least (\d+) characters$/, "{field} must be at least {count} characters"],
  [/^(.+) must be (\d+) characters or fewer$/, "{field} must be {count} characters or fewer"],
];

export function translateError(message: string, t: Translator) {
  const direct = t(message);
  if (direct !== message) return direct;
  for (const [pattern, template] of patterns) {
    const match = message.match(pattern);
    if (match) return t(template, { field: t(match[1]), count: match[2] ?? "" });
  }
  return message;
}
