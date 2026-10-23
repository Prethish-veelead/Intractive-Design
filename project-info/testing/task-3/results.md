# Task 3 test results — 2026-10-23

Production build (80 static pages), Playwright Chromium. Re-run: start `npx next start -p 3123`, then
`node project-info/testing/task-3/check-content.mjs` from the project root.

## Checks

| Check | Result |
|---|---|
| `npm run lint` / `npm run build` | Pass / pass (80 pages) |
| 17 pages × 2 languages load with an `<h1>` | 34/34 return 200 |
| Horizontal overflow at 375 px | None |
| Console / page errors | None |
| Internal links | All resolve except `search`, `wishlist`, `account`, `bag` (Task 4 pages) |
| Filters: Lips → Glossy | 1 item (Dewy Glow Lip Tint), count updates |
| Sort: price high → low | Satin Bloom (฿650) first |
| Product gallery: "On skin" view | Image and its label switch |
| Product details / how to use / ingredients | Present; ingredients marked as sample data |
| Shade finder: Medium + Warm + Matte | N23 Natural cushion, Thai Tea lipstick, Apricot blush |
| Unknown page | Localized "ไม่พบหน้านี้ค่ะ" page (status 200, see Task 1 known issue) |

## Screenshots

`filters-glossy-375.png`, `product-gallery-swatch-375.png`, `product-reviews-375.png`, `shade-finder-result-375.png`,
`not-found-th-375.png`, and full-page desktop shots: `journal`, `article`, `help`, `contact`, `gifts`, `shade-finder`, `product` (`-1440.png`).

## Not done (needs people outside the project)

- Real product photos (3.4): every image is an SVG placeholder.
- Native Thai review of all copy (3.12).
- Lawyer review of privacy, terms and cookies (3.11). The pages show a visible "draft" notice.
- Owner approval of shipping fee, returns and COD wording on the Help page. It shows a "draft" notice.
- Real reviews, ingredients and FDA numbers. They're labelled as sample data on the site.
