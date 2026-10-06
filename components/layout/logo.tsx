"use client";

import { Link } from "@/components/ui/link";
import Image from "next/image";
import { siteConfig } from "@/lib/constants/site";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils/cn";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const t = useT();
  return (
    <Link
      href="/"
      aria-label={t("{name} home", { name: siteConfig.name })}
      className="flex shrink-0 items-center gap-2 rounded-lg sm:gap-2.5 focus-visible:outline-2 focus-visible:outline-brand-500"
    >
      <Image src="/logo.png" alt="" width={312} height={312} priority className="size-9 object-contain sm:size-11" />
      <span className={cn("font-[family-name:var(--font-brand)] text-lg font-normal sm:text-xl", tone === "light" ? "text-white" : "text-ink")}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
