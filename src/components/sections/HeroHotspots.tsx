"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ProductKind } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { Price } from "@/components/ui/Price";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ShadeSwatch } from "@/components/ui/ShadeSwatch";

type Place = "above" | "below";

export type Look = {
  /** Position on the photo, in % of the photo's width and height. */
  x: number;
  y: number;
  /** Preferred side for the card; it flips when that side would run off the screen. */
  place: Place;
  name: string;
  kind: ProductKind;
  shade: { name: string; hex: string; image?: string };
  price: number;
  href: string;
};

type Props = { looks: Look[]; lang: Locale; labels: { shopTheLook: string; view: string } };

/**
 * "Shop the look" dots on the hero photo. The layer has the photo's own 4:5 shape and is centred
 * like `object-cover`, so the % positions land on the same spot when the frame is square (phones).
 */
export function HeroHotspots({ looks, lang, labels }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [place, setPlace] = useState<Place>("below");

  // Open on the preferred side unless the card would leave the screen there (e.g. the lips card
  // on a phone's first screen, where the dot sits near the bottom edge).
  const toggle = (i: number, button: HTMLButtonElement) => {
    if (open === i) {
      setOpen(null);
      return;
    }
    const dot = button.getBoundingClientRect();
    const centre = dot.top + dot.height / 2;
    const needed = (cards.current[i]?.offsetHeight ?? 0) + 28; // card + gap to the dot
    const fits: Record<Place, boolean> = {
      below: centre + needed <= window.innerHeight,
      above: centre - needed >= 80, // below the floating header
    };
    const preferred = looks[i].place;
    const other: Place = preferred === "below" ? "above" : "below";
    setPlace(fits[preferred] || !fits[other] ? preferred : other);
    setOpen(i);
  };

  useEffect(() => {
    if (open === null) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      buttons.current[open]?.focus({ preventScroll: true });
      setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={root} className="pointer-events-none absolute inset-2 [html:not(.js)_&]:hidden">
      <div className="absolute inset-x-0 top-1/2 aspect-[4/5] -translate-y-1/2">
        {looks.map((look, i) => {
          const isOpen = open === i;
          const side = isOpen ? place : look.place;
          const cardId = `look-${i}`;
          return (
            <div
              key={look.href}
              data-hotspot
              className={`pointer-events-auto absolute ${isOpen ? "z-20" : "z-10"}`}
              style={{ left: `${look.x}%`, top: `${look.y}%` }}
              onBlur={(e) => {
                if (isOpen && !e.currentTarget.contains(e.relatedTarget)) setOpen(null);
              }}
            >
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={cardId}
                aria-label={`${labels.shopTheLook}: ${look.name}, ${look.shade.name}`}
                onClick={(e) => toggle(i, e.currentTarget)}
                className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none"
              >
                <span data-hotspot-ring aria-hidden className="absolute h-5 w-5 rounded-full ring-1 ring-ivory/90" />
                <span
                  aria-hidden
                  className="relative flex h-5 w-5 items-center justify-center rounded-full bg-ivory/35 shadow-dot ring-[1.5px] ring-ivory transition-[scale,background-color] duration-300 ease-silk group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-rosewood group-aria-expanded:scale-110 group-aria-expanded:bg-ivory"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-ivory transition-colors duration-300 group-aria-expanded:bg-rosewood" />
                </span>
              </button>

              <div
                ref={(el) => {
                  cards.current[i] = el;
                }}
                id={cardId}
                data-place={side}
                className={`absolute left-0 w-60 -translate-x-1/2 transition-[opacity,scale,translate,visibility] duration-300 ease-silk ${side === "above" ? "bottom-7 origin-bottom" : "top-7 origin-top"} ${isOpen ? "visible opacity-100" : `invisible scale-95 opacity-0 ${side === "above" ? "translate-y-1" : "-translate-y-1"}`}`}
              >
                <Link
                  href={look.href}
                  className="flex items-center gap-3 rounded-2xl bg-ivory/95 p-2 pr-4 text-left shadow-lift ring-1 ring-rosewood/10 transition-colors duration-300 hover:bg-ivory"
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-blush">
                    <ProductVisual kind={look.kind} shade={look.shade} alt="" artClassName="p-1.5" sizes="64px" />
                  </span>
                  <span className="min-w-0 leading-snug">
                    <span className="block text-sm font-medium leading-snug text-rosewood">{look.name}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-xs text-ink/70">
                      <ShadeSwatch hex={look.shade.hex} /> {look.shade.name} · <Price amount={look.price} lang={lang} />
                    </span>
                    <span className="mt-1 block text-xs font-medium text-rosewood underline decoration-rosewood/30 underline-offset-4">{labels.view}</span>
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
