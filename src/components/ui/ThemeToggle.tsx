"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const cycle = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("system");
    }
  };

  const label =
    theme === "system"
      ? `System theme (${resolvedTheme}), click to override`
      : theme === "dark"
        ? "Dark theme, click to switch to light"
        : "Light theme, click to switch to system";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={cycle}
      className="flex h-11 w-11 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
    >
      {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
