"use client";

import { HeroCalculator } from "@/components/calculator/HeroCalculator";

export function HeroSection() {
  return (
    <section className="hero-section relative mb-16 overflow-hidden rounded-2xl" aria-label="Hero">
      {/* Aurora bands — 3 elongated bands at different speeds and phase offsets */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      >
        <div className="aurora-band aurora-band-1" />
        <div className="aurora-band aurora-band-2" />
        <div className="aurora-band aurora-band-3" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16 lg:gap-12">
        {/* Text — left column */}
        <div className="hero-text text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-text sm:text-[49px] sm:leading-[1.1]">
            Free Online Calculators
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            Fast, accessible, and accurate tools for financial decisions, fitness tracking,
            math problems, and everyday calculations. No account needed.
          </p>
        </div>

        {/* Calculator — right column, glass panel */}
        <div className="hero-calc flex justify-center md:justify-end">
          <div className="glass-panel w-full max-w-sm rounded-xl border border-border/60 bg-surface/80 p-4 shadow-lg backdrop-blur-md">
            <HeroCalculator embedded />
          </div>
        </div>
      </div>
    </section>
  );
}
