import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { CalculatorCard } from "@/components/calculator/CalculatorCard";

const calculators = [
  {
    title: "Mortgage Calculator",
    summary: "Estimate your monthly payment from home price, down payment, term, and rate.",
    href: "/calculators/financial/mortgage",
    category: "Financial",
  },
  {
    title: "Loan Calculator",
    summary: "Calculate monthly payments and total interest for any personal loan.",
    href: "/calculators/financial/loan",
    category: "Financial",
  },
  {
    title: "Currency Converter",
    summary: "Convert between currencies using exchange rates.",
    href: "/calculators/financial/currency",
    category: "Financial",
  },
  {
    title: "BMI Calculator",
    summary: "Calculate your Body Mass Index and see which standard band you fall into.",
    href: "/calculators/fitness-health/bmi",
    category: "Fitness & Health",
  },
  {
    title: "Calorie Calculator",
    summary: "Estimate daily calorie needs based on your BMR and activity level.",
    href: "/calculators/fitness-health/calorie",
    category: "Fitness & Health",
  },
  {
    title: "Scientific Calculator",
    summary: "Evaluate expressions with trigonometry, logarithms, exponents, and more.",
    href: "/calculators/math/scientific",
    category: "Math",
  },
  {
    title: "Percentage Calculator",
    summary: "Find percentages, percentage change, and what percent one number is of another.",
    href: "/calculators/math/percentage",
    category: "Math",
  },
  {
    title: "Age Calculator",
    summary: "Calculate your exact age in years, months, and days from your date of birth.",
    href: "/calculators/other/age",
    category: "Everyday",
  },
  {
    title: "GPA Calculator",
    summary: "Compute your grade point average from course grades and credit hours.",
    href: "/calculators/other/gpa",
    category: "Everyday",
  },
  {
    title: "Tip Calculator",
    summary: "Split a bill with tip among any number of people.",
    href: "/calculators/other/tip",
    category: "Everyday",
  },
];

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <TopNav />
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-text">
            Free Online Calculators
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Fast, accessible, and accurate tools for financial decisions, fitness tracking, math
            problems, and everyday calculations. No account needed.
          </p>
        </section>

        <section aria-label="All calculators">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <CalculatorCard key={calc.href} {...calc} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
