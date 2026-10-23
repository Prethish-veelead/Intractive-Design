import { findImage } from "@/lib/images";

/**
 * Soft frangipani leaf shadows, like morning light through a window. A pre-blurred texture
 * (scripts/make-leaf-shadow.mjs) multiplied in at low opacity, drifting slowly (globals.css).
 * Position it with `className`; the parent must clip it (overflow hidden). `fadeBottom` fades it
 * out with a white gradient, which multiply turns into "no change" (a CSS mask would isolate the
 * blend and lose it).
 */
export function LeafShadow({ className = "", fadeBottom = false }: { className?: string; fadeBottom?: boolean }) {
  const texture = findImage("textures/leaf-shadow");
  if (!texture) return null;
  const fade = fadeBottom ? "linear-gradient(to bottom, rgb(255 255 255 / 0) 45%, #fff 90%), " : "";
  return <div aria-hidden data-leaf-shadow className={`leaf-shadow ${className}`} style={{ backgroundImage: `${fade}url(${texture})` }} />;
}
