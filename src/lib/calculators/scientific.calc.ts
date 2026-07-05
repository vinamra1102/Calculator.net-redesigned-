import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";
import { evaluateExpression } from "@/lib/engine/math-wrapper";

export function calculate(inputs: InputValues): CalculatorOutput {
  const expression = String(inputs.expression || "");

  if (!expression.trim()) {
    return {
      results: [{ label: "Result", value: "Enter an expression", large: true }],
    };
  }

  try {
    const result = evaluateExpression(expression, {});
    return {
      results: [
        { label: "Result", value: formatNumber(result, 6), rawValue: result, large: true },
        { label: "Expression", value: expression },
      ],
    };
  } catch (err) {
    return {
      results: [
        { label: "Result", value: "Invalid expression", large: true },
        { label: "Error", value: err instanceof Error ? err.message : "Unknown error" },
      ],
    };
  }
}
