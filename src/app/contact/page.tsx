import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { IconMail, IconDiscord, IconClock } from "@/components/ui/icons";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Grey Falcon Labs about the automated MT5 trading system, pricing, prop-firm compatibility, or support.",
};

const CHANNELS = [
  {
    icon: <IconMail className="h-5 w-5" />,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: <IconDiscord className="h-5 w-5" />,
    label: "Community",
    value: "Join the Discord",
    href: SITE.discord,
  },
  {
    icon: <IconClock className="h-5 w-5" />,
    label: "Response time",
    value: "Within 24 hours",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        accent="trading systems"
        lead="Questions about the system, pricing, or prop-firm rules? Send a message and we'll get back to you."
      />

      <Section className="!pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <Reveal>
              <h2 className="font-display text-xl font-semibold text-white">Other ways to reach us</h2>
              <p className="mt-2 text-sm text-neutral-400">
                Prefer not to fill in a form? Use any of these instead.
              </p>
            </Reveal>
            <div className="flex flex-col gap-3">
              {CHANNELS.map((c) => {
                const content = (
                  <div className="glass glass-hover flex items-center gap-4 p-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gold-400">
                      {c.icon}
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                        {c.label}
                      </div>
                      <div className="text-sm font-medium text-white">{c.value}</div>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={c.label}>
                    {c.href ? (
                      <a href={c.href} className="block">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </Reveal>
                );
              })}
            </div>
            <Reveal>
              <div className="glass p-5 text-xs leading-relaxed text-neutral-500">
                <strong className="text-neutral-300">Placeholder notice:</strong> contact details
                above are fictional. Replace them with your real address, community link and support
                hours before launch.
              </div>
            </Reveal>
          </div>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
