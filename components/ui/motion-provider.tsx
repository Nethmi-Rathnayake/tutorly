"use client";

import { LazyMotion } from "framer-motion";

// Animation features load in their own chunk after the page is interactive, instead of
// shipping the full `motion` component with every page's first JavaScript.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
