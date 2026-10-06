"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const INTERVAL_MS = 5000;

/** Full-bleed background that cross-fades slowly between photos (static under reduced motion). */
export function HeroSlideshow({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % images.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div aria-hidden className="absolute inset-0 -z-20">
      {images.map((src, i) => (
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
      ))}
    </div>
  );
}
