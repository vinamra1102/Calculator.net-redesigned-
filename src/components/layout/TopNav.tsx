"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/calculators/financial/mortgage", label: "Financial" },
  { href: "/calculators/fitness-health/bmi", label: "Fitness" },
  { href: "/calculators/math/scientific", label: "Math" },
  { href: "/calculators/other/tip", label: "Everyday" },
];

export function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-text">
          <span className="text-accent">calc</span>
          <span>calculator.net</span>
          <span className="text-xs font-normal text-text-subtle">(redesigned)</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text",
                pathname.startsWith(link.href.split("/").slice(0, 3).join("/")) &&
                  "bg-accent-soft text-accent-text"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search calculators"
            className="flex h-11 w-11 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <Search className="h-5 w-5" />
          </button>
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-2 hover:text-text md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav aria-label="Primary mobile" className="border-t border-border bg-surface px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-md px-3 py-3 text-sm font-medium text-text-muted transition-colors hover:text-text",
                pathname.startsWith(link.href.split("/").slice(0, 3).join("/")) &&
                  "bg-accent-soft text-accent-text"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
