import "server-only";
import fs from "node:fs";
import path from "node:path";

// Real photos live in public/images/. Each slot is optional: if no file exists yet, callers
// fall back to the SVG placeholders. File names are listed in
// project-info/design/image-generation-brief.md.

const extensions = ["webp", "jpg", "jpeg", "png"];

/** "products/velvet-kiss-matte-lipstick/rose-petal" → "/images/products/…/rose-petal.webp" if it exists. */
export function findImage(slot: string): string | undefined {
  for (const ext of extensions) {
    const url = `/images/${slot}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", url))) return url;
  }
  return undefined;
}

/** "N10 Porcelain" → "n10-porcelain" */
export const toSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
