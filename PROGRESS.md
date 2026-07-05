# PROGRESS.md — calculator.net(redesigned)

## Phase 0 — Scaffold
- [x] Init Next.js app (TS strict, App Router)
- [x] Install dependencies
- [x] Wire up ESLint with jsx-a11y rules
- [x] Configure Prettier + Vitest
- [x] Create directory structure + design tokens
- [x] Create ThemeProvider, core layout, UI primitives
- [x] git init + first commit

## Phase 1 — Design System & Shared Components
- [x] check-contrast.mjs — all token pairs pass WCAG
- [x] /design-system route (living style guide)
- [x] ExplainerAccordion component

## Phase 2 — Engine + Reference Implementation
- [x] DSL zod schema + loader/validator
- [x] validate-calculators.mjs
- [x] math.js wrapper (Scientific only)
- [x] Shared amortization utility
- [x] Mortgage calculator end-to-end

## Phase 3 — Remaining Nine Calculators
- [x] Loan, Currency, BMI, Calorie/BMR, Scientific, Percentage, Age, GPA, Tip

## Phase 4 — Cross-Cutting Polish
- [x] Command palette (Cmd+K)
- [x] SEO (JSON-LD, OG tags, canonical URLs, sitemap.xml, robots.txt)
- [ ] Calculation history — deferred
- [ ] Full axe sweep — deferred

## Phase 4.5 — Round 2 (Section 16)
- [x] 16.1: Header — text-only logo, no icon mark
- [x] 16.2: Working Scientific Calculator in homepage hero
- [x] 16.3: Search icon wired to real command palette (Ctrl+K + click)
- [x] 16.4: Category index pages at /calculators/[category]
- [x] 16.5: Shared kernels + 56 total calculators
  - [x] TVM kernel (compound interest, savings, CD, IRA, retirement, investment, auto loan)
  - [x] Unit-conversion kernel (10 categories: length, weight, temp, speed, volume, area, data, time, pressure, energy)
  - [x] Date-math kernel (date diff, age, day-of-week, duration)
  - [x] 56 calculators: mortgage, loan, currency, BMI, calorie, scientific, percentage, age, GPA, tip, compound-interest, simple-interest, savings, CD, auto-loan, retirement, investment, interest, body-fat, ideal-weight, pace, fraction, random-number, percent-error, exponent, binary, quadratic, log, ratio, root, LCM, GCF, rounding, mean-median-mode, standard-deviation, date, time-duration, day-counter, day-of-week, hours, square-footage, discount, sales-tax, fuel-cost, gas-mileage, password-generator, dice-roller, unit-converter, density, speed, Pythagorean theorem, triangle, circle, volume, slope, distance

## Phase 5 — Final Deliverables
- [x] BUG_TRACEABILITY.md
- [x] MORNING_REPORT.md
- [x] Clean git log (7 commits)

## Phase 5 — Round 3 (Section 17)
- [x] 17.1: Hero — two-column split with multi-band aurora (3 bands, different speeds/phase), glass calculator panel, entrance animation, all inert under prefers-reduced-motion
- [x] 17.2: Popular calculators section with `featured` flag in DSL schema
- [x] 17.3: Homepage restructured — hero, popular, category tiles (no full grid)
- [x] 60 total calculators, all passing §13 battery
