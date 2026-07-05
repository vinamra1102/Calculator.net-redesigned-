import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function calculate(inputs: InputValues): CalculatorOutput {
  const weight = Number(inputs.weight);
  const heightCm = Number(inputs.height);

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  const category = getBmiCategory(bmi);

  return {
    results: [
      { label: "BMI", value: formatNumber(bmi, 1), rawValue: bmi, large: true },
      { label: "Category", value: category },
      { label: "Healthy weight range", value: `${formatNumber(18.5 * heightM * heightM, 0)} – ${formatNumber(24.9 * heightM * heightM, 0)} kg` },
    ],
    extras: { bmi, category },
  };
}
