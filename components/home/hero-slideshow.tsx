"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const INTERVAL_MS = 5000;

/** Full-bleed background that cross-fades slowly between photos (static under reduced motion). */
export function HeroSlideshow({ images }: { images: string[] }) {
  // Number of slides advanced so far. The photos shown so far plus the next one are mounted, so
  // the home page doesn't download the whole slideshow up front.
  const [tick, setTick] = useState(0);
  const count = images.length;
  const active = tick % count;

  useEffect(() => {
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((n) => n + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <div aria-hidden className="absolute inset-0 -z-20">
      {images.map((src, i) => {
        if (tick + 1 < count && i > tick + 1) return null;
        return (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            preload={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover object-center transition-opacity duration-[2000ms] ease-in-out",
              i === active ? "opacity-100" : "opacity-0",
            )}
          />
        );
      })}
    </div>
  );
}
