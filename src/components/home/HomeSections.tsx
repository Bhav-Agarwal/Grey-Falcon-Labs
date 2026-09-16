import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import {
  IconArrowRight,
  IconBolt,
  IconChart,
  IconClock,
  IconCpu,
  IconLayers,
  IconShield,
  IconTarget,
  IconSpark,
  IconStar,
} from "@/components/ui/icons";
import { WHAT_YOU_GET, HOW_IT_WORKS, WHY_US, TESTIMONIALS, FAQS } from "@/lib/content";

/* -------------------------------------------------------------------------- */
/* What you get                                                               */
/* -------------------------------------------------------------------------- */

const whatIcons = [IconLayers, IconCpu, IconBolt, IconShield, IconChart, IconTarget];

export function WhatYouGet() {
  return (
    <Section id="what-you-get">
      <SectionHeading
        eyebrow="What you get"
        title="Everything you need,"
        accent="nothing you don't"
        lead="A complete, self-contained trading system — delivered the moment you check out."
      />
      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHAT_YOU_GET.map((f, i) => {
          const Icon = whatIcons[i % whatIcons.length];
          return (
            <RevealItem key={f.index}>
              <article className="glass glass-hover group flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gold-400 transition-colors group-hover:border-gold-500/40">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-neutral-600">{f.index}</span>
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-gold-400/80">
                  {f.eyebrow}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{f.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {f.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-neutral-400"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* How it works                                                               */
/* -------------------------------------------------------------------------- */

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="border-y border-white/5 bg-white/[0.015]">
      <SectionHeading
        eyebrow="3 steps to live"
        title="How Grey Falcon"
        accent="works"
        lead="Simple to start. Built to perform."
      />
      <div className="relative mt-14 grid gap-4 md:grid-cols-3">
        {/* connecting line on desktop */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
        />
        {HOW_IT_WORKS.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.1} className="relative">
            <div className="glass flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 bg-ink-900 font-display text-lg font-bold text-gradient">
                  {s.step}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  {s.meta}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {["You keep control of risk", "The system handles execution", "Cancel anytime"].map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-neutral-300"
          >
            <IconSpark className="h-4 w-4 text-steel-400" />
            {t}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Why us                                                                     */
/* -------------------------------------------------------------------------- */

const whyIcons = [IconChart, IconShield, IconClock, IconCpu];

export function WhyUs() {
  return (
    <Section id="why">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Built different"
            title="Why Grey Falcon"
            accent="works"
            align="left"
            lead="Not another indicator. A complete trading system that removes human error and enforces discipline."
          />
          <Reveal className="mt-8 flex flex-col gap-3">
            {[
              "Backtested strategy library",
              "Weekly updates",
              "Community support",
              "Multi-account support",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3 text-sm text-neutral-300">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                  <IconStar className="h-3.5 w-3.5" />
                </span>
                {t}
              </div>
            ))}
          </Reveal>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {WHY_US.map((w, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <RevealItem key={w.index}>
                <div className="glass glass-hover h-full p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-steel-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">{w.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */

export function Testimonials() {
  return (
    <Section id="testimonials" className="border-y border-white/5 bg-white/[0.015]">
      <SectionHeading
        eyebrow="Community"
        title="Real traders."
        accent="Real outcomes."
        lead="Illustrative testimonials from a fictional community — replace with your own verified proof."
      />
      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((t) => (
          <RevealItem key={t.initials}>
            <figure className="glass flex h-full flex-col p-6">
              <div className="flex text-gold-400" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-3.5 w-3.5" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-neutral-300">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/30 to-steel-500/30 text-xs font-semibold text-white">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">{t.name}</span>
                  <span className="block text-xs text-neutral-500">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* Features bento                                                             */
/* -------------------------------------------------------------------------- */

export function FeaturesBento() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Features"
        title="Everything you need"
        accent="in one system"
        lead="Professional-grade features engineered to work around the clock."
      />
      <div className="mt-14 grid auto-rows-[minmax(0,1fr)] gap-4 md:grid-cols-3">
        <Reveal className="md:col-span-2 md:row-span-2">
          <div className="glass relative flex h-full flex-col justify-between overflow-hidden p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-gold-500/10 blur-3xl" />
            <div>
              <span className="eyebrow">
                <IconCpu className="h-3.5 w-3.5 text-gold-400" /> AI trading engine
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">
                A quant model that trades XAUUSD on MT5
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
                A data-driven model refined through hundreds of backtests. The brain behind every
                trade — fully automated, no manual input required.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { k: "24/5", v: "Auto" },
                { k: "MT5", v: "Platform" },
                { k: "XAUUSD", v: "Gold" },
              ].map((x) => (
                <div key={x.k} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="font-display text-lg font-bold text-white">{x.k}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <BentoSmall
          icon={<IconShield className="h-5 w-5" />}
          eyebrow="Risk tools"
          title="Risk management"
          body="Built-in SL/TP, position sizing, and drawdown tracking on every trade."
          chips={["1 : 2 R:R", "1% risk", "Optimal"]}
        />
        <BentoSmall
          icon={<IconClock className="h-5 w-5" />}
          eyebrow="Smart filters"
          title="Session & news aware"
          body="Trades only during optimal gold sessions and skips high-impact news."
          chips={["London open", "NFP filter", "News skip"]}
        />
        <BentoSmall
          icon={<IconChart className="h-5 w-5" />}
          eyebrow="Analytics"
          title="Deep performance"
          body="Visualize your edge with 20+ backtested metrics and live reporting."
          chips={["20+ metrics", "Live P&L"]}
        />
        <BentoSmall
          icon={<IconShield className="h-5 w-5" />}
          eyebrow="Security"
          title="License protection"
          body="Encrypted licensing keeps your system secure across multiple accounts."
          chips={["256-bit", "Multi-MT5"]}
        />
      </div>
    </Section>
  );
}

function BentoSmall({
  icon,
  eyebrow,
  title,
  body,
  chips,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  chips: string[];
}) {
  return (
    <Reveal>
      <div className="glass glass-hover flex h-full flex-col p-6">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-steel-400">
          {icon}
        </span>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">
          {eyebrow}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">{body}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <li
              key={c}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-neutral-400"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export function FaqSection() {
  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently asked" accent="questions" />
        <div className="mt-10">
          <Accordion items={FAQS} />
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA band                                                                   */
/* -------------------------------------------------------------------------- */

export function CtaBand() {
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-gold-500/20 bg-gradient-to-br from-gold-500/[0.12] via-ink-900 to-ink-900 p-10 text-center md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:44px_44px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Put your edge on <span className="text-gradient">autopilot</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-400">
              Set it up once and let Grey Falcon handle execution — every session, every day. No
              charts to watch, no signals to interpret.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/pricing" size="lg">
                Start trading now
                <IconArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/backtesting" variant="secondary" size="lg">
                Explore backtests
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
