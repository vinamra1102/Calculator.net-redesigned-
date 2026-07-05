import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const raw = String(inputs.data || "");
  const numbers = raw.split(/[,;\s]+/).map(Number).filter((n) => !isNaN(n));
  if (numbers.length < 2) return { results: [{ label: "Result", value: "Enter at least 2 numbers", large: true }] };

  const n = numbers.length;
  const mean = numbers.reduce((a, b) => a + b, 0) / n;
  const variance = numbers.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n;
  const sampleVariance = numbers.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (n - 1);
  const stdDev = Math.sqrt(variance);
  const sampleStdDev = Math.sqrt(sampleVariance);

  return {
    results: [
      { label: "Population Std Dev (σ)", value: formatNumber(stdDev, 4), rawValue: stdDev, large: true },
      { label: "Sample Std Dev (s)", value: formatNumber(sampleStdDev, 4) },
      { label: "Variance (σ²)", value: formatNumber(variance, 4) },
      { label: "Mean", value: formatNumber(mean, 4) },
      { label: "Count", value: `${n}` },
    ],
  };
}
