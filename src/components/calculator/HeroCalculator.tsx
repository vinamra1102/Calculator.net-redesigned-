"use client";

import { useState, useCallback } from "react";
import { evaluateExpression } from "@/lib/engine/math-wrapper";
import { formatNumber } from "@/lib/engine/format";
import { cn } from "@/lib/cn";

const KEYS = [
  ["7", "8", "9", "÷", "sin"],
  ["4", "5", "6", "×", "cos"],
  ["1", "2", "3", "−", "tan"],
  ["0", ".", "π", "+", "√"],
  ["(", ")", "^", "ln", "="],
];

const KEY_MAP: Record<string, string> = {
  "÷": "/",
  "×": "*",
  "−": "-",
  "π": "pi",
  "√": "sqrt(",
  "^": "^(",
  "sin": "sin(",
  "cos": "cos(",
  "tan": "tan(",
  "ln": "log(",
};

function formatResult(value: number): string {
  if (Number.isInteger(value) && Math.abs(value) < 1e15) {
    return value.toLocaleString("en-US");
  }
  return formatNumber(value, 8);
}

export function HeroCalculator({ embedded = false }: { embedded?: boolean }) {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleKey = useCallback((key: string) => {
    if (key === "=") {
      try {
        const value = evaluateExpression(display, {});
        setResult(formatResult(value));
        setError(null);
      } catch {
        setError("Invalid expression");
        setResult(null);
      }
      return;
    }

    if (key === "C") {
      setDisplay("");
      setResult(null);
      setError(null);
      return;
    }

    const mapped = KEY_MAP[key] ?? key;
    setDisplay((prev) => prev + mapped);
    setResult(null);
    setError(null);
  }, [display]);

  const handleClear = useCallback(() => {
    setDisplay("");
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className={cn(
      "w-full rounded-lg border bg-surface p-4",
      embedded ? "border-transparent shadow-none" : "border-border shadow-md mx-auto max-w-sm"
    )}>
      <div
        className="mb-3 min-h-[60px] rounded-md bg-surface-2 px-4 py-2 text-right"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="font-mono text-sm text-text-muted truncate" aria-label="Expression">
          {display || "0"}
        </div>
        {result && (
          <div className="font-mono text-2xl font-semibold text-accent-text tabular-nums">
            {result}
          </div>
        )}
        {error && (
          <div className="text-sm text-error">{error}</div>
        )}
      </div>

      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={handleClear}
          className="min-h-[44px] flex-1 rounded-md bg-surface-2 text-sm font-medium text-text transition-colors hover:bg-border"
          aria-label="Clear"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => setDisplay((prev) => prev.slice(0, -1))}
          className="min-h-[44px] flex-1 rounded-md bg-surface-2 text-sm font-medium text-text transition-colors hover:bg-border"
          aria-label="Backspace"
        >
          ⌫
        </button>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {KEYS.map((row, ri) =>
          row.map((key) => (
            <button
              key={`${ri}-${key}`}
              type="button"
              onClick={() => handleKey(key)}
              aria-label={KEY_MAP[key] ? `${key} key` : `${key}`}
              className={cn(
                "min-h-[44px] rounded-md text-sm font-medium transition-colors",
                key === "="
                  ? "bg-accent text-accent-contrast hover:bg-accent-hover"
                  : KEY_MAP[key]
                    ? "bg-surface-2 text-text-muted hover:bg-border"
                    : "bg-surface-2 text-text hover:bg-border"
              )}
            >
              {key}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
