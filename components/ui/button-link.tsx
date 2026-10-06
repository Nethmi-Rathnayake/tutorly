import { Link } from "@/components/ui/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "violet" | "ghost" | "soft";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-b from-[#ecd28c] to-[#c9a24e] text-brand-900 shadow-[0_10px_24px_-10px_rgba(201,162,78,0.8)] hover:shadow-[0_14px_30px_-10px_rgba(201,162,78,0.9)]",
  violet:
    "bg-linear-to-b from-[#ecd28c] to-[#c9a24e] text-brand-900 shadow-[0_10px_24px_-10px_rgba(201,162,78,0.8)] hover:shadow-[0_14px_30px_-10px_rgba(201,162,78,0.9)]",
  ghost: "bg-white/70 text-ink ring-1 ring-brand-300 hover:bg-white hover:ring-brand-400",
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
          className="rtl:-scale-x-100 size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
        />
      )}
    </Link>
  );
}
