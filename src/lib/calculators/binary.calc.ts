import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";

export function calculate(inputs: InputValues): CalculatorOutput {
  const value = String(inputs.value).trim();
  const fromBase = Number(inputs.from);

  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) {
    return { results: [{ label: "Result", value: "Invalid input for the selected base", large: true }] };
  }

  return {
    results: [
      { label: "Decimal", value: decimal.toString(10), large: true },
      { label: "Binary", value: decimal.toString(2) },
      { label: "Hexadecimal", value: decimal.toString(16).toUpperCase() },
      { label: "Octal", value: decimal.toString(8) },
    ],
  };
}
