"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { ProductArt } from "@/components/ui/ProductArt";
import { ShadeSwatch } from "@/components/ui/ShadeSwatch";

type Labels = { shade: string; addToBag: string; badge?: string };

/** Product gallery + shade picker. The picked shade recolors the product image. */
export function ShadeSelector({ product, labels, children }: { product: Product; labels: Labels; children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const shade = product.shades[active];

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="rounded-[2.5rem] bg-white/50 p-2 ring-1 ring-rosewood/5 shadow-soft md:sticky md:top-24 md:self-start">
        <div className="relative aspect-square overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-[radial-gradient(110%_90%_at_60%_20%,#f8e7e2_0%,#efcfc7_55%,#e4b5ab_100%)]">
          {labels.badge && (
            <span className="eyebrow absolute left-5 top-5 rounded-full bg-ivory/85 px-3 py-1 text-[10px] font-medium text-rosewood">{labels.badge}</span>
          )}
          <ProductArt kind={product.kind} color={shade.hex} className="absolute inset-0 h-full w-full p-10" />
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
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <ShadeSwatch hex={s.hex} size="lg" selected={i === active} />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Bag logic arrives in task-plan 4.3. */}
        <button
          type="button"
          className="mt-10 min-h-14 w-full rounded-full bg-rosewood text-sm font-medium text-ivory transition-[background-color,transform] duration-500 ease-press hover:bg-[#4a2029] active:scale-[0.98]"
        >
          {labels.addToBag}
        </button>
      </div>
    </div>
  );
}
