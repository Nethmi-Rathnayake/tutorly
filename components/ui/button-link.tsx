import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "violet" | "ghost" | "soft";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-r from-brand-700 to-brand-600 text-white shadow-[0_10px_24px_-10px_rgba(67,49,190,0.7)] hover:shadow-[0_14px_30px_-10px_rgba(67,49,190,0.8)]",
  violet:
    "bg-linear-to-r from-violet-brand to-brand-600 text-white shadow-[0_10px_24px_-10px_rgba(109,40,217,0.7)] hover:shadow-[0_14px_30px_-10px_rgba(109,40,217,0.8)]",
  ghost: "bg-white/70 text-ink ring-1 ring-brand-100 hover:bg-white hover:ring-brand-200",
  soft: "bg-brand-50 text-brand-700 hover:bg-brand-100",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-sm",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
