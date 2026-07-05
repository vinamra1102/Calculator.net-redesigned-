import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const x1 = Number(inputs.x1), y1 = Number(inputs.y1);
  const x2 = Number(inputs.x2), y2 = Number(inputs.y2);
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (dx === 0) {
    return {
      results: [
        { label: "Slope", value: "Undefined (vertical line)", large: true },
        { label: "Run", value: "0" },
      ],
    };
  }

  const slope = dy / dx;
  const angle = Math.atan(slope) * (180 / Math.PI);

  return {
    results: [
      { label: "Slope (m)", value: formatNumber(slope, 4), rawValue: slope, large: true },
      { label: "Rise", value: formatNumber(dy, 2) },
      { label: "Run", value: formatNumber(dx, 2) },
      { label: "Angle", value: formatNumber(angle, 2) + "°" },
    ],
  };
}
