import Image from "next/image";
import type { ProductKind, Shade } from "@/lib/catalog";
import { ProductArt } from "./ProductArt";

type Props = {
  kind: ProductKind;
  shade: Pick<Shade, "hex" | "image">;
  alt: string;
  /** Padding for the SVG fallback (photos are full-bleed). */
  artClassName?: string;
  sizes: string;
  priority?: boolean;
};

/** Packshot photo of a shade when it exists, otherwise the SVG placeholder. Fills its parent. */
export function ProductVisual({ kind, shade, alt, artClassName = "p-6", sizes, priority = false }: Props) {
  if (shade.image) {
    return <Image src={shade.image} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />;
  }
  return <ProductArt kind={kind} color={shade.hex} className={`absolute inset-0 h-full w-full ${artClassName}`} />;
}
