"use client";

import { Tabs, TabList, TabTrigger, TabPanel } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { ResultPanel } from "@/components/calculator/ResultPanel";
import { ExplainerAccordion } from "@/components/calculator/ExplainerAccordion";

export function DesignSystemTabs() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-text">Interactive Components</h2>
      <Tabs defaultValue="inputs">
        <TabList>
          <TabTrigger value="inputs">Inputs</TabTrigger>
          <TabTrigger value="results">Results</TabTrigger>
          <TabTrigger value="accordion">Accordion</TabTrigger>
        </TabList>

        <TabPanel value="inputs">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Home price" type="number" defaultValue={400000} placeholder="400,000" />
            <Input label="Down payment" type="number" defaultValue={20} unit="%" />
            <Input label="Email" type="email" placeholder="you@example.com" hint="We never share your email." />
            <Input label="Amount" type="number" placeholder="0.00" error="Enter an amount above $0" />
          </div>
        </TabPanel>

        <TabPanel value="results">
          <div className="max-w-md space-y-4">
            <ResultPanel label="Monthly payment" value="$2,528.27" large />
            <ResultPanel label="Total interest" value="$510,176.92" />
            <ResultPanel label="Total cost" value="$910,176.92" />
          </div>
        </TabPanel>

        <TabPanel value="accordion">
          <div className="max-w-lg">
            <ExplainerAccordion title="About this calculator" defaultOpen>
              <p>
                This mortgage calculator estimates your monthly payment based on home price, down
                payment percentage, loan term, and annual interest rate. The estimate excludes
                property taxes, homeowner&apos;s insurance, and HOA fees, which vary by location and
                lender.
              </p>
            </ExplainerAccordion>
            <ExplainerAccordion title="Formula used">
              <p>
                M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the principal (home price minus
                down payment), r is the monthly interest rate, and n is the total number of monthly
                payments.
              </p>
            </ExplainerAccordion>
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
}
