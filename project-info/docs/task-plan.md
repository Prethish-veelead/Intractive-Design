# Task plan

We build the site one task at a time. Each task is finished, checked and reviewed by the project owner before the next one starts.
Tick a box only when the item is done **and** verified.

Legend: `[x]` done · `[ ]` to do · ⛔ blocked by an open decision in the [project brief](project-brief.md#open-decisions-owner-project-owner)

---

## Task 0 — Project setup and skills

- [x] Create folders: `skills/`, `rules/`, `project-info/` (docs, design, poc, testing, pages, sub-docs)
- [x] Research Thai beauty market and reference websites → [market-research-thailand.md](market-research-thailand.md)
- [x] Write project brief → [project-brief.md](project-brief.md)
- [x] Write design direction → [design-direction.md](../design/design-direction.md)
- [x] Write site map → [sitemap.md](../pages/sitemap.md)
- [x] Write rules: design and motion, Thailand and localization, coding → [rules/](../../rules/)
- [x] Find skills with `find-skills` and install them into `.claude/skills/` (12 skills, incl. GSAP Draggable via `gsap-plugins`) → [skills-map.md](../../skills/skills-map.md)
- [x] Check installed skills contain no scripts or risky commands

## Task 1 — Framework and foundation

Goal: a running Thai/English website shell with the brand look (colors, fonts, layout) and no real content yet.

- [x] 1.1 Create the Next.js app (Next.js 16.4.2, TypeScript, App Router, Tailwind CSS 4, ESLint, `src/` folder)
- [x] 1.2 Start a git repository with a `.gitignore`
- [x] 1.3 Design tokens: palette, radii, shadows, easing in `src/styles/tokens.css`, connected to Tailwind
- [x] 1.4 Fonts: Cormorant Garamond + Trirong (headings), DM Sans + IBM Plex Sans Thai (body); Thai line height ≥ 1.6
- [x] 1.5 Languages: Next.js built-in `/[lang]` routing with `/th` (default) and `/en`, dictionary files, language switcher that stays on the same page
- [x] 1.6 Formatting helpers: price in Baht (฿590), dates with Buddhist Era year in Thai
- [x] 1.7 Sample product data (12 products: lips, face, eyes, lashes, sets) behind one data module (`src/lib/catalog.ts`)
- [x] 1.8 Site shell: announcement bar, floating pill header (`[BRAND]`, menu, search, wishlist, account, bag), full-screen mobile menu, footer, LINE chat button
- [x] 1.9 Base components: ButtonLink, Container/SectionHeading/Eyebrow, ProductCard, ShadeSwatch, Price, ProductArt (SVG placeholders)
- [x] 1.10 Page skeletons: Home (8 sections), Category, Product (with working shade picker)
- [x] 1.11 Reduced-motion baseline (respect `prefers-reduced-motion` from day one)
- [x] 1.12 Verify: `build` and `lint` pass; screenshots at 375 px and 1440 px in Thai and English → [testing/task-1/results.md](../testing/task-1/results.md)

## Task 2 — Animation effects

Goal: the "wow" layer, soft and elegant, following [design-and-motion.md](../../rules/design-and-motion.md).

- [ ] 2.1 Motion setup: GSAP + ScrollTrigger + `useGSAP`, shared easing and duration tokens
- [ ] 2.2 Lenis smooth scroll on Home, About and Journal only (off for shop, product, checkout)
- [ ] 2.3 Hero intro: image soft fade and scale, headline words rise in with stagger (Thai-safe: split by words, not letters)
- [ ] 2.4 Scroll reveals: sections and product cards fade up with stagger
- [ ] 2.5 Product card hover: second image crossfade, soft lift
- [ ] 2.6 Shade swatch: selected ring grows, product image changes shade
- [ ] 2.7 Draggable best-seller carousel with inertia (GSAP Draggable), plus arrow buttons and keyboard support
- [ ] 2.8 Drag-to-compare slider: "before / after" or "shade on two skin tones"
- [ ] 2.9 Add-to-bag micro-interaction: button → check, bag icon pop, count update
- [ ] 2.10 Brand-story section: pinned scroll with parallax images
- [ ] 2.11 Gold shimmer detail on premium elements (once per view)
- [ ] 2.12 Page transitions between product grid and product page (View Transitions)
- [ ] 2.13 Verify: reduced-motion turns effects off; no dropped frames at 4× CPU throttling; no layout shift (CLS < 0.1)

## Task 3 — Content

Goal: every page filled with real (or realistic) Thai and English content.

- [ ] 3.1 Brand voice guide: Thai and English tone, words to use and avoid
- [ ] 3.2 Home page copy (Thai + English): hero, categories, best sellers, story, tutorials, reviews, LINE sign-up
- [ ] 3.3 Product content per item: name, shades, description, how to use, ingredients, claims, Thai FDA (อย.) number field
- [ ] 3.4 Images: product photos, shade swatches on 3+ skin tones, lifestyle and model photos (placeholders until the photoshoot)
- [ ] 3.5 Category pages with filters (shade family, finish, skin type, price, long-wear/waterproof)
- [ ] 3.6 Product page complete: gallery, swatches, delivery estimate, reviews, "complete the look"
- [ ] 3.7 Shade finder quiz
- [ ] 3.8 Gifts / sets page
- [ ] 3.9 Beauty journal: 3 launch articles (e.g. Songkran waterproof look)
- [ ] 3.10 About, Help (shipping, returns, payment, FAQ), Contact
- [ ] 3.11 Legal: PDPA privacy notice, terms, cookie policy (reviewed by a lawyer)
- [ ] 3.12 Native Thai speaker reviews all Thai copy
- [ ] 3.13 Brand name and logo applied everywhere (replaces `[BRAND]`) ⛔ waiting for brand

## Task 4 — Shopping: bag, checkout and payments

- [ ] 4.1 Choose commerce backend ⛔ open decision #2
- [ ] 4.2 Choose payment gateway ⛔ open decision #3
- [ ] 4.3 Bag drawer: items, shade, quantity, free-shipping progress bar, upsell
- [ ] 4.4 Wishlist (works for guests)
- [ ] 4.5 Search with instant results (Thai and English keywords)
- [ ] 4.6 Checkout: guest checkout, Thai address form with postcode autofill, delivery options ⛔ open decision #4
- [ ] 4.7 Payments: PromptPay QR (auto-confirm), TrueMoney, Rabbit LINE Pay, cards; COD ⛔ open decision #5
- [ ] 4.8 Order confirmation page and email / LINE notification
- [ ] 4.9 Account: orders, addresses, saved shades
- [ ] 4.10 PDPA cookie consent: no analytics or pixels before consent

## Task 5 — Testing, speed and SEO

- [ ] 5.1 Playwright end-to-end: browse → product → add to bag → checkout (Thai and English, phone and desktop)
- [ ] 5.2 Accessibility check (WCAG 2.2 AA): contrast, keyboard, screen-reader labels
- [ ] 5.3 Performance: LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on mid-range Android over 4G
- [ ] 5.4 SEO audit (`seo-audit` skill): Thai meta tags, `hreflang`, product structured data, sitemap.xml
- [ ] 5.5 Conversion review (`cro` skill) of Home, Product and Checkout
- [ ] 5.6 Cross-browser: Chrome Android, Safari iOS, LINE in-app browser, Facebook in-app browser

## Task 6 — Launch

- [ ] 6.1 Domain, hosting (Singapore region), environment variables
- [ ] 6.2 Analytics (after consent) and conversion tracking
- [ ] 6.3 Final content and price check by the owner
- [ ] 6.4 Go live and monitor the first week
- [ ] 6.5 Plan phase 2: A/B tests (`ab-testing` skill), loyalty, virtual try-on
