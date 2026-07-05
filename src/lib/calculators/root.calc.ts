import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const value = Number(inputs.value);
  const degree = Number(inputs.degree);

  if (degree < 2) return { results: [{ label: "Result", value: "Degree must be at least 2", large: true }] };
  if (value < 0 && degree % 2 === 0) return { results: [{ label: "Result", value: "Cannot take even root of negative number", large: true }] };

  const result = Math.sign(value) * Math.pow(Math.abs(value), 1 / degree);

  return {
    results: [
      { label: `${degree}√${value}`, value: formatNumber(result, 6), rawValue: result, large: true },
      { label: "Verification", value: formatNumber(Math.pow(result, degree), 4) },
    ],
  };
}
