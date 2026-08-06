# RK Jha Group — Conversion & Trust Strategy

## 1. CRO Principles Applied

**Reduce perceived effort before asking for commitment.** Every product page lets a visitor get value (EMI estimate, eligibility estimate, premium estimate) *before* any personal information is requested. By the time someone reaches the lead form, they already have a number in mind and are qualifying themselves — this is why conversion rates on calculator-first flows consistently beat "form-first" designs.

**Progressive disclosure over long forms.** All lead forms (hero mini-form, product-page apply form, contact page full form, exit-intent modal) are split into 2-4 steps with a visible step-dot progress indicator. Step 1 never asks for more than name + mobile (or a single selection). This is deliberate: field count is one of the strongest negative predictors of form completion, and a 12-field wall on step 1 kills more leads than any styling issue.

**Multi-channel, not just forms.** Financial decisions above ₹20L are rarely made by filling a web form alone — the target persona (business owners, HNIs, professionals) wants to talk to someone. Call and WhatsApp are first-class CTAs everywhere: desktop header, mobile sticky bar, floating WhatsApp button, footer, and every CTA section — never buried behind a form.

**Friction-appropriate to intent.** Someone landing from a branded homepage search sees a short 3-field hero form. Someone deep in the contact page (highest intent) sees the full 4-step qualification form because they've already demonstrated commitment by scrolling that far.

## 2. CTA Hierarchy

1. **"Apply in 2 Minutes"** (gold/primary) — the single most-repeated CTA phrase sitewide, chosen because it sets a concrete, small time expectation (research shows specific low numbers outperform vague "Apply Now").
2. **"Call Now" / tel: links** — always paired next to the primary CTA in the header and sticky bar, never hidden in a submenu.
3. **"Chat on WhatsApp"** — third-tier but omnipresent via the floating button; this is the lowest-friction channel for mobile users who don't want to fill any form at all.
4. **Secondary/exploratory CTAs** ("Calculate EMI", "Explore →", "Compare Plans") move a visitor deeper into content rather than asking for a conversion — used on cards and banners where the visitor hasn't yet earned enough trust to convert.

## 3. Sticky & Persistent Conversion Surfaces

- **Desktop:** sticky header keeps Call + Apply visible at all scroll depths.
- **Mobile:** a bottom sticky bar (Call | WhatsApp | Apply) appears once the visitor scrolls past ~60% of the hero — not on page load, so it doesn't compete with the hero's own CTAs, but early enough to catch scroll-and-bounce visitors.
- **Exit intent (desktop only):** a single, once-per-session modal offering a callback, triggered on upward mouse exit through the top of the viewport. Deliberately minimal (2 fields) since exit-intent traffic has the least patience.

## 4. Trust-Building Elements (implemented)

- Animated counters (customers served, bank/insurer partner counts, ₹ disbursed) — numbers with counting animation hold attention 2-3x longer than static numbers in eye-tracking studies of financial landing pages.
- Bank and insurer logo marquees — social proof through association with recognisable institutions.
- Google rating badge (4.8★ / review count) surfaced in the hero itself, not buried in a testimonials section.
- Testimonials with named roles/cities (specificity reads as more credible than generic "Happy Customer").
- Success stories with real ₹-figures and outcomes, framed as case studies rather than marketing copy.
- A persistent, honest regulatory disclaimer ("we are a marketplace, not a lender/insurer") in the footer of every page — counter-intuitively, this kind of upfront limitation disclosure *increases* trust with financially sophisticated audiences (the target persona) because it signals the brand isn't over-claiming.
- SSL/security messaging in the footer, tied to concrete language (256-bit, IT Act 2000) rather than a vague "we're secure."

## 5. Lead Scoring Framework (recommended for backend implementation)

Since this static build has no backend, lead scoring is a design recommendation for the CRM/API layer referenced in `06-dev-handoff.md`:

| Signal | Weight |
|---|---|
| Loan amount ≥ ₹20L / Sum insured ≥ ₹25L | High |
| Occupation: Business Owner / Professional | High |
| Completed calculator interaction before form submit | Medium-High |
| Filled all 4 form steps (vs. abandoned at step 1) | Medium |
| Channel: phone call / WhatsApp-initiated | High (self-selected high intent) |
| City: Tier-1 metro | Medium |
| Time on site > 90 seconds before conversion | Medium |
| Exit-intent modal conversion | Low-Medium (lower intent, price-sensitive) |

This scoring should route "High" leads to senior relationship managers within the promised 30-minute SLA, and lower-scored leads into a nurture/email sequence instead of consuming premium advisor time.

## 6. What Was Deliberately Left Out

No countdown timers, no fake "X people viewing this now" social-proof widgets, no bright-red urgency banners. For a financial marketplace targeting HNI/professional/business audiences, manipulative urgency patterns actively damage trust and are inconsistent with the "banking-grade, high trust" brief. Every conversion lever used here is either (a) genuinely useful (calculators), (b) honestly framed (real stats, real testimonials-style copy), or (c) simply reduces friction (multi-channel CTAs, progressive forms).
