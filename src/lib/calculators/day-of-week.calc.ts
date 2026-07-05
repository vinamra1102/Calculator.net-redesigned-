import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { calculateAge, dateDiff, dayOfWeek, daysBetween, safeParseDate } from "./date-math";
import { format } from "date-fns";

export function calculate(inputs: InputValues): CalculatorOutput {
  
  const date = safeParseDate(String(inputs.date || ""));
  if (!date) return { results: [{ label: "Result", value: "Enter a valid date", large: true }] };
  return {
    results: [
      { label: "Day of week", value: dayOfWeek(date), large: true },
      { label: "Date", value: format(date, "MMMM d, yyyy") },
    ],
  };
  
}
