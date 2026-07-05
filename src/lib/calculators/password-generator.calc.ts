import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";

export function calculate(inputs: InputValues): CalculatorOutput {
  const length = Math.max(4, Math.round(Number(inputs.length)));
  const useUpper = String(inputs.uppercase) !== "no";
  const useNumbers = String(inputs.numbers) !== "no";
  const useSymbols = String(inputs.symbols) !== "no";

  let chars = "abcdefghijklmnopqrstuvwxyz";
  if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useNumbers) chars += "0123456789";
  if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let password = "";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }

  return {
    results: [
      { label: "Password", value: password, large: true },
      { label: "Length", value: `${length}` },
      { label: "Character pool", value: `${chars.length} characters` },
    ],
  };
}
