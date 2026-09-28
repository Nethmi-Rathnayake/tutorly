import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  action?: { label: string; href: string; pill?: boolean };
};

export function SectionHeading({ id, eyebrow, title, description, align = "left", action }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
      )}
    >
      <div className={cn(centered && "max-w-2xl")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem] sm:leading-tight">
          {title}
        </h2>
        {description && <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900",
            action.pill && "rounded-full bg-white px-4 py-2 ring-1 ring-brand-100 hover:ring-brand-300",
          )}
        >
          {action.label}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
