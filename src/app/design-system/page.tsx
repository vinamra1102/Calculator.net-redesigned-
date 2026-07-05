import type { Metadata } from "next";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { DesignSystemTabs } from "./DesignSystemTabs";
import { TokenSwatches } from "./TokenSwatches";

export const metadata: Metadata = {
  title: "Design System",
  description: "Living style guide for calculator.net(redesigned) — tokens, primitives, and patterns.",
};

export default function DesignSystemPage() {
  return (
    <>
      <SkipLink />
      <TopNav />
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
          <h2 className="mb-4 text-xl font-semibold text-text">Buttons</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Calculate</Button>
            <Button variant="secondary">Reset</Button>
            <Button variant="ghost">Copy link</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-text">Cards</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-text">Mortgage Calculator</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-muted">
                  Estimate your monthly payment from home price, down payment, term, and rate.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-text">BMI Calculator</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-muted">
                  Calculate your Body Mass Index and see which standard band you fall into.
                </p>
              </CardContent>
            </Card>
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

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-text">Border Radius</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 bg-accent-soft border border-accent rounded-[8px]" />
              <span className="text-xs text-text-subtle">8px (card)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 bg-accent-soft border border-accent rounded-[6px]" />
              <span className="text-xs text-text-subtle">6px (input)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 bg-accent-soft border border-accent rounded-full" />
              <span className="text-xs text-text-subtle">999px (pill)</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
