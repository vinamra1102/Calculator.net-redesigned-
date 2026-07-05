import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatCurrency, formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const amount = Number(inputs.amount);
  const rate = Number(inputs.rate);
  const years = Number(inputs.years);

  const futureValue = amount / Math.pow(1 + rate / 100, years);
  const purchasingPowerLoss = amount - futureValue;

  return {
    results: [
      { label: "Future purchasing power", value: formatCurrency(futureValue), rawValue: futureValue, large: true },
      { label: "Purchasing power lost", value: formatCurrency(purchasingPowerLoss) },
      { label: "Equivalent today", value: formatCurrency(amount) },
    ],
  };
}
