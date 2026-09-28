import { cn } from "@/lib/utils/cn";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600", className)}>
      {children}
    </p>
  );
}
