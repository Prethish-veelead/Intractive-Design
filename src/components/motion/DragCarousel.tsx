"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Draggable, duration, ease, gsap, motionOk, useGSAP } from "@/lib/motion";

type Props = { children: React.ReactNode; prevLabel: string; nextLabel: string };

/**
 * Horizontal product rail: drag/throw with inertia (snaps to cards), arrow buttons,
 * and keyboard focus keeps the focused card in view. Children must be <li> items.
 */
export function DragCarousel({ children, prevLabel, nextLabel }: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const draggable = useRef<Draggable | null>(null);
  const [edge, setEdge] = useState({ atStart: true, atEnd: false });

  const minX = () => Math.min(0, viewport.current!.clientWidth - track.current!.scrollWidth);
  const snapPoints = () => {
    const min = minX();
    const points = Array.from(track.current!.children, (li) => Math.max(min, -(li as HTMLElement).offsetLeft));
    return [...new Set([...points, min])];
  };
  const syncEdges = () => {
    const x = Number(gsap.getProperty(track.current, "x"));
    const atStart = x >= -1;
    const atEnd = x <= minX() + 1;
    setEdge((prev) => (prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd }));
  };

  // Created inside useGSAP so tweens started from clicks belong to its context and are cleaned up.
  const moveTo = useRef<(x: number) => void>(() => {});

  useGSAP(
    (_, contextSafe) => {
      const animate = window.matchMedia(motionOk).matches;
      moveTo.current = contextSafe!((x: number) => {
        gsap.to(track.current, {
          x,
          duration: animate ? duration.reveal : 0,
          ease: ease.silk,
          overwrite: true,
          onUpdate: () => {
            draggable.current?.update();
            syncEdges();
          },
        });
      });

      draggable.current = Draggable.create(track.current, {
        type: "x",
        bounds: { minX: minX(), maxX: 0 },
        inertia: animate,
        edgeResistance: 0.85,
        dragClickables: true,
        zIndexBoost: false,
        cursor: "grab",
        activeCursor: "grabbing",
        snap: { x: (value: number) => gsap.utils.snap(snapPoints(), value) },
        onDrag: syncEdges,
        onThrowUpdate: syncEdges,
        onDragEnd: syncEdges,
      })[0];

      const onResize = () => {
        draggable.current?.applyBounds({ minX: minX(), maxX: 0 });
        syncEdges();
      };
      window.addEventListener("resize", onResize);
      syncEdges();
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: viewport },
  );

  const step = (dir: 1 | -1) => {
    const x = Number(gsap.getProperty(track.current, "x"));
    const points = snapPoints();
    const target = dir === 1 ? points.find((p) => p < x - 1) : [...points].reverse().find((p) => p > x + 1);
    if (target !== undefined) moveTo.current(target);
  };

  // Keyboard users tab through cards; bring the focused one into view.
  const onFocus = (e: React.FocusEvent) => {
    const li = (e.target as HTMLElement).closest("li");
    if (li) moveTo.current(Math.max(minX(), Math.min(0, -li.offsetLeft)));
  };

  return (
    <div>
      <div ref={viewport} className="overflow-x-clip">
        <ul ref={track} onFocus={onFocus} className="relative flex touch-pan-y gap-4 md:gap-6">
          {children}
        </ul>
      </div>
      <div className="mt-8 flex justify-end gap-2">
        <ArrowButton label={prevLabel} disabled={edge.atStart} onClick={() => step(-1)}><ArrowLeft size={18} weight="light" /></ArrowButton>
        <ArrowButton label={nextLabel} disabled={edge.atEnd} onClick={() => step(1)}><ArrowRight size={18} weight="light" /></ArrowButton>
      </div>
    </div>
  );
}

function ArrowButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full text-rosewood ring-1 ring-rosewood/20 transition-[background-color,opacity,transform] duration-300 ease-press hover:bg-blush/60 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
