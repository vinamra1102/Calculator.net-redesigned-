import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { calculatorRegistry } from "@/lib/calculators/registry";

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  financial: {
    title: "Financial Calculators",
    description:
      "Mortgage, loan, currency, investment, and other financial calculators to help you make informed money decisions.",
  },
  "fitness-health": {
    title: "Fitness & Health Calculators",
    description:
      "BMI, calorie, body fat, pace, and other health calculators to track your fitness goals.",
  },
  math: {
    title: "Math Calculators",
    description:
      "Scientific, percentage, fraction, and other math calculators for students and professionals.",
  },
  other: {
    title: "Everyday Calculators",
    description:
      "Age, GPA, tip, date, and other everyday calculators for common tasks.",
  },
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/calculators/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const meta = CATEGORY_META[category];

  if (!meta) {
    notFound();
  }

  const calculators = calculatorRegistry.filter(
    (entry) => entry.definition.category === category
  );

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">{meta.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-text-muted">{meta.description}</p>
      </section>

      <section aria-label={`${meta.title} list`}>
        {calculators.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((entry) => (
              <CalculatorCard
                key={entry.definition.id}
                title={entry.definition.title}
                summary={entry.definition.summary}
                href={`/calculators/${category}/${entry.definition.id}`}
                category={meta.title}
              />
            ))}
          </div>
        ) : (
          <p className="text-text-muted">
            No calculators available in this category yet. Check back soon.
          </p>
        )}
      </section>
    </main>
  );
}
