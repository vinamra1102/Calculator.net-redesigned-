import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

const GRADE_POINTS: Record<string, number> = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "F": 0.0,
};

export function calculate(inputs: InputValues): CalculatorOutput {
  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 1; i <= 4; i++) {
    const grade = String(inputs[`course${i}Grade`] || "");
    const credits = Number(inputs[`course${i}Credits`] || 0);
    const points = GRADE_POINTS[grade] ?? 0;

    if (credits > 0) {
      totalPoints += points * credits;
      totalCredits += credits;
    }
  }

  if (totalCredits === 0) {
    return {
      results: [{ label: "GPA", value: "Add at least one course", large: true }],
    };
  }

  const gpa = totalPoints / totalCredits;

  return {
    results: [
      { label: "GPA", value: formatNumber(gpa, 2), rawValue: gpa, large: true },
      { label: "Total credits", value: `${totalCredits}` },
      { label: "Total grade points", value: formatNumber(totalPoints, 1) },
    ],
    extras: { gpa, totalCredits, totalPoints },
  };
}
