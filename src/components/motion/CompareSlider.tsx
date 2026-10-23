"use client";

import { useRef, useState } from "react";
import { Draggable, gsap, useGSAP } from "@/lib/motion";
import { SwatchStroke } from "@/components/ui/ShadeViews";

type Tone = "medium" | "tan";
type Props = {
  shadeHex: string;
  title: string;
  hint: string;
  /** Label of the tone picker for the right-hand side. */
  compareWith: string;
  labels: { fair: string; medium: string; tan: string };
};

// Placeholder skin tones until real swatch photos exist (task-plan 3.4).
const fairSkin = "linear-gradient(135deg, #f4dccb, #e9c4ab)";
const rightSkins: Record<Tone, string> = {
  medium: "linear-gradient(135deg, #d6a27c, #b98260)",
  tan: "linear-gradient(135deg, #a8724f, #7f4f35)",
};
const tones: Tone[] = ["medium", "tan"];

/**
 * Shows the shade on three skin tones: fair on the left, medium or tan (picked above) on the
 * right. Drag the handle (or use arrow keys) to compare.
 */
export function CompareSlider({ shadeHex, title, hint, compareWith, labels }: Props) {
  const [tone, setTone] = useState<Tone>("medium");
  const toneButtons = useRef<Partial<Record<Tone, HTMLButtonElement | null>>>({});

  // Radio group keys: Left/Right (and Up/Down) move the choice and focus, wrapping around.
  const onToneKey = (e: React.KeyboardEvent) => {
    const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as Record<string, number>)[e.key];
    if (step === undefined) return;
    e.preventDefault();
    const next = tones[(tones.indexOf(tone) + step + tones.length) % tones.length];
    setTone(next);
    toneButtons.current[next]?.focus();
  };
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
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="text-sm text-ink/70">{title}</p>
        <div role="radiogroup" aria-label={compareWith} onKeyDown={onToneKey} className="flex rounded-full bg-blush/50 p-1 ring-1 ring-rosewood/5">
          {tones.map((t) => (
            <button
              key={t}
              ref={(el) => {
                toneButtons.current[t] = el;
              }}
              type="button"
              role="radio"
              aria-checked={tone === t}
              tabIndex={tone === t ? 0 : -1}
              onClick={() => setTone(t)}
              className={`flex min-h-11 items-center gap-2 rounded-full px-3.5 text-xs transition-[background-color,color,box-shadow] duration-300 ease-silk ${tone === t ? "bg-ivory text-rosewood shadow-soft" : "text-ink/70 hover:text-rosewood"}`}
            >
              <span aria-hidden className="h-3 w-3 rounded-full ring-1 ring-ink/10" style={{ background: rightSkins[t] }} />
              {labels[t]}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={box}
        className="relative mt-3 aspect-[16/9] select-none overflow-hidden rounded-3xl ring-1 ring-rosewood/10"
        style={{ "--pos": "50%" } as React.CSSProperties}
      >
        {/* Both right-hand tones stay mounted so switching is a quick crossfade. */}
        {tones.map((t) => (
          <div
            key={t}
            data-tone={t}
            aria-hidden={tone !== t}
            className={`absolute inset-0 transition-opacity duration-300 ease-silk ${tone === t ? "opacity-100" : "opacity-0"}`}
          >
            <SkinPanel background={rightSkins[t]} shadeHex={shadeHex} label={labels[t]} labelSide="right" />
          </div>
        ))}
        <div className="absolute inset-0" style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}>
          <SkinPanel background={fairSkin} shadeHex={shadeHex} label={labels.fair} labelSide="left" />
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
      <SwatchStroke hex={shadeHex} className="absolute inset-0 h-full w-full" />
      <span className={`absolute top-3 rounded-full bg-ivory/80 px-2.5 py-1 text-[11px] text-ink/80 ${labelSide === "left" ? "left-3" : "right-3"}`}>
        {label}
      </span>
    </div>
  );
}
