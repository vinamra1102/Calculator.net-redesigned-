"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface ExplainerAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function ExplainerAccordion({ title, children, defaultOpen = false }: ExplainerAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-header`}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-text transition-colors hover:text-accent-text"
        >
          {title}
          <ChevronDown
            className={cn("h-4 w-4 text-text-subtle transition-transform", open && "rotate-180")}
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-header`}
        hidden={!open}
        className="pb-4 text-sm text-text-muted"
      >
        {children}
      </div>
    </div>
  );
}
