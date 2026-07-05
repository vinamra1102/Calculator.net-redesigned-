import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";

const categories = [
  {
    href: "/calculators/financial",
    title: "Financial",
    description: "Mortgage, loan, investment, savings, and other money calculators.",
    count: "75+",
  },
  {
    href: "/calculators/fitness-health",
    title: "Fitness & Health",
    description: "BMI, calorie, body fat, pace, and other health calculators.",
    count: "30+",
  },
  {
    href: "/calculators/math",
    title: "Math",
    description: "Scientific, percentage, fraction, geometry, and other math tools.",
    count: "40+",
  },
  {
    href: "/calculators/other",
    title: "Everyday",
    description: "Age, GPA, tip, date, conversion, and other daily tools.",
    count: "50+",
  },
];

export function CategoryTiles() {
  return (
    <section aria-label="Browse by category" className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-text">Browse by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href} className="group block">
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold text-text group-hover:text-accent-text">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-medium text-text-subtle">{cat.count}</span>
                  </div>
                  <p className="text-sm text-text-muted">{cat.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
