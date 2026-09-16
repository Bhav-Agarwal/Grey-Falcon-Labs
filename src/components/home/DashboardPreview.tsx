import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AreaChart, BarChart } from "@/components/charts/Charts";
import { IconArrowRight, IconChart } from "@/components/ui/icons";
import { TradingViewTickerTape } from "@/components/widgets/TradingView";
import { getLiveSnapshot } from "@/lib/mt5";
import { formatCurrency, formatPct } from "@/lib/utils";

/**
 * Home-page teaser for the live dashboard. Renders a compact version of the
 * real /live view from the same mock MT5 snapshot.
 */
export function DashboardPreview() {
  const s = getLiveSnapshot();

  return (
    <Section id="dashboard" className="border-y border-white/5 bg-white/[0.015]">
      <SectionHeading
        eyebrow="Live dashboard"
        title="See your system's performance in"
        accent="real time"
        lead="Every metric, every trade, every dollar — visualized in one dashboard."
      />

      {/* Live market ticker tape (TradingView, free embed). */}
      <Reveal className="mt-10">
        <div className="glass overflow-hidden px-2">
          <TradingViewTickerTape />
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <div className="glass overflow-hidden p-4 shadow-card md:p-6">
          {/* Header row */}
          <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-semibold text-white">Good afternoon, Trader</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gain/10 px-2 py-0.5 text-gain">
                  <span className="h-1.5 w-1.5 rounded-full bg-gain animate-pulse-dot" />
                  System active
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5">{s.account.server}</span>
              </div>
            </div>
            <div className="flex gap-3">
              {[
                { k: "Today's P&L", v: formatCurrency(s.todayPnl, { sign: true }) },
                { k: "Trades", v: s.tradesToday },
                { k: "Wins", v: s.winsToday },
              ].map((x) => (
                <div key={x.k} className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    {x.k}
                  </div>
                  <div className="font-display text-base font-bold text-white">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Metric cards */}
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard
              label="Net P&L"
              tone="gain"
              value={formatCurrency(s.netPnl, { sign: true })}
              sub={`+${formatPct(s.returnPct)} return`}
            />
            <MetricCard label="Win rate" value={formatPct(s.winRatePct)} sub="Across all trades" />
            <MetricCard label="Profit factor" value={s.profitFactor.toFixed(2)} badge="Profitable" />
            <MetricCard
              label="Balance"
              tone="gold"
              value={formatCurrency(s.balance)}
              sub="Current balance"
            />
          </div>

          {/* Charts */}
          <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_1fr]">
            <div className="glass p-4">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                Net cumulative P&L
              </p>
              <div className="h-48">
                <AreaChart data={s.cumulative} title="Net cumulative profit and loss over time" color="#34d399" />
              </div>
            </div>
            <div className="glass p-4">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                Trades by weekday
              </p>
              <div className="h-48">
                <BarChart
                  data={s.weekdayTrades.map((w) => w.count)}
                  labels={s.weekdayTrades.map((w) => w.day)}
                  title="Number of trades by weekday"
                  color="#38bdf8"
                />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6 flex justify-center">
        <ButtonLink href="/live" variant="secondary" size="md">
          <IconChart className="h-4 w-4" />
          Open the live report
          <IconArrowRight className="h-4 w-4" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
