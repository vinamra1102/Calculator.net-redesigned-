import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";

export function calculate(inputs: InputValues): CalculatorOutput {
  const value = Number(inputs.value);
  const decimals = Math.max(0, Math.round(Number(inputs.decimals)));
  const rounded = parseFloat(value.toFixed(decimals));

  return {
    results: [
      { label: "Rounded", value: rounded.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }), rawValue: rounded, large: true },
      { label: "Original", value: value.toString() },
      { label: "Decimal places", value: `${decimals}` },
    ],
  };
}
