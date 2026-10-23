# Task 2 test results — 2026-10-23

Production build, Playwright Chromium (headless shell). Re-run: start `npx next start -p 3123`, then
`node project-info/testing/task-2/check-motion.mjs` from the project root.

## Functional checks (all pass)

| Effect | Check | Result |
|---|---|---|
| Hero intro (CSS) | Headline line mid-animation at 250 ms, settled after 1.7 s | `translateY(33px)` → `none` |
| Scroll reveals | Every visible `[data-reveal]` reaches opacity 1 after scrolling | 0 left hidden (27 elements) |
| Draggable carousel | Drag snaps to a card, link not opened by drag | −556 px (2 cards), URL unchanged |
| Carousel buttons | Next/Previous move one card; disabled at the ends | −556 → −834 px |
| Brand story pin | Pin spacer created on desktop | 1 |
| Gold shimmer | Plays once when revealed | 1 element |
| Card hover | Second shade crossfades in, card lifts | see `5-card-hover-second-shade.png` |
| Shade change | Product image recolors with a soft settle | see `6-added-to-bag.png` |
| Add to bag | Button → "✓ Added", bag count pops, resets after 1.6 s | "Bag (1)", resets |
| Compare slider | Keys: 50 → 60; drag left: → 31 | pass |
| Image morph | Card → product page navigation with `<ViewTransition>`, no errors | pass |
| Reduced motion | No hero transform, no hidden reveals, no pin | pass |
| JavaScript off | No hidden content | 0 hidden |
| Console | No errors (404 prefetches of not-yet-built pages excluded) | 0 |

## Performance (phone 375 px, 4× CPU throttling)

| Page | LCP | CLS | Avg frame while scrolling | Frames > 50 ms |
|---|---|---|---|---|
| Home (th) | 0.95 s | 0.002 | 24–30 ms | 12–30 of ~230 |
| Category | 0.92 s | 0 | 23 ms | 4 of 69 |
| Product | 1.33 s | 0 | 18 ms | 0 of 79 |

Fixes made during testing:
1. **LCP was 5–8 s** on Home because the hero text waited for JavaScript to start its intro. The intro is now pure CSS and the paragraph is never hidden → 0.95 s.
2. **Grain overlay** used an SVG noise filter that repainted on scroll → replaced with a 21 KB PNG tile on its own layer.
3. **Header blur lost** after adding `view-transition-name` to the `<header>` (it became a backdrop root) → name moved to the pill itself.
4. Mobile menu kept a full-screen `backdrop-filter` while closed → blur only while open.
5. Hero background blob used `filter: blur` → replaced with a radial gradient.
6. Lenis smooth scroll is skipped on touch devices (it does not smooth touch scrolling anyway).

**Open:** Home still shows some long frames in this test. Headless Chromium renders without a GPU, so blur and shadows cost
far more here than on a phone. At normal CPU speed there are 0 long frames. Confirm on a real mid-range Android in task 5.3.
