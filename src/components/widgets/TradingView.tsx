"use client";

import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * TradingView free embeddable widgets.
 *
 * TradingView ships each widget as a <script> that reads a JSON config from its
 * own innerHTML and renders into the preceding container. In React we inject
 * that script inside an effect, guard against StrictMode double-mounts, and
 * clean up on unmount. The free tier requires the visible attribution link,
 * which every widget below keeps.
 *
 * Docs: https://www.tradingview.com/widget/
 */

type TvBaseProps = {
  /** The embed script filename, e.g. "embed-widget-ticker-tape.js". */
  scriptName: string;
  /** Widget configuration object (serialized to the script body). */
  config: Record<string, unknown>;
  className?: string;
  /** Reserve height to avoid layout shift (CLS) while the widget loads. */
  minHeight?: number;
  /** Accessible label for the widget region. */
  ariaLabel: string;
};

function TradingViewWidgetBase({
  scriptName,
  config,
  className,
  minHeight = 46,
  ariaLabel,
}: TvBaseProps) {
  // `mountRef` is an isolated node that React always keeps empty — TradingView
  // owns everything inside it, so we can safely wipe it without React ever
  // trying to reconcile nodes the third-party script added or removed.
  const mountRef = useRef<HTMLDivElement>(null);
  // Serialize once so the effect depends on config *value*, not object identity
  // (preset components create a fresh config object on every render).
  const configJson = JSON.stringify(config);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    // Guard against a second injection (React StrictMode mounts effects twice).
    if (mount.querySelector("script")) return;

    const widgetHost = document.createElement("div");
    widgetHost.className = "tradingview-widget-container__widget";
    mount.appendChild(widgetHost);

    const script = document.createElement("script");
    script.src = `https://s3.tradingview.com/external-embedding/${scriptName}`;
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = configJson;
    mount.appendChild(script);

    return () => {
      // Safe: React never renders children into this node.
      mount.innerHTML = "";
    };
    // Re-inject only if the widget type or its config actually changes.
  }, [scriptName, configJson]);

  return (
    <div
      className={cn("tradingview-widget-container", className)}
      style={{ minHeight }}
      role="region"
      aria-label={ariaLabel}
    >
      {/* TradingView-owned node — React keeps this empty. */}
      <div ref={mountRef} />
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
          className="text-[11px] text-neutral-600 transition-colors hover:text-neutral-400"
        >
          Track all markets on TradingView
        </a>
      </div>
    </div>
  );
}

const TradingViewWidget = memo(TradingViewWidgetBase);

/* -------------------------------------------------------------------------- */
/* Preset 1 — scrolling ticker tape (markets relevant to a gold EA)           */
/* -------------------------------------------------------------------------- */

const TAPE_SYMBOLS = [
  { proName: "OANDA:XAUUSD", title: "Gold (XAU/USD)" },
  { proName: "TVC:DXY", title: "US Dollar Index" },
  { proName: "FX:EURUSD", title: "EUR/USD" },
  { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
  { proName: "SP:SPX", title: "S&P 500" },
  { proName: "TVC:USOIL", title: "Crude Oil" },
];

export function TradingViewTickerTape({ className }: { className?: string }) {
  return (
    <TradingViewWidget
      scriptName="embed-widget-ticker-tape.js"
      ariaLabel="Live market ticker tape"
      minHeight={46}
      className={className}
      config={{
        symbols: TAPE_SYMBOLS,
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: "adaptive",
        colorTheme: "dark",
        locale: "en",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Preset 2 — live symbol chart (defaults to spot gold)                        */
/* -------------------------------------------------------------------------- */

export function TradingViewSymbolChart({
  symbol = "OANDA:XAUUSD",
  label = "Gold",
  height = 360,
  className,
}: {
  symbol?: string;
  label?: string;
  height?: number;
  className?: string;
}) {
  return (
    <TradingViewWidget
      scriptName="embed-widget-symbol-overview.js"
      ariaLabel={`${label} price chart`}
      minHeight={height}
      className={className}
      config={{
        symbols: [[label, `${symbol}|3M`]],
        chartOnly: false,
        width: "100%",
        height,
        locale: "en",
        colorTheme: "dark",
        autosize: false,
        showVolume: false,
        showMA: false,
        hideDateRanges: false,
        hideMarketStatus: false,
        hideSymbolLogo: false,
        scalePosition: "right",
        scaleMode: "Normal",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "10",
        noTimeScale: false,
        valuesTracking: "1",
        changeMode: "price-and-percent",
        chartType: "area",
        lineWidth: 2,
        lineColor: "#f59e0b",
        topColor: "rgba(245,158,11,0.25)",
        bottomColor: "rgba(245,158,11,0)",
        isTransparent: true,
        gridLineColor: "rgba(255,255,255,0.06)",
        dateRanges: ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Preset 3 — compact single quote                                            */
/* -------------------------------------------------------------------------- */

export function TradingViewSingleQuote({
  symbol = "OANDA:XAUUSD",
  className,
}: {
  symbol?: string;
  className?: string;
}) {
  return (
    <TradingViewWidget
      scriptName="embed-widget-single-quote.js"
      ariaLabel="Live single quote"
      minHeight={126}
      className={className}
      config={{
        symbol,
        width: "100%",
        isTransparent: true,
        colorTheme: "dark",
        locale: "en",
      }}
    />
  );
}
