import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const length = Number(inputs.length);
  const width = Number(inputs.width);
  const sqft = length * width;
  const sqm = sqft * 0.092903;
  const acres = sqft / 43560;

  return {
    results: [
      { label: "Area", value: formatNumber(sqft, 2) + " sq ft", rawValue: sqft, large: true },
      { label: "Square meters", value: formatNumber(sqm, 2) + " m²" },
      { label: "Acres", value: formatNumber(acres, 4) },
    ],
  };
}
