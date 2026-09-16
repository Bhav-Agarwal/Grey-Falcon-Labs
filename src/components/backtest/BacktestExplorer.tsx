"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  STRATEGIES,
  RISK_PROFILES,
  getReport,
  type StrategyId,
  type RiskId,
} from "@/lib/backtest";
import { AreaChart, BarChart } from "@/components/charts/Charts";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { formatCurrency, formatPct, cn } from "@/lib/utils";
import { IconChart, IconShield } from "@/components/ui/icons";

/**
 * Interactive backtest explorer. Pick a strategy + risk profile to generate a
 * deterministic mock report (metrics, equity curve, monthly returns).
 * All numbers are illustrative — see src/lib/backtest.ts to wire real data.
 */
export function BacktestExplorer() {
  const [strategyId, setStrategyId] = useState<StrategyId>("falcon-momentum");
  const [riskId, setRiskId] = useState<RiskId>("balanced");

  const report = useMemo(() => getReport(strategyId, riskId), [strategyId, riskId]);
  const equityValues = report.equity.map((p) => p.equity);
  const monthly = report.monthlyReturns;

  const metrics = [
    { label: "Net profit", value: formatCurrency(report.netProfit, { sign: true }), tone: "gain" as const },
    { label: "Total return", value: `+${formatPct(report.returnPct)}` },
    { label: "CAGR", value: formatPct(report.cagrPct) },
    { label: "Max drawdown", value: formatPct(report.maxDrawdownPct), tone: "loss" as const },
    { label: "Win rate", value: formatPct(report.winRatePct) },
    { label: "Profit factor", value: report.profitFactor.toFixed(2) },
    { label: "Trades", value: report.trades.toLocaleString() },
    { label: "Sharpe", value: report.sharpe.toFixed(2) },
    { label: "Return / DD", value: report.returnOverDd.toFixed(2) },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Strategy selector */}
        <fieldset className="glass p-5">
          <legend className="mb-3 flex items-center gap-2 px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400">
            <IconChart className="h-3.5 w-3.5 text-gold-400" /> Strategy
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {STRATEGIES.map((s) => {
              const active = s.id === strategyId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStrategyId(s.id)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-all",
                    active
                      ? "border-gold-500/50 bg-gold-500/[0.08]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold text-white">{s.name}</span>
                    <span className="font-mono text-[10px] text-neutral-500">{s.symbol}</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">{s.style}</p>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Risk selector */}
        <fieldset className="glass p-5">
          <legend className="mb-3 flex items-center gap-2 px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400">
            <IconShield className="h-3.5 w-3.5 text-steel-400" /> Risk profile
          </legend>
          <div className="flex flex-col gap-2">
            {RISK_PROFILES.map((r) => {
              const active = r.id === riskId;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRiskId(r.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-center justify-between rounded-xl border p-3 text-left transition-all",
                    active
                      ? "border-steel-500/50 bg-steel-500/[0.08]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20",
                  )}
                >
                  <span>
                    <span className="block font-display text-sm font-semibold text-white">{r.name}</span>
                    <span className="block text-xs text-neutral-400">{r.note}</span>
                  </span>
                  <span className="font-mono text-xs text-neutral-300">{r.riskPerTrade}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Report */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${strategyId}-${riskId}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="glass overflow-hidden shadow-card"
        >
          {/* Report header */}
          <div className="flex flex-col gap-3 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-white">{report.strategy.name}</h2>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                  {report.strategy.symbol}
                </span>
              </div>
              <p className="mt-1 max-w-xl text-sm text-neutral-400">{report.strategy.description}</p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
              <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[11px] font-medium text-gold-400">
                {report.risk.name} · {report.risk.riskPerTrade}
              </span>
              <span className="font-mono text-xs text-neutral-500">{report.period}</span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3 lg:grid-cols-3">
            {metrics.map((m) => (
              <MetricCard key={m.label} label={m.label} value={m.value} tone={m.tone} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-3 px-6 pb-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="glass p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  Equity curve
                </p>
                <p className="text-xs text-neutral-400">
                  {formatCurrency(report.startBalance)} →{" "}
                  <span className="text-gain">{formatCurrency(report.endBalance)}</span>
                </p>
              </div>
              <div className="h-56">
                <AreaChart
                  data={equityValues}
                  color="#f59e0b"
                  title={`${report.strategy.name} equity curve`}
                  desc={`Equity grew from ${formatCurrency(report.startBalance)} to ${formatCurrency(report.endBalance)} over ${report.period}.`}
                />
              </div>
            </div>
            <div className="glass p-4">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                Monthly returns (%)
              </p>
              <div className="h-56">
                <BarChart
                  data={monthly.map((m) => m.pct)}
                  title="Monthly returns as a percentage"
                  desc="Green bars are profitable months, red bars are losing months."
                  signed
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-neutral-500">
                <span>Best: <span className="text-gain">+{report.bestMonthPct.toFixed(1)}%</span></span>
                <span>Worst: <span className="text-loss">{report.worstMonthPct.toFixed(1)}%</span></span>
              </div>
            </div>
          </div>

          <p className="border-t border-white/10 px-6 py-4 text-xs leading-relaxed text-neutral-500">
            Illustrative backtest on {report.strategy.symbol} using deterministic mock data. Past and
            backtested performance is not indicative of future results and is not financial advice.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
