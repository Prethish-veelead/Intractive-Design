"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, motionOk, ScrollTrigger } from "@/lib/motion";

/**
 * Lenis smooth scroll for editorial pages only (Home, About, Journal).
 * Never mount on shop, product, bag or checkout pages (rules/design-and-motion.md #6).
 */
export function SmoothScroll() {
  useEffect(() => {
    // Lenis does not smooth touch scrolling, so on phones it would only add a per-frame loop.
    if (!window.matchMedia(`${motionOk} and (pointer: fine)`).matches) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
