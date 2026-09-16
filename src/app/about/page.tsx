import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { ButtonLink } from "@/components/ui/Button";
import { IconTarget, IconShield, IconCpu, IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Grey Falcon Labs turns a proven, discipline-first trading approach into fully automated MT5 execution. Meet the team and the principles behind the system.",
};

const VALUES = [
  {
    icon: <IconCpu className="h-5 w-5" />,
    title: "Systematic, not emotional",
    body: "Every decision is codified. The system trades the same logic at 3am as it does at noon — no fear, no FOMO, no fatigue.",
  },
  {
    icon: <IconShield className="h-5 w-5" />,
    title: "Risk first, returns second",
    body: "Capital protection is the default. Hard loss caps, drawdown guards and position sizing are baked into every strategy.",
  },
  {
    icon: <IconTarget className="h-5 w-5" />,
    title: "Verifiable, not hype",
    body: "We publish backtests, logs and a live report you can pressure-test. If it isn't measurable, we don't claim it.",
  },
];

const STATS = [
  { value: 5, suffix: "+", label: "Years trading" },
  { value: 600, suffix: "+", label: "Backtests run" },
  { value: 4, suffix: "", label: "Strategy families" },
  { value: 24, suffix: "/5", label: "Market coverage" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We turn a trading edge into"
        accent="automated discipline"
        lead="Grey Falcon Labs is a small quant studio building automated trading systems for MetaTrader 5. Our focus is simple: consistency over complexity."
      >
        <div className="mt-6 flex gap-3">
          <ButtonLink href="/backtesting" size="md">
            See the results
            <IconArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="md">
            Get in touch
          </ButtonLink>
        </div>
      </PageHeader>

      {/* Stats band */}
      <Section className="!py-14">
        <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map((s) => (
            <RevealItem key={s.label}>
              <div className="glass px-4 py-6 text-center">
                <div className="font-display text-3xl font-bold text-white">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                  {s.label}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Story */}
      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="glass overflow-hidden">
              <img
                src="https://placehold.co/720x520/0e1218/38bdf8/png?text=Grey+Falcon+Labs"
                alt="Placeholder image representing the Grey Falcon Labs studio"
                width={720}
                height={520}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Born on the charts,"
              accent="built for automation"
              align="left"
            />
            <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-neutral-400 md:text-base">
              <p>
                We started where most traders do — manually, screen-bound, and worn down by the
                emotional swings that quietly erode good decisions. The edge was real, but running
                it by hand wasn&apos;t sustainable.
              </p>
              <p>
                So we rebuilt it as code. Grey Falcon Labs packages a disciplined XAUUSD approach
                into fully automated execution on MT5, with risk controls that respect prop-firm
                rules and reporting transparent enough to audit.
              </p>
              <p>
                Everything on this site is placeholder content for a fictional brand — swap in your
                real story, team, and verified numbers before you launch.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="!pt-0">
        <SectionHeading eyebrow="Principles" title="What we" accent="stand for" />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
          {VALUES.map((v) => (
            <RevealItem key={v.title}>
              <div className="glass glass-hover h-full p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gold-400">
                  {v.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{v.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
