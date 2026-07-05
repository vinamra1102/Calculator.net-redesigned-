# CHANGELOG.md — calculator.net(redesigned)

## 2026-07-05

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
