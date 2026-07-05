"use client";

import { useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { CalculatorDefinition, InputValues } from "@/lib/engine/schema";
import { getCalculateFunction } from "@/lib/calculators/client-registry";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ResultPanel } from "@/components/calculator/ResultPanel";
import { ShareButton } from "@/components/calculator/ShareButton";
import { ExplainerAccordion } from "@/components/calculator/ExplainerAccordion";

interface CalculatorPageProps {
  definition: CalculatorDefinition;
  explainerContent?: React.ReactNode;
}

function getDefaultValues(definition: CalculatorDefinition): InputValues {
  const defaults: InputValues = {};
  for (const input of definition.inputs) {
    if (input.default !== undefined) {
      defaults[input.id] = input.default;
    } else if (input.type === "currency" || input.type === "number" || input.type === "percent") {
      defaults[input.id] = 0;
    } else {
      defaults[input.id] = "";
    }
  }
  return defaults;
}

function readFromURL(searchParams: URLSearchParams, definition: CalculatorDefinition): InputValues {
  const values: InputValues = {};
  for (const input of definition.inputs) {
    const param = searchParams.get(input.id);
    if (param !== null) {
      if (input.type === "currency" || input.type === "number" || input.type === "percent") {
        values[input.id] = parseFloat(param) || 0;
      } else {
        values[input.id] = param;
      }
    }
  }
  return values;
}

function validateInputs(
  vals: InputValues,
  definition: CalculatorDefinition
): Record<string, string> {
  const errs: Record<string, string> = {};
  for (const input of definition.inputs) {
    const val = vals[input.id];
    if (input.type === "currency" || input.type === "number" || input.type === "percent") {
      const num = Number(val);
      if (isNaN(num)) {
        errs[input.id] = `Enter a valid number for ${input.label.toLowerCase()}`;
      } else if (input.min !== undefined && num < input.min) {
        errs[input.id] = `Enter ${input.label.toLowerCase()} of at least ${input.min}`;
      } else if (input.max !== undefined && num > input.max) {
        errs[input.id] = `Enter ${input.label.toLowerCase()} of at most ${input.max}`;
      }
    }
  }
  return errs;
}

export function CalculatorPage({ definition, explainerContent }: CalculatorPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const defaultValues = useMemo(() => getDefaultValues(definition), [definition]);
  const initialValues = useMemo(() => {
    const urlValues = readFromURL(searchParams, definition);
    return Object.keys(urlValues).length > 0 ? { ...defaultValues, ...urlValues } : defaultValues;
  }, [searchParams, definition, defaultValues]);

  const [inputs, setInputs] = useState<InputValues>(initialValues);

  const errors = useMemo(() => validateInputs(inputs, definition), [inputs, definition]);

  const calculate = useMemo(() => getCalculateFunction(definition.id), [definition.id]);

  const result = useMemo(() => {
    if (Object.keys(errors).length > 0 || !calculate) return null;
    try {
      return calculate(inputs);
    } catch {
      return null;
    }
  }, [inputs, errors, calculate]);

  const handleChange = useCallback((id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setInputs(defaultValues);
    router.push(pathname);
  }, [defaultValues, router, pathname]);

  const handleCopyLink = useCallback(() => {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(inputs)) {
      if (val !== "" && val !== undefined) {
        params.set(key, String(val));
      }
    }
    const url = `${window.location.pathname}?${params.toString()}`;
    router.replace(url, { scroll: false });
  }, [inputs, router]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div>
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-text">{definition.title}</h1>
            <p className="mt-1 text-sm text-text-muted">{definition.summary}</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5 sm:grid-cols-2">
              {definition.inputs.map((input) => {
                const value = inputs[input.id];
                const error = errors[input.id];
                return (
                  <Input
                    key={input.id}
                    id={input.id}
                    label={input.label}
                    type={
                      input.type === "currency" || input.type === "number" || input.type === "percent"
                        ? "number"
                        : input.type === "date"
                          ? "date"
                          : "text"
                    }
                    value={value !== undefined ? String(value) : ""}
                    onChange={(e) => handleChange(input.id, e.target.value)}
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    unit={input.unit}
                    placeholder={input.placeholder}
                    hint={input.hint}
                    error={error}
                  />
                );
              })}
            </div>
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
              <ShareButton />
            </div>
          </CardContent>
        </Card>

        {explainerContent && (
          <div className="mt-6">
            <ExplainerAccordion title="About this calculator" defaultOpen>
              {explainerContent}
            </ExplainerAccordion>
            <ExplainerAccordion title="Formula used">
              <p className="font-mono text-sm">
                M = P × [r(1+r)^n] / [(1+r)^n − 1]
              </p>
              <p className="mt-2">
                Where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12),
                and n is the total number of monthly payments (years × 12).
              </p>
            </ExplainerAccordion>
          </div>
        )}
      </div>

      <aside>
        <div className="sticky top-24 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-lg font-semibold text-text">Results</h2>
              {result ? (
                <div className="space-y-3">
                  {result.results.map((r) => (
                    <ResultPanel
                      key={r.label}
                      label={r.label}
                      value={r.value}
                      large={r.large}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted">
                  Enter valid values to see results.
                </p>
              )}
            </CardContent>
          </Card>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="w-full"
          >
            Copy share link
          </Button>
        </div>
      </aside>
    </div>
  );
}
