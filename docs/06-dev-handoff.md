# RK Jha Group — Developer Handoff Notes

## 1. What Was Built vs. What This Document Specifies

This repository ships as **static HTML/CSS/JS** — zero build step, deployable to GitHub Pages by pushing the folder as-is (see root `README.md`). That was a deliberate choice for this phase: no backend, no npm install required to preview, works immediately in any browser. This document specifies how a dev team would evolve it into the full Next.js/React/TypeScript stack originally envisioned, once the product needs a real backend (lead API, CMS-driven blog, dynamic rate feeds).

## 2. Current File Structure (static build)

```
/
├── index.html
├── about.html
├── contact.html
├── emi-calculator.html
├── thank-you.html
├── 404.html
├── privacy-policy.html / terms.html / disclaimer.html / faqs.html
├── loans/
│   ├── index.html
│   └── personal-loan.html        (flagship template — clone for other 8 loan pages)
├── insurance/
│   ├── index.html
│   └── health-insurance.html     (flagship template — clone for other 9 insurance pages)
├── assets/
│   ├── css/style.css             (design tokens + custom components)
│   └── js/main.js                (shared behaviour: nav, accordions, tabs, calculators, forms)
└── docs/                         (this strategy/design documentation set)
```

## 3. Recommended Next.js Migration — Folder Structure

```
/src
├── app/
│   ├── layout.tsx                       (root layout: header, footer, providers)
│   ├── page.tsx                         (home)
│   ├── loans/
│   │   ├── page.tsx                     (hub)
│   │   └── [slug]/page.tsx              (dynamic — one template, data-driven)
│   ├── insurance/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── emi-calculator/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── thank-you/page.tsx
│   └── blog/[slug]/page.tsx
├── components/
│   ├── layout/  (Header, MegaMenu, MobileNav, Footer, StickyCta, WhatsAppFloat)
│   ├── marketing/  (Hero, TrustStrip, LogoMarquee, WhyChooseUs, HowItWorks, Banner)
│   ├── calculators/  (EmiCalculator, EligibilityCalculator, PremiumCalculator, AmortizationTable)
│   ├── forms/  (ProgressiveLeadForm, StepIndicator, ExitIntentModal)
│   ├── content/  (FaqAccordion, Testimonials, SuccessStoryCard, BlogCard, CompareTable)
│   └── ui/  (Button, Card, Badge, Tabs, Input, Slider — shadcn/ui-based primitives)
├── data/
│   ├── loans.ts            (typed product data: rates, docs, FAQs, eligibility — one entry per loan type)
│   ├── insurance.ts
│   └── partners.ts         (bank/insurer logos, names, metadata)
├── lib/
│   ├── emi.ts               (computeEmi, computeEligibility — ported from assets/js/main.js)
│   ├── validation.ts        (Zod schemas per form step)
│   └── analytics.ts
└── styles/
    └── globals.css          (Tailwind + design tokens, ported from assets/css/style.css)
```

**Why `[slug]` dynamic routes matter:** the current static build has 2 hand-built HTML files (`personal-loan.html`, `health-insurance.html`) as *implicit* templates. In Next.js, this becomes one real template component fed by `data/loans.ts` / `data/insurance.ts` — adding the remaining 17 product pages becomes a data-entry task (add one object to an array), not a new file. This is the single highest-leverage refactor once the team moves off static HTML.

## 4. Component Hierarchy (React, production-ready shape)

```
<RootLayout>
  <Header>
    <Logo /> <MegaMenu items={loans|insurance} /> <NavLink /> <CtaGroup />
  </Header>
  <MobileNav /> {/* portal, slide-in */}
  <main>{children}</main>
  <Footer />
  <WhatsAppFloat />
  <StickyCta /> {/* mobile only, scroll-triggered */}
  <ExitIntentModal />
</RootLayout>

<ProductPageTemplate product={loanOrInsuranceData}>
  <ProductHero /> <Breadcrumbs />
  <EligibilitySection />
  <BenefitsGrid />
  <RateOrCoverageTable />
  <DocumentsSection />
  <EmiCalculator | PremiumCalculator />
  <EligibilityCalculator />
  <ProgressiveLeadForm productId={product.id} />
  <FaqAccordion items={product.faqs} />
  <RelatedProducts items={product.related} />
</ProductPageTemplate>
```

