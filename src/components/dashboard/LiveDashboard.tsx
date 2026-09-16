"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Mt5Snapshot } from "@/lib/mt5";
import { MetricCard } from "./MetricCard";
import { AreaChart, BarChart } from "@/components/charts/Charts";
import { formatCurrency, formatPct, cn } from "@/lib/utils";
import { IconChart, IconClock, IconBolt } from "@/components/ui/icons";

/**
 * Live MT5 report dashboard.
 *
 * Renders a broker-style dashboard from a snapshot. To FEEL live, once mounted
 * it runs a small client-side price walk on open positions and ticks a clock —
 * this is purely cosmetic mock behaviour, NOT a real feed. Replace the snapshot
 * source (src/lib/mt5.ts) with your bridge to show real data.
 */
export function LiveDashboard({ snapshot }: { snapshot: Mt5Snapshot }) {
  const [positions, setPositions] = useState(snapshot.positions);
  const [clock, setClock] = useState<string | null>(null);
  const [live, setLive] = useState(true);
  // Seed a deterministic-ish walk so it doesn't jump wildly.
  const seedRef = useRef(1);

  // Cosmetic "live" tick — nudges open prices and updates the clock.
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      seedRef.current = (seedRef.current * 1103515245 + 12345) & 0x7fffffff;
      const noise = ((seedRef.current % 1000) / 1000 - 0.5) * 0.6; // ±0.3
      setPositions((prev) =>
        prev.map((p, i) => {
          const dir = p.side === "buy" ? 1 : -1;
          const nextPrice = +(p.currentPrice + noise * (i + 1) * 0.3).toFixed(2);
          const profit = Math.round((nextPrice - p.openPrice) * dir * p.lots * 100);
          return { ...p, currentPrice: nextPrice, profit };
        }),
      );
      setClock(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 2000);
    return () => clearInterval(id);
  }, [live]);

  useEffect(() => {
    setClock(new Date().toLocaleTimeString("en-US", { hour12: false }));
  }, []);

  const openPnl = useMemo(() => positions.reduce((sum, p) => sum + p.profit, 0), [positions]);

  return (
    <div className="flex flex-col gap-4">
      {/* Account header */}
      <div className="glass flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/30 to-ember-500/20 text-gold-400">
            <IconBolt className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-white">{snapshot.account.name}</p>
            <p className="text-xs text-neutral-400">
              {snapshot.account.broker} · {snapshot.account.server} · {snapshot.account.leverage}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
              live ? "bg-gain/10 text-gain" : "bg-white/5 text-neutral-400",
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", live ? "bg-gain animate-pulse-dot" : "bg-neutral-500")} />
            {live ? "Live" : "Paused"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300">
            <IconClock className="h-3.5 w-3.5" />
            {clock ?? "—:—:—"}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-neutral-300">
            {snapshot.symbol}
          </span>
          <button
            type="button"
            onClick={() => setLive((v) => !v)}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white transition-colors hover:bg-white/10"
          >
            {live ? "Pause" : "Resume"}
          </button>
        </div>
      </div>

      {/* Top KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Today's P&L"
          tone={snapshot.todayPnl >= 0 ? "gain" : "loss"}
          value={formatCurrency(snapshot.todayPnl, { sign: true })}
          sub={`${snapshot.tradesToday} trades · ${snapshot.winsToday} wins`}
        />
        <MetricCard
          label="Open P&L"
          tone={openPnl >= 0 ? "gain" : "loss"}
          value={formatCurrency(openPnl, { sign: true })}
          sub={`${positions.length} open positions`}
        />
        <MetricCard label="Equity" tone="gold" value={formatCurrency(snapshot.equity)} sub="Balance + floating" />
        <MetricCard label="Balance" value={formatCurrency(snapshot.balance)} sub="Closed P&L only" />
      </div>

      {/* Second KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Net P&L"
          tone="gain"
          value={formatCurrency(snapshot.netPnl, { sign: true })}
          sub={`+${formatPct(snapshot.returnPct)} return`}
        />
        <MetricCard label="Win rate" value={formatPct(snapshot.winRatePct)} />
        <MetricCard label="Profit factor" value={snapshot.profitFactor.toFixed(2)} badge="Profitable" />
        <MetricCard label="Risk : reward" value={snapshot.riskReward} />
      </div>

      {/* Charts */}
      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className="glass p-4">
          <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
            <IconChart className="h-3.5 w-3.5" /> Net cumulative P&L
          </p>
          <div className="h-56">
            <AreaChart data={snapshot.cumulative} title="Net cumulative profit and loss" color="#34d399" />
          </div>
        </div>
        <div className="glass p-4">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
            Trades by weekday
          </p>
          <div className="h-56">
            <BarChart
              data={snapshot.weekdayTrades.map((w) => w.count)}
              labels={snapshot.weekdayTrades.map((w) => w.day)}
              title="Number of trades by weekday"
              color="#38bdf8"
            />
          </div>
        </div>
      </div>

      {/* Open positions + calendar */}
      <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
        <OpenPositions positions={positions} live={live} />
        <MonthCalendar snapshot={snapshot} />
      </div>
    </div>
  );
}

