# Image generation brief (for Antigravity)

**40 images:** 30 product packshots (one per shade) and 10 lifestyle photos.
The site picks each file up automatically by its path. Any image that is missing keeps the current drawing,
so the images can be added in any order.

> **Before launch:** AI images are fine for design and review. Product packshots must be replaced with
> photos of the real products before selling. Customers choose by colour, and an AI shade that differs
> from the real product is misleading advertising.

---

## Task to paste into Antigravity

```
You are working in this Next.js project. Read project-info/design/image-generation-brief.md.
Generate every image listed in its "Product packshots" and "Lifestyle photos" sections with your
image generation tool, following the STYLE block and the rules exactly, and save each one at the
listed path under public/images/ (create folders as needed). Use the listed file name, .webp
format if you can, otherwise .jpg or .png with the same name.

Work product by product: generate the FIRST shade of a product from its prompt, then create the
other shades of that product by EDITING that first image ("change only the colour of the
<part> to <hex>, keep everything else identical") so the packaging, angle and light match.

When done: run `npm run build`, then start `npx next start -p 3123` and open /th, /th/shop/lips,
/th/product/velvet-kiss-matte-lipstick and /th/journal to check the images appear. Report the
list of files you created and any image you could not generate.
```

---

## Rules for every image

1. **No text, letters, logos, brand names or watermarks** anywhere, including on packaging. The brand is not decided yet.
2. **Packaging family** (same for all products): matte black `#2B1E22` with a thin champagne-gold `#C9A66B` band. Minimal, luxurious, no patterns.
3. **People:** Thai / Southeast Asian women of different skin tones (fair, medium, tan). Natural skin texture, no heavy retouching, no skin-whitening look.
4. **Colour accuracy:** the product colour must visibly match the hex code given for the shade.
5. **Nothing obscene, no real celebrities, no recognisable real brands.**

### STYLE block (add to every packshot prompt)

```
Luxury cosmetics e-commerce packshot, single product centred, front three-quarter view, product fills
about 60% of the frame height, on a seamless warm blush studio backdrop (soft gradient #F3DCD6 to
#E9C4BB), soft diffused daylight from the upper left, gentle natural shadow under the product,
high-end editorial beauty photography, crisp focus, photorealistic, 4:5 portrait, 1600x2000 px,
no text, no logo, no watermark.
```

---

## Product packshots (30)

Path pattern: `public/images/products/<product-slug>/<shade-slug>.webp`

### 1. Velvet Kiss Matte Lipstick: `velvet-kiss-matte-lipstick/`
Prompt: *A classic bullet lipstick, cap removed and standing beside it, square matte black tube with a thin champagne-gold band, angled matte lipstick bullet in **[SHADE] ([HEX])** with a soft velvet matte texture.* + STYLE

| File | Shade | Hex |
|---|---|---|
| `rose-petal.webp` | Rose Petal (first, generate) | `#C46A73` |
| `thai-tea.webp` | Thai Tea (edit) | `#B5654A` |
| `mulberry.webp` | Mulberry (edit) | `#7D2F45` |
| `nude-silk.webp` | Nude Silk (edit) | `#C48D7D` |
| `chili-red.webp` | Chili Red (edit) | `#B3262F` |
| `lychee.webp` | Lychee (edit) | `#E08A8F` |

### 2. Dewy Glow Lip Tint: `dewy-glow-lip-tint/`
Prompt: *A slim clear glass lip tint bottle with a matte black cap and a thin gold collar, filled with glossy juicy tint in **[SHADE] ([HEX])**, the doe-foot applicator lying beside it with a drop of tint, glass-like shine.* + STYLE

| File | Shade | Hex |
|---|---|---|
| `watermelon.webp` | Watermelon (first) | `#E4626B` |
| `peach-blossom.webp` | Peach Blossom | `#EE9A83` |
| `plum-wine.webp` | Plum Wine | `#8C3550` |
| `mango-rose.webp` | Mango Rose | `#E07D63` |

### 3. Satin Bloom Lipstick: `satin-bloom-lipstick/`
Prompt: *A round bullet lipstick with a slim matte black tube and gold band, cap off, rounded satin lipstick bullet with a soft sheen in **[SHADE] ([HEX])**.* + STYLE

