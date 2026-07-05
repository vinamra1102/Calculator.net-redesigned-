import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";

export function calculate(inputs: InputValues): CalculatorOutput {
  const min = Number(inputs.min);
  const max = Number(inputs.max);
  const count = Math.min(100, Math.max(1, Math.round(Number(inputs.count))));

  if (min >= max) {
    return { results: [{ label: "Result", value: "Maximum must be greater than minimum", large: true }] };
  }

  const numbers: number[] = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return {
    results: [
      { label: count === 1 ? "Random number" : "Random numbers", value: numbers.join(", "), large: count === 1 },
      { label: "Range", value: `${min} – ${max}` },
      { label: "Count", value: `${count}` },
    ],
  };
}
