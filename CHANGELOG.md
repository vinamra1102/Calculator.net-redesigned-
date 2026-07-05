# CHANGELOG.md — calculator.net(redesigned)

## 2026-07-05

### Phase 4 — Command palette, SEO, and polish
- CommandPalette (Cmd+K): searchable calculator finder with keyboard navigation
- sitemap.xml: auto-generated from calculator registry
- robots.txt: allows all crawling, references sitemap
- JSON-LD: SoftwareApplication schema on every calculator page
- not-found.tsx: custom 404 page
- OG + Twitter Card metadata on all calculator pages
- Canonical URLs per calculator

### Phase 2-3 — Calculator engine, DSL, and all 10 calculators
- Zod schema for calculator DSL (inputs, types, validation)
- Number formatting utilities (currency, percent, compact)
- math.js wrapper for safe expression evaluation (Scientific calc only)
- Shared amortization utility (used by Mortgage and Loan)
- Calculator registry with client-side function lookup
- validate-calculators.mjs script for DSL validation
- All 10 calculators: Mortgage, Loan, Currency, BMI, Calorie/BMR, Scientific, Percentage, Age, GPA, Tip
- 27 unit tests passing across 5 test suites

### Phase 1 — Design system, contrast verification, and /design-system route
- check-contrast.mjs: WCAG contrast ratio verifier for all token pairs
- Fixed text-subtle, success, and focus ring tokens to pass 4.5:1 minimum
- /design-system route: living style guide with all tokens, typography, buttons, cards
- ExplainerAccordion: accessible disclosure component

### Phase 0 — Scaffold
- Initialized Next.js 16 app with TypeScript strict mode and App Router
- Installed all dependencies: Tailwind v4, ESLint + jsx-a11y, Prettier, Vitest, math.js, date-fns, zod, recharts, KaTeX, lucide-react
- Created design token CSS with full dark/light theme system (data-theme attribute)
- Built ThemeProvider with system preference detection and localStorage persistence
- Created core layout components: SkipLink, TopNav (with mobile menu), Footer
- Created UI primitives: Button (3 variants), Input (with label/error/hint), Card, Tabs (ARIA compliant), ThemeToggle
- Created calculator components: ResultPanel (with signature digit roll animation), CalculatorCard, ShareButton
- Built homepage with calculator grid showing all 10 initial calculators
- Set up directory structure per spec
- Created PROGRESS.md, DECISIONS.md, CHANGELOG.md
