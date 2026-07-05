import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatCurrency } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const price = Number(inputs.price);
  const discount = Number(inputs.discount);
  const saved = price * (discount / 100);
  const final = price - saved;

  return {
    results: [
      { label: "Final price", value: formatCurrency(final), rawValue: final, large: true },
      { label: "You save", value: formatCurrency(saved) },
      { label: "Discount", value: `${discount}%` },
    ],
  };
}
