import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const observed = Number(inputs.observed);
  const expected = Number(inputs.expected);

  if (expected === 0) {
    return { results: [{ label: "Result", value: "Expected value cannot be zero", large: true }] };
  }

  const error = ((observed - expected) / expected) * 100;

  return {
    results: [
      { label: "Percent error", value: formatNumber(Math.abs(error), 2) + "%", rawValue: error, large: true },
      { label: "Direction", value: error >= 0 ? "Overestimate" : "Underestimate" },
      { label: "Difference", value: formatNumber(observed - expected, 4) },
    ],
  };
}
