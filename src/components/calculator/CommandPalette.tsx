"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { calculatorRegistry } from "@/lib/calculators/registry";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (query: string) => void;
}

export function CommandPalette({ open, onClose, query, onQueryChange }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const filtered = calculatorRegistry.filter(
    (entry) =>
      entry.definition.title.toLowerCase().includes(query.toLowerCase()) ||
      entry.definition.summary.toLowerCase().includes(query.toLowerCase()) ||
      entry.definition.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (id: string, category: string) => {
      onClose();
      router.push(`/calculators/${category}/${id}`);
    },
    [onClose, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && filtered.length > 0) {
        handleSelect(filtered[0].definition.id, filtered[0].definition.category);
      }
    },
    [filtered, handleSelect]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search calculators"
    >
      <button
        type="button"
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close search"
      />
      <div className="relative w-full max-w-lg rounded-lg border border-border bg-surface shadow-lg">
        <div className="flex items-center border-b border-border px-4">
          <Search className="h-5 w-5 text-text-subtle" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search calculators..."
            className="h-12 flex-1 bg-transparent px-3 text-sm text-text outline-none placeholder:text-text-subtle"
            aria-label="Search calculators"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-xs text-text-subtle">
            Esc
          </kbd>
        </div>
        <ul className="max-h-64 overflow-y-auto p-2" role="listbox" aria-label="Calculator results">
          {filtered.map((entry) => (
            <li key={entry.definition.id} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={() => handleSelect(entry.definition.id, entry.definition.category)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                  "hover:bg-surface-2 focus:bg-surface-2 focus:outline-none"
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-text">{entry.definition.title}</div>
                  <div className="mt-0.5 text-xs text-text-muted truncate">
                    {entry.definition.summary}
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-xs text-text-subtle">
                  {entry.definition.category}
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-4 text-center text-sm text-text-muted">
              No calculators found for &ldquo;{query}&rdquo;
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
