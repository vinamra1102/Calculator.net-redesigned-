import type { Metadata } from "next";
import { DesignSystemTabs } from "./DesignSystemTabs";
import { TokenSwatches } from "./TokenSwatches";

export const metadata: Metadata = {
  title: "Design System",
  description: "Living style guide for calculator.net(redesigned) — tokens, primitives, and patterns.",
};

export default function DesignSystemPage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-text">Design System</h1>
      <p className="mb-8 text-text-muted">
        Living reference for every token, primitive, and pattern used in calculator.net(redesigned).
      </p>

      <DesignSystemTabs />

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold text-text">Color Tokens</h2>
        <TokenSwatches />
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold text-text">Typography</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-text-subtle">Display (49px)</p>
            <p className="text-[49px] font-bold leading-[1.1] text-text">Calculator</p>
          </div>
          <div>
            <p className="text-xs text-text-subtle">Heading 1 (39px)</p>
            <p className="text-[39px] font-bold leading-[1.15] text-text">Heading One</p>
          </div>
          <div>
            <p className="text-xs text-text-subtle">Heading 2 (31px)</p>
            <p className="text-[31px] font-semibold leading-[1.2] text-text">Heading Two</p>
          </div>
          <div>
            <p className="text-xs text-text-subtle">Heading 3 (25px)</p>
            <p className="text-[25px] font-semibold leading-[1.3] text-text">Heading Three</p>
          </div>
          <div>
            <p className="text-xs text-text-subtle">Body (16px)</p>
            <p className="text-base leading-[1.55] text-text">
              The quick brown fox jumps over the lazy dog. Every calculator page stands on its own.
            </p>
          </div>
          <div>
            <p className="text-xs text-text-subtle">Small (14px)</p>
            <p className="text-sm leading-[1.5] text-text-muted">
              Helper text, labels, and secondary information.
            </p>
          </div>
          <div>
            <p className="text-xs text-text-subtle">Monospace / Tabular (results)</p>
            <p className="font-mono text-2xl tabular-nums font-semibold text-accent-text">
              $1,234.56 / month
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold text-text">Spacing Scale</h2>
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <div
                className="bg-accent-soft border border-accent"
                style={{ width: size, height: size }}
              />
              <span className="text-xs text-text-subtle">{size}px</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
