import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

/**
 * Sample exchange rates (base: USD). These are static for demonstration.
 * A real implementation would fetch from a rate provider API.
 */
const SAMPLE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.36,
  AUD: 1.53,
  INR: 83.12,
};

export function calculate(inputs: InputValues): CalculatorOutput {
  const amount = Number(inputs.amount);
  const from = String(inputs.from);
  const to = String(inputs.to);

  const fromRate = SAMPLE_RATES[from] ?? 1;
  const toRate = SAMPLE_RATES[to] ?? 1;

  const usdAmount = amount / fromRate;
  const converted = usdAmount * toRate;
  const rate = toRate / fromRate;

  return {
    results: [
      { label: `Amount in ${to}`, value: formatNumber(converted, 2), rawValue: converted, large: true },
      { label: `1 ${from} =`, value: `${formatNumber(rate, 4)} ${to}` },
      { label: "Note", value: "Sample rates — not live" },
    ],
    extras: { rate, converted },
  };
}
