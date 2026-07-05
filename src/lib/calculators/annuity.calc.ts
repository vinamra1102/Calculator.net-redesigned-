import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";
import { formatCurrency, formatNumber } from "@/lib/engine/format";
import { futureValue } from "./tvm";

export function calculate(inputs: InputValues): CalculatorOutput {
  const payment = Number(inputs.payment);
  const rate = Number(inputs.rate);
  const years = Number(inputs.years);

  const fv = futureValue(0, payment, rate, years, 12);
  const totalContrib = payment * years * 12;
  const interest = fv - totalContrib;

  return {
    results: [
      { label: "Future value", value: formatCurrency(fv), rawValue: fv, large: true },
      { label: "Total contributions", value: formatCurrency(totalContrib) },
      { label: "Interest earned", value: formatCurrency(interest) },
    ],
  };
}
