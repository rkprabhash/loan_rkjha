# RK Jha Group — SEO Strategy

## 1. On-Page SEO Implemented in This Build

Every built page includes: a unique, keyword-led `<title>` (≤60 chars, format "Primary Keyword | Value Prop | Brand"), a unique meta description (≤155 chars, includes a number/stat + CTA), a self-referencing canonical tag, `robots` meta, Open Graph tags (homepage), a single logical `<h1>` per page, and a strict heading hierarchy (H1 → H2 section headers → H3 card/item titles — never skipped levels). Breadcrumb navigation (both visual and `BreadcrumbList` JSON-LD) is present on every product-level page.

## 2. Structured Data (Schema.org)

- **Homepage:** `FinancialService` organization schema.
- **Product pages:** `BreadcrumbList` + `FAQPage` schema (the on-page FAQ accordion content is mirrored in JSON-LD so it's eligible for FAQ rich results).
- **Roadmap:** add `Product`/`Offer` schema once real, lender-verified rates are available (avoid schema for rates that are only "indicative" — could trigger a structured-data/misrepresentation issue with Google).

## 3. URL Structure

Flat, human-readable, keyword-matched URLs: `/loans/personal-loan.html`, `/insurance/health-insurance.html` — no query-string tracking in canonical URLs, no unnecessary nesting. (Note: this static build uses `.html` extensions for GitHub Pages compatibility without a build step; a Next.js migration — see `06-dev-handoff.md` — would drop the extension via file-based routing, e.g. `/loans/personal-loan`.)

## 4. Internal Linking

Every product page links to 2-3 "related products" (cross-sell: personal loan page links to professional loan + term insurance). The homepage links to every flagship page multiple times (nav, mega-menu, featured products, banners). Footer provides a sitewide link graph so no page is more than 2 clicks from the homepage. This distributes link equity and mirrors real user cross-shopping behaviour (someone applying for a home loan is a good term-insurance lead).

## 5. Keyword Strategy (starting targets)

**Loans:** "personal loan interest rate", "personal loan eligibility calculator", "business loan for MSME India", "home loan interest rate today", "loan against property eligibility", "car loan EMI calculator", "working capital loan for business", "professional loan for doctors", "education loan for study abroad".

**Insurance:** "health insurance plans compare India", "family health insurance premium calculator", "term insurance ₹1 crore", "best health insurance claim settlement ratio", "car insurance renewal online", "group health insurance for employees".

**Tooling/high-intent:** "EMI calculator", "loan eligibility calculator", "personal loan vs credit card".

Each flagship page already targets its primary keyword in the H1, title, and first 100 words — the pattern to replicate for every remaining product page.

## 6. Content/Blog Strategy

The `/blog/` hub (sitemap'd, not yet built) should target long-tail, comparison and "how to" queries that funnel into product pages — e.g. "Personal Loan vs Credit Card: Which Costs You Less?" (links to personal-loan.html), "Term vs Health Insurance: Do You Need Both?" (links to both insurance flagships), "7 Documents Every MSME Needs Before Applying" (links to business/MSME loan pages). Three placeholder cards for this content already exist on the homepage.

## 7. Technical SEO / Performance

Zero-build static HTML with Tailwind Play CDN keeps the deployment trivial for GitHub Pages, but for a real Lighthouse 95+ target (per the original brief), the recommended production hardening is: (1) replace the Tailwind CDN script with a compiled, purged Tailwind CSS file (removes the runtime JIT compiler and the "cdn.tailwindcss.com should not be used in production" console warning), (2) self-host or subset the Google Fonts, (3) add explicit `width`/`height` on any future images to prevent layout shift, (4) consider migrating to Next.js (static export) for automatic code-splitting once the page count grows past ~15 pages. See `06-dev-handoff.md` for the concrete migration path.

## 8. Sitemap.xml / robots.txt

Both should be generated once the full page set (including all 19 remaining product pages and the blog) is built — premature to hand-write now since URLs would need updating with every new page. A minimal `robots.txt` allowing all crawl and pointing to `/sitemap.xml` should be added at deploy time.
