import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const gender = String(inputs.gender);
  const height = Number(inputs.height);
  const waist = Number(inputs.waist);
  const neck = Number(inputs.neck);
  const hip = Number(inputs.hip ?? 0);

  let bodyFat: number;
  if (gender === "male") {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }
  bodyFat = Math.max(0, bodyFat);

  let category: string;
  if (gender === "male") {
    if (bodyFat < 6) category = "Essential fat";
    else if (bodyFat < 14) category = "Athletes";
    else if (bodyFat < 18) category = "Fitness";
    else if (bodyFat < 25) category = "Average";
    else category = "Obese";
  } else {
    if (bodyFat < 14) category = "Essential fat";
    else if (bodyFat < 21) category = "Athletes";
    else if (bodyFat < 25) category = "Fitness";
    else if (bodyFat < 32) category = "Average";
    else category = "Obese";
  }

  const leanMass = Number(inputs.weight ?? 70) * (1 - bodyFat / 100);

  return {
    results: [
      { label: "Body fat percentage", value: formatNumber(bodyFat, 1) + "%", rawValue: bodyFat, large: true },
      { label: "Category", value: category },
      { label: "Lean mass (est.)", value: formatNumber(leanMass, 1) + " kg" },
    ],
  };
}
