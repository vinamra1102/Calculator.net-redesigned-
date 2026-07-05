import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const gender = String(inputs.gender);
  const heightCm = Number(inputs.height);
  const heightIn = heightCm / 2.54;

  // Hamwi formula
  const hamwi = gender === "male"
    ? 48.07 + 2.7 * ((heightIn - 60))
    : 45.5 + 2.2 * ((heightIn - 60));

  // Devine formula
  const devine = gender === "male"
    ? 50 + 2.3 * ((heightIn - 60))
    : 45.5 + 2.3 * ((heightIn - 60));

  // Robinson formula
  const robinson = gender === "male"
    ? 52 + 1.9 * ((heightIn - 60))
    : 49 + 1.7 * ((heightIn - 60));

  const avg = (hamwi + devine + robinson) / 3;

  return {
    results: [
      { label: "Ideal weight (average)", value: formatNumber(avg, 1) + " kg", rawValue: avg, large: true },
      { label: "Hamwi formula", value: formatNumber(hamwi, 1) + " kg" },
      { label: "Devine formula", value: formatNumber(devine, 1) + " kg" },
      { label: "Robinson formula", value: formatNumber(robinson, 1) + " kg" },
    ],
  };
}
