import Link from "next/link";
import type { Product } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Price } from "./Price";
import { ProductArt } from "./ProductArt";
import { ShadeSwatch } from "./ShadeSwatch";

const MAX_SWATCHES = 5;

export function ProductCard({ product, lang, dict }: { product: Product; lang: Locale; dict: Dictionary }) {
  const { shades } = product;
  const extra = shades.length - MAX_SWATCHES;

  return (
    <Link href={`/${lang}/product/${product.slug}`} className="group block">
      {/* Double bezel: soft outer tray, inner image core. */}
      <div className="rounded-card bg-white/50 p-1.5 ring-1 ring-rosewood/5 transition-[transform,box-shadow] duration-500 ease-silk group-hover:-translate-y-1 group-hover:shadow-lift">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card-inner bg-gradient-to-b from-blush/50 to-blush">
          {product.badge && (
            <span className="eyebrow absolute left-3 top-3 z-10 rounded-full bg-ivory/85 px-2.5 py-1 text-[9px] font-medium text-rosewood">
              {dict.badges[product.badge]}
            </span>
          )}
          <ProductArt
            kind={product.kind}
            color={shades[0].hex}
            className="absolute inset-0 h-full w-full p-6 transition-transform duration-700 ease-silk group-hover:scale-[1.04]"
          />
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
