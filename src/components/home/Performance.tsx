import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { AreaChart } from "@/components/charts/Charts";
import { IconArrowRight } from "@/components/ui/icons";
import { getReport } from "@/lib/backtest";
import { formatCurrency, formatPct } from "@/lib/utils";

/** Verified-performance teaser driven by the default backtest report. */
export function Performance() {
  const r = getReport("falcon-momentum", "balanced");
  const equityValues = r.equity.map((p) => p.equity);

  const stats = [
    { k: "Net profit", v: formatCurrency(r.netProfit, { sign: true }), tone: "text-gain" },
    { k: "Return", v: `+${formatPct(r.returnPct)}`, tone: "text-white" },
    { k: "Max drawdown", v: formatPct(r.maxDrawdownPct), tone: "text-white" },
    { k: "Profit factor", v: r.profitFactor.toFixed(2), tone: "text-white" },
    { k: "Win rate", v: formatPct(r.winRatePct), tone: "text-white" },
    { k: "Return / DD", v: r.returnOverDd.toFixed(2), tone: "text-white" },
  ];

  return (
    <Section id="performance">
      <SectionHeading
        eyebrow="Verified performance"
        title="Backtested across years and"
        accent="market cycles"
        lead="Illustrative performance snapshots from in-house testing — not marketing claims, and not a promise of future results."
      />

      <Reveal className="mt-14">
        <div className="glass overflow-hidden shadow-card">
          <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
            {/* Chart */}
            <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    XAUUSD equity curve
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">
                    {formatCurrency(r.startBalance)} →{" "}
                    <span className="text-gain">{formatCurrency(r.endBalance)}</span>
                  </p>
                </div>
                <span className="rounded-full border border-gain/30 bg-gain/10 px-3 py-1 text-[11px] font-medium text-gain">
                  {r.period}
                </span>
              </div>
              <div className="mt-4 h-64">
                <AreaChart
                  data={equityValues}
                  title="Backtested XAUUSD equity curve"
                  desc={`Balance grew from ${formatCurrency(r.startBalance)} to ${formatCurrency(r.endBalance)} over ${r.period}.`}
                  color="#f59e0b"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-white/5">
              {stats.map((s) => (
                <div key={s.k} className="bg-ink-900 p-5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    {s.k}
                  </div>
                  <div className={`mt-1 font-display text-2xl font-bold ${s.tone}`}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6 flex justify-center">
        <ButtonLink href="/backtesting" size="md">
          Show full report
          <IconArrowRight className="h-4 w-4" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
