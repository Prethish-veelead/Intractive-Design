"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { duration, ease, gsap, motionOk, ScrollTrigger, useGSAP } from "@/lib/motion";

/**
 * Wraps page content. Every element marked `data-reveal` fades up as it enters the
 * viewport; neighbours entering together are staggered. Re-runs on each navigation.
 */
export function RevealRoot({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionOk, () => {
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => {
            els.forEach((el) => el.classList.add("is-revealed"));
            gsap.to(els, { opacity: 1, y: 0, duration: duration.reveal, ease: ease.soft, stagger: 0.07, overwrite: true });
          },
        });
      });
      // Reduced motion: no fade, but still let one-off details (shimmer) know they are on screen.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        root.current?.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-revealed"));
      });
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <main ref={root} className="flex-1">
      {children}
    </main>
  );
}
