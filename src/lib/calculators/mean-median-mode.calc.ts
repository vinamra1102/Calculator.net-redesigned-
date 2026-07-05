import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const raw = String(inputs.data || "");
  const numbers = raw.split(/[,;\s]+/).map(Number).filter((n) => !isNaN(n));
  if (numbers.length === 0) return { results: [{ label: "Result", value: "Enter numbers separated by commas", large: true }] };

  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = sum / numbers.length;

  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];

  const freq: Record<number, number> = {};
  for (const n of numbers) freq[n] = (freq[n] || 0) + 1;
  const maxFreq = Math.max(...Object.values(freq));
  const mode = Object.entries(freq).filter(([, v]) => v === maxFreq).map(([k]) => Number(k));

  return {
    results: [
      { label: "Mean", value: formatNumber(mean, 4), rawValue: mean, large: true },
      { label: "Median", value: formatNumber(median, 4) },
      { label: "Mode", value: mode.join(", ") },
      { label: "Count", value: `${numbers.length}` },
    ],
  };
}
