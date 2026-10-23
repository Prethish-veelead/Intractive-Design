"use client";

import { useRef } from "react";
import { gsap, motionOk, useGSAP } from "@/lib/motion";

/**
 * Desktop only: pins the section briefly while layers marked `data-depth` drift at
 * different speeds (higher depth = more movement). Phones and reduced motion get a static layout.
 */
export function PinnedParallax({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 768px) and ${motionOk}`, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=60%", pin: true, scrub: 0.6 },
        });
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((layer) => {
          const depth = Number(layer.dataset.depth);
          tl.fromTo(layer, { yPercent: depth * 8 }, { yPercent: depth * -8, ease: "none" }, 0);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={className}>
      {children}
    </section>
  );
}
