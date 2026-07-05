"use client";

import { useState, useCallback, useEffect } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { CommandPalette } from "@/components/calculator/CommandPalette";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");

  const openPalette = useCallback(() => {
    setPaletteQuery("");
    setPaletteOpen(true);
  }, []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => {
          if (!prev) setPaletteQuery("");
          return !prev;
        });
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <SkipLink />
      <TopNav onSearchOpen={openPalette} />
      <CommandPalette open={paletteOpen} onClose={closePalette} query={paletteQuery} onQueryChange={setPaletteQuery} />
      {children}
      <Footer />
    </>
  );
}
