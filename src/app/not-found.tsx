import Link from "next/link";
import { SkipLink } from "@/components/layout/SkipLink";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <TopNav />
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-4xl font-bold text-text">Page not found</h1>
        <p className="mt-4 text-lg text-text-muted">
          The calculator you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[44px] items-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          Back to calculators
        </Link>
      </main>
      <Footer />
    </>
  );
}
