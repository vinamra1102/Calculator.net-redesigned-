import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatCurrency, formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const distance = Number(inputs.distance);
  const mpg = Number(inputs.mpg);
  const price = Number(inputs.pricePerGallon);
  const gallons = distance / mpg;
  const cost = gallons * price;

  return {
    results: [
      { label: "Trip cost", value: formatCurrency(cost), rawValue: cost, large: true },
      { label: "Gallons needed", value: formatNumber(gallons, 2) },
      { label: "Cost per mile", value: formatCurrency(cost / distance) },
    ],
  };
}
