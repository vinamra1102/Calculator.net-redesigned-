import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatCurrency } from "@/lib/engine/format";
import { calculateAmortization } from "./amortization";

export function calculate(inputs: InputValues): CalculatorOutput {
  const amount = Number(inputs.amount);
  const rate = Number(inputs.rate);
  const years = Number(inputs.years);

  if (amount <= 0) {
    return {
      results: [
        { label: "Monthly payment", value: "$0.00", large: true },
        { label: "Total interest", value: "$0.00" },
        { label: "Total cost", value: "$0.00" },
      ],
    };
  }

  const { monthlyPayment, totalPayment, totalInterest, schedule } = calculateAmortization(
    amount,
    rate,
    years
  );

  return {
    results: [
      { label: "Monthly payment", value: formatCurrency(monthlyPayment), rawValue: monthlyPayment, large: true },
      { label: "Total interest", value: formatCurrency(totalInterest) },
      { label: "Total cost", value: formatCurrency(totalPayment) },
    ],
    extras: { schedule },
  };
}
