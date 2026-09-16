/**
 * Dependency-free, accessible SVG charts.
 *
 * All charts are server-renderable (pure functions of their props), scale
 * responsively via a fixed viewBox + `preserveAspectRatio`, and expose a
 * <title>/<desc> pair plus role="img" for screen readers. Colours are passed
 * as tokens from the design system.
 */
import { cn } from "@/lib/utils";

const W = 640;
const H = 260;

function buildScales(values: number[], pad = { t: 16, r: 12, b: 24, l: 12 }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const x = (i: number, n: number) => pad.l + (n <= 1 ? 0 : (i / (n - 1)) * innerW);
  const y = (v: number) => pad.t + innerH - ((v - min) / range) * innerH;
  return { x, y, min, max, innerH, pad, innerW };
}

/** Smooth area/line chart. Great for equity curves & cumulative P&L. */
export function AreaChart({
  data,
  color = "#f59e0b",
  className,
  title,
  desc,
  showZero = false,
  baseline,
}: {
  data: number[];
  color?: string;
  className?: string;
  title: string;
  desc?: string;
  /** Draw a dashed zero line. */
  showZero?: boolean;
  /** Optional baseline value for the zero line (defaults to 0). */
  baseline?: number;
}) {
  if (data.length === 0) return null;
  const { x, y } = buildScales(data);
  const n = data.length;
  const linePts = data.map((v, i) => `${x(i, n)},${y(v)}`);
  const linePath = `M ${linePts.join(" L ")}`;
  const areaPath = `${linePath} L ${x(n - 1, n)},${H - 24} L ${x(0, n)},${H - 24} Z`;
  const zeroY = y(baseline ?? 0);
  const gid = `area-${title.replace(/\W+/g, "")}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {desc ? <desc>{desc}</desc> : null}
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showZero ? (
        <line x1="12" x2={W - 12} y1={zeroY} y2={zeroY} stroke="rgba(255,255,255,0.18)" strokeDasharray="4 4" strokeWidth="1" />
      ) : null}
      <path d={areaPath} fill={`url(#${gid})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Vertical bar chart. Positive/negative bars coloured by sign when `signed`. */
export function BarChart({
  data,
  labels,
  color = "#38bdf8",
  className,
  title,
  desc,
  signed = false,
}: {
  data: number[];
  labels?: string[];
  color?: string;
  className?: string;
  title: string;
  desc?: string;
  signed?: boolean;
}) {
  if (data.length === 0) return null;
  const pad = { t: 16, r: 12, b: 28, l: 12 };
  const withZero = signed ? [...data, 0] : data;
  const { y } = buildScales(withZero, pad);
  const n = data.length;
  const innerW = W - pad.l - pad.r;
  const slot = innerW / n;
  const barW = Math.min(38, slot * 0.6);
  const zeroY = signed ? y(0) : H - pad.b;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("h-full w-full", className)} role="img" aria-label={title}>
      <title>{title}</title>
      {desc ? <desc>{desc}</desc> : null}
      {signed ? (
        <line x1={pad.l} x2={W - pad.r} y1={zeroY} y2={zeroY} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      ) : null}
      {data.map((v, i) => {
        const cx = pad.l + slot * i + slot / 2;
        const vy = y(v);
        const top = Math.min(vy, zeroY);
        const barH = Math.max(2, Math.abs(zeroY - vy));
        const fill = signed ? (v >= 0 ? "#34d399" : "#fb7185") : color;
        return (
          <g key={i}>
            <rect x={cx - barW / 2} y={top} width={barW} height={barH} rx={3} fill={fill} opacity={0.9} />
            {labels?.[i] ? (
              <text x={cx} y={H - 8} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.45)" fontFamily="var(--font-jetbrains), monospace">
                {labels[i]}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/** Tiny inline sparkline for stat cards. */
export function Sparkline({
  data,
  color = "#34d399",
  className,
  title,
}: {
  data: number[];
  color?: string;
  className?: string;
  title: string;
}) {
  if (data.length === 0) return null;
  const w = 120;
  const h = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn("h-9 w-full", className)} role="img" aria-label={title}>
      <title>{title}</title>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
