# MORNING_REPORT.md — calculator.net(redesigned)

**Date:** 2026-07-05  
**Build session:** Autonomous overnight build

---

## What's done

### Design System
- Full token system with dark/light themes (CSS custom properties)
- WCAG contrast-verified — `scripts/check-contrast.mjs` passes all pairs at 4.5:1+ for text, 3:1+ for UI
- Living style guide at `/design-system` with all tokens, typography, buttons, cards, spacing
- Theme toggle: system default on first load, manual override persisted in `localStorage`

### Shared Components
- **UI:** Button (3 variants), Input (with label, error, hint, unit), Card, Tabs (ARIA compliant), ThemeToggle
- **Calculator:** CalculatorCard, ResultPanel (signature digit-roll animation), ExplainerAccordion, ShareButton, CommandPalette (Cmd+K), JSON-LD
- **Layout:** SkipLink, TopNav (responsive with mobile menu), Footer

### Calculator Engine
- Zod schema for calculator DSL — typed inputs, validation, category routing
- Client-side calculation with URL state sync (bookmarkable)
- math.js wrapper for safe expression evaluation (Scientific calculator only)
- Shared amortization utility (Mortgage + Loan)
- `scripts/validate-calculators.mjs` validates all DSL files

### All 10 Calculators
1. **Mortgage** — amortization formula, 20% down default, full schedule in extras
2. **Loan** — reuses amortization utility
3. **Currency** — sample exchange rates (see below)
4. **BMI** — metric, standard adult bands, healthy weight range
5. **Calorie/BMR** — Mifflin-St Jeor, 5 activity levels
6. **Scientific** — math.js expression parser, never eval()
7. **Percentage** — 3 modes: X% of Y, is-what-percent, percent-change
8. **Age** — date-fns, leap year handling, exact years/months/days
9. **GPA** — configurable grade-to-points mapping
10. **Tip** — bill split with tip percentage

### SEO
- JSON-LD (`SoftwareApplication`) on every calculator
- Open Graph + Twitter Card metadata
- Canonical URLs
- Auto-generated `sitemap.xml` and `robots.txt`

### Testing
- 27 unit tests passing across 5 test suites
- TypeScript strict mode — zero type errors
- ESLint with jsx-a11y — zero lint errors

---

## What's blocked

### Currency Exchange Rates
The currency converter uses **static sample rates** (hardcoded, labeled as "Sample rates — not live" in the UI). A real implementation needs:
- A rate provider API (e.g., Open Exchange Rates, ExchangeRate-API, or ECB)
- An API key stored as an environment variable
- The `RateProvider` interface is designed to be swappable — just implement a new provider

**Decision needed:** Which exchange rate API to use and where to store the key.

---

## What's left

### Phase 5 (Stretch)
- Continue porting calculators from the master inventory (~190 more)
- Each new calculator follows the DSL pattern: add a `.calc.json` + `.calc.ts` kernel

### Minor polish items
- Amortization table UI (the data is computed in `extras.schedule` but not rendered as a table yet)
- Calculation history (localStorage, capped, clearable)
- Full axe automated accessibility sweep (manual a11y practices followed throughout)
- Responsive QA regression test at 1280/768/390px with UA spoofing

---

## Architecture decisions

| Decision | Rationale |
|---|---|
| `data-theme` on `<html>` for theming | Matches CSS custom property scoping. Flash-prevention script in `<head>` |
| Client-side calculation only | No server round-trips. Instant results. URL params for sharing |
| DSL-driven calculator rendering | One `CalculatorPage` component handles all calculators. Adding new ones = JSON + kernel |
| math.js for Scientific only | Sandboxed parser. Never `eval()`. Structured calculators use typed inputs |
| Tailwind v4 with `@theme inline` | Tokens as CSS custom properties mapped to Tailwind utilities |
| JSX-a11y rules as errors | Catches accessibility issues at lint time, not in production |

---

## Verification battery results

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run test` | 27/27 pass |
| `npm run build` | Pass (17 routes generated) |
| `npm run validate:calculators` | 10/10 valid |
| `npm run check:contrast` | All pairs pass |

---

## Git log

```
be5daa8 Phase 4: command palette, SEO, and polish
a30e5e6 Phase 2-3: calculator engine, DSL, and all 10 calculators
aaeb9b4 Phase 1: design system, contrast verification, and /design-system route
7a0bf5e Phase 0: scaffold Next.js app with full tooling and design system foundation
```
