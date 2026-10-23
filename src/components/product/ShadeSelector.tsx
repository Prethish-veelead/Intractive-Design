"use client";

import { useRef, useState, ViewTransition } from "react";
import { Check } from "@phosphor-icons/react";
import type { Product } from "@/lib/catalog";
import { addToBag } from "@/lib/bag";
import { duration, ease, gsap, motionOk, useGSAP } from "@/lib/motion";
import { ProductArt } from "@/components/ui/ProductArt";
import { ShadeSwatch } from "@/components/ui/ShadeSwatch";
import { CompareSlider } from "@/components/motion/CompareSlider";

export type ShadeSelectorLabels = {
  shade: string;
  addToBag: string;
  added: string;
  badge?: string;
  compareTitle: string;
  compareHint: string;
  skinFair: string;
  skinDeep: string;
};

const ADDED_FEEDBACK_MS = 1600;

/** Product gallery + shade picker. The picked shade recolors the product image. */
export function ShadeSelector({ product, labels, children }: { product: Product; labels: ShadeSelectorLabels; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const shade = product.shades[active];

  // Soft settle of the product image whenever the shade changes (skipped on first render).
  const firstRender = useRef(true);
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (!window.matchMedia(motionOk).matches) return;
      gsap.fromTo("[data-shade-art]", { opacity: 0.5, scale: 0.97 }, { opacity: 1, scale: 1, duration: duration.reveal, ease: ease.silk });
    },
    { scope: root, dependencies: [active] },
  );

  const onAdd = () => {
    addToBag(product.slug, shade.name);
    setAdded(true);
    setTimeout(() => setAdded(false), ADDED_FEEDBACK_MS);
  };

  return (
    <div ref={root} className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="rounded-[2.5rem] bg-white/50 p-2 ring-1 ring-rosewood/5 shadow-soft md:sticky md:top-24 md:self-start">
        <div className="relative aspect-square overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-[radial-gradient(110%_90%_at_60%_20%,#f8e7e2_0%,#efcfc7_55%,#e4b5ab_100%)]">
          {labels.badge && (
            <span className="eyebrow absolute left-5 top-5 z-10 rounded-full bg-ivory/85 px-3 py-1 text-[10px] font-medium text-rosewood">{labels.badge}</span>
          )}
          <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
            <div className="absolute inset-0">
              <div data-shade-art className="absolute inset-0">
                <ProductArt kind={product.kind} color={shade.hex} className="absolute inset-0 h-full w-full p-10" />
              </div>
            </div>
          </ViewTransition>
        </div>
      </div>

      <div className="md:pt-6">
        {children}

        {product.shades.length > 1 && (
          <fieldset className="mt-8">
            <legend className="text-sm text-ink/70">
              {labels.shade}: <span className="text-ink">{shade.name}</span>
            </legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.shades.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 ease-press active:scale-90"
                >
                  <ShadeSwatch hex={s.hex} size="lg" selected={i === active} />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Bag drawer and checkout arrive in task-plan 4.3. */}
        <button
          type="button"
          onClick={onAdd}
          className="relative mt-10 min-h-14 w-full overflow-hidden rounded-full bg-rosewood text-sm font-medium text-ivory transition-[background-color,transform] duration-500 ease-press hover:bg-[#4a2029] active:scale-[0.98]"
        >
          <span className={`flex items-center justify-center transition-[transform,opacity] duration-400 ease-silk ${added ? "-translate-y-6 opacity-0" : ""}`}>
            {labels.addToBag}
          </span>
          <span
            aria-hidden={!added}
            className={`absolute inset-0 flex items-center justify-center gap-2 transition-[transform,opacity] duration-400 ease-silk ${added ? "" : "translate-y-6 opacity-0"}`}
          >
            <Check size={18} weight="bold" /> {labels.added}
          </span>
        </button>
        <p role="status" className="sr-only">{added ? labels.added : ""}</p>

        {product.shades.length > 1 && (
          <CompareSlider
            shadeHex={shade.hex}
            title={labels.compareTitle}
            hint={labels.compareHint}
            leftLabel={labels.skinFair}
            rightLabel={labels.skinDeep}
          />
        )}
      </div>
    </div>
  );
}
