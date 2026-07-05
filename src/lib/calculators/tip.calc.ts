import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatCurrency } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const bill = Number(inputs.bill);
  const tipPct = Number(inputs.tipPct);
  const people = Math.max(1, Math.round(Number(inputs.people)));

  const tip = bill * (tipPct / 100);
  const total = bill + tip;
  const perPerson = total / people;
  const tipPerPerson = tip / people;

  return {
    results: [
      { label: "Total with tip", value: formatCurrency(total), rawValue: total, large: true },
      { label: "Tip amount", value: formatCurrency(tip), rawValue: tip },
      { label: "Per person", value: formatCurrency(perPerson), rawValue: perPerson },
      { label: "Tip per person", value: formatCurrency(tipPerPerson), rawValue: tipPerPerson },
    ],
    extras: { tip, total, perPerson, tipPerPerson },
  };
}
