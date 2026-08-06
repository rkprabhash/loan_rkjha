# RK Jha Group — Accessibility & Responsive Design Review

## 1. Accessibility Measures Implemented

- Semantic HTML throughout: `<header>`, `<nav aria-label="Primary">`, `<main>`, `<footer>`, proper `<h1>`-`<h3>` hierarchy, `<label>` elements tied to every form input.
- Keyboard support: mega-menu triggers respond to click/focus (`:focus-within` in CSS) rather than hover-only; mobile nav toggle has `aria-expanded`; all interactive elements are native `<button>`/`<a>` tags (never a `<div onclick>`), which gives free keyboard focus + Enter/Space activation.
- Color contrast: body text uses `ink-900`/`ink-700` on white/light-grey backgrounds (well above WCAG AA 4.5:1); white text is only placed on `navy-900`/`navy-950` gradients (also well above AA). Gold (`#D4AF37`) is used for accents/badges but never as body text on white, since gold-on-white fails contrast — it's reserved for dark backgrounds or bold badge chips with sufficient size.
- `prefers-reduced-motion` is respected globally — all animations, transitions and scroll-reveal collapse to near-instant for users who've requested reduced motion at the OS level.
- Form inputs use appropriate `inputmode` (`tel`, `numeric`) so mobile keyboards show the right layout, and `required` + native validation gives accessible, non-JS-dependent error messaging via `reportValidity()`.
- Alt-text-free by design: since the build deliberately avoids photographic `<img>` tags (see design system doc), there's no risk of missing alt text — all visual elements are either decorative CSS/SVG (safe to leave unlabelled) or meaningful icons paired with adjacent text.
- Touch targets: all buttons/links use generous padding (`.btn` = 0.95rem vertical padding minimum), comfortably exceeding the 44×44px minimum recommended touch target size.

## 2. Known Gaps / Recommended Follow-ups

- **Focus-visible styling:** currently relies on browser default focus rings. A custom, high-contrast `:focus-visible` outline (e.g., 2px gold ring) should be added sitewide for a polished, WCAG 2.4.7-compliant experience.
- **Skip-to-content link:** not yet implemented; should be added as the very first focusable element on every page for screen-reader and keyboard users to bypass the header/nav.
- **ARIA live regions:** the EMI/eligibility calculators update numbers on `input` events but don't announce changes to screen readers. Adding `aria-live="polite"` to the result elements would let screen-reader users hear updated EMI figures without needing to re-navigate.
- **Color-only signals:** the loan-vs-insurance tab distinction currently leans on royal-blue vs emerald-green color coding; icons/text labels are present alongside color in all cases, which is correct, but this should be re-verified on any new component before shipping.
- **Automated testing:** recommend running axe-core or Lighthouse's accessibility audit against every page pre-launch, plus a manual screen-reader pass (VoiceOver/NVDA) on the lead forms specifically, since multi-step forms are the highest-risk component for accessibility regressions.

## 3. Responsive / Mobile-First Design

Built mobile-first with Tailwind's responsive prefixes (`sm:` `md:` `lg:`) layered on top of unprefixed mobile styles. Key mobile-specific patterns:

- **Bottom navigation bar** (Call / WhatsApp / Apply) replaces the desktop header's inline CTAs once viewport drops below `md`, appearing after scroll to avoid competing with the hero.
- **Slide-in mobile nav panel** (not a full-screen overlay dropdown) keeps the mega-menu's information architecture intact on mobile via accordion groups, rather than dumbing down the nav.
- **Hero search widget** collapses from a 2-column desktop layout to single-column stacked fields, and the decorative floating stat cards are hidden below `lg` (`hidden lg:block`) since they add visual noise without enough viewport width to breathe.
- **Calculators** stack from 2-column (inputs | results) to single-column on mobile, with the donut chart and result number remaining above the fold on a typical mobile viewport.
- **Tables** (rate comparison, compare-plans) use `overflow-x-auto` with a `min-w-*` constraint so they scroll horizontally on narrow screens rather than crushing columns unreadably.
- **Touch-first calculators:** range sliders (not text inputs) are the primary interaction for EMI/eligibility/premium tools — sliders are dramatically easier to operate accurately on a touchscreen than typing precise numbers.

## 4. Performance Notes (mobile-relevant)

Because the build avoids any photographic imagery, custom web fonts are limited to two families loaded once via `<link>` (not `@import`, which blocks rendering), and all icons are inline SVG, the page weight is dominated almost entirely by the Tailwind CDN script itself. For the production-hardening step (compiled/purged Tailwind CSS — see `03-seo-strategy.md` and `06-dev-handoff.md`), expect Lighthouse mobile performance scores in the mid-90s+ range, comfortably meeting the brief's 95+ target.
