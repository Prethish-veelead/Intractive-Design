"use client";

import { useRef, useState, ViewTransition } from "react";
import { Check } from "@phosphor-icons/react";
import type { Product, Shade } from "@/lib/catalog";
import { addToBag } from "@/lib/bag";
import { duration, ease, gsap, motionOk, useGSAP } from "@/lib/motion";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { ShadeSwatch } from "@/components/ui/ShadeSwatch";
import { CompareSlider } from "@/components/motion/CompareSlider";
import { SwatchStroke, TextureView } from "@/components/ui/ShadeViews";

export type ShadeSelectorLabels = {
  shade: string;
  addToBag: string;
  added: string;
  badge?: string;
  compareTitle: string;
  compareHint: string;
  skinFair: string;
  skinDeep: string;
  galleryLabel: string;
  viewProduct: string;
  viewSwatch: string;
  viewTexture: string;
};

const ADDED_FEEDBACK_MS = 1600;

type View = "product" | "swatch" | "texture";
const views: View[] = ["product", "swatch", "texture"];

// Gallery "photos" drawn in the active shade until the photoshoot (task-plan 3.4).
function GalleryImage({ view, product, shade, thumb = false }: { view: View; product: Product; shade: Shade; thumb?: boolean }) {
  const hex = shade.hex;
  if (view === "product")
    return (
      <ProductVisual
        kind={product.kind}
        shade={shade}
        alt={thumb ? "" : `${product.name} ${shade.name}`}
        artClassName={thumb ? "p-2" : "p-10"}
        sizes={thumb ? "64px" : "(min-width: 768px) 45vw, 92vw"}
        priority={!thumb}
      />
    );
  if (view === "swatch")
    return (
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#efd2bf,#d9a98a)]">
        <SwatchStroke hex={hex} className="absolute inset-0 h-full w-full" />
      </div>
    );
  return <TextureView hex={hex} className={`absolute inset-0 h-full w-full ${thumb ? "p-1" : "p-12"}`} />;
}

/** Product gallery + shade picker. The picked shade recolors the product image. */
export function ShadeSelector({ product, labels, children }: { product: Product; labels: ShadeSelectorLabels; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [view, setView] = useState<View>("product");
  const [added, setAdded] = useState(false);
  const shade = product.shades[active];
  const viewLabel: Record<View, string> = { product: labels.viewProduct, swatch: labels.viewSwatch, texture: labels.viewTexture };

  // Soft settle of the main image whenever the shade or view changes (skipped on first render).
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
    { scope: root, dependencies: [active, view] },
  );

  const onAdd = () => {
    addToBag(product.slug, shade.name);
    setAdded(true);
    setTimeout(() => setAdded(false), ADDED_FEEDBACK_MS);
  };

  return (
    <div ref={root} className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div className="md:sticky md:top-24 md:self-start">
        <div className="rounded-[2.5rem] bg-white/50 p-2 ring-1 ring-rosewood/5 shadow-soft">
          <div className="relative aspect-square overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-[radial-gradient(110%_90%_at_60%_20%,#f8e7e2_0%,#efcfc7_55%,#e4b5ab_100%)]">
            {labels.badge && (
              <span className="eyebrow absolute left-5 top-5 z-10 rounded-full bg-ivory/85 px-3 py-1 text-[10px] font-medium text-rosewood">{labels.badge}</span>
            )}
            <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
              <div className="absolute inset-0">
                <div data-shade-art className="absolute inset-0" role="img" aria-label={`${product.name} · ${shade.name} · ${viewLabel[view]}`}>
                  <GalleryImage view={view} product={product} shade={shade} />
                </div>
              </div>
            </ViewTransition>
          </div>
        </div>
        <div role="group" aria-label={labels.galleryLabel} className="mt-4 flex gap-3">
          {views.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              aria-label={viewLabel[v]}
              className={`relative h-16 w-16 overflow-hidden rounded-2xl bg-blush/60 transition-[box-shadow,transform] duration-300 ease-silk active:scale-95 ${view === v ? "ring-2 ring-rosewood ring-offset-2 ring-offset-ivory" : "ring-1 ring-rosewood/10"}`}
            >
              <GalleryImage view={v} product={product} shade={shade} thumb />
            </button>
          ))}
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
