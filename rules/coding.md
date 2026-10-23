# Rules: coding

> The stack is proposed in the [project brief](../project-info/docs/project-brief.md#proposed-tech-stack-confirm-before-coding). Update this file if it changes.

## General

1. Follow the global `coding-guidelines` skill: think first, keep it simple, make small focused changes, verify before calling it done.
2. TypeScript strict mode. No `any` without a comment explaining why.
3. Server components by default; use client components only for interaction and animation.
4. One component per file. Names: `PascalCase` for components, `camelCase` for functions and variables, `kebab-case` for file names of routes and assets.
5. No new dependency without a reason written in the pull request. Check its size first.

## Next.js 16 is newer than most training data

Before using a Next.js API, read the matching guide in `node_modules/next/dist/docs/` (see [AGENTS.md](../AGENTS.md)).
Known differences: Middleware is now `src/proxy.ts`; `PageProps<"/route">` / `LayoutProps` types are generated at build;
Cache Components is on, so every dynamic segment needs `generateStaticParams` (or a `<Suspense>` boundary).

## Folder layout

```
src/
  proxy.ts               redirects URLs without a locale to /th
  app/[lang]/            pages, Thai and English (root layout lives here)
  components/layout/     header, footer, announcement bar, LINE button
  components/ui/         buttons, swatches, price, product card (no data fetching)
  components/sections/   home page sections (hero, best sellers, ...)
  components/product/    product page parts
  components/shop/       category filters
  components/shade-finder/  shade quiz
  components/motion/     animation components (reveals, carousel, compare slider, parallax)
  content/               long-form bilingual content: journal articles, About/Help/legal pages
  lib/catalog.ts         product data: the ONLY place that knows where products come from
  lib/shade-finder.ts    shade quiz rules
  lib/motion.ts          GSAP setup and motion tokens
  lib/bag.ts             temporary in-memory bag (replaced in Task 4)
  lib/i18n.ts            locales and dictionary loading
  lib/format.ts          currency (฿) and date (Buddhist Era) formatting
  lib/site.ts            brand placeholders, LINE URL, free-shipping threshold
  messages/th.json       Thai strings
  messages/en.json       English strings
  styles/tokens.css      design tokens
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run build` | Production build (also type-checks) |
| `npm run lint` | ESLint |
| `node scripts/make-leaf-shadow.mjs` | Rebuilds `public/images/textures/leaf-shadow.webp` (leaf shadows with the blur baked in, via `sharp`) |

## Performance budget (mobile, 4G, mid-range Android)

| Metric | Budget |
|---|---|
| LCP | < 2.5 s |
| INP | < 200 ms |
| CLS | < 0.1 |
| JavaScript on first load | < 200 KB gzipped |
| Hero image | AVIF/WebP, < 200 KB, `priority` loaded |

1. Load GSAP, ScrollTrigger and Lenis only on pages that use them.
2. Images through the framework image component with explicit sizes.
3. Fonts self-hosted or via `next/font`, subset, max 2 weights per family.

## Security

1. No secrets in the repository. Use environment variables; commit only `.env.example`.
2. Payment card data never touches our servers. Use the payment provider's hosted fields or redirect.
3. Validate every form on the server, not only in the browser.

## Testing and "done"

A feature is done when:
1. It works on 375 px (phone) and 1440 px (desktop), in Thai and English.
2. Playwright tests cover the main path (browse → product → add to bag → checkout).
3. Lighthouse mobile scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
4. `prefers-reduced-motion` is checked.
5. Results are written in [project-info/testing/](../project-info/testing/).
