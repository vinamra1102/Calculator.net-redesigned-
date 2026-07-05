import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { getFeaturedCalculators } from "@/lib/calculators/registry";

const CATEGORY_LABELS: Record<string, string> = {
  financial: "Financial",
  "fitness-health": "Fitness & Health",
  math: "Math",
  other: "Everyday",
};

export function PopularCalculators() {
  const featured = getFeaturedCalculators(8);

  if (featured.length === 0) return null;

  return (
    <section aria-label="Popular calculators" className="bg-surface py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-text">Popular calculators</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((entry) => (
            <CalculatorCard
              key={entry.definition.id}
              title={entry.definition.title}
              summary={entry.definition.summary}
              href={`/calculators/${entry.definition.category}/${entry.definition.id}`}
              category={CATEGORY_LABELS[entry.definition.category] ?? entry.definition.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
