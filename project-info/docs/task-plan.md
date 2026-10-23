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

- [x] 2.1 Motion setup: GSAP + ScrollTrigger + Draggable + Inertia + `useGSAP` in `src/lib/motion.ts`, shared easing and duration tokens
- [x] 2.2 Lenis smooth scroll on Home only so far (About and Journal get it when built in Task 3); off on touch devices
- [x] 2.3 Hero intro: image settles from a slight zoom, headline lines rise out of masks (Thai-safe: lines from the text file). Pure CSS, so it does not delay LCP
- [x] 2.4 Scroll reveals: headings, tiles, cards, reviews fade up with stagger (`data-reveal` + `RevealRoot`)
- [x] 2.5 Product card hover: crossfade to the second shade (stands in for a second photo), soft lift
- [x] 2.6 Shade swatch: selected ring grows, product image recolors with a soft settle
- [x] 2.7 Draggable best-seller carousel with inertia and snap (GSAP Draggable), arrow buttons, keyboard focus support
- [x] 2.8 Drag-to-compare slider: shade on fair vs tan skin (drag or arrow keys)
- [x] 2.9 Add-to-bag micro-interaction: button → ✓ Added, bag icon pop, count update
- [x] 2.10 Brand-story section: pinned scroll with parallax layers (desktop only)
- [x] 2.11 Gold shimmer detail on premium elements (once per view)
- [x] 2.12 Page transitions: product image morphs from card to product page (React `<ViewTransition>`), header stays still
- [ ] 2.13 Verify: reduced-motion ✓, JS-off ✓, CLS ✓ (≤ 0.002), LCP ✓ (< 1.4 s at 4× CPU). ⚠ Some long frames remain on Home in GPU-less headless tests → confirm on a real phone in 5.3 → [testing/task-2/results.md](../testing/task-2/results.md)

## Task 3 — Content

Goal: every page filled with real (or realistic) Thai and English content.

- [x] 3.1 Brand voice guide: Thai and English tone, words to use and avoid → [brand-voice.md](brand-voice.md)
- [x] 3.2 Home page copy (Thai + English): hero, categories, best sellers, story, journal, reviews, LINE sign-up (draft Thai, see 3.12)
- [x] 3.3 Product content for all 12 products: description, how to use, ingredients (sample), claims, finish, benefits, shade families, rating, reviews (sample), Thai FDA (อย.) field
- [ ] 3.4 Images: product photos, shade swatches on 3+ skin tones, lifestyle and model photos
  - [x] Site picks up photos automatically from `public/images/` (falls back to SVG per missing image), tested
  - [x] AI image brief for Antigravity: 30 packshots + 10 lifestyle photos → [image-generation-brief.md](../design/image-generation-brief.md)
  - [x] Antigravity generates the 40 images (reviewed → [testing/images/results.md](../testing/images/results.md))
  - [x] Redo 4 images with wrong shades: Chili Red, Peach Blossom, both eyeliners (re-checked, all match)
  - [ ] ⛔ Before launch: packshots replaced with photos of the real products
- [x] 3.5 Category pages with filters (finish, shade family, benefits, price) and sorting. Skin-type filter skipped: no product data for it yet
- [x] 3.6 Product page complete: 3-view gallery, swatches, delivery estimate, details/how to use/ingredients, reviews, "complete the look"
- [x] 3.7 Shade finder quiz: skin tone → undertone → lip finish → cushion, lip and blush picks (rules in `src/lib/shade-finder.ts`)
- [x] 3.8 Gifts / sets page with gift-wrap note and gifts under ฿500
- [x] 3.9 Beauty journal: list page + 3 launch articles with "shop the look"
- [x] 3.10 About, Help (shipping, returns, payment, FAQ), Contact. Help is marked draft until the owner confirms the policies
- [ ] 3.11 Legal: PDPA privacy notice, terms, cookie policy. Drafts written and marked on-page; ⛔ needs a lawyer's review
- [ ] 3.12 Native Thai speaker reviews all Thai copy ⛔ needs a native Thai copywriter
- [ ] 3.13 Brand name and logo applied everywhere (replaces `[BRAND]`) ⛔ waiting for brand

## Polish round

Goal: six small details that make the shop feel finished. Checked → [testing/polish/results.md](../testing/polish/results.md)

- [x] P.1 Sticky "Add to bag" bar on phones (product page): slides up once the main button is scrolled past, same "✓ Added" feedback, its own LINE button (the floating one hides meanwhile)
- [x] P.2 "Shop the look" hotspots on the home hero photo: lip corner → Velvet Kiss (Rose Petal), cheek → Petal Soft Blush (Sakura); card flips to stay on screen; opens on click/Enter only
- [x] P.3 Payment methods as one quiet text line under Add to bag: PromptPay · TrueMoney · Rabbit LINE Pay · Visa · Mastercard (COD ⛔ open decision #5)
- [x] P.4 Shade compare on three skin tones: fair on the left, medium or tan (radio group) on the right; not shown for cushion and powder
- [x] P.5 Static morning leaf shadows on the brand story and the About header (pre-blurred texture, `scripts/make-leaf-shadow.mjs`)
- [x] P.6 Slow "silk" gradient behind the hero (two drifting colour fields, no blur filter, paused off screen)
- [x] P.7 Design review fixes: hover/silk/shadow colours as tokens, `skinTan` key, About heading without a lone "คุณ"

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
