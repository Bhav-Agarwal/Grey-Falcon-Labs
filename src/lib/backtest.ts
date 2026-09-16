/**
 * Backtesting data module.
 *
 * This generates DETERMINISTIC mock backtest reports for a matrix of
 * strategies x risk factors. It is intentionally self-contained so the
 * /backtesting page renders identically on server and client (no hydration
 * mismatch) and needs no backend.
 *
 * ---------------------------------------------------------------------------
 * REPLACE-ME: To show real backtests, keep the `BacktestReport` shape and
 * swap `getReport()` for a fetch to your own results API / static JSON.
 * ---------------------------------------------------------------------------
 */

export type StrategyId = "falcon-momentum" | "falcon-reversion" | "falcon-breakout" | "falcon-scalper";
export type RiskId = "conservative" | "balanced" | "aggressive";

export type Strategy = {
  id: StrategyId;
  name: string;
  symbol: string;
  style: string;
  description: string;
};

export type RiskProfile = {
  id: RiskId;
  name: string;
  riskPerTrade: string;
  note: string;
};

export const STRATEGIES: Strategy[] = [
  {
    id: "falcon-momentum",
    name: "Falcon Momentum",
    symbol: "XAUUSD",
    style: "Trend / momentum",
    description: "Rides intraday gold momentum during London and New York sessions with trailing exits.",
  },
  {
    id: "falcon-reversion",
    name: "Falcon Reversion",
    symbol: "XAUUSD",
    style: "Mean reversion",
    description: "Fades statistically stretched moves back to a session VWAP with tight invalidation.",
  },
  {
    id: "falcon-breakout",
    name: "Falcon Breakout",
    symbol: "XAUUSD",
    style: "Volatility breakout",
    description: "Trades range expansions around high-impact news windows with volatility-scaled stops.",
  },
  {
    id: "falcon-scalper",
    name: "Falcon Scalper",
    symbol: "XAUUSD",
    style: "Session scalper",
    description: "High-frequency London-open scalps with strict per-trade risk and a hard daily cap.",
  },
];

export const RISK_PROFILES: RiskProfile[] = [
  { id: "conservative", name: "Conservative", riskPerTrade: "0.5% / trade", note: "Lower variance, gentler equity curve." },
  { id: "balanced", name: "Balanced", riskPerTrade: "1.0% / trade", note: "The default. Growth with controlled drawdown." },
  { id: "aggressive", name: "Aggressive", riskPerTrade: "2.0% / trade", note: "Higher variance, larger drawdowns — experienced users." },
];

export type EquityPoint = { t: number; equity: number; drawdown: number };

export type BacktestReport = {
  strategy: Strategy;
  risk: RiskProfile;
  period: string;
  startBalance: number;
  endBalance: number;
  netProfit: number;
  returnPct: number;
  cagrPct: number;
  maxDrawdownPct: number;
  winRatePct: number;
  profitFactor: number;
  trades: number;
  avgWin: number;
  avgLoss: number;
  sharpe: number;
  returnOverDd: number;
  bestMonthPct: number;
  worstMonthPct: number;
  equity: EquityPoint[];
  monthlyReturns: { label: string; pct: number }[];
};

/** Simple deterministic PRNG (mulberry32) so reports are stable across renders. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFrom(strategyId: StrategyId, riskId: RiskId): number {
  const s = `${strategyId}:${riskId}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const RISK_MULT: Record<RiskId, { drift: number; vol: number; dd: number }> = {
  conservative: { drift: 0.7, vol: 0.6, dd: 0.6 },
  balanced: { drift: 1.0, vol: 1.0, dd: 1.0 },
  aggressive: { drift: 1.35, vol: 1.8, dd: 1.9 },
};

const STRAT_BIAS: Record<StrategyId, { edge: number; win: number; pf: number }> = {
  "falcon-momentum": { edge: 1.0, win: 0.52, pf: 1.9 },
  "falcon-reversion": { edge: 0.85, win: 0.61, pf: 1.7 },
  "falcon-breakout": { edge: 1.15, win: 0.47, pf: 2.0 },
  "falcon-scalper": { edge: 0.95, win: 0.58, pf: 1.6 },
};

const MONTHS = 18;

/**
 * Build a deterministic report for a strategy + risk combination.
 * Values are illustrative mock data, NOT a promise of real performance.
 */
