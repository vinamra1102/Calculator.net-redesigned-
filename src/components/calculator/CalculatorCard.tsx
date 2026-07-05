import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

interface CalculatorCardProps {
  title: string;
  summary: string;
  href: string;
  category: string;
}

export function CalculatorCard({ title, summary, href, category }: CalculatorCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <span className="text-xs font-medium uppercase tracking-wider text-text-subtle">
            {category}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-text group-hover:text-accent-text">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-muted">{summary}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
