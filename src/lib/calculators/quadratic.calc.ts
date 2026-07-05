import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const a = Number(inputs.a), b = Number(inputs.b), c = Number(inputs.c);

  if (a === 0) {
    return { results: [{ label: "Result", value: "'a' cannot be zero in a quadratic equation", large: true }] };
  }

  const discriminant = b * b - 4 * a * c;
  const vertex = -b / (2 * a);

  if (discriminant > 0) {
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return {
      results: [
        { label: "x₁", value: formatNumber(x1, 4), rawValue: x1, large: true },
        { label: "x₂", value: formatNumber(x2, 4), rawValue: x2 },
        { label: "Discriminant", value: formatNumber(discriminant, 2) },
        { label: "Vertex x", value: formatNumber(vertex, 4) },
      ],
    };
  } else if (discriminant === 0) {
    const x = -b / (2 * a);
    return {
      results: [
        { label: "x (repeated)", value: formatNumber(x, 4), rawValue: x, large: true },
        { label: "Discriminant", value: "0 (one solution)" },
      ],
    };
  } else {
    const real = -b / (2 * a);
    const imag = Math.sqrt(Math.abs(discriminant)) / (2 * a);
    return {
      results: [
        { label: "x₁", value: `${formatNumber(real, 4)} + ${formatNumber(imag, 4)}i`, large: true },
        { label: "x₂", value: `${formatNumber(real, 4)} - ${formatNumber(imag, 4)}i` },
        { label: "Discriminant", value: formatNumber(discriminant, 2) + " (no real solutions)" },
      ],
    };
  }
}