## 5. Form Submission — Production Wiring

`assets/js/main.js`'s `initProgressiveForms()` currently redirects to `/thank-you.html` with query params (no backend, per this phase's scope). Replace the `submit` handler with:

```ts
const res = await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...formData, source: pageUrl, utm: utmParams }),
});
if (res.ok) router.push(`/thank-you?name=${name}`);
```

The `/api/leads` route should validate with the Zod schema matching each form step, apply the lead-scoring weights from `04-conversion-strategy.md`, write to the CRM (or a queue for async CRM sync), and fire a server-side conversion event (Google Ads/Meta CAPI) so paid-marketing attribution isn't lost to client-side ad blockers.

## 6. Suggested Animations & Micro-interactions (already implemented in CSS, documented for React port)

- **Scroll reveal:** `IntersectionObserver`-driven fade-up, staggered 80ms per sibling (`.reveal-delay-1..4`) — port to Framer Motion `whileInView` with `staggerChildren`.
- **Counters:** eased count-up on first viewport entry (cubic ease-out, 1.6s) — port to a `useCounter` hook or Framer Motion's `useSpring`.
- **Card hover:** `translateY(-4px)` + shadow growth, 250ms — signals "liftable/clickable" without feeling playful/bouncy.
- **Button press:** `scale(0.97)` on `:active` for tactile feedback.
- **WhatsApp float:** a single pulse-ring animation 1.5s after page load (not looping forever — avoid banner-blindness/annoyance).
- **Accordion:** CSS Grid `0fr → 1fr` row transition (not `max-height` hacks) for a truly smooth, content-agnostic expand/collapse — this technique should be preserved as-is in the React port (it's a modern, framework-agnostic CSS pattern, no JS height calculation needed).
- **Donut chart (EMI principal/interest split):** CSS `conic-gradient`, animatable via a custom property transition — cheap, no canvas/SVG library needed for this simple 2-segment chart. For the full amortization line/area chart on a future analytics-style page, use Recharts per the original tech-stack brief.

## 7. AI-Generated Illustration Prompts (for future visual asset generation)

If/when the team decides to introduce illustration (currently deliberately absent — see design system doc), these prompts match the established navy/royal-blue/emerald/gold palette and "premium, minimal, banking-grade" brief:

1. *"Minimal isometric illustration of a bank building merging into a rising bar chart, navy blue and gold color palette, soft gradient lighting, flat vector style, generous negative space, no text"*
2. *"Abstract illustration of a shield made of overlapping translucent geometric layers in emerald green and navy, representing insurance protection, flat design, subtle gold outline accent"*
3. *"Isometric illustration of a family standing beside a stylised house with a protective glowing arc above it, navy and emerald palette, minimal flat vector style, warm but corporate"*
4. *"Abstract network/graph illustration connecting bank icons, a shield icon, and a handshake icon with thin gold lines on a deep navy background, representing a financial marketplace, minimal line-art style"*
5. *"Flat vector illustration of a professional (gender-neutral, non-specific) reviewing documents at a minimal desk, navy blazer, soft royal-blue ambient lighting, banking-app aesthetic, no visible face detail, editorial/corporate illustration style"*

## 8. Tech Stack Rationale (for the eventual Next.js build)

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + React Hook Form + Zod + Lucide Icons + Recharts, exactly as specified in the original brief. Rationale: Next.js static export or ISR gives the SEO benefits of server-rendered HTML (critical for a lead-gen/organic-search-dependent business) while still supporting the interactive calculators as client components; React Hook Form + Zod gives type-safe, performant multi-step form validation (replacing the vanilla-JS `reportValidity()` approach in this static build); Recharts becomes relevant once amortization schedules need real line/area charts beyond the current CSS conic-gradient donut.
