"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight, IconStar, IconChart } from "@/components/ui/icons";
import { HERO, HERO_TRUST } from "@/lib/content";

// Deterministic particle positions (percent) so SSR and client match.
const PARTICLES = [
  { x: 12, y: 62, d: 0 },
  { x: 28, y: 30, d: 0.6 },
  { x: 44, y: 74, d: 1.1 },
  { x: 61, y: 22, d: 0.3 },
  { x: 72, y: 55, d: 0.9 },
  { x: 84, y: 38, d: 1.4 },
  { x: 91, y: 68, d: 0.5 },
  { x: 18, y: 44, d: 1.2 },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background: faint grid + radial glow + drifting particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint bg-[size:56px_56px] opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]" />
        <div className="absolute right-[6%] top-[8%] h-[360px] w-[360px] rounded-full bg-steel-500/10 blur-[120px]" />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40 animate-pulse-dot"
            style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.d}s` }}
          />
        ))}
      </div>

      <div className="container-x flex flex-col items-center text-center">
        <motion.span
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
          </span>
          {HERO.eyebrow}
        </motion.span>

        <motion.h1
          className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl md:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {HERO.titleTop}
          <br />
          <span className="text-gradient">{HERO.titleBottom}</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          {HERO.body}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          <ButtonLink href="/pricing" size="lg">
            Get the system
            <IconArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/backtesting" variant="secondary" size="lg">
            <IconChart className="h-4 w-4" />
            See results
          </ButtonLink>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="flex text-gold-400" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStar key={i} className="h-3.5 w-3.5" />
              ))}
            </span>
            Trusted by a growing community
          </span>
          {HERO_TRUST.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-neutral-600" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* Stat tiles */}
        <motion.dl
          className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
        >
          {HERO.stats.map((s) => (
            <div key={s.label} className="glass px-4 py-5 text-center">
              <dd className="font-display text-2xl font-bold text-white md:text-3xl">{s.value}</dd>
              <dt className="mt-1 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                {s.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
