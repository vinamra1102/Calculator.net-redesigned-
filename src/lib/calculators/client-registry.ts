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
  "compound-interest": compoundInterestCalc,
  "simple-interest": simpleInterestCalc,
  savings: savingsCalc,
  cd: cdCalc,
  "auto-loan": autoLoanCalc,
  retirement: retirementCalc,
  investment: investmentCalc,
  interest: interestCalc,
  "body-fat": bodyFatCalc,
  "ideal-weight": idealWeightCalc,
  pace: paceCalc,
  fraction: fractionCalc,
  "random-number": randomNumberCalc,
  "percent-error": percentErrorCalc,
  exponent: exponentCalc,
  binary: binaryCalc,
  quadratic: quadraticCalc,
  log: logCalc,
  ratio: ratioCalc,
  root: rootCalc,
  lcm: lcmCalc,
  gcf: gcfCalc,
  rounding: roundingCalc,
  "mean-median-mode": meanMedianModeCalc,
  "standard-deviation": standardDeviationCalc,
  date: dateCalc,
  "time-duration": timeDurationCalc,
  "day-counter": dayCounterCalc,
  "day-of-week": dayOfWeekCalc,
  hours: hoursCalc,
  "square-footage": squareFootageCalc,
  discount: discountCalc,
  "sales-tax": salesTaxCalc,
  "fuel-cost": fuelCostCalc,
  "gas-mileage": gasMileageCalc,
  "password-generator": passwordGeneratorCalc,
  "dice-roller": diceRollerCalc,
  conversion: conversionCalc,
  density: densityCalc,
  speed: speedCalc,
  hypotenuse: hypotenuseCalc,
  triangle: triangleCalc,
  circle: circleCalc,
  "volume-calc": volumeCalcCalc,
  slope: slopeCalc,
  "distance-calc": distanceCalcCalc,
  annuity: annuityCalc,
  inflation: inflationCalc,
  tdee: tdeeCalc,
  margin: marginCalc,
};

export function getCalculateFunction(id: string): ((inputs: InputValues) => CalculatorOutput) | undefined {
  return calculatorFunctions[id];
}
