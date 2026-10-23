import Link from "next/link";
import { ViewTransition } from "react";
import type { Product } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Price } from "./Price";
import { ProductVisual } from "./ProductVisual";
import { ShadeSwatch } from "./ShadeSwatch";

const MAX_SWATCHES = 5;
const CARD_SIZES = "(min-width: 768px) 25vw, 70vw";

export function ProductCard({ product, lang, dict }: { product: Product; lang: Locale; dict: Dictionary }) {
  const { shades } = product;
  const extra = shades.length - MAX_SWATCHES;
  // Hover shows the product in its second shade (stands in for a second photo until the shoot).
  const hoverShade = shades[1];

  return (
    <Link href={`/${lang}/product/${product.slug}`} className="group block" draggable={false}>
      {/* Double bezel: soft outer tray, inner image core. */}
      <div className="rounded-card bg-white/50 p-1.5 ring-1 ring-rosewood/5 transition-[transform,box-shadow] duration-500 ease-silk group-hover:-translate-y-1 group-hover:shadow-lift">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card-inner bg-gradient-to-b from-blush/50 to-blush">
          {product.badge && (
            <span className={`eyebrow absolute left-3 top-3 z-10 rounded-full bg-ivory/85 px-2.5 py-1 text-[9px] font-medium text-rosewood ${product.badge === "limited" ? "shimmer" : ""}`}>
              {dict.badges[product.badge]}
            </span>
          )}
          {/* Named so the image morphs into the product page gallery (task-plan 2.12). */}
          <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
            <div className="absolute inset-0 transition-transform duration-700 ease-silk group-hover:scale-[1.04]">
              <ProductVisual kind={product.kind} shade={shades[0]} alt={`${product.name} ${shades[0].name}`} sizes={CARD_SIZES} />
              {hoverShade && (
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-silk group-hover:opacity-100">
                  <ProductVisual kind={product.kind} shade={hoverShade} alt="" sizes={CARD_SIZES} />
                </div>
              )}
            </div>
          </ViewTransition>
        </div>
      </div>
      <div className="px-1.5 pt-4">
        <h3 className="font-display text-xl leading-snug text-ink">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-[13px] text-ink/60">{product.tagline[lang]}</p>
        <div className="mt-3 flex items-center justify-between">
          <Price amount={product.price} lang={lang} className="text-sm font-medium text-rosewood" />
          {shades.length > 1 && (
            <span className="flex items-center gap-1" aria-label={`${shades.length} ${dict.product.shades}`}>
              {shades.slice(0, MAX_SWATCHES).map((s) => (
                <ShadeSwatch key={s.name} hex={s.hex} />
              ))}
              {extra > 0 && <span className="ml-0.5 text-[11px] text-ink/50">+{extra}</span>}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
