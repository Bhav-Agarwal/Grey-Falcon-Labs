/**
 * Central content module — nav, copy, features, FAQs, pricing.
 * All text here is placeholder marketing copy for the fictional brand
 * "Grey Falcon Labs". Replace with your real copy before launch.
 */

export const SITE = {
  name: "Grey Falcon Labs",
  shortName: "GreyFalcon",
  domain: "greyfalconlabs.com",
  tagline: "Algorithmic Trading, Engineered.",
  description:
    "Grey Falcon Labs builds quant-driven automated trading systems for MT5 — emotion-free execution, hard risk controls, and verified backtests you can pressure-test.",
  email: "hello@greyfalconlabs.com",
  discord: "https://discord.gg/your-invite",
  social: {
    x: "https://x.com/your-handle",
    youtube: "https://youtube.com/@your-channel",
    telegram: "https://t.me/your-channel",
  },
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Backtesting", href: "/backtesting" },
  { label: "Live report", href: "/live" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const HERO = {
  eyebrow: "Quant systems for MT5 · XAUUSD",
  titleTop: "Algorithmic Trading.",
  titleBottom: "Engineered for Edge.",
  body: "Grey Falcon Labs runs disciplined, quant-driven strategies on MetaTrader 5. Emotion-free execution, hard risk controls, and results you can audit — built to scale funded accounts.",
  stats: [
    { value: "4", label: "Strategies" },
    { value: "3", label: "Risk profiles" },
    { value: "600+", label: "Backtests run" },
    { value: "XAUUSD", label: "Primary market" },
  ],
};

export type Feature = {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
};

export const WHAT_YOU_GET: Feature[] = [
  {
    index: "01",
    eyebrow: "Inside the box",
    title: "Everything you need, nothing you don't",
    body: "The strategy pack, ready-to-load presets, a step-by-step setup guide, and lifetime updates — delivered the moment you check out.",
    tags: ["Strategy pack", "Tuned presets", "Setup guide", "Lifetime updates"],
  },
  {
    index: "02",
    eyebrow: "Plug into MT5",
    title: "Drop it in. Live in minutes.",
    body: "Attach the system to your MetaTrader 5 chart, pick a preset, and you're running. Broker-agnostic, no coding, no config rabbit holes.",
    tags: ["1-click presets", "MT5 native", "Broker-agnostic"],
  },
  {
    index: "03",
    eyebrow: "The engine works",
    title: "24/5 execution, zero emotion",
    body: "Grey Falcon trades around the clock with disciplined risk controls. You sleep — the system works, exactly to plan, every session.",
    tags: ["Quant strategy", "Disciplined risk", "24/5 execution"],
  },
  {
    index: "04",
    eyebrow: "Risk-managed by design",
    title: "Capital protection, baked in",
    body: "Hard daily-loss caps, max-drawdown guards, and dynamic lot sizing protect your account on every trade — automatically, never emotionally.",
    tags: ["Daily loss cap", "Max DD guard", "Auto lot sizing"],
  },
  {
    index: "05",
    eyebrow: "Track & scale",
    title: "Watch it work. Scale to more accounts.",
    body: "Monitor performance from a live dashboard and roll the same engine across multiple accounts once you're confident.",
    tags: ["Live dashboard", "Multi-account", "Alerts"],
  },
  {
    index: "06",
    eyebrow: "Proven on the tape",
    title: "Verified results, not screenshots",
    body: "Every trade is logged, audited, and benchmarked. Full backtests, a downloadable report, and a live P&L feed you can pressure-test.",
    tags: ["Live P&L feed", "Verified stats", "Full trade history"],
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    meta: "~2 min setup",
    title: "Connect",
    body: "Download the system and connect it to your MT5 account in minutes. No coding required.",
  },
  {
    step: "02",
    meta: "1-click presets",
    title: "Select",
    body: "Pick the strategy and risk profile that fits your goals — tuned for prop-style risk management.",
  },
  {
    step: "03",
    meta: "Trades 24/5",
    title: "Run",
    body: "Let Grey Falcon trade for you. Monitor performance from MT5 or your live dashboard.",
  },
];

export const WHY_US = [
  {
    index: "01",
    title: "Data-driven logic",
    body: "Every trade is based on backtested signals — not gut feeling, not hype.",
  },
  {
    index: "02",
    title: "Prop-firm ready",
    body: "Built-in SL/TP, drawdown limits, and position sizing that satisfy funded-account rules.",
  },
  {
    index: "03",
    title: "Session-aware",
    body: "Trades only during optimal XAUUSD windows for higher-quality entries.",
  },
  {
    index: "04",
    title: "Zero emotion",
    body: "No fear, no FOMO, no fatigue. The system executes your edge 24/5 without blinking.",
  },
];

export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "AM",
    name: "A. Placeholder",
    role: "Funded trader",
    quote:
      "Cleared my evaluation in two weeks. The system handled everything while I slept — this is the consistency I was missing.",
  },
  {
    initials: "PS",
    name: "P. Placeholder",
    role: "Part-time trader",
    quote:
      "I used to spend hours on charts and still miss entries. Grey Falcon runs my strategy perfectly every session — no stress.",
  },
  {
    initials: "VR",
    name: "V. Placeholder",
    role: "Prop-firm trader",
    quote:
      "The drawdown control is what sold me. My funded account stays safe and the system sticks to the plan no matter what.",
  },
  {
    initials: "SK",
    name: "S. Placeholder",
    role: "Full-time trader",
    quote:
      "Best investment I've made for my trading. Setup took five minutes and the reporting is genuinely transparent.",
  },
];

