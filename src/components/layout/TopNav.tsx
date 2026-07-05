"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/calculators/financial", label: "Financial" },
  { href: "/calculators/fitness-health", label: "Fitness" },
  { href: "/calculators/math", label: "Math" },
  { href: "/calculators/other", label: "Everyday" },
];

interface TopNavProps {
  onSearchOpen?: () => void;
}

export function TopNav({ onSearchOpen }: TopNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = useCallback(() => {
    onSearchOpen?.();
  }, [onSearchOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-text">
          <span className="font-bold">calculator.net</span>
          <span className="ml-1 text-xs font-normal text-text-subtle">(redesigned)</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text",
                pathname.startsWith(link.href) && "bg-accent-soft text-accent-text"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search calculators (Ctrl+K)"
            className="flex h-11 w-11 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
            onClick={handleSearch}
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
                pathname.startsWith(link.href) && "bg-accent-soft text-accent-text"
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
