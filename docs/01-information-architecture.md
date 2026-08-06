# RK Jha Group — Information Architecture, Personas & Journeys

## 1. Complete Sitemap

```
/ (Home)
├── /loans/
│   ├── index.html                      (All Loans hub)
│   ├── personal-loan.html              ✅ BUILT (flagship template)
│   ├── business-loan.html              — to build (clone personal-loan.html)
│   ├── home-loan.html                  — to build
│   ├── loan-against-property.html      — to build
│   ├── car-loan.html                   — to build
│   ├── working-capital-loan.html       — to build
│   ├── msme-loan.html                  — to build
│   ├── professional-loan.html          — to build
│   └── education-loan.html             — to build
├── /insurance/
│   ├── index.html                      (All Insurance hub)
│   ├── health-insurance.html           ✅ BUILT (flagship template)
│   ├── term-insurance.html             — to build (clone health-insurance.html)
│   ├── life-insurance.html             — to build
│   ├── motor-insurance.html            — to build
│   ├── commercial-vehicle-insurance.html — to build
│   ├── home-insurance.html             — to build
│   ├── business-insurance.html         — to build
│   ├── fire-insurance.html             — to build (combine with marine)
│   └── group-health-insurance.html     — to build
├── /emi-calculator.html                ✅ BUILT (EMI + eligibility + amortization)
├── /about.html                         ✅ BUILT
├── /contact.html                       ✅ BUILT (full lead form + apply hub)
├── /thank-you.html                     ✅ BUILT
├── /404.html                           ✅ BUILT
├── /privacy-policy.html                ✅ BUILT
├── /terms.html                         ✅ BUILT
├── /disclaimer.html                    ✅ BUILT
├── /faqs.html                          ✅ BUILT
├── /partner-banks.html                 — to build
├── /partner-insurers.html              — to build
├── /blog/index.html                    — to build
├── /careers.html                       — to build
├── /become-a-partner.html              — to build
├── /customer-reviews.html              — to build
└── /success-stories.html               — to build
```

**Why this scope.** Rather than generating 25+ thin, generic pages, this build produces two fully realised "flagship" templates — `personal-loan.html` and `health-insurance.html` — that demonstrate every pattern (hero, eligibility, benefits, rate table, documents, calculators, FAQs, lead form, sticky CTA, breadcrumbs, schema). Every remaining loan/insurance page is a **content swap** of one of these two templates: duplicate the file, change the hero copy, rate table, eligibility criteria, document list and FAQ answers, keep the layout, components and JS untouched. This is faster and more consistent than hand-building 19 one-off pages, and it's how a real production team would scale a design system.

## 2. Navigation Architecture

**Primary nav (desktop):** Logo → Loans (mega menu, 9 products + "View all") → Insurance (mega menu, 9 products + "View all") → Calculators → Partners → Resources → About → [Call Now] [Apply in 2 Minutes]

**Primary nav (mobile):** Hamburger → slide-in panel with accordion groups for Loans/Insurance, flat links for the rest, sticky Apply + Call buttons pinned to the bottom of the panel.

**Persistent conversion layer (all pages):**
- Floating WhatsApp button, bottom-right, pulses once after 1.5s to draw the eye without being obnoxious.
- Mobile-only sticky bottom bar: Call | WhatsApp | Apply Now — appears after the user scrolls past 60% of the hero.
- Exit-intent modal (desktop): triggers once per session when the cursor leaves via the top of the viewport, offers a callback in exchange for name + mobile.

## 3. Footer Architecture

Six-column footer: Brand/social block, Loans (top 5 + "all products" link), Insurance (top 5 + "all products" link), Company (About, Careers, Partner, Success Stories, Reviews, Contact), Resources & Legal (Calculator, FAQs, Blog, Privacy, Terms, Disclaimer). Below the grid: department email directory (Sales, Loans, Insurance, Support, Partnerships, Media/Careers), then the RBI/IRDAI regulatory disclaimer paragraph (required on every page per the Disclosure strategy below), then a copyright + SSL trust line.

## 4. User Personas

**1. Rohit, 34 — Business Owner (MSME)**
Runs a 12-person manufacturing unit. Needs ₹50L-₹2Cr working capital or expansion capital. Time-poor, skeptical of "instant approval" claims, wants to see real numbers and talk to a human before committing. Converts via: business loan banner → EMI calculator → advisor callback.

**2. Dr. Anjali, 41 — Professional (Doctor)**
Wants a professional loan to set up a second clinic, and separately shopping for a ₹1Cr term policy for family protection. High income, low time, converts fastest via WhatsApp and a single well-designed form rather than multiple back-and-forth calls.

**3. Karan, 29 — Corporate Employee, First-time Borrower**
Applying for his first personal loan (debt consolidation) or comparing health insurance for his parents. Price-sensitive, reads FAQs and comparison tables closely, needs reassurance (trust badges, reviews) before entering any personal data.

**4. Meera, 52 — HNI / Builder**
Loan-against-property or large home loan (₹1Cr+), plus business insurance for a commercial property. Expects white-glove service; a dedicated relationship manager and fast turnaround matter more than shaving 0.25% off the rate.

## 5. Customer Journeys

**Journey A — Loan (high intent, organic/search traffic)**
Google search for "personal loan interest rate" → lands on `/loans/personal-loan.html` (SEO-optimised, matches search intent) → scans hero trust stats → uses embedded EMI calculator → checks eligibility calculator → scrolls rate table & documents (removes objections) → reads 2-3 FAQs → fills 3-step progressive form → thank-you page → advisor call within 30 minutes.

**Journey B — Insurance (comparison-driven)**
Arrives via a comparison-intent search or blog post → `/insurance/health-insurance.html` → uses premium calculator to get a personalised number → reviews the compare-plans table → reads claim-process steps (biggest objection for insurance is "will it actually pay out") → 2-step lead form → thank-you.

**Journey C — Homepage-first (branded/direct traffic)**
Lands on `/` → dual loan/insurance search widget in hero → trust strip (counters) builds credibility in the first 3 seconds → browses featured products tabs → tries EMI preview → clicks through to a flagship product page → converts there.

**Journey D — Mobile, WhatsApp-first**
Discovers via social/referral on mobile → sticky bottom bar visible immediately after first scroll → taps WhatsApp instead of filling a form (lower friction) → human advisor continues the conversation and collects details conversationally.

## 6. Progressive Disclosure Strategy (Lead Forms)

All lead forms are split into 2-4 short steps rather than one long form, because completion rates drop sharply with visible field count. Step 1 always asks only for what's needed to start a conversation (name + mobile, or product selection). Later steps layer in income, occupation, loan/property/insurance specifics, and finally preferred contact time + consent. A step-dot progress indicator sets expectations ("this will take 4 short taps, not a 20-field form"). Every step's "Continue" button uses native HTML5 validation (`reportValidity()`) so users get inline feedback without a page reload.
