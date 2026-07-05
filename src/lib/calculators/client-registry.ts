"use client";

import { calculate as mortgageCalc } from "./mortgage.calc";
import { calculate as loanCalc } from "./loan.calc";
import { calculate as currencyCalc } from "./currency.calc";
import { calculate as bmiCalc } from "./bmi.calc";
import { calculate as calorieCalc } from "./calorie.calc";
import { calculate as scientificCalc } from "./scientific.calc";
import { calculate as percentageCalc } from "./percentage.calc";
import { calculate as ageCalc } from "./age.calc";
import { calculate as gpaCalc } from "./gpa.calc";
import { calculate as tipCalc } from "./tip.calc";

import type { InputValues, CalculatorOutput } from "@/lib/engine/schema";

const calculatorFunctions: Record<string, (inputs: InputValues) => CalculatorOutput> = {
  mortgage: mortgageCalc,
  loan: loanCalc,
  currency: currencyCalc,
  bmi: bmiCalc,
  calorie: calorieCalc,
  scientific: scientificCalc,
  percentage: percentageCalc,
  age: ageCalc,
  gpa: gpaCalc,
  tip: tipCalc,
};

export function getCalculateFunction(id: string): ((inputs: InputValues) => CalculatorOutput) | undefined {
  return calculatorFunctions[id];
}
