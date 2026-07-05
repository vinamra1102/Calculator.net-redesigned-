"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within Tabs");
  return ctx;
}

interface TabsProps {
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, value, onChange, children, className }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value ?? internalValue;

  const setActiveTab = useCallback(
    (id: string) => {
      if (!value) setInternalValue(id);
      onChange?.(id);
    },
    [value, onChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  children: ReactNode;
  className?: string;
}

export function TabList({ children, className }: TabListProps) {
  return (
    <div role="tablist" className={cn("flex gap-1 rounded-lg bg-surface-2 p-1", className)}>
      {children}
    </div>
  );
}

interface TabTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabTrigger({ value, children, className }: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tablist = e.currentTarget.closest('[role="tablist"]');
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const index = tabs.indexOf(e.currentTarget as HTMLElement);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = tabs[(index + 1) % tabs.length] as HTMLElement;
      next?.focus();
      next?.click();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = tabs[(index - 1 + tabs.length) % tabs.length] as HTMLElement;
      prev?.focus();
      prev?.click();
    }
  };

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveTab(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        "min-h-[44px] rounded-md px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-surface text-text shadow-sm"
          : "text-text-muted hover:text-text",
        className
      )}
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;

  return (
    <div role="tabpanel" tabIndex={0} className={cn("mt-4", className)}>
      {children}
    </div>
  );
}
