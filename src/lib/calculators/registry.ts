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
import compoundInterestJson from "./compound-interest.calc.json";
import simpleInterestJson from "./simple-interest.calc.json";
import savingsJson from "./savings.calc.json";
import cdJson from "./cd.calc.json";
import autoLoanJson from "./auto-loan.calc.json";
import retirementJson from "./retirement.calc.json";
import investmentJson from "./investment.calc.json";
import interestJson from "./interest.calc.json";
import bodyFatJson from "./body-fat.calc.json";
import idealWeightJson from "./ideal-weight.calc.json";
import paceJson from "./pace.calc.json";
import fractionJson from "./fraction.calc.json";
import randomNumberJson from "./random-number.calc.json";
import percentErrorJson from "./percent-error.calc.json";
import exponentJson from "./exponent.calc.json";
import binaryJson from "./binary.calc.json";
import quadraticJson from "./quadratic.calc.json";
import logJson from "./log.calc.json";
import ratioJson from "./ratio.calc.json";
import rootJson from "./root.calc.json";
import lcmJson from "./lcm.calc.json";
import gcfJson from "./gcf.calc.json";
import roundingJson from "./rounding.calc.json";
import meanMedianModeJson from "./mean-median-mode.calc.json";
import standardDeviationJson from "./standard-deviation.calc.json";
import dateJson from "./date.calc.json";
import timeDurationJson from "./time-duration.calc.json";
import dayCounterJson from "./day-counter.calc.json";
import dayOfWeekJson from "./day-of-week.calc.json";
import hoursJson from "./hours.calc.json";
import squareFootageJson from "./square-footage.calc.json";
import discountJson from "./discount.calc.json";
import salesTaxJson from "./sales-tax.calc.json";
import fuelCostJson from "./fuel-cost.calc.json";
import gasMileageJson from "./gas-mileage.calc.json";
import passwordGeneratorJson from "./password-generator.calc.json";
import diceRollerJson from "./dice-roller.calc.json";
import conversionJson from "./conversion.calc.json";
import densityJson from "./density.calc.json";
import speedJson from "./speed.calc.json";
import hypotenuseJson from "./hypotenuse.calc.json";
import triangleJson from "./triangle.calc.json";
import circleJson from "./circle.calc.json";
import volumeCalcJson from "./volume-calc.calc.json";
import slopeJson from "./slope.calc.json";
import distanceCalcJson from "./distance-calc.calc.json";
import annuityJson from "./annuity.calc.json";
import inflationJson from "./inflation.calc.json";
import tdeeJson from "./tdee.calc.json";
import marginJson from "./margin.calc.json";

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
import { calc as compoundInterestCalc } from "./compound-interest.calc";
import { calc as simpleInterestCalc } from "./simple-interest.calc";
import { calc as savingsCalc } from "./savings.calc";
import { calc as cdCalc } from "./cd.calc";
import { calc as autoLoanCalc } from "./auto-loan.calc";
import { calc as retirementCalc } from "./retirement.calc";
import { calc as investmentCalc } from "./investment.calc";
import { calc as interestCalc } from "./interest.calc";
import { calculate as bodyFatCalc } from "./body-fat.calc";
import { calculate as idealWeightCalc } from "./ideal-weight.calc";
import { calculate as paceCalc } from "./pace.calc";
import { calculate as fractionCalc } from "./fraction.calc";
import { calculate as randomNumberCalc } from "./random-number.calc";
import { calculate as percentErrorCalc } from "./percent-error.calc";
import { calculate as exponentCalc } from "./exponent.calc";
import { calculate as binaryCalc } from "./binary.calc";
import { calculate as quadraticCalc } from "./quadratic.calc";
import { calculate as logCalc } from "./log.calc";
import { calculate as ratioCalc } from "./ratio.calc";
import { calculate as rootCalc } from "./root.calc";
import { calculate as lcmCalc } from "./lcm.calc";
import { calculate as gcfCalc } from "./gcf.calc";
import { calculate as roundingCalc } from "./rounding.calc";
import { calculate as meanMedianModeCalc } from "./mean-median-mode.calc";
import { calculate as standardDeviationCalc } from "./standard-deviation.calc";
import { calculate as dateCalc } from "./date.calc";
import { calculate as timeDurationCalc } from "./time-duration.calc";
import { calculate as dayCounterCalc } from "./day-counter.calc";
import { calculate as dayOfWeekCalc } from "./day-of-week.calc";
import { calculate as hoursCalc } from "./hours.calc";
import { calculate as squareFootageCalc } from "./square-footage.calc";
import { calculate as discountCalc } from "./discount.calc";
import { calculate as salesTaxCalc } from "./sales-tax.calc";
import { calculate as fuelCostCalc } from "./fuel-cost.calc";
import { calculate as gasMileageCalc } from "./gas-mileage.calc";
import { calculate as passwordGeneratorCalc } from "./password-generator.calc";
import { calculate as diceRollerCalc } from "./dice-roller.calc";
import { calculate as conversionCalc } from "./conversion.calc";
import { calculate as densityCalc } from "./density.calc";
import { calculate as speedCalc } from "./speed.calc";
import { calculate as hypotenuseCalc } from "./hypotenuse.calc";
import { calculate as triangleCalc } from "./triangle.calc";
import { calculate as circleCalc } from "./circle.calc";
import { calculate as volumeCalcCalc } from "./volume-calc.calc";
import { calculate as slopeCalc } from "./slope.calc";
import { calculate as distanceCalcCalc } from "./distance-calc.calc";
import { calculate as annuityCalc } from "./annuity.calc";
import { calculate as inflationCalc } from "./inflation.calc";
import { calculate as tdeeCalc } from "./tdee.calc";
import { calculate as marginCalc } from "./margin.calc";

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
  { definition: compoundInterestJson as CalculatorDefinition, calculate: compoundInterestCalc },
  { definition: simpleInterestJson as CalculatorDefinition, calculate: simpleInterestCalc },
  { definition: savingsJson as CalculatorDefinition, calculate: savingsCalc },
  { definition: cdJson as CalculatorDefinition, calculate: cdCalc },
  { definition: autoLoanJson as CalculatorDefinition, calculate: autoLoanCalc },
  { definition: retirementJson as CalculatorDefinition, calculate: retirementCalc },
  { definition: investmentJson as CalculatorDefinition, calculate: investmentCalc },
  { definition: interestJson as CalculatorDefinition, calculate: interestCalc },
  { definition: bodyFatJson as CalculatorDefinition, calculate: bodyFatCalc },
  { definition: idealWeightJson as CalculatorDefinition, calculate: idealWeightCalc },
  { definition: paceJson as CalculatorDefinition, calculate: paceCalc },
  { definition: fractionJson as CalculatorDefinition, calculate: fractionCalc },
  { definition: randomNumberJson as CalculatorDefinition, calculate: randomNumberCalc },
  { definition: percentErrorJson as CalculatorDefinition, calculate: percentErrorCalc },
  { definition: exponentJson as CalculatorDefinition, calculate: exponentCalc },
  { definition: binaryJson as CalculatorDefinition, calculate: binaryCalc },
  { definition: quadraticJson as CalculatorDefinition, calculate: quadraticCalc },
  { definition: logJson as CalculatorDefinition, calculate: logCalc },
  { definition: ratioJson as CalculatorDefinition, calculate: ratioCalc },
  { definition: rootJson as CalculatorDefinition, calculate: rootCalc },
  { definition: lcmJson as CalculatorDefinition, calculate: lcmCalc },
  { definition: gcfJson as CalculatorDefinition, calculate: gcfCalc },
  { definition: roundingJson as CalculatorDefinition, calculate: roundingCalc },
  { definition: meanMedianModeJson as CalculatorDefinition, calculate: meanMedianModeCalc },
  { definition: standardDeviationJson as CalculatorDefinition, calculate: standardDeviationCalc },
  { definition: dateJson as CalculatorDefinition, calculate: dateCalc },
  { definition: timeDurationJson as CalculatorDefinition, calculate: timeDurationCalc },
  { definition: dayCounterJson as CalculatorDefinition, calculate: dayCounterCalc },
  { definition: dayOfWeekJson as CalculatorDefinition, calculate: dayOfWeekCalc },
  { definition: hoursJson as CalculatorDefinition, calculate: hoursCalc },
  { definition: squareFootageJson as CalculatorDefinition, calculate: squareFootageCalc },
  { definition: discountJson as CalculatorDefinition, calculate: discountCalc },
  { definition: salesTaxJson as CalculatorDefinition, calculate: salesTaxCalc },
  { definition: fuelCostJson as CalculatorDefinition, calculate: fuelCostCalc },
  { definition: gasMileageJson as CalculatorDefinition, calculate: gasMileageCalc },
  { definition: passwordGeneratorJson as CalculatorDefinition, calculate: passwordGeneratorCalc },
  { definition: diceRollerJson as CalculatorDefinition, calculate: diceRollerCalc },
  { definition: conversionJson as CalculatorDefinition, calculate: conversionCalc },
  { definition: densityJson as CalculatorDefinition, calculate: densityCalc },
  { definition: speedJson as CalculatorDefinition, calculate: speedCalc },
  { definition: hypotenuseJson as CalculatorDefinition, calculate: hypotenuseCalc },
  { definition: triangleJson as CalculatorDefinition, calculate: triangleCalc },
  { definition: circleJson as CalculatorDefinition, calculate: circleCalc },
  { definition: volumeCalcJson as CalculatorDefinition, calculate: volumeCalcCalc },
  { definition: slopeJson as CalculatorDefinition, calculate: slopeCalc },
  { definition: distanceCalcJson as CalculatorDefinition, calculate: distanceCalcCalc },
  { definition: annuityJson as CalculatorDefinition, calculate: annuityCalc },
  { definition: inflationJson as CalculatorDefinition, calculate: inflationCalc },
  { definition: tdeeJson as CalculatorDefinition, calculate: tdeeCalc },
  { definition: marginJson as CalculatorDefinition, calculate: marginCalc },
];

export function getCalculatorEntry(id: string): CalculatorEntry | undefined {
  return calculatorRegistry.find((c) => c.definition.id === id);
}

export function getCalculatorDefinitions(): CalculatorDefinition[] {
  return calculatorRegistry.map((c) => c.definition);
}

export function getFeaturedCalculators(max = 8): CalculatorEntry[] {
  return calculatorRegistry.filter((c) => c.definition.featured).slice(0, max);
}
