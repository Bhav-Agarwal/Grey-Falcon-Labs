import { cn } from "@/lib/utils";

/**
 * Broker-compatibility marquee — an infinite sliding strip of monochrome
 * wordmarks, in the same visual language as the rest of the site.
 *
 * These are simple typographic wordmarks, NOT the brokers' actual logo
 * artwork — no third-party logo files are bundled here. Naming real,
 * independent brokers to state that the system is broker-agnostic and
 * compatible with their MT5 terminals is informational only; it implies no
 * partnership, sponsorship, or endorsement by any broker listed. If you
 * later obtain licensed vector logos, swap the <span> text nodes below for
 * <img>/<svg> marks — the marquee mechanics (duplicate-list + CSS scroll)
 * don't need to change.
 */
const BROKERS = [
  "Vantage",
  "Exness",
  "Pepperstone",
  "Interactive Brokers",
  "FOREX.com",
  "Blueberry Markets",
  "XM",
  "IC Markets",
  "AvaTrade",
  "Swissquote",
  "OANDA",
  "IG",
  "Tickmill",
];

export function BrokerMarquee({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* The animated strip is decorative; screen readers get the plain list. */}
      <span className="sr-only">
        Broker-agnostic — compatible with {BROKERS.join(", ")}, and other MT5 brokers.
      </span>
      <div
        aria-hidden="true"
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {/* The symbol list is duplicated once so a -50% translateX loops seamlessly. */}
        <div className="flex w-max animate-ticker-scroll items-center gap-14 py-3 hover:[animation-play-state:paused]">
          {[...BROKERS, ...BROKERS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 whitespace-nowrap font-display text-lg font-bold uppercase tracking-wide text-white/35 transition-colors duration-300 hover:text-white/90 sm:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
