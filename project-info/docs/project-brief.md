# Project brief

> Status: draft, 2026-10-22. Brand name and logo are not decided yet. Use `[BRAND]` everywhere until they are.

## What we are building

An online store for a women's cosmetics brand, `[BRAND]`, selling to customers in **Thailand**.
The site should feel classy, soft and elegant: a beauty brand customers want to browse, not just a product list.
Animation is part of the experience, but always quiet and graceful. It should never get in the way of buying.

## Who it is for

- **Primary:** Thai women aged 18–35, shopping mostly **on a phone**, who discover products on TikTok, Instagram, Facebook and LINE.
- **Secondary:** Thai women aged 35–50 who care about quality and skin comfort, and gift buyers (birthday, Valentine's Day, New Year).
- **Language:** Thai first. English is the second language (for expats and tourists).

## What we sell (launch categories)

| Category | Products |
|---|---|
| Lips | Lipstick (matte, satin, sheer), lip tint, lip gloss, lip liner |
| Face | Cushion and foundation, loose and pressed powder, blush, highlighter, contour |
| Eyes | Eyeliner (pen, gel), mascara, eyeshadow palettes, brow products |
| Lashes | False eyelashes (natural, dramatic, individual), lash glue |
| Sets | Makeup kits, gift sets, travel minis |
| Tools | Brushes, sponges, puffs, cases |

## Goals (what "success" means)

1. A visitor understands the brand's look and feel within 5 seconds of opening the home page.
2. A visitor on a mid-range Android phone with 4G can go from home page to paid order in under 2 minutes.
3. Visitors can find the right shade (lipstick, cushion, blush) without seeing the product in person.
4. Customers can pay the way Thai shoppers prefer: PromptPay QR, mobile wallets and cards (see [market-research-thailand.md](market-research-thailand.md)).
5. The site passes Core Web Vitals on mobile: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.

## Out of scope for the first release

- Marketplace integration (Shopee, Lazada, TikTok Shop) — link out to them instead.
- Native mobile app.
- Loyalty points program (plan for it later; keep the account area ready).
- Virtual try-on with the camera (candidate for phase 2).

## Open decisions (owner: project owner)

| # | Decision | Options | Notes |
|---|---|---|---|
| 1 | Brand name and logo | — | Will be provided later. Colors in the design direction are provisional until the logo arrives. |
| 2 | Commerce backend | Shopify (headless) / custom backend (e.g. Medusa) / WooCommerce | Shopify is fastest to launch. Decide before building cart and checkout. |
| 3 | Payment gateway | Opn Payments (Omise) / 2C2P / Shopify Payments partner | Must support PromptPay, TrueMoney and Rabbit LINE Pay. Confirm with the provider. |
| 4 | Delivery partners | Flash Express / Kerry / J&T / Thailand Post | Delivery experience is a top driver for buying beauty online in Thailand. |
| 5 | Cash on delivery | Yes / No | COD is declining but still expected by some shoppers. |
| 6 | Product photos and models | Own shoot / supplier images | Models should reflect Thai and Southeast Asian skin tones. |

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router, Cache Components) + TypeScript | Fast pages, good SEO, image optimization |
| Styling | Tailwind CSS 4 with design tokens (`src/styles/tokens.css`) | Keeps the palette and spacing consistent |
| Animation | GSAP + ScrollTrigger, Lenis smooth scroll (editorial pages only) | Premium, controllable motion |
| Languages | Next.js built-in pattern: `/[lang]` routes + JSON dictionaries, Thai (`th`) default, English (`en`) | Thai-first routing; no extra library needed (next-intl was dropped as unnecessary) |
| Icons | Phosphor Icons (light weight) | Thin, elegant line icons |
| Hosting | Vercel (Singapore region) | Low latency to Thailand |
| Testing | Playwright | End-to-end and visual checks on mobile sizes |

## Related documents

- [market-research-thailand.md](market-research-thailand.md) — Thai market facts and reference websites
- [../design/design-direction.md](../design/design-direction.md) — look, colors, fonts, motion
- [../pages/sitemap.md](../pages/sitemap.md) — every page and what it does
- [../../rules/](../../rules/) — the rules everyone follows
- [../../skills/skills-map.md](../../skills/skills-map.md) — which Claude skill to use for which job
