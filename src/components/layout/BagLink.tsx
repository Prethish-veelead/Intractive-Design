"use client";

import Link from "next/link";
import { useRef } from "react";
import { Handbag } from "@phosphor-icons/react";
import { useBagCount } from "@/lib/bag";
import { ease, gsap, motionOk, useGSAP } from "@/lib/motion";

/** Bag icon with item count; gives a small pop whenever the count goes up. */
export function BagLink({ href, label }: { href: string; label: string }) {
  const count = useBagCount();
  const root = useRef<HTMLAnchorElement>(null);
  const previous = useRef(count);

  useGSAP(
    () => {
      const grew = count > previous.current;
      previous.current = count;
      if (!grew || !window.matchMedia(motionOk).matches) return;
      gsap
        .timeline()
        .to("[data-bag-icon]", { scale: 1.2, rotation: -8, duration: 0.16, ease: ease.soft })
        .to("[data-bag-icon]", { scale: 1, rotation: 0, duration: 0.4, ease: ease.silk })
        .fromTo("[data-bag-count]", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: ease.silk }, 0.1);
    },
    { scope: root, dependencies: [count] },
  );

  return (
    <Link
      ref={root}
      href={href}
      aria-label={count ? `${label} (${count})` : label}
      className="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-blush/60"
    >
      <span data-bag-icon className="flex"><Handbag size={20} weight="light" /></span>
      {count > 0 && (
        <span data-bag-count className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose px-1 text-[10px] font-medium leading-none text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
