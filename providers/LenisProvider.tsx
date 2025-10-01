"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 1.1, // seconds (feel free to tweak)
      easing: (t: number) => 1 - Math.pow(1 - t, 2), // easeOutQuad
      smoothWheel: !prefersReduced,
      touchMultiplier: 1.2,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
