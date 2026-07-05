import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const mass = Number(inputs.mass);
  const volume = Number(inputs.volume);
  const density = mass / volume;

  return {
    results: [
      { label: "Density", value: formatNumber(density, 4) + " g/mL", rawValue: density, large: true },
      { label: "Mass", value: formatNumber(mass, 2) + " g" },
      { label: "Volume", value: formatNumber(volume, 2) + " mL" },
    ],
  };
}
