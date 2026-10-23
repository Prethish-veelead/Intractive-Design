"use client";

import { useEffect, useRef, useState } from "react";

/** Hero "silk": two slow colour fields (globals.css). Paused while off screen so the loop costs nothing. */
export function SilkBackground() {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} aria-hidden data-paused={visible ? undefined : ""} className="pointer-events-none absolute inset-0">
      <div className="silk silk-a -right-56 -top-56 h-[48rem] w-[48rem]" />
      <div className="silk silk-b -left-72 top-1/3 h-[44rem] w-[44rem]" />
    </div>
  );
}
