// Builds public/images/textures/leaf-shadow.webp: soft frangipani leaf shadows for the
// "morning light" overlay. The blur is baked into the image here, so the site never runs a
// CSS blur filter (rules/design-and-motion.md, motion rule 13).
//   node scripts/make-leaf-shadow.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const width = 1200;
const height = 800;
const out = "public/images/textures/leaf-shadow.webp";

// Frangipani leaf: long, narrow, pointed oval. Drawn from its base at (0,0) pointing up.
const leaf = (length, w) =>
  `M0 0 C ${w} ${-length * 0.18}, ${w * 0.95} ${-length * 0.7}, 0 ${-length}` +
  ` C ${-w * 0.9} ${-length * 0.7}, ${-w} ${-length * 0.2}, 0 0 Z`;

// Five-petal flower: overlapping ellipses turned around the centre.
const flower = (x, y, r, turn = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${turn})">` +
  Array.from({ length: 5 }, (_, i) => `<ellipse cy="${-r * 0.6}" rx="${r * 0.3}" ry="${r * 0.62}" transform="rotate(${i * 72})"/>`).join("") +
  `</g>`;

// A twig: leaves fanned out from one point, each [angle, length], plus a thin stem.
const twig = (x, y, turn, leaves, scale = 1) =>
  `<g transform="translate(${x} ${y}) rotate(${turn}) scale(${scale})">` +
  `<path d="M0 0 Q 8 140 -6 300" stroke="#000" stroke-width="6" fill="none"/>` +
  leaves.map(([angle, length]) => `<path d="${leaf(length, length * 0.15)}" transform="rotate(${angle})"/>`).join("") +
  `</g>`;

const fan = [[-70, 250], [-38, 320], [-8, 350], [22, 330], [52, 280], [80, 220]];

const layer = (content) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><g fill="#000">${content}</g></svg>`);

// Near layer: crisper shadows close to the "window". Far layer: wider and much softer.
const near = layer(
  twig(1150, -20, 205, fan, 1.05) +
  twig(40, 860, 25, fan.slice(0, 5), 0.95) +
  flower(860, 120, 46, 10) +
  flower(250, 610, 40, -20),
);
const far = layer(
  twig(820, -120, 170, fan, 1.2) +
  twig(-80, 300, 80, fan.slice(1), 1) +
  twig(1260, 640, 250, fan.slice(0, 4), 0.9) +
  flower(1000, 300, 52, 30),
);

const shade = async (svg, sigma, alpha) => {
  const mask = await sharp(svg).blur(sigma).extractChannel("alpha").linear(alpha, 0).toBuffer();
  return sharp({ create: { width, height, channels: 3, background: "#4a2e2a" } }).joinChannel(mask).png().toBuffer();
};

await mkdir("public/images/textures", { recursive: true });
const info = await sharp({ create: { width, height, channels: 3, background: "#ffffff" } })
  .composite([{ input: await shade(far, 30, 0.55) }, { input: await shade(near, 11, 0.9) }])
  .webp({ quality: 72 })
  .toFile(out);
console.log(`${out} ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
