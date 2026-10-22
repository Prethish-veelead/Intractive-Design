# Task 1 test results — 2026-10-22

Environment: Node 24.14.1, Next.js 16.4.2, production build (`next build` + `next start`), Playwright Chromium.

## Checks

| Check | Result |
|---|---|
| `npm run lint` | Pass (0 problems) |
| `npm run build` (includes TypeScript) | Pass, 46 pages pre-rendered |
| `/` redirects to `/th` | Pass (307 → `/th`) |
| `<html lang>` matches the page language | Pass (`th` / `en`) |
| Language switch keeps the same page | Pass (`/th/product/velvet-kiss-matte-lipstick` → `/en/product/velvet-kiss-matte-lipstick`) |
| Mobile menu opens, X animation, closes after navigating | Pass |
| Shade picker updates name and product image | Pass ("Shade: Mulberry") |
| Unknown category shows "not found" page with `noindex` | Pass, but HTTP status is 200 (see known issues) |
| Thai text: no letter-spacing/uppercase, line height ≥ 1.6 | Pass (checked in screenshots) |
| Phone layout 375 px | Pass after fixes (tile labels overlapped art, "View all" stretched, section gaps too large) |

## Screenshots

`home-th-375.png`, `home-th-1440.png`, `home-en-375.png`, `home-en-1440.png`, `category-th-375.png`, `category-th-1440.png`,
`product-th-375.png`, `product-th-1440.png`, `product-en-375.png`, `product-en-1440.png`.

## Known issues (carried forward)

1. Links to pages that do not exist yet (search, bag, wishlist, account, shade finder, journal, about, help, legal) return 404. They are built in Task 3 and Task 4.
2. Unknown URLs return the not-found page with status 200 (streaming with Cache Components). The page has `noindex`. Revisit in task 5.4 (SEO).
3. Prefetching the other language's home page logs a 404 in the console; clicking the link works. Cause: Next.js cannot prefetch across root layouts. Harmless.
4. "Add to bag" button does nothing yet (task 4.3).
5. Product images are SVG placeholders (task 3.4).
