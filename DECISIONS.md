# DECISIONS.md — calculator.net(redesigned)

Decisions made during the build that future sessions should respect.

## 2026-07-05

### Tailwind v4 with inline @theme
Using Tailwind v4's `@theme inline` directive in globals.css for token mapping. This means tokens are CSS custom properties that map to Tailwind utility classes via `@theme`.

### Theme system: data-theme attribute on <html>
Following the spec exactly — using `data-theme="dark"` or `data-theme="light"` on the `<html>` element. A flash-prevention script in `<head>` reads localStorage and applies the theme before paint.

### ESLint: flat config with jsx-a11y
Using ESLint's flat config format (v9+) with jsx-a11y plugin rules enabled as errors. This enforces the accessibility constraints from the spec at lint time.

### Font loading: next/font/google with Inter + JetBrains Mono
Using `next/font/google` for both Inter (UI) and JetBrains Mono (numeric displays). Variable fonts with `display: swap` for optimal loading.

### Vitest for unit tests
Using Vitest with jsdom environment and React plugin for testing calculation kernels.

### shadcn/ui: manual component creation
Rather than running the shadcn CLI (which may have Tailwind v3 assumptions), manually creating UI components that match the design tokens. This gives full control over the token mapping.

### Calculator route structure: /calculators/[category]/[slug]
Using dynamic route segments for category and slug. This allows clean URLs like `/calculators/financial/mortgage`.
