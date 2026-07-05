import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { differenceInYears, differenceInMonths, differenceInDays, subYears, subMonths, isValid, parseISO } from "date-fns";

export function calculate(inputs: InputValues): CalculatorOutput {
  const birthStr = String(inputs.birthdate || "");
  const asOfStr = String(inputs.asOfDate || "");

  if (!birthStr) {
    return {
      results: [{ label: "Age", value: "Enter your date of birth", large: true }],
    };
  }

  const birth = parseISO(birthStr);
  if (!isValid(birth)) {
    return {
      results: [{ label: "Age", value: "Invalid date", large: true }],
    };
  }

  const asOf = asOfStr && isValid(parseISO(asOfStr)) ? parseISO(asOfStr) : new Date();

  if (birth > asOf) {
    return {
      results: [{ label: "Age", value: "Birth date is in the future", large: true }],
    };
  }

  const years = differenceInYears(asOf, birth);
  const afterYears = subYears(asOf, years);
  const months = differenceInMonths(afterYears, birth);
  const afterMonths = subMonths(afterYears, months);
  const days = differenceInDays(afterMonths, birth);

  const totalDays = differenceInDays(asOf, birth);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = differenceInMonths(asOf, birth);

  return {
    results: [
      { label: "Age", value: `${years} years, ${months} months, ${days} days`, rawValue: years, large: true },
      { label: "In months", value: `${totalMonths}` },
      { label: "In weeks", value: `${totalWeeks}` },
      { label: "In days", value: `${totalDays}` },
      { label: "Next birthday", value: `${years + 1} years old` },
    ],
    extras: { years, months, days, totalDays, totalWeeks, totalMonths },
  };
}
