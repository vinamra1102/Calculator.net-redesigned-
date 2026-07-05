import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

const ACTIVITY: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  "very-active": 1.725,
  "extra-active": 1.9,
};

export function calculate(inputs: InputValues): CalculatorOutput {
  const w = Number(inputs.weight);
  const h = Number(inputs.height);
  const a = Number(inputs.age);
  const gender = String(inputs.gender);
  const activity = String(inputs.activity);

  const bmr = gender === "female"
    ? 10 * w + 6.25 * h - 5 * a - 161
    : 10 * w + 6.25 * h - 5 * a + 5;

  const tdee = bmr * (ACTIVITY[activity] ?? 1.2);

  return {
    results: [
      { label: "TDEE", value: formatNumber(tdee, 0) + " kcal/day", rawValue: tdee, large: true },
      { label: "BMR", value: formatNumber(bmr, 0) + " kcal/day" },
      { label: "Activity factor", value: `${ACTIVITY[activity] ?? 1.2}x` },
    ],
  };
}
