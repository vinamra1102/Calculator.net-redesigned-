import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { CalculatorPage } from "@/components/calculator/CalculatorPage";
import { CalculatorJsonLd } from "@/components/calculator/JsonLd";
import { calculatorRegistry, getCalculatorEntry } from "@/lib/calculators/registry";
import type { CalculatorDefinition } from "@/lib/engine/schema";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return calculatorRegistry.map((entry) => ({
    category: entry.definition.category,
    slug: entry.definition.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const entry = getCalculatorEntry(slug);
  if (!entry) return {};

  const calc = entry.definition;
  return {
    title: calc.title,
    description: calc.summary,
    openGraph: {
      title: `${calc.title} | calculator.net(redesigned)`,
      description: calc.summary,
      type: "website",
      url: `/calculators/${category}/${slug}`,
    },
    twitter: {
      card: "summary",
      title: `${calc.title} | calculator.net(redesigned)`,
      description: calc.summary,
    },
    alternates: {
      canonical: `/calculators/${category}/${slug}`,
    },
  };
}

function getExplainerContent(slug: string): React.ReactNode {
  switch (slug) {
    case "mortgage":
      return (
        <>
          <p>
            This mortgage calculator estimates your monthly payment based on home price, down
            payment percentage, loan term, and annual interest rate. The estimate excludes property
            taxes, homeowner&apos;s insurance, and HOA fees, which vary by location and lender.
          </p>
          <p className="mt-2">
            The calculation uses the standard amortization formula. Your actual monthly payment may
            differ based on your lender&apos;s terms, points, and other closing costs.
          </p>
        </>
      );
    case "loan":
      return (
        <>
          <p>
            This loan calculator computes monthly payments and total interest for any fixed-rate
            personal loan. Enter the loan amount, interest rate, and term to see a full breakdown.
          </p>
          <p className="mt-2">
            This does not account for variable-rate loans, origination fees, or prepayment penalties.
          </p>
        </>
      );
    case "bmi":
      return (
        <>
          <p>
            Body Mass Index (BMI) is a simple screening tool that uses your height and weight to
            estimate body fat. Standard adult bands: under 18.5 is underweight, 18.5–24.9 is normal,
            25–29.9 is overweight, 30+ is obese.
          </p>
          <p className="mt-2">
            BMI does not directly measure body fat and may not be accurate for athletes, pregnant
            women, or elderly individuals. Consult a healthcare provider for a complete assessment.
          </p>
        </>
      );
    case "calorie":
      return (
        <>
          <p>
            This calculator estimates your daily calorie needs using the Mifflin–St Jeor equation for
            Basal Metabolic Rate (BMR), multiplied by an activity factor. Results are estimates;
            individual needs vary based on genetics, body composition, and health conditions.
          </p>
        </>
      );
    case "tip":
      return (
        <>
          <p>
            Calculate the tip amount and split the total bill evenly among any number of people.
            Enter the bill amount, desired tip percentage, and number of people sharing the bill.
          </p>
        </>
      );
    case "percentage":
      return (
        <>
          <p>
            This calculator handles three common percentage operations: finding X% of Y, determining
            what percent X is of Y, and calculating the percentage change from X to Y.
          </p>
        </>
      );
    case "age":
      return (
        <>
          <p>
            Calculate your exact age in years, months, and days from your date of birth. The
            calculator properly handles leap years and whether you&apos;ve had this year&apos;s
            birthday yet.
          </p>
        </>
      );
    case "gpa":
      return (
        <>
          <p>
            Compute your grade point average by entering each course&apos;s grade and credit hours.
            The grade-to-points mapping is configurable — check your institution&apos;s scale.
          </p>
        </>
      );
    case "scientific":
      return (
        <>
          <p>
            Evaluate mathematical expressions with support for trigonometry, logarithms, exponents,
            roots, and constants. Uses math.js for safe expression parsing — never eval().
          </p>
        </>
      );
    case "currency":
      return (
        <>
          <p>
            Convert between currencies using exchange rates. Note: this calculator uses sample
            exchange rates for demonstration. For live rates, a provider API key is needed — see the
            morning report for details.
          </p>
        </>
      );
    default:
      return <p>Enter your values to calculate results.</p>;
  }
}

export default async function CalculatorRoute({ params }: PageProps) {
  const { category, slug } = await params;
  const entry = getCalculatorEntry(slug);

  if (!entry || entry.definition.category !== category) {
    notFound();
  }

  const explainerContent = getExplainerContent(slug);

  return (
    <>
      <SkipLink />
      <TopNav />
      <CalculatorJsonLd definition={entry.definition} category={category} slug={slug} />
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-8">
        <Suspense fallback={<div className="py-8 text-center text-text-muted">Loading calculator...</div>}>
          <CalculatorPage
            definition={entry.definition as CalculatorDefinition}
            explainerContent={explainerContent}
          />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
