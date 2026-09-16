/**
 * Tiny class-name combiner. Kept dependency-free (no clsx/tailwind-merge) to
 * keep the bundle minimal — falsy values are dropped and the rest joined.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a number as a signed USD currency string, e.g. +$3,261 / -$402. */
export function formatCurrency(value: number, opts: { sign?: boolean } = {}): string {
  const { sign = false } = opts;
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: abs >= 1000 ? 0 : 2,
  });
  if (value < 0) return `-${formatted}`;
  return sign ? `+${formatted}` : formatted;
}

/** Format a ratio/percentage with a fixed number of decimals. */
export function formatPct(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}
