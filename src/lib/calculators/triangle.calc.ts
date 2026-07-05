import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const a = Number(inputs.a), b = Number(inputs.b), c = Number(inputs.c);
  const s = (a + b + c) / 2; // semi-perimeter
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula
  const perimeter = a + b + c;

  return {
    results: [
      { label: "Area", value: formatNumber(area, 4), rawValue: area, large: true },
      { label: "Perimeter", value: formatNumber(perimeter, 2) },
      { label: "Semi-perimeter", value: formatNumber(s, 2) },
    ],
  };
}
