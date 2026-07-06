# calculator.net(redesigned)

A ground-up, accessible rebuild of a 2007-era calculator hub — same job (fast, single-purpose
calculators, no login), a completely different foundation underneath.

**Live:** https://calculator-net-redesigned.vercel.app/

> This is an independent concept redesign, not affiliated with or endorsed by the operators
> of the original calculator.net.

---

## Why this exists

The original site worked — it ranked well, the formulas were right, people used it — but a
full engineering and accessibility audit turned up 52 catalogued issues: zero HTML labels on
a 60-field mortgage form, no keyboard support on the calculator keys, production code that ran
user input through `eval()`, a "mobile site" detected by sniffing the user-agent instead of
responsive CSS, and a visual language that hadn't moved since 2008.

This project is what a from-scratch rebuild looks like when every one of those findings is
treated as a hard constraint rather than a suggestion: real semantic HTML, a verified-not-
assumed color system, a safe expression parser instead of `eval()`, and dark mode as a
first-class citizen.

## What's here

- **59 calculators live** across four categories, built from one declarative schema instead
  of 59 one-off components:

  | Category | Count | Examples |
  |---|---|---|
  | Financial | 14 | Mortgage, Loan, Currency, Compound Interest, Retirement, Investment |
  | Fitness & Health | 6 | BMI, Calorie, Body Fat, Ideal Weight, Pace, TDEE |
  | Math | 24 | Scientific, Percentage, Fraction, Quadratic Formula, Standard Deviation |
  | Everyday | 15 | Age, GPA, Tip, Date, Unit Converter, Password Generator |

  Full inventory: [Financial](https://calculator-net-redesigned.vercel.app/calculators/financial) ·
  [Fitness & Health](https://calculator-net-redesigned.vercel.app/calculators/fitness-health) ·
  [Math](https://calculator-net-redesigned.vercel.app/calculators/math) ·
  [Everyday](https://calculator-net-redesigned.vercel.app/calculators/other)

- **A token-driven design system** — two brand colors (Neon Mint, Carbon Black), everything
  else derived and contrast-verified by script rather than eyeballed. Dark and light themes,
  system-default with a persisted manual override. See it at
  [`/design-system`](https://calculator-net-redesigned.vercel.app/design-system).
- **A live calculator in the hero**, not just marketing copy — the Scientific Calculator,
  sitting on a drifting aurora background behind a frosted-glass panel.
- **A command palette** (⌘K / Ctrl+K) that fuzzy-searches every calculator in the registry.
- **Accessibility as a build gate, not a pass at the end** — every input has a real label,
  every control is keyboard-operable with a visible focus ring, every result region
  announces itself to screen readers, and `prefers-reduced-motion` turns off every non-
  essential animation.

<!-- Add a screenshot or two here — hero (dark), a calculator page, and /design-system read well -->

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript strict |
| Styling | Tailwind CSS v4, custom design tokens |
| UI primitives | shadcn/ui |
| Math | KaTeX (notation), math.js (safe expression parsing — the Scientific calculator's `eval()` replacement) |
| Dates | date-fns |
| Testing | Vitest (calculation kernels), axe (accessibility sweeps) |
| Hosting | Vercel |

## Getting started

```bash
git clone <your-repo-url>
cd calculator-net-redesigned
npm install
npm run dev        # http://localhost:3000
```

Other scripts you'll want:

```bash
npm run build               # production build
npm run lint                # ESLint, including jsx-a11y rules
npm run typecheck           # tsc --noEmit
npm run test                # calculation kernel unit tests
npm run check:contrast      # verifies every token pair against WCAG AA
npm run validate:calculators # validates every calculator's DSL file against its schema
```

## Adding a calculator

Calculators are data, not one-off components. Each one is a small schema describing its
inputs, plus either a `math.js` formula string (simple, single-formula tools) or a typed
kernel function (anything with loops, branching, or tables — amortization, unit conversion,
date math, and similar problems each share one kernel across many calculators rather than
duplicating logic):

```json
{
  "id": "tip",
  "category": "other",
  "title": "Tip calculator",
  "summary": "Split a bill with tip among any number of people.",
  "inputs": [
    { "id": "bill", "label": "Bill amount", "type": "currency", "default": 50, "min": 0 },
    { "id": "pct", "label": "Tip percentage", "type": "percent", "default": 18, "min": 0, "max": 100 },
    { "id": "people", "label": "Number of people", "type": "number", "default": 1, "min": 1 }
  ],
  "kernel": "tip.calc.ts",
  "explainer": "tip.mdx"
}
```

Drop it in `/lib/calculators`, add a unit test with an independently-verified reference
value, run `npm run validate:calculators`, and it's live — the homepage, its category page,
and the command palette all pick it up automatically with no other wiring.

## Accessibility

Every calculator ships with labeled inputs, a real landmark structure, keyboard-operable
controls, and a color system verified for WCAG 2.1 AA contrast by script rather than by eye.
The full list of what the original audit found, and how each item was closed in this
rebuild, lives in `BUG_TRACEABILITY.md`.

## Roadmap

59 of roughly 195 planned calculators are live, prioritized financial → fitness & health →
math → everyday to match real-world demand. The remaining ones are being ported through the
same shared kernels (time-value-of-money, unit conversion, date math) rather than built as
one-offs — see `PROGRESS.md` for current status.

## License

MIT — see `LICENSE`. *(Add a `LICENSE` file with the MIT text, or swap this line for
whichever license you'd actually like to use.)*
