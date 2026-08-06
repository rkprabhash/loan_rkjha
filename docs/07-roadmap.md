# RK Jha Group — Future Roadmap

## Phase 1 (Current Build)
Static marketplace site: homepage, two flagship product templates (Personal Loan, Health Insurance), EMI/eligibility calculators, About, Contact (full lead form), legal pages, FAQs. Zero backend, deployable to GitHub Pages today.

## Phase 2 — Complete the Product Catalogue
Clone the two flagship templates into the remaining 17 product pages (8 loans, 8 insurance types) using `data/loans.ts` / `data/insurance.ts` if migrated to Next.js (see `06-dev-handoff.md`), or by direct HTML duplication if remaining static. Build out `/blog/`, `/partner-banks.html`, `/partner-insurers.html`, `/success-stories.html`, `/customer-reviews.html`, `/careers.html`, `/become-a-partner.html` — all sitemap'd and linked from the footer today, returning a friendly 404 until built.

## Phase 3 — Backend & Lead Pipeline
Stand up `/api/leads`, CRM integration (or a lightweight lead-management system), lead scoring per `04-conversion-strategy.md`, server-side conversion tracking for paid marketing, and a real content/blog CMS (Sanity/Contentful/MDX) so the marketing team can publish without a deploy.

## Phase 4 — Account Layer
Customer login/dashboard: application status tracker (the "Application Tracker UI" referenced in the original brief), saved comparisons, document upload portal, e-KYC integration. This is the point at which the product shifts from "marketing site with lead forms" to "logged-in marketplace platform."

## Phase 5 — New Product Verticals

The marketplace model (compare → advise → route to a regulated partner) extends naturally beyond loans and insurance:

- **Credit Cards** — comparison engine (rewards rate, annual fee, welcome bonus), eligibility pre-check, apply-through flow to card-issuing banks. High cross-sell overlap with the existing personal-loan/professional audience.
- **Mutual Funds** — SIP calculator (same calculator-first UX pattern already proven with EMI/eligibility tools), fund comparison by category/risk profile, routed through a SEBI-registered distributor partner or in-house RIA.
- **Fixed Deposits** — FD rate comparison across partner banks/NBFCs, FD-vs-inflation calculator, especially relevant cross-sell to the HNI/business-owner persona already being served.
- **Demat Accounts** — brokerage comparison, account-opening funnel, likely bundled with the mutual funds vertical launch.
- **Wealth Management** — the natural ceiling of the HNI/business-owner journey already being designed for (Meera persona, `01-information-architecture.md`): a dedicated relationship-manager-led offering for portfolio, tax and estate planning, positioned above the self-serve comparison tools.

**Design system implication:** the existing token system (navy/royal/emerald/gold, card/badge/button components, calculator pattern, progressive-disclosure forms) was deliberately built product-agnostic — a "Mutual Fund SIP Calculator" or "FD Rate Comparison" page can be assembled from the same component library with zero new visual language, only new data and copy. This is the payoff of investing in a real design system now rather than one-off page designs.

## Sequencing Note

Phases 2 and 3 should happen roughly in parallel once resourced (content team completes Phase 2 while engineering builds Phase 3's API layer), since neither blocks the other. Phase 4 depends on Phase 3's backend existing. Phase 5 verticals should be sequenced by which persona is most lucrative to expand first — likely Credit Cards (fastest to integrate, highest existing audience overlap) before Mutual Funds/FD/Demat/Wealth (which require new regulatory registrations — AMFI/SEBI — not currently held by an RBI/IRDAI-focused marketplace).