export function getReport(strategyId: StrategyId, riskId: RiskId): BacktestReport {
  const strategy = STRATEGIES.find((s) => s.id === strategyId)!;
  const risk = RISK_PROFILES.find((r) => r.id === riskId)!;
  const rng = mulberry32(seedFrom(strategyId, riskId));
  const rm = RISK_MULT[riskId];
  const bias = STRAT_BIAS[strategyId];

  const startBalance = 100000;
  const monthlyReturns: { label: string; pct: number }[] = [];
  const equity: EquityPoint[] = [];

  let balance = startBalance;
  let peak = startBalance;
  let maxDdPct = 0;
  const now = new Date(2025, 0, 1);

  // Generate a monthly-return series, then a denser equity curve.
  const baseMonthly = 0.028 * bias.edge * rm.drift; // ~2.8% base monthly drift
  const monthVol = 0.05 * rm.vol;

  for (let m = 0; m < MONTHS; m++) {
    const shock = (rng() - 0.5) * 2 * monthVol;
    const r = baseMonthly + shock;
    const label = new Date(now.getFullYear(), now.getMonth() + m, 1).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
    monthlyReturns.push({ label, pct: r * 100 });
  }

  // Dense daily-ish equity curve (points across the whole period).
  const points = 120;
  for (let i = 0; i <= points; i++) {
    const progress = i / points;
    const monthIdx = Math.min(MONTHS - 1, Math.floor(progress * MONTHS));
    const monthlyR = monthlyReturns[monthIdx].pct / 100;
    const dailyDrift = monthlyR / (points / MONTHS);
    const noise = (rng() - 0.5) * 2 * (0.006 * rm.vol);
    balance = balance * (1 + dailyDrift + noise);
    peak = Math.max(peak, balance);
    const dd = (peak - balance) / peak;
    maxDdPct = Math.max(maxDdPct, dd);
    equity.push({ t: i, equity: Math.round(balance), drawdown: -(dd * 100) });
  }

  const endBalance = Math.round(balance);
  const netProfit = endBalance - startBalance;
  const returnPct = (netProfit / startBalance) * 100;
  const years = MONTHS / 12;
  const cagrPct = (Math.pow(endBalance / startBalance, 1 / years) - 1) * 100;
  const maxDrawdownPct = maxDdPct * 100 * rm.dd;

  const winRatePct = (bias.win + (rng() - 0.5) * 0.04) * 100;
  const profitFactor = bias.pf * (0.95 + rng() * 0.2) * (riskId === "aggressive" ? 0.95 : 1);
  const trades = Math.round(180 * bias.edge + rng() * 60);
  const avgWin = 220 * rm.drift * (0.9 + rng() * 0.3);
  const avgLoss = -(avgWin / profitFactor) * (winRatePct / (100 - winRatePct));
  const sharpe = 1.2 * bias.edge * (rm.drift / Math.max(0.6, rm.vol)) * (0.9 + rng() * 0.2);
  const returnOverDd = returnPct / Math.max(1, maxDrawdownPct);
  const bestMonthPct = Math.max(...monthlyReturns.map((x) => x.pct));
  const worstMonthPct = Math.min(...monthlyReturns.map((x) => x.pct));

  const startLabel = new Date(2025, 0, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const endLabel = new Date(2025, MONTHS - 1, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return {
    strategy,
    risk,
    period: `${startLabel} – ${endLabel}`,
    startBalance,
    endBalance,
    netProfit,
    returnPct,
    cagrPct,
    maxDrawdownPct,
    winRatePct,
    profitFactor,
    trades,
    avgWin,
    avgLoss,
    sharpe,
    returnOverDd,
    bestMonthPct,
    worstMonthPct,
    equity,
    monthlyReturns,
  };
}
