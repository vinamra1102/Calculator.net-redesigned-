import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          "min-h-[44px] min-w-[44px]",
          variant === "primary" &&
            "bg-accent text-accent-contrast hover:bg-accent-hover active:bg-accent-active",
          variant === "secondary" &&
            "border border-border bg-surface text-text hover:bg-surface-2 active:bg-surface-2",
          variant === "ghost" && "text-text-muted hover:bg-surface-2 hover:text-text",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2.5 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
