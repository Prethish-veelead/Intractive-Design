# Rules: design and motion

Source of truth for look and feel: [design-direction.md](../project-info/design/design-direction.md).

## Design

1. Use design tokens only. No hard-coded hex colors, font sizes or spacing in components.
2. Mobile first. Every screen is designed and checked at 375 px before desktop.
3. One primary button per screen. Primary = rosewood fill. Everything else is secondary or text.
4. Body text contrast meets WCAG 2.2 AA (4.5:1). Never put body text in blush, nude, rose or gold.
5. Tap targets are at least 44 × 44 px (swatches included).
6. No generic templates: no stock "hero + three cards" layout, no default Tailwind shadows, no emoji as icons. Run the `design-taste-frontend` or `high-end-visual-design` skill check before a page is called done.
7. Every product image has width and height set (no layout shift) and descriptive alt text in the page's language.
8. Shades are shown on real skin, not just as flat color dots.

## Motion

1. Animate only `transform` and `opacity`. Never animate width, height, top, left or box-shadow size.
2. Durations: micro-interactions 150–350 ms, reveals 400–600 ms, hero intro max 900 ms.
3. Easing: soft ease-out (e.g. `power2.out` / `cubic-bezier(0.22, 1, 0.36, 1)`). No bounce, no elastic.
4. Respect `prefers-reduced-motion`: turn off parallax, smooth scroll and reveals; keep instant state changes.
5. Never hide the hero image or main heading behind an animation that delays it (it hurts LCP). Content is visible without JavaScript.
6. No scroll-jacking on shop, product, bag or checkout pages. Lenis smooth scroll and pinned sections are for Home, About and Journal only.
7. Every animation must have a reason: guide the eye, confirm an action, or show the product. Decoration alone is not a reason.
8. Kill GSAP ScrollTriggers and Lenis on route change (no leaks).
9. Test animations on a mid-range Android phone (or 4× CPU throttling). If it drops frames, simplify it.
