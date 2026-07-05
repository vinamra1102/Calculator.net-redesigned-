import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const r = Number(inputs.radius);
  const area = Math.PI * r * r;
  const circumference = 2 * Math.PI * r;
  const diameter = 2 * r;

  return {
    results: [
      { label: "Area", value: formatNumber(area, 4), rawValue: area, large: true },
      { label: "Circumference", value: formatNumber(circumference, 4) },
      { label: "Diameter", value: formatNumber(diameter, 2) },
    ],
  };
}
