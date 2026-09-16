# Grey Falcon Labs

A marketing + reporting website for a **fictional** algorithmic-trading brand, built with
**Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

It was created as a design-and-structure homage to a modern quant-trading landing page — the
layout rhythm and section flow are inspired by the reference, but the brand, colors, copy, and all
assets are original placeholders. **No logos, images, or copy were copied from any other site.**

> ⚠️ **Everything here is placeholder content for a fictional brand.** Replace the copy, contact
> details, testimonials, and data sources before any real use. See the checklist below.

---

## Pages

| Route | What it is |
|-------|------------|
| `/` | Landing page — hero, features, how-it-works, live-dashboard preview, founder story, verified performance, testimonials, pricing preview, FAQ |
| `/backtesting` | **Interactive** explorer — pick a strategy × risk profile to generate a full report (equity curve, drawdown, win rate, monthly returns) |
| `/live` | **Live-style MT5 report** — balance, equity, open positions (with a simulated live tick), cumulative P&L, and a daily-P&L calendar |
| `/pricing` | Plans, comparison table, inclusions, pricing FAQ |
| `/about` | Company story, principles, stats |
| `/contact` | Contact form with front-end validation |

Plus `robots.txt`, `sitemap.xml`, an SVG favicon, and a custom 404.

---

## Tech stack

- **Next.js 14** (App Router, React Server Components, TypeScript)
- **Tailwind CSS v3** with a custom design system (`tailwind.config.ts`)
- **Framer Motion** for scroll reveals, the mobile menu, and micro-interactions
- **Zero chart dependencies** — all charts are hand-built, accessible inline SVG
  (`src/components/charts/Charts.tsx`)
- Fonts via `next/font` (Space Grotesk, Inter, JetBrains Mono) — no layout shift

---

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build (run build first)
npm run lint    # eslint
```

### Environment

Copy `.env.local.example` to `.env.local` and adjust:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
# Optional real MT5 feed (see below):
# MT5_BRIDGE_URL=...
# MT5_BRIDGE_TOKEN=...
```

`.env.local` is git-ignored — **never commit secrets.**

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx            # root layout: fonts, SEO metadata, nav + footer
│  ├─ globals.css           # theme + base styles
│  ├─ page.tsx              # landing page
│  ├─ backtesting/page.tsx
│  ├─ live/page.tsx
│  ├─ pricing/page.tsx
│  ├─ about/page.tsx
│  ├─ contact/page.tsx
│  ├─ sitemap.ts · robots.ts · not-found.tsx · icon.svg
├─ components/
│  ├─ site/       # Navbar, Footer, Logo, PageHeader
│  ├─ ui/         # Button, Section, Reveal, Counter, Accordion, icons
│  ├─ home/       # landing-page sections
│  ├─ dashboard/  # MetricCard, LiveDashboard
│  ├─ backtest/   # BacktestExplorer
│  ├─ charts/     # AreaChart, BarChart, Sparkline (SVG)
│  ├─ forms/      # ContactForm
│  └─ marketing/  # PricingCards
└─ lib/
   ├─ content.ts   # all site copy, nav, plans, FAQs
   ├─ backtest.ts  # deterministic mock backtest generator
   ├─ mt5.ts       # mock live MT5 snapshot (REPLACE-ME to wire a real feed)
   └─ utils.ts     # helpers
```

---

## Wiring real data

Both data-heavy pages read from a single module so you can swap mock → real without touching the UI:

- **Backtests** — `src/lib/backtest.ts` → replace `getReport()` with a fetch to your results API /
  static JSON, keeping the `BacktestReport` shape.
- **Live MT5** — `src/lib/mt5.ts` → a genuine feed needs a **server-side bridge** (the MetaTrader5
  Python API, or a broker REST/WebSocket endpoint). Implement `fetchLiveSnapshot()` to call it and
  return the `Mt5Snapshot` shape. The `/live` page is already `force-dynamic`.
- **Contact form** — `src/components/forms/ContactForm.tsx` (marked `REPLACE-ME`) validates on the
  client only; POST the payload to your email service / API route.

---

## Lighthouse

Production build, desktop preset — all four categories **100 / 100 / 100 / 100** on every page
(Performance, Accessibility, Best Practices, SEO).

---

## Deploy to Vercel

**Option A — Git + dashboard (recommended):** push this repo to GitHub/GitLab, then "Import Project"
in the Vercel dashboard. Framework is auto-detected as Next.js; no build config needed. Set
`NEXT_PUBLIC_SITE_URL` in the project's Environment Variables.

**Option B — CLI:**

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## License / attribution

Placeholder project. Design inspiration only; all brand assets are original. Not financial advice —
trading leveraged products carries a high level of risk.
