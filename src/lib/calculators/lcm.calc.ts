import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";

export function calculate(inputs: InputValues): CalculatorOutput {
  const a = Math.round(Math.abs(Number(inputs.a)));
  const b = Math.round(Math.abs(Number(inputs.b)));
  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  const lcm = (a * b) / gcd(a, b);

  return {
    results: [
      { label: "LCM", value: lcm.toLocaleString(), rawValue: lcm, large: true },
      { label: "GCD", value: gcd(a, b).toLocaleString() },
    ],
  };
}
