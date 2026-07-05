import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  unit?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, unit, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-text">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            aria-describedby={cn(errorId, hintId) || undefined}
            aria-invalid={error ? true : undefined}
            className={cn(
              "h-11 w-full rounded-md border bg-surface px-3 text-sm text-text",
              "placeholder:text-text-subtle",
              "focus:outline-2 focus:outline-offset-0 focus:outline-focus-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-error" : "border-border",
              unit && "pr-12",
              className
            )}
            {...props}
          />
          {unit && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-subtle">
              {unit}
            </span>
          )}
        </div>
        {hint && !error && (
          <p id={hintId} className="text-xs text-text-subtle">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
