# Skills map

Which Claude skill to use for which job on this project. Ask Claude to use one by name, e.g. "use the `emil-design-eng` skill to polish the product card".

## Already installed (ready to use)

### Look and feel: making it elegant and premium
| Skill | Use it for |
|---|---|
| `high-end-visual-design` | Fonts, spacing, shadows and card styles that make the site feel expensive. **Main design skill.** |
| `design-taste-frontend` | Avoiding "AI template" look; final pre-flight check on every page |
| `emil-design-eng` | Small polish details: buttons, swatches, drawers, hover states |
| `impeccable` | Design critique, audits, accessibility, typography and color checks |
| `minimalist-ui` | Calm editorial sections (brand story, journal) |
| `modern-web-design` | Current trends, micro-interactions, accessibility and performance patterns |

### Animation: the effects that attract customers
| Skill | Use it for |
|---|---|
| `cinematic-gsap-lenis-motion-system` | Luxury smooth scroll, text reveals, parallax, magnetic hover. **Main motion skill.** |
| `gsap-scrolltrigger` | Detailed GSAP and ScrollTrigger code (pinning, scrubbing, timelines) |
| `scroll-experience` | Scroll storytelling for the brand-story and campaign pages |
| `animation-vocabulary` | Naming an effect you've seen on another site so it can be built exactly |

### Images and brand
| Skill | Use it for |
|---|---|
| `imagegen-frontend-web` | Generating one design mockup image per home-page section before coding |
| `image-to-code` | Turning approved mockups into code that matches |
| `brandkit` | Brand guideline board once the brand name and logo arrive |

### Studying live websites and testing
| Skill | Use it for |
|---|---|
| `playwright-cli` | Opening live competitor sites (Rare Beauty, Mistine, ...), taking screenshots, recording interactions |
| `webapp-testing` / `playwright-best-practices` | Testing our own site on phone sizes; checkout flow tests |
| `redesign-existing-projects` | Auditing pages later and upgrading them |

## Installed in this project (`.claude/skills/`)

Found with the `find-skills` skill on [skills.sh](https://skills.sh/) and installed 2026-10-22 with
`npx skills add <repo> -s <skill> -a claude-code --copy -y`. Versions are pinned in [skills-lock.json](../skills-lock.json).
Checked after install: Markdown instructions only, no scripts.

| Skill | Source | Use it for |
|---|---|---|
| `gsap-plugins` | greensock (official) | **Draggable** and Inertia (swipe carousels, drag-to-compare shades), SplitText, Flip |
| `gsap-core` | greensock (official) | Tweens, easing, core API |
| `gsap-timeline` | greensock (official) | Sequenced intros (hero, add-to-bag) |
| `gsap-scrolltrigger` | greensock (official) | Scroll reveals, pinning, parallax |
| `gsap-react` | greensock (official) | `useGSAP`, cleanup in React components |
| `gsap-performance` | greensock (official) | Smooth animation on mid-range phones |
| `apple-design` | emilkowalski | Gesture and drag feel, springs, Apple-quality motion |
| `vercel-react-best-practices` | vercel-labs | React / Next.js performance |
| `vercel-react-view-transitions` | vercel-labs | Page-to-page transitions (product grid → product page) |
| `cro` | coreyhaines31 | Conversion: turning visitors into buyers |
| `seo-audit` | coreyhaines31 | SEO checks so Thai shoppers find the site on Google |
| `ab-testing` | coreyhaines31 | Testing which hero or offer sells more |

Not installed:
- `shopify/shopify-ai-toolkit@shopify-storefront-graphql`: only needed if we choose Shopify as the backend.
- The many `*/superpowers@product-photography` copies: duplicates from unknown publishers.
- No skill called "drag" exists on skills.sh; dragging is covered by `gsap-plugins` (Draggable) and `apple-design`.

Restore on a new machine: `npx skills experimental_install` (reads `skills-lock.json`).

## Order of use

1. **Research:** `playwright-cli` on the reference sites → screenshots in `project-info/design/references/`.
2. **Brand:** `brandkit` (when the logo arrives).
3. **Mockups:** `imagegen-frontend-web` + `high-end-visual-design`.
4. **Build:** `image-to-code`, then `cinematic-gsap-lenis-motion-system` / `gsap-scrolltrigger` for motion.
5. **Polish:** `emil-design-eng`, `impeccable`, `design-taste-frontend` check.
6. **Launch checks:** `webapp-testing`, `seo-audit`, `cro`.
