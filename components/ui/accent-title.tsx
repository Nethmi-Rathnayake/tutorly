import { cn } from "@/lib/utils/cn";

/**
 * Renders a heading with its last words in gold. Splitting is done on the (already translated)
 * text, so it works for English and Arabic alike: the last two words are accented when the
 * title has three or more words, otherwise the last word.
 */
export function AccentTitle({ text, accentClassName }: { text: string; accentClassName?: string }) {
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return <>{text}</>;
  const accentCount = words.length >= 3 ? 2 : 1;
  const lead = words.slice(0, -accentCount).join(" ");
  const accent = words.slice(-accentCount).join(" ");
  return (
    <>
      {lead} <span className={cn("text-brand-500", accentClassName)}>{accent}</span>
    </>
  );
}
