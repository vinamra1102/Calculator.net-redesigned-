import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const x1 = Number(inputs.x1), y1 = Number(inputs.y1);
  const x2 = Number(inputs.x2), y2 = Number(inputs.y2);
  const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  return {
    results: [
      { label: "Distance", value: formatNumber(dist, 4), rawValue: dist, large: true },
      { label: "Point 1", value: `(${x1}, ${y1})` },
      { label: "Point 2", value: `(${x2}, ${y2})` },
    ],
  };
}
