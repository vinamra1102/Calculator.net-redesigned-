import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const distance = Number(inputs.distance);
  const time = Number(inputs.time);
  const speed = distance / time;

  return {
    results: [
      { label: "Speed", value: formatNumber(speed, 2) + " km/h", rawValue: speed, large: true },
      { label: "Speed (mph)", value: formatNumber(speed * 0.621371, 2) },
      { label: "Distance", value: formatNumber(distance, 2) + " km" },
      { label: "Time", value: formatNumber(time, 2) + " hours" },
    ],
  };
}
