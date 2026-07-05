import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatCurrency } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const price = Number(inputs.price);
  const taxRate = Number(inputs.taxRate);
  const tax = price * (taxRate / 100);
  const total = price + tax;

  return {
    results: [
      { label: "Total with tax", value: formatCurrency(total), rawValue: total, large: true },
      { label: "Tax amount", value: formatCurrency(tax) },
      { label: "Price before tax", value: formatCurrency(price) },
    ],
  };
}
