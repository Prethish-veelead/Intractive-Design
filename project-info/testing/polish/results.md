# Polish round test results — 2026-10-23 (after design review)

Production build, Playwright Chromium (headless shell). Re-run: `npm run build`, start `npx next start -p 3125`, then
`node project-info/testing/polish/check-polish.mjs` from the project root. The script prints every check and `ALL PASS` or the failed names.

**Result: ALL PASS (109 checks), 0 console errors.**

## Functional checks (Thai and English)

| Feature | Check | Result |
|---|---|---|
| P.1 Sticky bar (375 px) | Hidden at the top of the product page; slide is 350 ms | bar top at 812 px, `0.35s` |
| | Slides up after scrolling past the main Add to bag | bar at 739–812 px, not `inert` |
| | Bar button adds to bag, shows "✓ เพิ่มแล้ว / ✓ Added" | "ตะกร้า (1)" / "Bag (1)" |
| | Floating LINE button hidden while the bar shows; the bar has its own labelled 44 px LINE button | pass |
| | Page end: footer legal links stay above the bar | links end at 716 px, bar starts at 739 px |
| | Bar hides again when the main button is in view; floating LINE comes back | pass |
| | Never shown on desktop | `display: none` at 1440 px |
| P.2 Hotspots | 2 dots, 375 and 1440 px | pass |
| | First screen, **no scrolling**: lips card opens fully on screen (flips above the dot near the bottom edge) | 375: card y 662–762 px, `data-place="above"` |
| | Cheek card on screen; only one card open at a time | pass |
| | Escape closes and returns focus to the dot; outside click closes | pass |
| | Keyboard: Tab onto the dot does **not** open it; Enter opens; Tab reaches the card link; Enter on the dot closes | pass |
| | Pulse ring plays 3 times, then rests | `animation-iteration-count: 3` |
| | No JavaScript: dots hidden | pass |
| P.3 Payment line | One plain text line, no pills: "ชำระเงินผ่าน PromptPay · TrueMoney · Rabbit LINE Pay · Visa · Mastercard"; no COD | pass |
| P.4 Skin tones | Radio group: Medium checked by default; "Tan" switches the right side (opacity 1 / 0) | pass |
| | Arrow keys move the choice and focus (wraps); only the checked radio is tabbable | pass |
| | Slider arrow keys still work | 50 → 45 |
| | No compare slider on cushion and powder products | pass |
| P.5 Leaf shadows | Home brand story: `multiply`, opacity 0.1, **static** (no animation) | pass |
| | About header has it, Help does not | pass |
| P.6 Silk gradient | 2 layers, different durations (21 s, 25 s), `will-change: auto` | pass |
| | Paused when the hero is off screen, running again when back | `paused` → `running` |
| About heading | Thai heading at 375 and 1440 px never ends on "คุณ" alone (last line is "เพื่อคุณ") | pass |
| Reduced motion | No pulse, no silk drift, leaves static, hotspots visible, bar slides instantly | pass |

## Performance (Home, phone 375 px, 4× CPU throttling via CDP)

LCP and CLS are read with `PerformanceObserver` (buffered) after load + 3 s and a short scroll. 3 runs, median.
There is no network throttling (same machine), so compare these runs with each other, not with a real phone.

| Metric | Runs | Median | Budget |
|---|---|---|---|
| LCP | 420, 484, 852 ms | **484 ms** | < 1.2 s |
| CLS | 0, 0, 0 | **0** | < 0.05 |

Frame times at 4× CPU (rAF, 16 wheel steps of 400 px). The machine was noisier in this round: the same Home test gave
an average of 18.8 ms in the first round and 24–30 ms now. A comparison run in the same session shows the silk layers are not
the cause: with the silk hidden, the Home average was 27–39 ms (no better). The product page shows 0 long frames.

| Page | Avg frame while scrolling | Frames > 50 ms | Avg frame idle at the hero |
|---|---|---|---|
| Home (th) | 24–30 ms | 0–5 of ~120 | 16.7 ms |
| Product (th) | 18.6 ms | 0 of 155 | 16.7 ms |

## Fixes made during testing

First round:
1. The sticky bar never appeared after a fast jump past the button. An IntersectionObserver only fires when a threshold is
   crossed, and jumping from below the screen to above it crosses none. The observer's root now reaches far below the
   screen (`rootMargin` bottom 100000 px), so the only way to leave it is to scroll up past the top.
2. The leaf shadows were invisible on phones. `background-size: cover` in a tall box showed only the empty middle of the
   texture, so the texture is now anchored at `85% 15%` (the top-right branch).
3. The About-page fade uses a white gradient inside the texture instead of `mask-image`. A mask would isolate the element
   and `multiply` would stop blending.

Design review round:
1. Hotspots open only on click, Enter or Space (Tab focus no longer opens them, which made Enter close them).
2. Before opening, the card measures the space around the dot and flips to the other side if it would leave the screen.
3. The lip dot moved to the corner of the lower lip (53 %, 52 %), checked on a marked-up copy of the photo. 46 %/55 % landed on
   the bottom edge of the lower lip, not the corner. The cheek dot moved to (63 %, 41 %) so the two tap targets don't touch.
4. The card title is DM Sans medium, 14 px.
5. New tokens: `--color-rosewood-deep` (all `hover:bg-[#4a2029]` replaced), `--color-peach`, `--shadow-dot`. The silk
   gradients are built from `--color-blush` and `--color-peach` in globals.css.
6. The dictionary key `skinDeep` was renamed to `skinTan`. `compareTitle` now reads "ดูเฉดสีบนผิวขาว เทียบกับ" / "See it on fair skin, compared with".
7. The About heading uses a U+2060 word joiner in "เพื่อ⁠คุณ" (Thai only).

## Screenshots

| File | Shows |
|---|---|
| `375-{th,en}-product-sticky-bar.png` | Sticky bar with LINE button; floating LINE hidden |
| `375-{th,en}-product-sticky-added.png` | "✓ Added" in the bar, bag count 1 |
| `375-{th,en}-product-page-end.png` | Footer legal links clear of the bar |
| `375-{th,en}-compare-medium.png`, `375-{th,en}-compare-tan.png` | Payment line, tone radio group, compare slider |
| `375-{th,en}-hero-look-open.png` | First screen (not scrolled): lips card flipped above the dot |
| `375-{th,en}-hero-look-cheek.png` | Blush card |
| `1440-{th,en}-hero-look-open.png`, `1440-{th,en}-hero-look-cheek.png` | Same at desktop, silk gradient behind |
| `1440-en-product.png` | Payment line and compare at desktop |
| `375-th-brand-story-leaves.png`, `1440-{th,en}-brand-story-leaves.png` | Leaf shadows on the brand story |
| `375-th-about-leaves.png`, `1440-th-about-leaves.png` | Leaf shadows on the About header, heading without orphan |

## Open

- `env(safe-area-inset-bottom)` is only non-zero when the page sets `viewport-fit=cover`, which this site does not (it
  would also change landscape layout everywhere). The bar uses `max(0.75rem, env(...))`, so it is correct either way.
  Check on a real iPhone in 5.6.
- On a phone, the open lips card (flipped above) covers the cheek dot. Tapping outside or on the lips dot closes it.
- Headless Chromium has no GPU; confirm the frame times on a real mid-range Android in 5.3.
