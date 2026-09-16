import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LiveDashboard } from "@/components/dashboard/LiveDashboard";
import { TradingViewSymbolChart } from "@/components/widgets/TradingView";
import { BrokerMarquee } from "@/components/marketing/BrokerMarquee";
import { getLiveSnapshot } from "@/lib/mt5";

export const metadata: Metadata = {
  title: "Live MT5 Report",
  description:
    "A live-style MetaTrader 5 performance report for the Grey Falcon Labs system — balance, equity, open positions, cumulative P&L and a daily calendar.",
};

// This page reflects "live" data, so opt out of static caching.
export const dynamic = "force-dynamic";

export default function LivePage() {
  const snapshot = getLiveSnapshot();

  return (
    <>
      <PageHeader
        eyebrow="Live MT5 report"
        title="Your bot's performance,"
        accent="in real time"
        lead="Balance, equity, open positions and daily P&L — streamed from MetaTrader 5 into one dashboard."
      />

      <Section className="!pt-10">
        {/* Broker-agnostic compatibility strip. */}
        <Reveal className="mb-6">
          <div className="glass overflow-hidden px-2 py-1">
            <p className="pt-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">
              Broker-agnostic · works with
            </p>
            <BrokerMarquee />
          </div>
        </Reveal>

        {/* Mock-data banner — clearly flags the swap point for a real feed. */}
        <Reveal className="mb-6">
          <div className="flex items-start gap-3 rounded-2xl border border-steel-500/25 bg-steel-500/[0.06] p-4 text-sm text-neutral-300">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-steel-500/20 font-mono text-xs text-steel-400">
              i
            </span>
            <p className="leading-relaxed">
              <strong className="text-white">Demo feed.</strong> This report renders realistic mock
              data with a simulated live tick. A genuine MT5 feed needs a server-side bridge (the
              MetaTrader5 API or a broker REST/WebSocket endpoint) — wire it in{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-gold-400">
                src/lib/mt5.ts
              </code>{" "}
              and the dashboard updates automatically.
            </p>
          </div>
        </Reveal>

        {/* Real, live XAU/USD chart alongside the (mock) account panel. */}
        <Reveal className="mb-4">
          <div className="glass p-4">
            <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
              <span className="h-1.5 w-1.5 rounded-full bg-gain animate-pulse-dot" />
              XAU/USD · live market
            </p>
            <TradingViewSymbolChart symbol="OANDA:XAUUSD" label="Gold" height={360} />
          </div>
        </Reveal>

        <Reveal>
          <LiveDashboard snapshot={snapshot} />
        </Reveal>
      </Section>
    </>
  );
}
