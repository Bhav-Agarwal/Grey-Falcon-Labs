import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

const TIMELINE = [
  {
    index: "01",
    title: "The manual grind",
    body: "Years on the charts — sessions, confirmations, entries, exits. Profitable, but drained by stress, fatigue, and the emotional swings that make even good traders slip.",
  },
  {
    index: "02",
    title: "The shift",
    body: "The goal became simple: make the edge run without a human — no emotion, no fatigue, no missed setups. A system that executes the same logic at 3am as it does at noon.",
  },
  {
    index: "03",
    title: "Grey Falcon Labs",
    body: "A proven approach turned into fully automated execution. No charts. No panic. Just clean, consistent trades — built for prop-firm scaling.",
  },
];

const STATS = [
  { value: 5, suffix: "+", label: "Years trading" },
  { value: 12, suffix: "K+", label: "Hours on charts" },
  { value: 20, suffix: "+", label: "Funded accounts" },
];

export function Founder() {
  return (
    <Section id="founder">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeading
            eyebrow="Built by a trader"
            title="From manual charts to"
            accent="AI automation"
            align="left"
          />
          {/* Founder portrait placeholder (replace with a real photo). */}
          <Reveal className="mt-8">
            <div className="glass overflow-hidden">
              <img
                src="https://placehold.co/640x420/0e1218/f59e0b/png?text=Founder+Portrait"
                alt="Placeholder portrait of the Grey Falcon Labs founder"
                width={640}
                height={420}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="font-display text-base font-semibold text-white">A. Founder</p>
                  <p className="text-xs text-neutral-500">Founder · systematic trader</p>
                </div>
                <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[11px] font-medium text-gold-400">
                  Verified track record
                </span>
              </div>
            </div>
          </Reveal>
          <dl className="mt-4 grid grid-cols-3 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="glass px-3 py-4 text-center">
                <dd className="font-display text-2xl font-bold text-white">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex flex-col gap-5">
          <div aria-hidden className="absolute bottom-2 left-[19px] top-2 w-px bg-white/10" />
          {TIMELINE.map((item, i) => (
            <Reveal key={item.index} delay={i * 0.08} className="relative pl-12">
              <span className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 bg-ink-900 font-mono text-xs text-gold-400">
                {item.index}
              </span>
              <div className="glass p-6">
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="pl-12">
            <blockquote className="rounded-2xl border-l-2 border-gold-500 bg-white/[0.02] p-6">
              <p className="font-display text-lg font-medium italic text-white">
                “Manual trading built the skill. Automation gave us freedom.”
              </p>
              <footer className="mt-3 text-sm text-neutral-500">— Founder, Grey Falcon Labs</footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
