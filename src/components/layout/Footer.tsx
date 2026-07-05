import Link from "next/link";

const categories = [
  { href: "/calculators/financial/mortgage", label: "Financial" },
  { href: "/calculators/fitness-health/bmi", label: "Fitness & Health" },
  { href: "/calculators/math/scientific", label: "Math" },
  { href: "/calculators/other/tip", label: "Everyday" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-text-muted transition-colors hover:text-accent-text"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/design-system" className="text-sm text-text-muted transition-colors hover:text-accent-text">
                  Design System
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-text">About</h3>
            <p className="text-sm text-text-muted">
              Free, fast, and accessible calculators for everyday use. No accounts required.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-text-subtle">
          &copy; {new Date().getFullYear()} calculator.net(redesigned). All rights reserved.
        </div>
      </div>
    </footer>
  );
}
