import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { BacktestExplorer } from "@/components/backtest/BacktestExplorer";
import { IconChart, IconShield, IconTarget } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Backtesting",
  description:
    "Explore Grey Falcon Labs backtests across strategies and risk profiles — equity curves, drawdown, win rate, profit factor and monthly returns for XAUUSD on MT5.",
};

const NOTES = [
  {
    icon: <IconChart className="h-5 w-5" />,
    title: "Multiple strategies",
    body: "Momentum, mean-reversion, volatility breakout and a session scalper — each with its own return and risk signature.",
  },
  {
    icon: <IconShield className="h-5 w-5" />,
    title: "Three risk profiles",
    body: "Toggle conservative, balanced or aggressive to see how per-trade risk reshapes the equity curve and drawdown.",
  },
  {
    icon: <IconTarget className="h-5 w-5" />,
    title: "Honest metrics",
    body: "Net profit, CAGR, max drawdown, Sharpe, profit factor and return-over-drawdown — the numbers that actually matter.",
  },
];

export default function BacktestingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Backtesting"
        title="Strategies × risk,"
        accent="fully reportable"
        lead="Pick a strategy and a risk profile to generate a full performance report. Numbers here are illustrative mock data — the same UI drops onto your real results."
      />

      <Section className="!pt-12">
        <Reveal>
          <BacktestExplorer />
        </Reveal>
      </Section>

      <Section className="!pt-0">
        <SectionHeading eyebrow="How to read it" title="What each report" accent="tells you" />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
          {NOTES.map((n) => (
            <RevealItem key={n.title}>
              <div className="glass glass-hover h-full p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gold-400">
                  {n.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{n.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
