"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface ResultPanelProps {
  label: string;
  value: string;
  large?: boolean;
  className?: string;
}

export function ResultPanel({ label, value, large = false, className }: ResultPanelProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 200);
      prevValue.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "rounded-lg bg-accent-soft px-6 py-4",
        large ? "text-center" : "flex items-baseline justify-between gap-4",
        className
      )}
    >
      <span className="text-sm font-medium text-text-muted">{label}</span>
      <span
        className={cn(
          "font-mono tabular-nums font-semibold text-accent-text",
          large ? "text-4xl mt-2 block" : "text-xl",
          isAnimating && "animate-digit-roll"
        )}
      >
        {value}
      </span>
    </div>
  );
}
