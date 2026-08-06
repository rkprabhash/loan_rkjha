# RK Jha Group — Financial Marketplace Website

A premium, static (zero-build) marketing site for RK Jha Group, a loans & insurance marketplace. Pure HTML/CSS/JS — no npm install, no build step. Open `index.html` directly in a browser, or deploy straight to GitHub Pages.

## What's Included

- **Homepage** (`index.html`) — full premium homepage with hero search, trust strip, partner logos, why-choose-us, how-it-works, featured products, live EMI calculator preview, eligibility checker, promo banners, success stories, testimonials, FAQs, blog teasers, final CTA, footer, floating WhatsApp, mobile sticky CTA bar, exit-intent modal.
- **Two flagship product templates**, fully built out (hero → eligibility → benefits → rates → documents → calculator → FAQs → lead form → related products):
  - `loans/personal-loan.html`
  - `insurance/health-insurance.html`
- **Hub/listing pages:** `loans/index.html`, `insurance/index.html`
- **Tools:** `emi-calculator.html` (EMI calculator with amortization schedule + eligibility calculator, loan-type presets)
- **Core pages:** `about.html`, `contact.html` (full 4-step lead form), `thank-you.html`, `404.html`
- **Legal/trust:** `privacy-policy.html`, `terms.html`, `disclaimer.html`, `faqs.html`
- **Shared assets:** `assets/css/style.css` (design tokens + components), `assets/js/main.js` (nav, calculators, forms, accordions, animations — all vanilla JS, no framework)
- **Strategy & design documentation:** see `/docs` — information architecture, personas & journeys, design system & brand guidelines, SEO strategy, conversion/CRO strategy, accessibility & responsive review, developer handoff notes (incl. Next.js migration path), and the future product roadmap.

## Why Only 2 Full Product Pages?

This build intentionally focuses on two fully-realised **flagship templates** (Personal Loan, Health Insurance) rather than 19 shallow, generic pages. Every other loan/insurance product page follows the *exact same pattern* — duplicate the flagship file, swap the hero copy/stats, rate table, eligibility criteria, document list, and FAQ content. See `docs/01-information-architecture.md` for the full sitemap and build status of every page, and `docs/06-dev-handoff.md` for how this becomes a one-template, data-driven system if/when the site moves to Next.js.

Some footer/nav links (Blog, Partner Banks, Success Stories, Careers, Become a Partner, Customer Reviews) point to pages that aren't built yet — they'll hit the custom `404.html`, which is styled and offers clear next steps. These are documented as Phase 2 in `docs/07-roadmap.md`.

## Previewing Locally

No build tools needed. Options:
1. Just double-click `index.html` to open it in a browser (some relative-path features work fine this way, but the site is built with root-relative paths like `/assets/...`, so a local server is more accurate).
2. Run a simple local server from this folder for the most accurate preview:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```
   Then visit `http://localhost:8080`.

## Deploying to GitHub Pages

**Important — root-relative paths:** every page links to CSS/JS/other pages using root-relative URLs (e.g. `/assets/css/style.css`, `/loans/personal-loan.html`). These work perfectly if the site is served from the **root** of a domain — either:

- **A custom domain** (recommended, matches the meta tags already in the code, e.g. `https://loans.rkjhagroup.in/`), or
- **A GitHub "user/organization" Pages site** (`username.github.io`), which is also served from root.

If instead you deploy as a **GitHub "project" Pages site** (`username.github.io/repo-name/`), the site is served from a *subpath*, and every root-relative link will break. To fix that, either:
(a) rename the repo to `username.github.io` so it becomes a root user site, or
(b) add a custom domain + `CNAME` file (see below), or
(c) do a find-and-replace of all `href="/` and `src="/` to relative paths before deploying as a project site.

### Steps (custom domain — recommended)

1. Create a new GitHub repository and push this entire folder to it (branch `main`).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**, **Branch: main**, folder **/(root)**.
4. If using a custom domain, add a file named `CNAME` at the repo root containing just your domain, e.g.:
   ```
   loans.rkjhagroup.in
   ```
   and configure a `CNAME`/`ALIAS` DNS record pointing that subdomain to `username.github.io`.
5. Save — GitHub Pages will build and publish within a minute or two.
6. Because there's no build step, every future edit to any `.html`/`.css`/`.js` file goes live on the next push — no CI pipeline required.

## Making Edits

- **Colors/fonts/spacing:** edit the CSS custom properties and Tailwind `theme.extend` block at the top of any page's `<head>`, or the shared tokens in `assets/css/style.css`.
- **Calculators/forms/nav behaviour:** all shared logic lives in `assets/js/main.js` — it's plain, commented vanilla JS.
- **Adding a new loan/insurance product page:** copy `loans/personal-loan.html` (or `insurance/health-insurance.html`), update the `<title>`/meta tags, hero copy, rate table, documents list, and FAQ content, then link to it from `loans/index.html` (or `insurance/index.html`) and the homepage mega-menu.
- **Lead form submissions:** currently client-side only (redirects to `thank-you.html` with the name in the URL, no data is actually sent anywhere) — see `docs/06-dev-handoff.md` §5 for how to wire this to a real backend/CRM when one exists.

## Full Documentation Set

| File | Contents |
|---|---|
| `docs/01-information-architecture.md` | Sitemap, nav/footer architecture, personas, customer journeys |
| `docs/02-design-system.md` | Brand positioning, color system, typography, spacing, components, icons |
| `docs/03-seo-strategy.md` | Meta/schema strategy, URL structure, keyword targets, technical SEO |
| `docs/04-conversion-strategy.md` | CRO principles, CTA hierarchy, trust-building, lead scoring |
| `docs/05-accessibility-responsive.md` | Accessibility review, gaps, mobile-first responsive patterns |
| `docs/06-dev-handoff.md` | Next.js migration path, component hierarchy, animations, AI illustration prompts |
| `docs/07-roadmap.md` | Phase 2-5 roadmap incl. Credit Cards, Mutual Funds, FD, Demat, Wealth Management |
