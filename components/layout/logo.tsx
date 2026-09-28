import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";

export function Logo() {
  // Brand name renders as "Tutor" + accented "Flow", matching the design.
  const split = siteConfig.name.match(/^(.*?)(Flow)$/);
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-brand-500"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-brand-700 to-brand-600 text-white shadow-md shadow-brand-600/30">
        <GraduationCap aria-hidden className="size-5" />
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">
        {split ? (
          <>
            {split[1]}
            <span className="text-brand-600">{split[2]}</span>
          </>
        ) : (
          siteConfig.name
        )}
      </span>
    </Link>
  );
}
