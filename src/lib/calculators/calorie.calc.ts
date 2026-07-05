import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  "very-active": 1.725,
  "extra-active": 1.9,
};

/**
 * BMR using Mifflin-St Jeor equation:
 * Men: 10W + 6.25H - 5A + 5
 * Women: 10W + 6.25H - 5A - 161
 */
export function calculate(inputs: InputValues): CalculatorOutput {
  const weight = Number(inputs.weight);
  const height = Number(inputs.height);
  const age = Number(inputs.age);
  const gender = String(inputs.gender);
  const activity = String(inputs.activity);

  let bmr: number;
  if (gender === "female") {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  }

  const multiplier = ACTIVITY_MULTIPLIERS[activity] ?? 1.2;
  const dailyCalories = bmr * multiplier;

  return {
    results: [
      { label: "Daily calories", value: formatNumber(dailyCalories, 0), rawValue: dailyCalories, large: true },
      { label: "BMR (basal metabolic rate)", value: formatNumber(bmr, 0) },
      { label: "Activity multiplier", value: `${multiplier}x` },
    ],
    extras: { bmr, dailyCalories, multiplier },
  };
}
