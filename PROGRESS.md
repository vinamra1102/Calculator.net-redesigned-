# PROGRESS.md — calculator.net(redesigned)

## Phase 0 — Scaffold
- [x] Init Next.js app (TS strict, App Router)
- [x] Install dependencies (Tailwind v4, shadcn/ui, Vitest, Prettier, ESLint, math.js, date-fns, zod, recharts, KaTeX, lucide-react)
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
- [ ] Write scripts/check-contrast.mjs (contrast verification script)
- [ ] Build /design-system route (living style guide)
- [ ] Create ExplainerAccordion component
- [ ] Wire up Tailwind theme with full token mapping

## Phase 2 — Engine + Reference Implementation
- [ ] Create DSL zod schema
- [ ] Create loader/validator for calculator DSL files
- [ ] Write scripts/validate-calculators.mjs
- [ ] Set up math.js wrapper
- [ ] Create shared amortization utility
- [ ] Build Mortgage calculator end-to-end (inputs, kernel, tests, explainer, JSON-LD, share link)

## Phase 3 — Remaining Nine Calculators
- [ ] Loan calculator
- [ ] Currency converter
- [ ] BMI calculator
- [ ] Calorie/BMR calculator
- [ ] Scientific calculator
- [ ] Percentage calculator
- [ ] Age calculator
- [ ] GPA calculator
- [ ] Tip calculator

## Phase 4 — Cross-Cutting Polish
- [ ] Command palette (Cmd+K)
- [ ] Calculation history (localStorage)
- [ ] Full axe sweep on every route
- [ ] SEO sweep (OG tags, canonical URLs, JSON-LD, sitemap.xml, robots.txt)
- [ ] Responsive QA (1280/768/390px + UA-spoofing regression check)

## Phase 5 — Final Deliverables
- [ ] BUG_TRACEABILITY.md (52 original findings)
- [ ] MORNING_REPORT.md
- [ ] Final PROGRESS.md update
- [ ] Clean git log