| File | Shade | Hex |
|---|---|---|
| `lotus.webp` | Lotus (first) | `#D98C94` |
| `cinnamon.webp` | Cinnamon | `#9C5A48` |
| `orchid.webp` | Orchid | `#B45D86` |

### 4. Skin Silk Cushion SPF50+: `skin-silk-cushion/`
Prompt: *An open round cushion foundation compact in matte black with a gold rim, mirror lid open, the foundation sponge visible in **[SHADE] ([HEX])**, a soft puff resting on the edge.* + STYLE

| File | Shade | Hex |
|---|---|---|
| `n10-porcelain.webp` | N10 Porcelain (first) | `#F1D6C3` |
| `n20-ivory.webp` | N20 Ivory | `#E8C5A8` |
| `n23-natural.webp` | N23 Natural | `#DBB08D` |
| `w25-honey.webp` | W25 Honey | `#C99A72` |
| `w30-tan.webp` | W30 Tan | `#B18060` |

### 5. Petal Soft Blush: `petal-blush/`
Prompt: *An open round powder blush compact in matte black with a thin gold rim, finely pressed powder blush in **[SHADE] ([HEX])** with a delicate embossed petal pattern, a fluffy blush brush lying beside it.* + STYLE

| File | Shade | Hex |
|---|---|---|
| `sakura.webp` | Sakura (first) | `#EDA7AD` |
| `apricot.webp` | Apricot | `#EFA585` |
| `rosewood.webp` | Rosewood | `#C47A7C` |

### 6. Airy Loose Powder: `airy-loose-powder/`
Prompt: *A round loose powder jar with a matte black lid set beside it, frosted glass base with a gold band, fine loose powder in **[SHADE] ([HEX])** visible through the sifter, a little powder dusted on the backdrop.* + STYLE

| File | Shade | Hex |
|---|---|---|
| `translucent.webp` | Translucent (first) | `#F3E6DC` |
| `warm-beige.webp` | Warm Beige | `#E3C4A6` |

### 7. Precision Ink Eyeliner: `precision-ink-eyeliner/`
Prompt: *A slim liquid eyeliner pen in matte black with a gold band, cap off, ultra-fine brush tip, a precise swatch line of **[SHADE] ([HEX])** liner drawn on the backdrop beside it.* + STYLE

| File | Shade | Hex |
|---|---|---|
| `jet-black.webp` | Jet Black (first) | `#1C1416` |
| `espresso.webp` | Espresso | `#4A2C22` |

### 8. Lift & Curl Mascara: `lift-curl-mascara/`
Prompt: *A mascara tube in matte black with a gold band, the wand pulled out showing a curved brush coated in black mascara `#1C1416`, resting diagonally.* + STYLE

| File | Shade | Hex |
|---|---|---|
| `black.webp` | Black | `#1C1416` |

### 9. Golden Hour Eyeshadow Palette: `golden-hour-eyeshadow-palette/`
Prompt: *An open slim matte black eyeshadow palette with a gold edge, nine square pans of warm eyeshadows from cream to bronze to deep brown (around `#C48A62`), three of them shimmering gold, one pan lightly swatched with a finger.* + STYLE

| File | Shade | Hex |
|---|---|---|
| `golden-hour.webp` | Golden Hour | `#C48A62` |

### 10. Natural Flutter Lashes: `natural-flutter-lashes/`
Prompt: *A pair of natural, wispy false eyelashes with fine soft black fibres on a thin cotton band, resting in an open shallow matte black case with a gold edge.* + STYLE

| File | Shade |
|---|---|
| `natural.webp` | Natural |

### 11. Glam Volume Lashes: `glam-volume-lashes/`
Prompt: *A pair of full, layered, voluminous black false eyelashes, resting in an open shallow matte black case with a gold edge.* + STYLE

| File | Shade |
|---|---|
| `glam.webp` | Glam |

### 12. Signature Makeup Kit: `signature-makeup-kit/`
Prompt: *An open rose-pink `#C97B84` gift box with a champagne-gold ribbon, containing a black lipstick with a pink bullet, a round black blush compact with pink blush and a slim black eyeliner pen, nestled in ivory tissue paper, a blank gift card leaning on the box.* + STYLE

