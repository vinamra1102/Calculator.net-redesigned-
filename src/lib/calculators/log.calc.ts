import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const value = Number(inputs.value);
  const base = Number(inputs.base);

  if (value <= 0) return { results: [{ label: "Result", value: "Value must be positive", large: true }] };
  if (base <= 0 || base === 1) return { results: [{ label: "Result", value: "Base must be positive and not 1", large: true }] };

  const result = Math.log(value) / Math.log(base);

  return {
    results: [
      { label: `log${base}(${value})`, value: formatNumber(result, 6), rawValue: result, large: true },
      { label: "Natural log", value: formatNumber(Math.log(value), 6) },
      { label: "log₁₀", value: formatNumber(Math.log10(value), 6) },
    ],
  };
}
