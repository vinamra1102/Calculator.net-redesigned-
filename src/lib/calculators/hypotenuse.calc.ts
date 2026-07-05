import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const a = Number(inputs.a), b = Number(inputs.b);
  const c = Math.sqrt(a * a + b * b);

  return {
    results: [
      { label: "Hypotenuse (c)", value: formatNumber(c, 4), rawValue: c, large: true },
      { label: "Side a", value: formatNumber(a, 2) },
      { label: "Side b", value: formatNumber(b, 2) },
      { label: "Area", value: formatNumber((a * b) / 2, 2) },
    ],
  };
}