| File | Shade |
|---|---|
| `rose-edition.webp` | Rose Edition |

---

## Lifestyle photos (10)

### Home hero: `public/images/lifestyle/hero.webp`
*Editorial beauty portrait of a young Thai woman in her twenties with medium skin, shoulders up, soft natural makeup with rose-pink matte lips (`#C46A73`) and a flushed cheek, glowing healthy skin with visible natural texture, hair loosely tied back, gentle confident smile, looking slightly off camera, soft window daylight, warm blush backdrop (`#F3DCD6`), shallow depth of field, high-end cosmetics campaign photography, photorealistic, 4:5 portrait, 1600x2000 px, no text, no logo.*

### Brand story: `public/images/lifestyle/brand-story.webp`
*Calm still life of minimal matte black makeup products with gold bands (lipstick, compact, loose powder jar) on soft ivory linen, with a few white frangipani flowers and jasmine buds, morning sunlight casting soft leaf shadows, warm cream and nude tones, editorial luxury still life, photorealistic, 3:4 portrait, 1500x2000 px, keep 10% empty space at top and bottom for cropping, no text, no logo.*

### Category tiles: `public/images/categories/`
The label sits in the bottom-left corner, so keep that area calm and light. Use the STYLE colours but these are close-up scenes, not packshots.

| File | Size | Prompt |
|---|---|---|
| `lips.webp` | 1600x1600 (1:1) | *Close-up of a Southeast Asian woman's lips wearing satin rose lipstick, beside three lipstick bullets in red, rose and nude laid on a blush surface, soft daylight, editorial beauty, photorealistic, no text.* |
| `face.webp` | 1600x1200 (4:3) | *Close-up of a fluffy brush sweeping peach-pink blush across the cheek of a Thai woman with tan skin, soft light, glowing skin, editorial beauty, photorealistic, no text.* |
| `eyes.webp` | 1600x1200 (4:3) | *Close-up of a Southeast Asian woman's eye with warm golden-brown eyeshadow and a fine black winged liner, natural brows, soft daylight, photorealistic, no text.* |
| `lashes.webp` | 1600x1200 (4:3) | *Close-up profile of a Thai woman's eye with natural fluttery false lashes, eyes gently closed, soft blush backdrop, photorealistic, no text.* |
| `sets.webp` | 1600x1200 (4:3) | *A rose-pink gift box with a champagne-gold ribbon, half open, minimal black makeup products peeking out, on ivory tissue paper, soft daylight, photorealistic, no text.* |

### Journal covers: `public/images/journal/`
Covers are cropped to 4:3 on cards and 21:9 on the article page, so keep the subject in the centre third.

| File | Size | Prompt |
|---|---|---|
| `songkran-waterproof-look.webp` | 1920x1080 | *A joyful young Thai woman laughing during the Songkran water festival, water droplets splashing around her in bright sunlight, her makeup fresh and intact (black winged liner, coral-red lips), festive street softly blurred behind, vibrant but soft colours, photorealistic, no text.* |
| `lip-shade-for-your-undertone.webp` | 1920x1080 | *Three lipstick swatches (warm brick, cool berry, neutral pinky-nude) on the inner wrists of three Southeast Asian women with fair, medium and tan skin, arms side by side on a blush surface, soft daylight, photorealistic, no text.* |
| `easy-winged-liner.webp` | 1920x1080 | *Close-up of a Southeast Asian woman with hooded eyes drawing a precise black winged eyeliner with a fine liquid liner pen, mirror reflection, soft daylight, calm editorial beauty, photorealistic, no text.* |

---

## Checklist after generation

- [ ] 30 packshots in `public/images/products/…` (names exactly as listed)
- [ ] 2 lifestyle photos, 5 category tiles, 3 journal covers
- [ ] No text, logos or watermarks in any image
- [ ] Shade colours visibly match their hex codes; all shades of a product share the same packaging and angle
- [ ] Each file under 500 KB (webp at ~80% quality)
- [ ] `npm run build` passes and the pages show the photos
- [ ] Before launch: packshots replaced with photos of the real products (task-plan 3.4)
