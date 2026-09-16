import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "gain" | "loss" | "gold";

const toneText: Record<Tone, string> = {
  neutral: "text-white",
  gain: "text-gain",
  loss: "text-loss",
  gold: "text-gradient",
};

/** Compact KPI card used across the live dashboard and home preview. */
export function MetricCard({
  label,
  value,
  sub,
  tone = "neutral",
  icon,
  badge,
  children,
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  tone?: Tone;
  icon?: ReactNode;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <div className="glass flex flex-col p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
          {icon}
          {label}
        </span>
        {badge ? (
          <span className="rounded-full bg-gain/15 px-2 py-0.5 text-[10px] font-medium text-gain">
            {badge}
          </span>
        ) : null}
      </div>
      <div className={cn("mt-2 font-display text-2xl font-bold tabular-nums", toneText[tone])}>
        {value}
      </div>
      {sub ? <p className="mt-0.5 text-xs text-neutral-500">{sub}</p> : null}
      {children}
    </div>
  );
}
