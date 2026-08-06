# RK Jha Group — Design System & Brand Guidelines

## 1. Brand Positioning

RK Jha Group is positioned as a **rising, credible challenger** in the Indian financial marketplace category — more premium and calmer than PolicyBazaar/Paisabazaar's high-density, ad-heavy comparison pages, closer in restraint to HDFC/ICICI's banking-grade trust cues, but with the warmth and modern typography of Cred/Navi. The brand voice is: transparent, advisory-first, quietly confident. It never uses urgency-manipulation copy ("Only 2 slots left!") — trust is the entire value proposition, so the design and copy must never undercut it.

## 2. Logo Concept

A rounded-square navy mark containing a gold-outlined shield/arc (evoking protection + upward growth) with an "RK" monogram in Georgia serif (a deliberate contrast to the sans-serif UI type, signalling "established institution" the way bank wordmarks often mix serif crests with sans body type). The full lockup pairs the mark with "RK Jha Group" in Plus Jakarta Sans Extrabold, plus a small gold kicker line "TRUSTED FINANCIAL MARKETPLACE" in the header — this kicker does double duty as a trust signal on every single page. Favicon is the mark alone, inlined as an SVG data URI so the site needs zero external image requests for branding.

## 3. Color System

| Token | Hex | Usage |
|---|---|---|
| `navy-950` | `#050B18` | Deepest backgrounds, hero gradients |
| `navy-900` | `#0A1730` | Primary dark surface, footer |
| `navy-800` / `navy-700` | `#0F2049` / `#152C61` | Gradient midtones |
| `royal-600` / `royal-500` | `#1E4FD9` / `#2E63F6` | Primary CTA, links, loan-product accent |
| `emerald-600` / `emerald-500` | `#03875A` / `#0BA968` | Insurance-product accent, success states |
| `gold-600` / `gold-500` | `#B8912E` / `#D4AF37` | Premium accents, badges, secondary CTA |
| `ink-900/700/500` | `#0B1526` / `#31405C` / `#5C6A87` | Text hierarchy |
| `grey-50/100/200/400` | `#F7F9FC` … `#9AA6BF` | Backgrounds, borders, muted text |

Rationale: navy + royal blue reads as "bank," gold reads as "premium," emerald is reserved specifically for insurance/success so a user subconsciously learns "green = protection/good outcome" as they move through the site. Bright red is avoided everywhere per brief — even error/destructive states should use a muted rose rather than pure red, to keep the palette calm.

## 4. Typography Scale

- **Display / headings:** Plus Jakarta Sans (500-800 weights) — geometric, confident, slightly rounded terminals that soften the navy/gold palette.
- **Body / UI:** Inter (400-700) — the most legible workhorse sans for dense financial data (rate tables, forms).
- **Scale:** `text-5xl/6xl` hero H1 → `text-3xl/4xl` section H2 → `text-lg/xl` H3 → `text-sm/base` body → `text-xs` micro-copy (disclaimers, meta). Tight `letter-spacing: -0.02em` on display type keeps large headlines from feeling loose.

## 5. Spacing & Layout Tokens

8px base grid (Tailwind default scale). Section vertical rhythm: `py-20`/`py-24` desktop, collapsing via Tailwind's responsive utilities on mobile. Max content width `max-w-7xl` (1280px) for full-bleed sections, `max-w-3xl`/`max-w-5xl` for forms and reading content. Card radius `--r-lg: 24px` is the signature "premium rounded" radius used almost everywhere; buttons use full pill radius (`999px`) to visually differentiate "action" from "content."

## 6. Elevation & Glassmorphism

Three shadow tokens (`shadow-sm/md/lg`) plus a gold-tinted shadow reserved for gold CTAs/badges. Glassmorphism (`backdrop-filter: blur`) is used **sparingly** and intentionally: only on the hero's floating stat cards and the sticky header on scroll — exactly per brief ("glassmorphism used sparingly"). It is never used on forms or data tables, where clarity matters more than texture.

## 7. Iconography & Illustration Style

Icons are hand-authored inline SVG (2px stroke, rounded caps, 24×24 grid) rather than an icon-font or external library — this keeps the site at zero extra network requests and lets every icon inherit `currentColor` for theming. Style reference: similar stroke-weight to Lucide/Feather, but simplified to the ~20 icons this site actually needs (phone, WhatsApp, check, shield, arrow, chart, document, clock, calendar, users).

No photographic imagery is used in this build — deliberately, to avoid generic stock-photo "template" feel and to keep the site lightweight. Illustration is created entirely through gradient panels, glass cards, floating stat chips, and iconography. If/when photographic or illustrated assets are added, see `06-dev-handoff.md` for AI-illustration prompts that match this system.

## 8. Component Library (implemented in `/assets/css/style.css`)

`.btn` (primary / gold / outline / ghost-light / emerald, + `-sm` size), `.card` / `.card-hover` / `.card-premium`, `.badge` (emerald/gold/royal variants), mega-menu (`.nav-group` + `.mega-panel`), `.accordion-item` (FAQ, CSS grid-based smooth expand), tabs (`[data-tabs]` / `[data-tab-btn]` / `[data-tab-panel]`), `.step-dot` (progressive form progress), `.range-slider` (calculators), `.input-field` / `.input-label`, `.sticky-cta` (mobile bottom bar), `.glass` / `.glass-light`, marquee logo strip, animated counters (`[data-counter]`), scroll-reveal (`.reveal` + IntersectionObserver).

## 9. Motion Principles

Reveal-on-scroll uses a 700ms cubic-bezier ease with staggered delays (`reveal-delay-1..4`) so sections feel choreographed rather than "everything fades in at once." Hover states use `translateY(-2px to -4px)` + shadow growth rather than scale, which reads as "lift" (premium, physical) rather than "bounce" (playful, less banking-appropriate). All motion respects `prefers-reduced-motion`. Full micro-interaction list is in `06-dev-handoff.md`.
