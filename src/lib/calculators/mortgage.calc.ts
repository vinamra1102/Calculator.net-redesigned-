import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatCurrency } from "@/lib/engine/format";
import { calculateAmortization } from "./amortization";

export function calculate(inputs: InputValues): CalculatorOutput {
  const price = Number(inputs.price);
  const downPct = Number(inputs.downPct);
  const years = Number(inputs.years);
  const rate = Number(inputs.rate);

  const downPayment = price * (downPct / 100);
  const principal = price - downPayment;

  if (principal <= 0) {
    return {
      results: [
        { label: "Monthly payment", value: "$0.00", large: true },
        { label: "Loan amount", value: "$0.00" },
        { label: "Down payment", value: formatCurrency(downPayment) },
      ],
    };
  }

  const { monthlyPayment, totalPayment, totalInterest, schedule } = calculateAmortization(
    principal,
    rate,
    years
  );

  return {
    results: [
      { label: "Monthly payment", value: formatCurrency(monthlyPayment), rawValue: monthlyPayment, large: true },
      { label: "Loan amount", value: formatCurrency(principal) },
      { label: "Down payment", value: formatCurrency(downPayment) },
      { label: "Total interest", value: formatCurrency(totalInterest) },
      { label: "Total cost", value: formatCurrency(totalPayment) },
    ],
    extras: { schedule },
  };
}