export type Plan = {
  id: string;
  name: string;
  badge?: string;
  blurb: string;
  price: number;
  cadence: string;
  featured?: boolean;
  features: string[];
  cta: string;
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    blurb: "Automate a single personal account and learn the system.",
    price: 49,
    cadence: "/month",
    features: [
      "Grey Falcon system — XAUUSD",
      "Run on 1 account",
      "Community access",
      "Email support",
    ],
    cta: "Start with Starter",
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most popular",
    blurb: "Scale automated trading across your funded and personal accounts.",
    price: 99,
    cadence: "/month",
    featured: true,
    features: [
      "Grey Falcon system — XAUUSD",
      "Run on up to 3 accounts",
      "Priority community access",
      "Priority support · 24h onboarding",
      "All backtest reports",
    ],
    cta: "Get started",
  },
  {
    id: "desk",
    name: "Trading Desk",
    blurb: "For prop desks running the engine across many accounts.",
    price: 249,
    cadence: "/month",
    features: [
      "Everything in Growth",
      "Run on up to 15 accounts",
      "Dedicated onboarding call",
      "Custom risk presets",
    ],
    cta: "Talk to us",
  },
];

export const PLAN_INCLUSIONS = [
  "Grey Falcon system (MT5 build)",
  "Full setup guide and install video",
  "Community access for support and updates",
  "All future updates for the system",
  "License per user (automated delivery)",
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Which platform does it support?",
    a: "Grey Falcon runs on MetaTrader 5 (MT5). You attach it to an XAUUSD chart, choose a preset, and it manages execution from there.",
  },
  {
    q: "Is it compatible with prop firms?",
    a: "Yes. The system ships with configurable daily-loss caps, max-drawdown guards, and position sizing designed to respect common funded-account rule sets. Always confirm the exact rules with your firm.",
  },
  {
    q: "How do I get the system after purchase?",
    a: "Delivery is automated. After checkout you receive the system file, tuned presets, and a setup guide, plus community access — typically within minutes.",
  },
  {
    q: "Can a beginner use it?",
    a: "Yes. Setup takes about five minutes with no coding. The written guide and install video walk you through every step.",
  },
  {
    q: "How many accounts can I run?",
    a: "It depends on your plan — from a single account on Starter up to fifteen on the Trading Desk plan. Licenses are per user.",
  },
  {
    q: "Will it be updated?",
    a: "Every active plan includes all future updates to the system at no extra cost, delivered automatically.",
  },
];

/** Small trust chips shown under the hero CTA. */
export const HERO_TRUST = ["Quick setup", "135+ foreign currencies accepted", "Licensed within 24 hours"];
