"use client";

import { useRef } from "react";
import { Draggable, gsap, useGSAP } from "@/lib/motion";

type Props = { shadeHex: string; title: string; hint: string; leftLabel: string; rightLabel: string };

// Placeholder skin tones until real swatch photos exist (task-plan 3.4).
const fairSkin = "linear-gradient(135deg, #f4dccb, #e9c4ab)";
const deepSkin = "linear-gradient(135deg, #a8724f, #7f4f35)";

/** Shows the shade on two skin tones; drag the handle (or use arrow keys) to compare. */
export function CompareSlider({ shadeHex, title, hint, leftLabel, rightLabel }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLDivElement>(null);
  const draggable = useRef<Draggable | null>(null);
  const pct = useRef(50);

  const place = (value: number) => {
    pct.current = Math.max(0, Math.min(100, value));
    const width = box.current!.clientWidth;
    gsap.set(knob.current, { x: (pct.current / 100) * width });
    box.current!.style.setProperty("--pos", `${pct.current}%`);
    knob.current!.setAttribute("aria-valuenow", String(Math.round(pct.current)));
  };

  useGSAP(
    () => {
      // Bounds as numbers so the handle's centre line can reach both edges.
      const bounds = () => ({ minX: 0, maxX: box.current!.clientWidth });
      place(pct.current);
      draggable.current = Draggable.create(knob.current, {
        type: "x",
        bounds: bounds(),
        cursor: "ew-resize",
        zIndexBoost: false,
        onDrag() {
          place((this.x / box.current!.clientWidth) * 100);
        },
      })[0];
      const onResize = () => {
        place(pct.current);
        draggable.current?.applyBounds(bounds());
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: box },
  );

  // gsap.set only (no tweens), so this needs no context wrapping.
  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = ({ ArrowLeft: -5, ArrowRight: 5, Home: -100, End: 100 } as Record<string, number>)[e.key];
    if (delta === undefined) return;
    e.preventDefault();
    place(pct.current + delta);
    draggable.current?.update();
  };

  return (
    <div className="mt-10">
      <p className="text-sm text-ink/70">{title}</p>
      <div
        ref={box}
        className="relative mt-3 aspect-[16/9] select-none overflow-hidden rounded-3xl ring-1 ring-rosewood/10"
        style={{ "--pos": "50%" } as React.CSSProperties}
      >
        <SkinPanel background={deepSkin} shadeHex={shadeHex} label={rightLabel} labelSide="right" />
        <div className="absolute inset-0" style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}>
          <SkinPanel background={fairSkin} shadeHex={shadeHex} label={leftLabel} labelSide="left" />
        </div>
        <div
          ref={knob}
          role="slider"
          tabIndex={0}
          aria-label={hint}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          onKeyDown={onKeyDown}
          className="group absolute inset-y-0 left-0 -ml-6 flex w-12 touch-none justify-center outline-none"
        >
          <span className="h-full w-px bg-ivory/90" />
          <span className="absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-rosewood shadow-lift ring-1 ring-rosewood/10 transition-transform duration-300 ease-silk group-focus-visible:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-rosewood">
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
              <path d="M5 1 1 5l4 4M13 1l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
      <p className="mt-2 text-xs text-ink/50">{hint}</p>
    </div>
  );
}

function SkinPanel({ background, shadeHex, label, labelSide }: { background: string; shadeHex: string; label: string; labelSide: "left" | "right" }) {
  return (
    <div className="absolute inset-0" style={{ background }}>
      {/* Brush-stroke swatch; multiply lets the skin tone show through like real pigment. */}
      <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path
          d="M28 112 C 70 70, 130 64, 180 78 S 270 98, 296 70 L 300 92 C 268 126, 210 118, 170 108 S 80 104, 34 138 Z"
          fill={shadeHex}
          opacity="0.92"
          style={{ mixBlendMode: "multiply" }}
        />
      </svg>
      <span className={`absolute top-3 rounded-full bg-ivory/80 px-2.5 py-1 text-[11px] text-ink/80 ${labelSide === "left" ? "left-3" : "right-3"}`}>
        {label}
      </span>
    </div>
  );
}
