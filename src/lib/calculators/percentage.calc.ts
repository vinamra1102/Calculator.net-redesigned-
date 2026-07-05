import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber, formatPercent } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const mode = String(inputs.mode);
  const v1 = Number(inputs.value1);
  const v2 = Number(inputs.value2);

  switch (mode) {
    case "percent-of": {
      const result = (v1 / 100) * v2;
      return {
        results: [
          { label: `${v1}% of ${v2}`, value: formatNumber(result, 2), rawValue: result, large: true },
          { label: "Formula", value: `${v1}% × ${v2} = ${formatNumber(result, 4)}` },
        ],
      };
    }
    case "is-what-percent": {
      if (v2 === 0) {
        return {
          results: [{ label: "Result", value: "Cannot divide by zero", large: true }],
        };
      }
      const result = (v1 / v2) * 100;
      return {
        results: [
          { label: `${v1} is what % of ${v2}`, value: formatPercent(result, 2), rawValue: result, large: true },
          { label: "Formula", value: `(${v1} ÷ ${v2}) × 100` },
        ],
      };
    }
    case "percent-change": {
      if (v1 === 0) {
        return {
          results: [{ label: "Result", value: "Cannot calculate from zero", large: true }],
        };
      }
      const result = ((v2 - v1) / v1) * 100;
      const direction = result >= 0 ? "increase" : "decrease";
      return {
        results: [
          { label: `% change from ${v1} to ${v2}`, value: formatPercent(Math.abs(result), 2), rawValue: result, large: true },
          { label: "Direction", value: `${formatPercent(Math.abs(result), 2)} ${direction}` },
          { label: "Difference", value: formatNumber(Math.abs(v2 - v1), 2) },
        ],
      };
    }
    default:
      return {
        results: [{ label: "Result", value: "Select a mode", large: true }],
      };
  }
}
