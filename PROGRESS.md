# PROGRESS.md — calculator.net(redesigned)

## Phase 0 — Scaffold
- [x] Init Next.js app (TS strict, App Router)
- [x] Install dependencies (Tailwind v4, ESLint + jsx-a11y, Prettier, Vitest, math.js, date-fns, zod, recharts, KaTeX, lucide-react)
- [x] Wire up ESLint with jsx-a11y rules
- [x] Configure Prettier
- [x] Set up Vitest
- [x] Create directory structure
- [x] Create globals.css with design tokens
- [x] Create ThemeProvider with system detection + localStorage persistence
- [x] Create core layout: SkipLink, TopNav, Footer
- [x] Create UI primitives: Button, Input, Card, Tabs, ThemeToggle
- [x] Create calculator components: ResultPanel (with digit transition), CalculatorCard, ShareButton
- [x] Create homepage with calculator grid
- [x] git init + first commit
- [x] Create PROGRESS.md, DECISIONS.md, CHANGELOG.md

## Phase 1 — Design System & Shared Components
- [x] Write scripts/check-contrast.mjs (contrast verification script)
- [x] Build /design-system route (living style guide)
- [x] Create ExplainerAccordion component
- [x] Wire up Tailwind theme with full token mapping

## Phase 2 — Engine + Reference Implementation
- [x] Create DSL zod schema
- [x] Create loader/validator for calculator DSL files
- [x] Write scripts/validate-calculators.mjs
- [x] Set up math.js wrapper
- [x] Create shared amortization utility
- [x] Build Mortgage calculator end-to-end (inputs, kernel, tests, explainer, JSON-LD, share link)

## Phase 3 — Remaining Nine Calculators
- [x] Loan calculator
- [x] Currency converter
- [x] BMI calculator
- [x] Calorie/BMR calculator
- [x] Scientific calculator
- [x] Percentage calculator
- [x] Age calculator
- [x] GPA calculator
- [x] Tip calculator

## Phase 4 — Cross-Cutting Polish
- [x] Command palette (Cmd+K)
- [x] SEO sweep (JSON-LD, OG tags, canonical URLs, sitemap.xml, robots.txt)
- [ ] Calculation history (localStorage) — deferred
- [ ] Full axe sweep — deferred (manual a11y practices followed)
- [ ] Responsive QA at 1280/768/390px — deferred

## Phase 5 — Final Deliverables
- [x] BUG_TRACEABILITY.md (52 original findings)
- [x] MORNING_REPORT.md
- [x] Final PROGRESS.md update
- [x] Clean git log
