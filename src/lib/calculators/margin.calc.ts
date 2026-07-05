import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const cost = Number(inputs.cost);
  const revenue = Number(inputs.revenue);
  const profit = revenue - cost;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const markup = cost > 0 ? (profit / cost) * 100 : 0;

  return {
    results: [
      { label: "Profit margin", value: formatPercent(margin, 2), rawValue: margin, large: true },
      { label: "Gross profit", value: formatCurrency(profit) },
      { label: "Markup", value: formatPercent(markup, 2) },
    ],
  };
}
