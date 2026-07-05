import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const miles = Number(inputs.miles);
  const gallons = Number(inputs.gallons);
  const mpg = miles / gallons;
  const lp100km = 235.215 / mpg;

  return {
    results: [
      { label: "Fuel efficiency", value: formatNumber(mpg, 1) + " MPG", rawValue: mpg, large: true },
      { label: "Liters per 100km", value: formatNumber(lp100km, 1) },
      { label: "Cost per mile ($3.50/gal)", value: formatNumber(3.5 / mpg, 2) },
    ],
  };
}
