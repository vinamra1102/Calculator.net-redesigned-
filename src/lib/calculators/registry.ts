import mortgageJson from "./mortgage.calc.json";
import loanJson from "./loan.calc.json";
import currencyJson from "./currency.calc.json";
import bmiJson from "./bmi.calc.json";
import calorieJson from "./calorie.calc.json";
import scientificJson from "./scientific.calc.json";
import percentageJson from "./percentage.calc.json";
import ageJson from "./age.calc.json";
import gpaJson from "./gpa.calc.json";
import tipJson from "./tip.calc.json";

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

import type { CalculatorDefinition, InputValues, CalculatorOutput } from "@/lib/engine/schema";

interface CalculatorEntry {
  definition: CalculatorDefinition;
  calculate: (inputs: InputValues) => CalculatorOutput;
}

export const calculatorRegistry: CalculatorEntry[] = [
  { definition: mortgageJson as CalculatorDefinition, calculate: mortgageCalc },
  { definition: loanJson as CalculatorDefinition, calculate: loanCalc },
  { definition: currencyJson as CalculatorDefinition, calculate: currencyCalc },
  { definition: bmiJson as CalculatorDefinition, calculate: bmiCalc },
  { definition: calorieJson as CalculatorDefinition, calculate: calorieCalc },
  { definition: scientificJson as CalculatorDefinition, calculate: scientificCalc },
  { definition: percentageJson as CalculatorDefinition, calculate: percentageCalc },
  { definition: ageJson as CalculatorDefinition, calculate: ageCalc },
  { definition: gpaJson as CalculatorDefinition, calculate: gpaCalc },
  { definition: tipJson as CalculatorDefinition, calculate: tipCalc },
];

export function getCalculatorEntry(id: string): CalculatorEntry | undefined {
  return calculatorRegistry.find((c) => c.definition.id === id);
}

export function getCalculatorDefinitions(): CalculatorDefinition[] {
  return calculatorRegistry.map((c) => c.definition);
}
