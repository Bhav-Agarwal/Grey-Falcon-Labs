/**
 * Live MT5 report data module (MOCK).
 *
 * A real "live MT5 feed" cannot run inside a static front-end — MetaTrader 5
 * exposes data through its terminal API (e.g. the MetaTrader5 Python package)
 * or a broker's REST/WebSocket bridge running on a server. This module returns
 * a realistic snapshot so the /live page is fully designed and demoable today.
 *
 * ---------------------------------------------------------------------------
 * REPLACE-ME: Wire a real feed by implementing `fetchLiveSnapshot()` to call
 * your bridge (see .env.local.example: MT5_BRIDGE_URL / MT5_BRIDGE_TOKEN) and
 * return the same `Mt5Snapshot` shape. The UI needs no other changes.
 * ---------------------------------------------------------------------------
 */

export type Mt5Position = {
  ticket: number;
  symbol: string;
  side: "buy" | "sell";
  lots: number;
  openPrice: number;
  currentPrice: number;
  profit: number;
  openedAgoMin: number;
};

export type Mt5DailyPnl = { day: number; pnl: number | null };

export type Mt5Snapshot = {
  account: {
    name: string;
    login: string;
    broker: string;
    server: string;
    currency: string;
    leverage: string;
  };
  status: "running" | "paused";
  symbol: string;
  updatedAtLabel: string;
  balance: number;
  equity: number;
  todayPnl: number;
  openPnl: number;
  tradesToday: number;
  winsToday: number;
  netPnl: number;
  returnPct: number;
  winRatePct: number;
  profitFactor: number;
  riskReward: string;
  bestDay: { label: string; value: number };
  worstDay: { label: string; value: number };
  positions: Mt5Position[];
  cumulative: number[]; // net cumulative P&L series
  weekdayTrades: { day: string; count: number }[];
  monthLabel: string;
  monthDays: Mt5DailyPnl[];
};

/** Deterministic snapshot (no Math.random at module scope → no hydration drift). */
export function getLiveSnapshot(): Mt5Snapshot {
  const monthDays: Mt5DailyPnl[] = [];
  // 30-day month with a mix of gains, losses and untraded weekend days.
  const pattern = [
    7, 30, 89, 235, null, 0, 0, 202, 109, 146, 105, 0, 0, 61, 88, -74, 51, 133, 0, 0,
    27, 44, -19, 96, 118, 0, 0, 72, 51, 38,
  ];
  for (let i = 0; i < 30; i++) {
    monthDays.push({ day: i + 1, pnl: pattern[i] === null ? null : (pattern[i] as number) });
  }

  const cumulative: number[] = [];
  let acc = 0;
  const steps = [
    120, 60, -80, 140, 90, -40, 200, 50, -110, 160, 80, 40, -60, 130, 70, 210, -90, 120,
    40, 90, -50, 150, 60, 80, -70, 110, 40, 90, 60, -30, 140,
  ];
  for (const s of steps) {
    acc += s;
    cumulative.push(acc);
  }

  return {
    account: {
      name: "Demo Account",
      login: "50#######",
      broker: "Your Broker (demo)",
      server: "YourBroker-Demo",
      currency: "USD",
      leverage: "1:500",
    },
    status: "running",
    symbol: "XAUUSD",
    updatedAtLabel: "Live · updates every few seconds",
    balance: 14261,
    equity: 14388,
    todayPnl: 127,
    openPnl: 127,
    tradesToday: 4,
    winsToday: 3,
    netPnl: 4261,
    returnPct: 42.6,
    winRatePct: 55.5,
    profitFactor: 1.62,
    riskReward: "1 : 1.8",
    bestDay: { label: "Day 4", value: 235 },
    worstDay: { label: "Day 16", value: -74 },
    positions: [
      { ticket: 100482913, symbol: "XAUUSD", side: "buy", lots: 0.2, openPrice: 3184.4, currentPrice: 3187.1, profit: 54, openedAgoMin: 42 },
      { ticket: 100482956, symbol: "XAUUSD", side: "buy", lots: 0.1, openPrice: 3185.9, currentPrice: 3187.1, profit: 12, openedAgoMin: 21 },
      { ticket: 100482977, symbol: "XAUUSD", side: "sell", lots: 0.15, openPrice: 3190.2, currentPrice: 3187.1, profit: 61, openedAgoMin: 8 },
    ],
    cumulative,
    weekdayTrades: [
      { day: "Mon", count: 38 },
      { day: "Tue", count: 44 },
      { day: "Wed", count: 51 },
      { day: "Thu", count: 40 },
      { day: "Fri", count: 25 },
    ],
    monthLabel: "This month",
    monthDays,
  };
}

/**
 * REPLACE-ME stub for a real feed. Kept here so the wiring point is obvious.
 * Example:
 *   const res = await fetch(process.env.MT5_BRIDGE_URL!, {
 *     headers: { Authorization: `Bearer ${process.env.MT5_BRIDGE_TOKEN}` },
 *     next: { revalidate: 5 },
 *   });
 *   return (await res.json()) as Mt5Snapshot;
 */
export async function fetchLiveSnapshot(): Promise<Mt5Snapshot> {
  return getLiveSnapshot();
}
