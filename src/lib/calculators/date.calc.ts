import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { calculateAge, dateDiff, dayOfWeek, daysBetween, safeParseDate } from "./date-math";
import { format } from "date-fns";

export function calculate(inputs: InputValues): CalculatorOutput {
  
  const start = safeParseDate(String(inputs.startDate || ""));
  const end = safeParseDate(String(inputs.endDate || ""));
  if (!start || !end) return { results: [{ label: "Result", value: "Enter valid dates", large: true }] };
  const diff = dateDiff(start, end);
  return {
    results: [
      { label: "Days between dates", value: `${Math.abs(diff.totalDays)} days`, rawValue: Math.abs(diff.totalDays), large: true },
      { label: "In weeks", value: `${Math.abs(diff.weeks)}` },
      { label: "In months", value: `${Math.abs(diff.months)}` },
      { label: "In years", value: `${diff.years}` },
    ],
  };
  
}
