"use client";

const swatches = [
  { name: "--bg", cssVar: "--bg" },
  { name: "--surface", cssVar: "--surface" },
  { name: "--surface-2", cssVar: "--surface-2" },
  { name: "--border", cssVar: "--border" },
  { name: "--text", cssVar: "--text" },
  { name: "--text-muted", cssVar: "--text-muted" },
  { name: "--text-subtle", cssVar: "--text-subtle" },
  { name: "--accent", cssVar: "--accent" },
  { name: "--accent-hover", cssVar: "--accent-hover" },
  { name: "--accent-active", cssVar: "--accent-active" },
  { name: "--accent-soft", cssVar: "--accent-soft" },
  { name: "--accent-contrast", cssVar: "--accent-contrast" },
  { name: "--success", cssVar: "--success" },
  { name: "--warning", cssVar: "--warning" },
  { name: "--error", cssVar: "--error" },
];

export function TokenSwatches() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {swatches.map((s) => (
        <div key={s.name} className="flex flex-col gap-1">
          <div
            className="h-12 rounded-md border border-border"
            style={{ backgroundColor: `var(${s.cssVar})` }}
          />
          <span className="text-xs font-mono text-text-subtle">{s.name}</span>
        </div>
      ))}
    </div>
  );
}
