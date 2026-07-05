import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const base = Number(inputs.base);
  const exp = Number(inputs.exponent);
  const result = Math.pow(base, exp);

  return {
    results: [
      { label: `${base}^${exp}`, value: formatNumber(result, 6), rawValue: result, large: true },
      { label: "Expression", value: `${base} raised to the power of ${exp}` },
    ],
  };
}
