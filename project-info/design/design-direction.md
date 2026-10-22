# Design direction

> Provisional until the brand logo arrives. When it does, adjust the palette to the logo and keep everything else.

## Feeling

**Soft luxury.** Calm, feminine, confident and warm. Think of a quiet boutique with good lighting, not a loud sale banner.
Three words for every design review: **elegant, soft, trustworthy.**

## Color palette (design tokens)

| Token | Hex | Use |
|---|---|---|
| `--color-ivory` | `#FBF7F4` | Page background |
| `--color-blush` | `#F3DCD6` | Section backgrounds, cards |
| `--color-nude` | `#E4C3B5` | Borders, dividers, quiet surfaces |
| `--color-rose` | `#C97B84` | Accents, hover states, sale badges |
| `--color-champagne` | `#C9A66B` | Fine lines, icons, premium details (use sparingly) |
| `--color-rosewood` | `#5A2A35` | Primary buttons, headings |
| `--color-ink` | `#2B1E22` | Body text |

Rules:
- Text on light backgrounds uses `--color-ink` or `--color-rosewood` only. Blush and rose fail contrast for body text.
- Gold is a detail color. If more than ~5% of a screen is gold, it looks cheap.
- Product photography carries the real color. The interface stays quiet around it.

## Typography (must support Thai)

| Role | Latin | Thai |
|---|---|---|
| Display headings | Cormorant Garamond | Trirong or Noto Serif Thai |
| Body and UI | DM Sans | IBM Plex Sans Thai |

(Inter is avoided: the `high-end-visual-design` skill lists it as a "generic" font.)
Icons: Phosphor, `light` weight.

Thai-specific type rules:
- Thai line height ≥ 1.6 for body text (tone marks and vowels sit above and below the line).
- **Never** add letter-spacing or `text-transform: uppercase` to Thai text. Tracked uppercase is for short English labels only.
- Thai has no spaces between words. Test every heading at phone width for bad line breaks; use `<wbr>` or manual breaks for headlines.
- Load only the font weights we use (max 2 per family) and use `font-display: swap`.

## Imagery

- Models with Thai and Southeast Asian skin tones (fair, medium, tan, deep). Show every shade on at least 3 skin tones.
- Product shots: soft natural light, cream and blush backgrounds, close-up textures (swatch smears, powder, lash detail).
- Avoid heavy filters and over-retouched skin.

## Layout

- Mobile first. Design at 375 px wide, then scale up.
- Generous whitespace. Sections breathe.
- Rounded corners: 12–20 px on cards and images, full-round on swatches and pill buttons.
- One clear primary action per screen ("Add to bag" / "เพิ่มลงตะกร้า").

## Motion (the "attractive" part)

Motion should feel like silk: slow-in, soft-out, never bouncy or jumpy.

| Where | Effect | Timing |
|---|---|---|
| Page load | Hero image soft fade + slight scale (1.05 → 1), headline words rise in with stagger | 600–900 ms |
| Scrolling | Sections and product cards fade up 16–24 px as they enter | 400–600 ms, stagger 60–80 ms |
| Editorial pages | Light parallax on lifestyle images, pinned brand-story section | Scroll-linked |
| Product card hover | Second image crossfades in, card lifts with a soft shadow | 250–350 ms |
| Shade swatch | Selected swatch grows slightly with a ring; product image changes to that shade | 200–300 ms |
| Add to bag | Button turns into a check, bag icon gives a small pop and count updates | 300–500 ms |
| Details | Shimmer sweep across gold elements, very occasional | 1.5–2 s, max once per view |

All motion rules are in [../../rules/design-and-motion.md](../../rules/design-and-motion.md).
