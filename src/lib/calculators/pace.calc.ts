import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatNumber } from "@/lib/engine/format";

export function calculate(inputs: InputValues): CalculatorOutput {
  const distance = Number(inputs.distance);
  const hours = Number(inputs.hours ?? 0);
  const minutes = Number(inputs.minutes ?? 0);
  const seconds = Number(inputs.seconds ?? 0);

  const totalMinutes = hours * 60 + minutes + seconds / 60;
  if (totalMinutes <= 0 || distance <= 0) {
    return { results: [{ label: "Pace", value: "Enter valid values", large: true }] };
  }

  const paceMinPerKm = totalMinutes / distance;
  const paceMin = Math.floor(paceMinPerKm);
  const paceSec = Math.round((paceMinPerKm - paceMin) * 60);

  const speedKmh = (distance / totalMinutes) * 60;
  const speedMph = speedKmh * 0.621371;

  return {
    results: [
      { label: "Pace", value: `${paceMin}:${paceSec.toString().padStart(2, "0")} /km`, large: true },
      { label: "Speed", value: formatNumber(speedKmh, 1) + " km/h" },
      { label: "Speed (mph)", value: formatNumber(speedMph, 1) + " mph" },
      { label: "Total time", value: `${hours}h ${minutes}m ${seconds}s` },
    ],
  };
}
