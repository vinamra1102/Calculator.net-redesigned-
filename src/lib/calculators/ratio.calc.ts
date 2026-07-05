import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const a = Math.round(Math.abs(Number(inputs.a)));
  const b = Math.round(Math.abs(Number(inputs.b)));

  if (a === 0 || b === 0) return { results: [{ label: "Result", value: "Both values must be positive integers", large: true }] };

  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  const g = gcd(a, b);
  const simplifiedA = a / g;
  const simplifiedB = b / g;

  return {
    results: [
      { label: "Simplified ratio", value: `${simplifiedA} : ${simplifiedB}`, large: true },
      { label: "GCD", value: `${g}` },
      { label: "As fraction", value: `${simplifiedA}/${simplifiedB}` },
      { label: "As decimal", value: formatNumber(a / b, 4) },
    ],
  };
}
