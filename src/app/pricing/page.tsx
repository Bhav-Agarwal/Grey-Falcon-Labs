import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PricingCards } from "@/components/marketing/PricingCards";
import { Accordion } from "@/components/ui/Accordion";
import { IconCheck } from "@/components/ui/icons";
import { PLAN_INCLUSIONS, FAQS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for the Grey Falcon Labs automated trading system. Starter, Growth and Trading Desk plans — cancel anytime.",
};

const COMPARE = [
  { feature: "Grey Falcon system (MT5)", starter: true, growth: true, desk: true },
  { feature: "XAUUSD strategy library", starter: "1 strategy", growth: "All strategies", desk: "All strategies" },
  { feature: "Accounts per license", starter: "1", growth: "3", desk: "15" },
  { feature: "Backtest reports", starter: false, growth: true, desk: true },
  { feature: "Community access", starter: true, growth: "Priority", desk: "Priority" },
  { feature: "Support", starter: "Email", growth: "Priority · 24h", desk: "Dedicated" },
  { feature: "Custom risk presets", starter: false, growth: false, desk: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <IconCheck className="mx-auto h-4 w-4 text-gold-400" />;
  if (value === false) return <span className="text-neutral-600">—</span>;
  return <span className="text-sm text-neutral-300">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Choose your"
        accent="plan"
        lead="Built so the math always works in your favour. Every plan includes the system, updates, and community access. Cancel anytime."
      />

      <Section className="!pt-14">
        <PricingCards />
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div className="glass p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">
              Included with every plan
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {PLAN_INCLUSIONS.map((inc) => (
                <li key={inc} className="flex items-start gap-2.5 text-sm text-neutral-300">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* Comparison table */}
      <Section className="!pt-0">
        <SectionHeading eyebrow="Compare" title="Plan" accent="comparison" />
        <Reveal className="mt-10 overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="pb-3 text-sm font-medium text-neutral-400">Feature</th>
                <th className="pb-3 text-center text-sm font-medium text-neutral-300">Starter</th>
                <th className="pb-3 text-center text-sm font-medium text-gold-400">Growth</th>
                <th className="pb-3 text-center text-sm font-medium text-neutral-300">Trading Desk</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? "bg-white/[0.015]" : ""}>
                  <td className="rounded-l-lg px-3 py-3 text-sm text-neutral-300">{row.feature}</td>
                  <td className="px-3 py-3 text-center"><Cell value={row.starter} /></td>
                  <td className="bg-gold-500/[0.05] px-3 py-3 text-center"><Cell value={row.growth} /></td>
                  <td className="rounded-r-lg px-3 py-3 text-center"><Cell value={row.desk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      {/* Pricing FAQ */}
      <Section className="!pt-0">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Pricing" accent="questions" />
          <div className="mt-10">
            <Accordion items={FAQS} />
          </div>
        </div>
      </Section>
    </>
  );
}
