import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const n1 = Number(inputs.num1), d1 = Number(inputs.den1);
  const n2 = Number(inputs.num2), d2 = Number(inputs.den2);

  // Addition: n1/d1 + n2/d2 = (n1*d2 + n2*d1) / (d1*d2)
  const addNum = n1 * d2 + n2 * d1;
  const addDen = d1 * d2;
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const g = gcd(Math.abs(addNum), Math.abs(addDen));

  return {
    results: [
      { label: "Sum", value: `${addNum/g} / ${addDen/g}`, large: true },
      { label: `${n1}/${d1} + ${n2}/${d2}`, value: `${addNum}/${addDen}` },
      { label: `${n1}/${d1} − ${n2}/${d2}`, value: `${n1*d2-n2*d1}/${addDen}` },
      { label: `${n1}/${d1} × ${n2}/${d2}`, value: `${n1*n2}/${d1*d2}` },
      { label: `${n1}/${d1} ÷ ${n2}/${d2}`, value: `${n1*d2}/${d1*n2}` },
    ],
  };
}
