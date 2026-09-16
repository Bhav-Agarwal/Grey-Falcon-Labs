import Link from "next/link";
import { Logo } from "./Logo";
import { SITE, NAV_LINKS } from "@/lib/content";
import { IconDiscord, IconMail, IconGlobe } from "@/components/ui/icons";

const productLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Backtesting", href: "/backtesting" },
  { label: "Live report", href: "/live" },
  { label: "Pricing", href: "/pricing" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/#faq" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-ink-950/60">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
              {SITE.description}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={SITE.discord}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-colors hover:border-white/25 hover:text-white"
                aria-label="Join our Discord"
              >
                <IconDiscord />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-colors hover:border-white/25 hover:text-white"
                aria-label="Email us"
              >
                <IconMail />
              </a>
              <a
                href={SITE.social.x}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-colors hover:border-white/25 hover:text-white"
                aria-label="Follow on X"
              >
                <IconGlobe />
              </a>
            </div>
          </div>

          <FooterCol title="Product" links={productLinks} />
          <FooterCol title="Company" links={companyLinks} />
          <FooterCol title="Explore" links={NAV_LINKS} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name}. Placeholder brand — not a real product.
          </p>
          <p className="max-w-2xl leading-relaxed">
            Risk warning: trading leveraged products carries a high level of risk. Past and
            backtested performance is not indicative of future results. Nothing here is financial
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      {/* Not a document heading — a nav group label, so it stays out of the heading outline. */}
      <div className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">{title}</div>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