function OpenPositions({
  positions,
  live,
}: {
  positions: Mt5Snapshot["positions"];
  live: boolean;
}) {
  return (
    <div className="glass overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">Open positions</p>
        <span className="font-mono text-[11px] text-neutral-500">{positions.length} live</span>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="text-xs text-neutral-500">
              <th className="px-4 py-2 font-medium">Ticket</th>
              <th className="px-4 py-2 font-medium">Side</th>
              <th className="px-4 py-2 font-medium">Lots</th>
              <th className="px-4 py-2 font-medium">Open</th>
              <th className="px-4 py-2 font-medium">Now</th>
              <th className="px-4 py-2 text-right font-medium">P&L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p) => (
              <tr key={p.ticket} className="border-t border-white/5">
                <td className="px-4 py-3 font-mono text-xs text-neutral-400">{p.ticket}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-xs font-medium",
                      p.side === "buy" ? "bg-gain/15 text-gain" : "bg-loss/15 text-loss",
                    )}
                  >
                    {p.side.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 tabular-nums text-neutral-300">{p.lots.toFixed(2)}</td>
                <td className="px-4 py-3 tabular-nums text-neutral-300">{p.openPrice.toFixed(2)}</td>
                <td className="px-4 py-3 tabular-nums text-white">
                  <motion.span key={p.currentPrice} initial={live ? { opacity: 0.4 } : false} animate={{ opacity: 1 }}>
                    {p.currentPrice.toFixed(2)}
                  </motion.span>
                </td>
                <td
                  className={cn(
                    "px-4 py-3 text-right font-medium tabular-nums",
                    p.profit >= 0 ? "text-gain" : "text-loss",
                  )}
                >
                  {formatCurrency(p.profit, { sign: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MonthCalendar({ snapshot }: { snapshot: Mt5Snapshot }) {
  // Cosmetic month layout: assume the month starts on a Wednesday (offset 3).
  const offset = 3;
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="glass p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
          {snapshot.monthLabel} · daily P&L
        </p>
        <div className="flex gap-3 text-[11px] text-neutral-500">
          <span>Best <span className="text-gain">{formatCurrency(snapshot.bestDay.value, { sign: true })}</span></span>
          <span>Worst <span className="text-loss">{formatCurrency(snapshot.worstDay.value, { sign: true })}</span></span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {weekdays.map((d, i) => (
          <div key={i} className="text-center font-mono text-[10px] text-neutral-600">
            {d}
          </div>
        ))}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {snapshot.monthDays.map((d) => {
          const pnl = d.pnl;
          const traded = pnl !== null && pnl !== 0;
          const positive = (pnl ?? 0) > 0;
          return (
            <div
              key={d.day}
              title={pnl === null ? `Day ${d.day}: no trades` : `Day ${d.day}: ${formatCurrency(pnl, { sign: true })}`}
              className={cn(
                "flex aspect-square flex-col items-center justify-center rounded-md border text-[10px]",
                !traded && "border-white/5 bg-white/[0.01] text-neutral-600",
                traded && positive && "border-gain/30 bg-gain/10 text-gain",
                traded && !positive && "border-loss/30 bg-loss/10 text-loss",
              )}
            >
              <span className="text-[9px] text-neutral-500">{d.day}</span>
              {traded ? <span className="font-medium">{pnl! > 0 ? "+" : ""}{pnl}</span> : <span>·</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
